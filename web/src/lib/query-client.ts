import { QueryCache, QueryClient } from '@tanstack/react-query';
import { isAppError } from '@/errors/app-error';
import { queryKeys } from './query-keys';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      // If a 401 reaches TanStack Query it means the refresh also failed.
      // Clear the current user so isAuthenticated becomes false and
      // ProtectedRoute redirects to the login page.
      if (isAppError(error) && error.isUnauthorized()) {
        queryClient.setQueryData(queryKeys.currentUser(), undefined);
      }
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: (failureCount, error) => {
        if (isAppError(error) && [401, 403, 404].includes(error.statusCode)) {
          return false;
        }
        return failureCount < 1;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
