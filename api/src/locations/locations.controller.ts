import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { LocationsService } from './locations.service';

@ApiTags('locations')
@Public()
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  findAll(@Query('parentId') parentId?: string) {
    return this.locationsService.findAll(parentId);
  }

  @Get(':id/children')
  findChildren(@Param('id') id: string) {
    return this.locationsService.findChildren(id);
  }
}
