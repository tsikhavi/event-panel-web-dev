import { CreateCategoryDto } from '@eventpanel/shared/dto/categories/create-category.dto';
import { UpdateCategoryDto } from '@eventpanel/shared/dto/categories/update-category.dto';

import { Category } from '../categories/entities/category.entity';

import { workspace } from './workspaces.test-data';

export const category: Category = {
  workspace,
  id: 'category-id-123',
  name: 'Category Name',
  description: 'Some Category Description',
};

export const categoriesList: Category[] = [
  {
    workspace,
    id: 'category-id-123',
    name: 'Category Name',
    description: 'Some Category Description',
  },
  {
    workspace,
    id: 'category-id-456',
    name: 'Category Name',
    description: 'Another Category Description',
  },
];

export const createCategory: CreateCategoryDto = {
  name: 'New Category',
  description: 'Description for new category',
  workspaceId: 'workspace-id-123',
};

export const updateCategory: UpdateCategoryDto = {
  name: 'Update Category',
  description: 'Description for new category',
};
