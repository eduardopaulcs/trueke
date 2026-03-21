import { http } from '@/lib/axios';
import type { PaginatedData, PaginationParams } from '@/types/api.types';
import type { CreateMarketInput, Market, UpdateMarketInput } from '@/types/domain.types';

interface MarketsParams extends PaginationParams {
  locationId?: string;
  date?: string;
}

export const marketsService = {
  findAll: (params?: MarketsParams): Promise<PaginatedData<Market>> =>
    http.get<PaginatedData<Market>>('/markets', params as Record<string, unknown>),

  findOne: (id: string): Promise<Market> => http.get<Market>(`/markets/${id}`),

  create: (data: CreateMarketInput): Promise<Market> => http.post<Market>('/markets', data),

  update: (id: string, data: UpdateMarketInput): Promise<Market> =>
    http.put<Market>(`/markets/${id}`, data),

  remove: (id: string): Promise<void> => http.delete<void>(`/markets/${id}`),
};
