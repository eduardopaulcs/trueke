import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../common/dto/pagination.dto';
import { paginate, paginatedResponse } from '../common/utils/paginate';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LocationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(parentId: string | undefined, pagination: PaginationDto) {
    const where = { parentId: parentId ?? null };
    const [total, data] = await this.prisma.$transaction([
      this.prisma.location.count({ where }),
      this.prisma.location.findMany({
        where,
        include: { parent: true },
        orderBy: { name: 'asc' },
        ...paginate(pagination),
      }),
    ]);
    return paginatedResponse(data, total, pagination);
  }
}
