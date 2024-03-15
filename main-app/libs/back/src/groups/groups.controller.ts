import { CreateGroupDto } from '@eventpanel/shared/dto/groups/create-group.dto';
import { GroupDto } from '@eventpanel/shared/dto/groups/group.dto';
import { UpdateGroupDto } from '@eventpanel/shared/dto/groups/update-group.dto';
import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Serialize } from '../core/interseptors/serialize.interceptor';

import { GroupsService } from './groups.service';

@ApiTags('Groups')
@Controller('groups')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('auth-token')
@Serialize(GroupDto)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  async create(@Body() body: CreateGroupDto) {
    return await this.groupsService.create(body);
  }

  @Get('/workspace/:id')
  async findAllByWorkspaceId(@Param('id', ParseUUIDPipe) id: string) {
    return await this.groupsService.findAllByWorkspaceId(id);
  }

  @Get('/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.groupsService.findOne(id);
  }

  @Put('/:id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateGroupDto) {
    return await this.groupsService.update(id, body);
  }
}
