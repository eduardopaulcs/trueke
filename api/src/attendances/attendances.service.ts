import { Injectable } from '@nestjs/common';
import { UpsertAttendanceDto } from './dto/upsert-attendance.dto';

@Injectable()
export class AttendancesService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  upsert(_userId: string, _marketId: string, _dto: UpsertAttendanceDto): Promise<unknown> {
    throw new Error('TODO');
  }
}
