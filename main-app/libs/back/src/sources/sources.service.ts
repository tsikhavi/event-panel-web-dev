import { CreateSourceDto } from '@eventpanel/shared/dto/sources/create-source.dto';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { WorkspacesService } from '../workspaces/workspaces.service';

import { Source } from './entities/source.entity';

@Injectable()
export class SourcesService {
  constructor(
    @InjectRepository(Source) private repo: Repository<Source>,
    @Inject(WorkspacesService) private workspacesService: WorkspacesService
  ) {}

  async create({ workspaceId, ...args }: CreateSourceDto): Promise<Source> {
    try {
      const workspace = await this.workspacesService.findOne(workspaceId);
      const source = this.repo.create(args);
      source.workspace = workspace;

      return await this.repo.save(source);
    } catch {
      throw new BadRequestException('workspace not found');
    }
  }

  async findAllByWorkspaceId(id: string): Promise<Source[]> {
    const workspace = await this.workspacesService.findOne(id);

    workspace.sources.forEach((source) => {
      source.workspace = workspace;
    });

    return workspace.sources;
  }

  async findOne(id: string): Promise<Source> {
    const source = await this.repo.findOne({ where: { id }, relations: { workspace: true } });

    if (!source) throw new NotFoundException('source not found');

    return source;
  }

  async findAllByIds(ids: string[]): Promise<Source[]> {
    if (ids.length === 0) {
      return [];
    }

    return await this.repo.find({
      where: { id: In(ids) },
      relations: ['workspace'],
    });
  }

  async update(id: string, args: Partial<Source>) {
    try {
      const source = await this.findOne(id);
      Object.assign(source, args);
      return await this.repo.save(source);
    } catch (error) {
      throw new BadRequestException('source not found');
    }
  }
}
