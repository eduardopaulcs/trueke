import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { AttendancesService } from './attendances.service';
import { UpsertAttendanceDto } from './dto/upsert-attendance.dto';

@ApiTags('attendances')
@ApiBearerAuth()
@Controller('markets/:marketId/attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Roles('vendor')
  @Post()
  upsert(
    @Param('marketId') marketId: string,
    @CurrentUser() user: { id: string },
    @Body() dto: UpsertAttendanceDto,
  ) {
    return this.attendancesService.upsert(user.id, marketId, dto);
  }
}
