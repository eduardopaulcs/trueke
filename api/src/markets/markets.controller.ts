import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateMarketDto } from './dto/create-market.dto';
import { UpdateMarketDto } from './dto/update-market.dto';
import { MarketsService } from './markets.service';

@ApiTags('markets')
@Controller('markets')
export class MarketsController {
  constructor(private readonly marketsService: MarketsService) {}

  @Public()
  @ApiQuery({ name: 'locationId', required: false })
  @ApiQuery({ name: 'date', required: false })
  @Get()
  findAll(
    @Query() pagination: PaginationDto,
    @Query('locationId') locationId?: string,
    @Query('date') date?: string,
  ) {
    return this.marketsService.findAll(pagination, locationId, date);
  }

  @ApiBearerAuth()
  @Post()
  create(@CurrentUser() user: { id: string }, @Body() dto: CreateMarketDto) {
    return this.marketsService.create(user.id, dto);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marketsService.findOne(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  update(
    @Param('id') id: string,
    @CurrentUser() user: { id: string },
    @Body() dto: UpdateMarketDto,
  ) {
    return this.marketsService.update(id, user.id, dto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: { id: string }) {
    return this.marketsService.remove(id, user.id);
  }
}
