import { http } from '@/lib/axios';
import type { User } from '@/types/domain.types';

export const authService = {
  login: (email: string, password: string): Promise<User> =>
    http.post<User>('/auth/login', { email, password }),

  register: (name: string, email: string, password: string): Promise<User> =>
    http.post<User>('/auth/register', { name, email, password }),

  logout: (): Promise<void> => http.post<void>('/auth/logout'),
};
