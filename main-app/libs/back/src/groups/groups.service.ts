import { CreateGroupDto } from '@eventpanel/shared/dto/groups/create-group.dto';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WorkspacesService } from '../workspaces/workspaces.service';

import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private repo: Repository<Group>,
    @Inject(WorkspacesService) private workspacesService: WorkspacesService
  ) {}

  async create({ workspaceId, ...args }: CreateGroupDto): Promise<Group> {
    try {
      const workspace = await this.workspacesService.findOne(workspaceId);
      const group = this.repo.create(args);
      group.workspace = workspace;

      return await this.repo.save(group);
    } catch {
      throw new BadRequestException('workspace not found');
    }
  }

  async findAllByWorkspaceId(id: string): Promise<Group[]> {
    const workspace = await this.workspacesService.findOne(id);

    workspace.groups.forEach((group) => {
      group.workspace = workspace;
    });

    return workspace.groups;
  }

  async findOne(id: string): Promise<Group> {
    const group = await this.repo.findOne({ where: { id }, relations: { workspace: true } });

    if (!group) throw new NotFoundException('group not found');

    return group;
  }

  async update(id: string, args: Partial<Group>) {
    try {
      const group = await this.findOne(id);
      Object.assign(group, args);
      return await this.repo.save(group);
    } catch (error) {
      throw new BadRequestException('group not found');
    }
  }
}
