import { CreatePropertyDto } from '@eventpanel/shared/dto/properties/create-property.dto';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WorkspacesService } from '../workspaces/workspaces.service';

import { Property } from './entities/property.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property) private repo: Repository<Property>,
    @Inject(WorkspacesService) private workspacesService: WorkspacesService
  ) {}

  async create({ workspaceId, ...args }: CreatePropertyDto): Promise<Property> {
    try {
      const workspace = await this.workspacesService.findOne(workspaceId);
      const property = this.repo.create(args);
      property.workspace = workspace;

      return await this.repo.save(property);
    } catch {
      throw new BadRequestException('workspace not found');
    }
  }

  async findAllByWorkspaceId(id: string): Promise<Property[]> {
    const workspace = await this.workspacesService.findOne(id);

    workspace.properties.forEach((property) => {
      property.workspace = workspace;
    });

    return workspace.properties;
  }

  async findOne(id: string): Promise<Property> {
    const property = await this.repo.findOne({ where: { id }, relations: { workspace: true } });

    if (!property) throw new NotFoundException('property not found');

    return property;
  }

  async update(id: string, args: Partial<Property>) {
    try {
      const property = await this.findOne(id);
      Object.assign(property, args);
      return await this.repo.save(property);
    } catch (error) {
      throw new BadRequestException('property not found');
    }
  }
}
