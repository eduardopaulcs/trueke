import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @ApiBearerAuth()
  @Post()
  create(@CurrentUser() user: { id: string }, @Body() dto: CreateBrandDto) {
    return this.brandsService.create(user.id, dto);
  }

  @Public()
  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.brandsService.findAll(pagination);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  update(
    @Param('id') id: string,
    @CurrentUser() user: { id: string },
    @Body() dto: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, user.id, dto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: { id: string }) {
    return this.brandsService.remove(id, user.id);
  }

  @ApiBearerAuth()
  @Post(':id/follow')
  @HttpCode(HttpStatus.OK)
  follow(@Param('id') id: string, @CurrentUser() user: { id: string }) {
    return this.brandsService.follow(id, user.id);
  }

  @ApiBearerAuth()
  @Delete(':id/follow')
  @HttpCode(HttpStatus.OK)
  unfollow(@Param('id') id: string, @CurrentUser() user: { id: string }) {
    return this.brandsService.unfollow(id, user.id);
  }
}
