import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { categoriesList, category, createCategory, updateCategory } from '../__test-data__/categories.test-data';
import { workspace } from '../__test-data__/workspaces.test-data';
import { WorkspacesService } from '../workspaces/workspaces.service';

import { Category } from './entities/category.entity';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;
  let workspacesService: WorkspacesService;

  const mockWorkspacesService: Partial<WorkspacesService> = {
    findOne: jest.fn().mockResolvedValue(workspace),
  };

  const mockRepository: Partial<Repository<Category>> = {
    create: jest.fn().mockReturnValue(category),
    save: jest.fn().mockResolvedValue(category),
    update: jest.fn().mockResolvedValue(category),
    findOne: jest.fn().mockResolvedValue(category),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: WorkspacesService, useValue: mockWorkspacesService },
        { provide: getRepositoryToken(Category), useValue: mockRepository },
      ],
    }).compile();

    categoriesService = module.get<CategoriesService>(CategoriesService);
    workspacesService = module.get<WorkspacesService>(WorkspacesService);
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const result = await categoriesService.create(createCategory);

      expect(workspacesService.findOne).toHaveBeenCalledWith(createCategory.workspaceId);
      expect(mockRepository.create).toHaveBeenCalledWith({ ...createCategory, workspaceId: undefined });
      expect(mockRepository.save).toHaveBeenCalledWith(category);
      expect(result).toEqual(category);
    });

    it('should throw BadRequestException', async () => {
      jest.spyOn(workspacesService, 'findOne').mockImplementation(() => {
        throw new NotFoundException();
      });

      try {
        await categoriesService.create(createCategory);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(mockRepository.create).toHaveBeenCalledTimes(0);
        expect(mockRepository.save).toHaveBeenCalledTimes(0);
      }
    });
  });

  describe('findAllByWorkspaceId', () => {
    it('should return a list of categories', async () => {
      jest.spyOn(workspacesService, 'findOne').mockResolvedValue({ ...workspace, categories: categoriesList });

      const result = await categoriesService.findAllByWorkspaceId(workspace.id);

      expect(workspacesService.findOne).toHaveBeenCalledWith(workspace.id);
      expect(result).toEqual(categoriesList);
    });

    it('should return an empty list', async () => {
      jest.spyOn(workspacesService, 'findOne').mockResolvedValue(workspace);

      const result = await categoriesService.findAllByWorkspaceId(workspace.id);

      expect(workspacesService.findOne).toHaveBeenCalledWith(workspace.id);
      expect(result).toEqual([]);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(workspacesService, 'findOne').mockImplementation(() => {
        throw new NotFoundException();
      });

      await expect(categoriesService.findAllByWorkspaceId(workspace.id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a category', async () => {
      const result = await categoriesService.findOne(category.id);

      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(category);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(null);

      await expect(categoriesService.findOne(category.id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should return an updated category', async () => {
      const newCategory = { ...category, ...updateCategory };

      jest.spyOn(categoriesService, 'findOne').mockResolvedValue(category);
      jest.spyOn(mockRepository, 'save').mockResolvedValue(newCategory);

      const result = await categoriesService.update(category.id, updateCategory);

      expect(categoriesService.findOne).toHaveBeenCalledWith(category.id);
      expect(result).toEqual(newCategory);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(null);

      await expect(categoriesService.findOne(category.id)).rejects.toThrow(NotFoundException);
    });
  });
});
