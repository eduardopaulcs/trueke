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

const brandBaseInclude = { owner: { select: userPublicSelect } };

function brandInclude(userId: string | null) {
  if (!userId) return brandBaseInclude;
  return {
    ...brandBaseInclude,
    followers: { where: { followerId: userId }, select: { id: true } },
  };
}

function withIsFollowing(
  brand: Record<string, unknown> & { followers?: { id: string }[] },
  userId: string | null,
) {
  const { followers, ...rest } = brand;
  return { ...rest, isFollowing: userId ? (followers?.length ?? 0) > 0 : false };
}

@Injectable()
export class BrandsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(ownerId: string, dto: CreateBrandDto) {
    return this.prisma.$transaction(async (tx) => {
      const brand = await tx.brand.create({
        data: { ...dto, ownerId },
        include: brandBaseInclude,
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

  async findAll(pagination: PaginationDto, userId: string | null) {
    const where = { deletedAt: null };
    const include = brandInclude(userId);
    const [total, data] = await this.prisma.$transaction([
      this.prisma.brand.count({ where }),
      this.prisma.brand.findMany({
        where,
        include,
        orderBy: { name: 'asc' },
        ...paginate(pagination),
      }),
    ]);
    const items = data.map((b) =>
      withIsFollowing(b as Record<string, unknown> & { followers?: { id: string }[] }, userId),
    );
    return paginatedResponse(items, total, pagination);
  }

  async findOne(id: string, userId: string | null) {
    const include = brandInclude(userId);
    const brand = await this.prisma.brand.findUnique({
      where: { id, deletedAt: null },
      include,
    });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return withIsFollowing(
      brand as Record<string, unknown> & { followers?: { id: string }[] },
      userId,
    );
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
      include: brandBaseInclude,
    });
  }

  async follow(brandId: string, followerId: string) {
    const brand = await this.findBrandOrThrow(brandId);
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
    await this.findBrandOrThrow(brandId);
    await this.prisma.follow.deleteMany({
      where: { brandId, followerId },
    });
    return { brandId, followerId, unfollowed: true };
  }

  private async findBrandOrThrow(id: string) {
    const brand = await this.prisma.brand.findUnique({ where: { id, deletedAt: null } });
    if (!brand) throw new NotFoundException('Brand not found');
    return brand;
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
