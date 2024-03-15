import { CreateWorkspaceDto } from '@eventpanel/shared/dto/workspaces/create-workspace.dto';
import { UpdateWorkspaceDto } from '@eventpanel/shared/dto/workspaces/update-workspace.dto';
import { WorkspaceDto } from '@eventpanel/shared/dto/workspaces/workspace.dto';
import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Serialize } from '../core/interseptors/serialize.interceptor';
import { GetSelf } from '../users/decorators/get-self.decorator';
import { User } from '../users/entities/user.entity';

import { WorkspacesService } from './workspaces.service';

@ApiTags('Workspaces')
@Controller('workspaces')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')
@Serialize(WorkspaceDto)
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  create(@Body() body: CreateWorkspaceDto, @GetSelf() user: User) {
    return this.workspacesService.create(body, user);
  }

  @Get()
  findAll(@GetSelf() { id }: User) {
    return this.workspacesService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.workspacesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateWorkspaceDto) {
    return this.workspacesService.update(id, body);
  }
}
