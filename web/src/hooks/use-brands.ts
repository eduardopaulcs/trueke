import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { brandsService } from '@/services/brands.service';
import type { PaginationParams } from '@/types/api.types';

export function useBrands(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.brands.all(params),
    queryFn: () => brandsService.findAll(params),
    staleTime: 5 * 60_000,
  });
}
