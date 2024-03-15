import { CreateSourceDto } from '@eventpanel/shared/dto/sources/create-source.dto';
import { SourceDto } from '@eventpanel/shared/dto/sources/source.dto';
import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Serialize } from '../core/interseptors/serialize.interceptor';

import { SourcesService } from './sources.service';

@ApiTags('Sources')
@Controller('sources')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('auth-token')
@Serialize(SourceDto)
export class SourcesController {
  constructor(private readonly sourcesService: SourcesService) {}

  @Post()
  async create(@Body() body: CreateSourceDto) {
    return await this.sourcesService.create(body);
  }

  @Get('/workspace/:id')
  async findAllByWorkspaceId(@Param('id', ParseUUIDPipe) id: string) {
    return await this.sourcesService.findAllByWorkspaceId(id);
  }

  @Get('/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.sourcesService.findOne(id);
  }
}
