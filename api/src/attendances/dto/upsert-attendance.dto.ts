import { AttendanceStatus } from '@prisma/client';

export class UpsertAttendanceDto {
  date: string;
  status: AttendanceStatus;
}
