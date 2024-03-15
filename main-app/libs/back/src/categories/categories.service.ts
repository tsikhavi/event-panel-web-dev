import { CreateCategoryDto } from '@eventpanel/shared/dto/categories/create-category.dto';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WorkspacesService } from '../workspaces/workspaces.service';

import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private repo: Repository<Category>,
    @Inject(WorkspacesService) private workspacesService: WorkspacesService
  ) {}

  async create({ workspaceId, ...args }: CreateCategoryDto): Promise<Category> {
    try {
      const workspace = await this.workspacesService.findOne(workspaceId);
      const category = this.repo.create(args);
      category.workspace = workspace;

      return await this.repo.save(category);
    } catch {
      throw new BadRequestException('workspace not found');
    }
  }

  async findAllByWorkspaceId(id: string): Promise<Category[]> {
    const workspace = await this.workspacesService.findOne(id);

    workspace.categories.forEach((category) => {
      category.workspace = workspace;
    });

    return workspace.categories;
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.repo.findOne({ where: { id }, relations: { workspace: true } });

    if (!category) throw new NotFoundException('category not found');

    return category;
  }

  async update(id: string, args: Partial<Category>) {
    try {
      const category = await this.findOne(id);
      Object.assign(category, args);
      return await this.repo.save(category);
    } catch (error) {
      throw new BadRequestException('category not found');
    }
  }
}
