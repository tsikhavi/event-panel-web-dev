import { CategoryDto } from '@eventpanel/shared/dto/categories/category.dto';
import { CreateCategoryDto } from '@eventpanel/shared/dto/categories/create-category.dto';
import { UpdateCategoryDto } from '@eventpanel/shared/dto/categories/update-category.dto';
import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Serialize } from '../core/interseptors/serialize.interceptor';

import { CategoriesService } from './categories.service';

@ApiTags('Categories')
@Controller('categories')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('auth-token')
@Serialize(CategoryDto)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() body: CreateCategoryDto) {
    return await this.categoriesService.create(body);
  }

  @Get('/workspace/:id')
  async findAllByWorkspaceId(@Param('id', ParseUUIDPipe) id: string) {
    return await this.categoriesService.findAllByWorkspaceId(id);
  }

  @Get('/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.categoriesService.findOne(id);
  }

  @Put('/:id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateCategoryDto) {
    return await this.categoriesService.update(id, body);
  }
}
