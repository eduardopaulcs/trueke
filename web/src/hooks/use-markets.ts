import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { marketsService } from '@/services/markets.service';
import type { PaginationParams } from '@/types/api.types';

interface UseMarketsParams extends PaginationParams {
  locationId?: string;
  date?: string;
}

export function useMarkets(params?: UseMarketsParams) {
  return useQuery({
    queryKey: queryKeys.markets.all(params),
    queryFn: () => marketsService.findAll(params),
    staleTime: 5 * 60_000,
  });
}
