import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';
import { LocationsService } from './locations.service';

@ApiTags('locations')
@Public()
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @ApiQuery({ name: 'parentId', required: false })
  @Get()
  findAll(@Query('parentId') parentId?: string, @Query() pagination?: PaginationDto) {
    return this.locationsService.findAll(parentId, pagination ?? {});
  }
}
