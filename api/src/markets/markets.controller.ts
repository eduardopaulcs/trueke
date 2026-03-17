import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';
import { CreateMarketDto } from './dto/create-market.dto';
import { UpdateMarketDto } from './dto/update-market.dto';
import { MarketsService } from './markets.service';

@ApiTags('markets')
@ApiBearerAuth()
@Controller('markets')
export class MarketsController {
  constructor(private readonly marketsService: MarketsService) {}

  @Public()
  @Get()
  findAll() {
    return this.marketsService.findAll();
  }

  @Post()
  create(@CurrentUser() user: { id: string }, @Body() dto: CreateMarketDto) {
    return this.marketsService.create(user.id, dto);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marketsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMarketDto) {
    return this.marketsService.update(id, dto);
  }
}
