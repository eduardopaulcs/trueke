import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';
import { AttendancesService } from './attendances.service';
import { UpsertAttendanceDto } from './dto/upsert-attendance.dto';

@ApiTags('attendances')
@Controller('markets/:marketId/attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Public()
  @ApiQuery({ name: 'date', required: false })
  @Get()
  findByMarket(
    @Param('marketId') marketId: string,
    @Query() pagination: PaginationDto,
    @Query('date') date?: string,
  ) {
    return this.attendancesService.findByMarket(marketId, pagination, date);
  }

  @ApiBearerAuth()
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
