import { useQuery } from '@tanstack/react-query';
import { type ReactNode } from 'react';
import { queryClient } from '@/lib/query-client';
import { queryKeys } from '@/lib/query-keys';
import { authService } from '@/services/auth.service';
import { usersService } from '@/services/users.service';
import type { User } from '@/types/domain.types';
import { AuthContext } from './auth-context';

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useQuery({
    queryKey: queryKeys.currentUser(),
    queryFn: () => usersService.getMe(),
    retry: false,
    staleTime: 5 * 60_000,
  });

  const resolvedUser = user ?? null;
  const isAuthenticated = !isLoading && resolvedUser !== null;

  async function login(email: string, password: string): Promise<void> {
    const loggedUser = await authService.login(email, password);
    queryClient.setQueryData<User>(queryKeys.currentUser(), loggedUser);
  }

  async function register(name: string, email: string, password: string): Promise<void> {
    const registeredUser = await authService.register(name, email, password);
    queryClient.setQueryData<User>(queryKeys.currentUser(), registeredUser);
  }

  async function logout(): Promise<void> {
    await authService.logout();
    queryClient.clear();
  }

  return (
    <AuthContext.Provider
      value={{ user: resolvedUser, isAuthenticated, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
