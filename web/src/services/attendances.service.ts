import { http } from '@/lib/axios';
import type { PaginatedData, PaginationParams } from '@/types/api.types';
import type { Attendance, UpsertAttendanceInput } from '@/types/domain.types';

interface AttendancesParams extends PaginationParams {
  date?: string;
}

export const attendancesService = {
  findByMarket: (
    marketId: string,
    params?: AttendancesParams,
  ): Promise<PaginatedData<Attendance>> =>
    http.get<PaginatedData<Attendance>>(
      `/markets/${marketId}/attendances`,
      params as Record<string, unknown>,
    ),

  // There is no DELETE endpoint. To cancel an attendance, upsert with confirmed: false.
  upsert: (marketId: string, data: UpsertAttendanceInput): Promise<Attendance> =>
    http.post<Attendance>(`/markets/${marketId}/attendances`, data),
};
