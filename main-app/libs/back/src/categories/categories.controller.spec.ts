import { Test, TestingModule } from '@nestjs/testing';

import { categoriesList, category, createCategory } from '../__test-data__/categories.test-data';
import { workspace } from '../__test-data__/workspaces.test-data';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;
  let categoriesService: CategoriesService;

  const mockCategoriesService: Partial<CategoriesService> = {
    create: jest.fn().mockResolvedValue(category),
    update: jest.fn().mockResolvedValue(category),
    findOne: jest.fn().mockResolvedValue(category),
    findAllByWorkspaceId: jest.fn().mockResolvedValue(categoriesList),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService, { provide: CategoriesService, useValue: mockCategoriesService }],
    }).compile();

    categoriesController = module.get<CategoriesController>(CategoriesController);
    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  describe('create', () => {
    it('should call categoriesService.create and return the result', async () => {
      const result = await categoriesController.create(createCategory);

      expect(categoriesService.create).toHaveBeenCalledWith(createCategory);
      expect(result).toEqual(category);
    });
  });

  describe('findAllByWorkspaceId', () => {
    it('should call categoriesService.findAllByWorkspaceId and return the result', async () => {
      const result = await categoriesController.findAllByWorkspaceId(workspace.id);

      expect(categoriesService.findAllByWorkspaceId).toHaveBeenCalledWith(workspace.id);
      expect(result).toEqual(categoriesList);
    });
  });

  describe('findOne', () => {
    it('should call categoriesService.findOne and return the result', async () => {
      const result = await categoriesController.findOne(category.id);

      expect(categoriesService.findOne).toHaveBeenCalledWith(category.id);
      expect(result).toEqual(category);
    });
  });

  describe('update', () => {
    it('should call categoriesService.update and return the result', async () => {
      const categoryId = 'category-id-123';
      const result = await categoriesController.update(categoryId, createCategory);

      expect(categoriesService.update).toHaveBeenCalledWith(categoryId, createCategory);
      expect(result).toEqual(category);
    });
  });
});
