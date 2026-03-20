import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaginationDto } from '../common/dto/pagination.dto';
import { userPublicSelect } from '../common/selects/user.select';
import { paginate, paginatedResponse } from '../common/utils/paginate';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

const brandInclude = { owner: { select: userPublicSelect } };

@Injectable()
export class BrandsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(ownerId: string, dto: CreateBrandDto) {
    return this.prisma.$transaction(async (tx) => {
      const brand = await tx.brand.create({
        data: { ...dto, ownerId },
        include: brandInclude,
      });

      // Grant vendor role if not already present
      await tx.user.update({
        where: { id: ownerId },
        data: {
          roles: {
            push: 'vendor',
          },
        },
      });

      // Avoid duplicate roles using a raw update with array_append + DISTINCT
      await tx.$executeRaw`
        UPDATE "User"
        SET roles = ARRAY(SELECT DISTINCT unnest(roles))
        WHERE id = ${ownerId}
      `;

      return brand;
    });
  }

  async findAll(pagination: PaginationDto) {
    const where = { deletedAt: null };
    const [total, data] = await this.prisma.$transaction([
      this.prisma.brand.count({ where }),
      this.prisma.brand.findMany({ where, include: brandInclude, orderBy: { name: 'asc' }, ...paginate(pagination) }),
    ]);
    return paginatedResponse(data, total, pagination);
  }

  async findOne(id: string) {
    const brand = await this.prisma.brand.findUnique({
      where: { id, deletedAt: null },
      include: brandInclude,
    });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return brand;
  }

  async update(id: string, ownerId: string, dto: UpdateBrandDto) {
    const brand = await this.prisma.brand.findUnique({
      where: { id, deletedAt: null },
    });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    if (brand.ownerId !== ownerId) {
      throw new ForbiddenException('You do not own this brand');
    }
    return this.prisma.brand.update({
      where: { id },
      data: dto,
      include: brandInclude,
    });
  }

  async follow(brandId: string, followerId: string) {
    const brand = await this.findOne(brandId);
    if (brand.ownerId === followerId) {
      throw new ForbiddenException('You cannot follow your own brand');
    }
    try {
      return await this.prisma.follow.create({
        data: { brandId, followerId },
        include: { brand: true },
      });
    } catch {
      // Unique constraint violation — already following
      return { brandId, followerId, alreadyFollowing: true };
    }
  }

  async unfollow(brandId: string, followerId: string) {
    await this.findOne(brandId);
    await this.prisma.follow.deleteMany({
      where: { brandId, followerId },
    });
    return { brandId, followerId, unfollowed: true };
  }

  async remove(id: string, ownerId: string) {
    const brand = await this.prisma.brand.findUnique({
      where: { id, deletedAt: null },
    });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    if (brand.ownerId !== ownerId) {
      throw new ForbiddenException('You do not own this brand');
    }
    return this.prisma.brand.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
