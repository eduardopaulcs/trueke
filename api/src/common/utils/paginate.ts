import { PaginationDto } from '../dto/pagination.dto';

export function paginate(dto: PaginationDto) {
  const page = dto.page ?? 1;
  const limit = dto.limit ?? 20;
  return { skip: (page - 1) * limit, take: limit };
}

export function paginatedResponse<T>(items: T[], total: number, dto: PaginationDto) {
  const page = dto.page ?? 1;
  const limit = dto.limit ?? 20;
  return { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
}
