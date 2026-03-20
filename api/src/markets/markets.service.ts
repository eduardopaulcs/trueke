import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationDto } from '../common/dto/pagination.dto';
import { userPublicSelect } from '../common/selects/user.select';
import { paginate, paginatedResponse } from '../common/utils/paginate';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMarketDto } from './dto/create-market.dto';
import { UpdateMarketDto } from './dto/update-market.dto';

const marketInclude = {
  location: true,
  organizer: { select: userPublicSelect },
};

@Injectable()
export class MarketsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(pagination: PaginationDto, locationId?: string, date?: string) {
    const where = {
      deletedAt: null,
      ...(locationId ? { locationId } : {}),
      ...(date
        ? { attendances: { some: { date: new Date(date), confirmed: true } } }
        : {}),
    };
    const [total, data] = await this.prisma.$transaction([
      this.prisma.market.count({ where }),
      this.prisma.market.findMany({ where, include: marketInclude, orderBy: { name: 'asc' }, ...paginate(pagination) }),
    ]);
    return paginatedResponse(data, total, pagination);
  }

  async create(organizerId: string, dto: CreateMarketDto) {
    return this.prisma.market.create({
      data: {
        ...dto,
        schedule: dto.schedule as Prisma.InputJsonValue,
        organizerId,
      },
      include: marketInclude,
    });
  }

  async findOne(id: string) {
    const market = await this.prisma.market.findUnique({
      where: { id, deletedAt: null },
      include: marketInclude,
    });
    if (!market) {
      throw new NotFoundException('Market not found');
    }
    return market;
  }

  async update(id: string, organizerId: string, dto: UpdateMarketDto) {
    const market = await this.prisma.market.findUnique({
      where: { id, deletedAt: null },
    });
    if (!market) {
      throw new NotFoundException('Market not found');
    }
    if (market.organizerId !== organizerId) {
      throw new ForbiddenException('You do not own this market');
    }
    const { schedule, ...rest } = dto;
    return this.prisma.market.update({
      where: { id },
      data: {
        ...rest,
        ...(schedule !== undefined
          ? { schedule: schedule as Prisma.InputJsonValue }
          : {}),
      },
      include: marketInclude,
    });
  }

  async remove(id: string, organizerId: string) {
    const market = await this.prisma.market.findUnique({
      where: { id, deletedAt: null },
    });
    if (!market) {
      throw new NotFoundException('Market not found');
    }
    if (market.organizerId !== organizerId) {
      throw new ForbiddenException('You do not own this market');
    }
    return this.prisma.market.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
