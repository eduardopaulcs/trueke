import { IsBoolean, IsDateString } from 'class-validator';

export class UpsertAttendanceDto {
  @IsDateString()
  date: string;

  @IsBoolean()
  confirmed: boolean;
}
