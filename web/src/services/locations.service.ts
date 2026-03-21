import { http } from '@/lib/axios';
import type { PaginatedData, PaginationParams } from '@/types/api.types';
import type { Location } from '@/types/domain.types';

interface LocationsParams extends PaginationParams {
  parentId?: string;
}

export const locationsService = {
  findAll: (params?: LocationsParams): Promise<PaginatedData<Location>> =>
    http.get<PaginatedData<Location>>('/locations', params as Record<string, unknown>),
};
