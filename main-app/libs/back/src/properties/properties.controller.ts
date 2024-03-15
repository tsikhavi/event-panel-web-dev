import { CreatePropertyDto } from '@eventpanel/shared/dto/properties/create-property.dto';
import { PropertyDto } from '@eventpanel/shared/dto/properties/property.dto';
import { UpdatePropertyDto } from '@eventpanel/shared/dto/properties/update-property.dto';
import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Serialize } from '../core/interseptors/serialize.interceptor';

import { PropertiesService } from './properties.service';

@ApiTags('Properties')
@Controller('properties')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('auth-token')
@Serialize(PropertyDto)
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  async create(@Body() body: CreatePropertyDto) {
    return await this.propertiesService.create(body);
  }

  @Get('/workspace/:id')
  async findAllByWorkspaceId(@Param('id', ParseUUIDPipe) id: string) {
    return await this.propertiesService.findAllByWorkspaceId(id);
  }

  @Get('/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.propertiesService.findOne(id);
  }

  @Put('/:id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdatePropertyDto) {
    return await this.propertiesService.update(id, body);
  }
}
