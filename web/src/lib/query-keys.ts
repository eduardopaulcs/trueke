import type { PaginationParams } from '@/types/api.types';

type BrandsParams = PaginationParams;

interface MarketsParams extends PaginationParams {
  locationId?: string;
  date?: string;
}

interface AttendancesParams extends PaginationParams {
  date?: string;
}

interface LocationsParams extends PaginationParams {
  parentId?: string;
}

export const queryKeys = {
  currentUser: () => ['users', 'me'] as const,

  brands: {
    all: (params?: BrandsParams) => ['brands', 'list', params ?? {}] as const,
    detail: (id: string) => ['brands', id] as const,
  },

  markets: {
    all: (params?: MarketsParams) => ['markets', 'list', params ?? {}] as const,
    detail: (id: string) => ['markets', id] as const,
  },

  attendances: {
    byMarket: (marketId: string, params?: AttendancesParams) =>
      ['attendances', 'market', marketId, params ?? {}] as const,
  },

  locations: {
    all: (params?: LocationsParams) => ['locations', 'list', params ?? {}] as const,
  },
} as const;
