import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { usersService } from '@/services/users.service';

// Provides access to the TanStack Query interface (isLoading, error, refetch)
// for the current user cache entry. AuthProvider already runs this query on
// mount, so this hook shares the same cache without an additional network request.
export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.currentUser(),
    queryFn: () => usersService.getMe(),
    retry: false,
    staleTime: 5 * 60_000,
  });
}
