import { http } from '@/lib/axios';
import type { PaginatedData, PaginationParams } from '@/types/api.types';
import type { Brand, CreateBrandInput, Follow, UpdateBrandInput } from '@/types/domain.types';

export const brandsService = {
  findAll: (params?: PaginationParams): Promise<PaginatedData<Brand>> =>
    http.get<PaginatedData<Brand>>('/brands', params as Record<string, unknown>),

  findOne: (id: string): Promise<Brand> => http.get<Brand>(`/brands/${id}`),

  create: (data: CreateBrandInput): Promise<Brand> => http.post<Brand>('/brands', data),

  update: (id: string, data: UpdateBrandInput): Promise<Brand> =>
    http.put<Brand>(`/brands/${id}`, data),

  remove: (id: string): Promise<void> => http.delete<void>(`/brands/${id}`),

  follow: (id: string): Promise<Follow> => http.post<Follow>(`/brands/${id}/follow`),

  unfollow: (id: string): Promise<Follow> => http.delete<Follow>(`/brands/${id}/follow`),
};
