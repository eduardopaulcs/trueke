import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from '../common/dto/pagination.dto';
import { paginate, paginatedResponse } from '../common/utils/paginate';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertAttendanceDto } from './dto/upsert-attendance.dto';

@Injectable()
export class AttendancesService {
  constructor(private readonly prisma: PrismaService) {}

  async upsert(userId: string, marketId: string, dto: UpsertAttendanceDto) {
    // The user must own a brand to confirm attendance
    const brand = await this.prisma.brand.findFirst({
      where: { ownerId: userId, deletedAt: null },
    });
    if (!brand) {
      throw new NotFoundException('No brand found for this user');
    }

    const market = await this.prisma.market.findUnique({
      where: { id: marketId, deletedAt: null },
    });
    if (!market) {
      throw new NotFoundException('Market not found');
    }

    const date = new Date(dto.date);

    return this.prisma.attendance.upsert({
      where: {
        brandId_marketId_date: {
          brandId: brand.id,
          marketId,
          date,
        },
      },
      update: { confirmed: dto.confirmed },
      create: {
        brandId: brand.id,
        marketId,
        date,
        confirmed: dto.confirmed,
      },
      include: { brand: true, market: true },
    });
  }

  async findByMarket(marketId: string, pagination: PaginationDto, date?: string) {
    const where = {
      marketId,
      confirmed: true,
      ...(date ? { date: new Date(date) } : {}),
    };
    const [total, data] = await this.prisma.$transaction([
      this.prisma.attendance.count({ where }),
      this.prisma.attendance.findMany({ where, include: { brand: true }, orderBy: { date: 'asc' }, ...paginate(pagination) }),
    ]);
    return paginatedResponse(data, total, pagination);
  }
}
