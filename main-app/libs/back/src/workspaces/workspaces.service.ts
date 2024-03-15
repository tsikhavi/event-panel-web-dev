import { CreateWorkspaceDto } from '@eventpanel/shared/dto/workspaces/create-workspace.dto';
import { UpdateWorkspaceDto } from '@eventpanel/shared/dto/workspaces/update-workspace.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Source } from '../sources/entities/source.entity';
import { User } from '../users/entities/user.entity';

import { Workspace } from './entities/workspace.entity';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace) private repo: Repository<Workspace>,
    @InjectRepository(Source) private sourceRepo: Repository<Source>
  ) {}

  async create(attrs: CreateWorkspaceDto, user: User, sourceNames: string[] = ['iOS', 'Android']): Promise<Workspace> {
    const workspace = this.repo.create(attrs);
    workspace.author = user;

    const sources = await Promise.all(sourceNames.map((name) => this.createSource(name)));

    // Assign sources to the workspace
    workspace.sources = sources;

    return await this.repo.save(workspace);
  }

  async findOne(id: string): Promise<Workspace> {
    const workspace = await this.repo.findOne({ where: { id }, relations: ['groups', 'transactions'] });

    if (!workspace) throw new NotFoundException('workspace not found');

    return workspace;
  }

  async findAll(id: string): Promise<Workspace[]> {
    const workspace = await this.repo.find({ where: { author: { id } } });

    if (!workspace) throw new NotFoundException('workspace not found');

    return workspace;
  }

  async update(id: string, attrs: UpdateWorkspaceDto): Promise<Workspace> {
    const workspace = await this.findOne(id);
    Object.assign(workspace, attrs);

    return this.repo.save(workspace);
  }

  private async createSource(name: string): Promise<Source> {
    const source = this.sourceRepo.create({ name });
    return await this.sourceRepo.save(source);
  }
}
