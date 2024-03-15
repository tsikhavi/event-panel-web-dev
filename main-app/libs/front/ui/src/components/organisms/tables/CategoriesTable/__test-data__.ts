import { CategoryDto } from '@eventpanel/shared/dto/categories/category.dto';

export const category: Omit<CategoryDto, 'id'> = {
  name: 'Category Name',
  description: 'Category Description',
  workspaceId: 'workspaceId',
};

export const getCategories = (amount: number): CategoryDto[] =>
  new Array(amount).fill(category).map((category, id) => ({ ...category, id }));
