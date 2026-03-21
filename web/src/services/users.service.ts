import { http } from '@/lib/axios';
import type { User } from '@/types/domain.types';

export const usersService = {
  getMe: (): Promise<User> => http.get<User>('/users/me'),

  updateMe: (data: { name?: string }): Promise<User> => http.put<User>('/users/me', data),
};
