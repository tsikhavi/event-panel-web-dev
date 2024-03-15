import { CategoryDto } from '@eventpanel/shared/dto/categories/category.dto';
import { CreateCategoryDto } from '@eventpanel/shared/dto/categories/create-category.dto';
import { UpdateCategoryDto } from '@eventpanel/shared/dto/categories/update-category.dto';

import { getCreateCategoryProps, getUpdateCategoryProps } from '../test-data/categories.test-data';

import { getServer } from './test-utils';
import { ErrorType, UseProps } from './types';

type UsePostProps = UseProps & {
  props?: CreateCategoryDto;
};

type UseGetListProps = UseProps & {
  workspaceId: string;
};

type UseGetProps = UseProps & {
  categoryId: string;
};

type UsePutProps = UseProps &
  UseGetProps & {
    props?: UpdateCategoryDto;
  };

type UseCategoryResultProps = [CategoryDto & ErrorType, number];
type UseListCategoriesResultProps = [CategoryDto[] & ErrorType, number];

export const usePostCategory = async ({
  app,
  header = ['header', ''],
  props = getCreateCategoryProps(),
}: UsePostProps): Promise<UseCategoryResultProps> => {
  const { body, status } = await getServer(app)
    .post('/categories')
    .set(...header)
    .send(props);

  return [body as UseCategoryResultProps[0], status];
};

export const useGetListCategories = async ({
  app,
  workspaceId,
  header = ['header', ''],
}: UseGetListProps): Promise<UseListCategoriesResultProps> => {
  const { body, status } = await getServer(app)
    .get(`/categories/workspace/${workspaceId}`)
    .set(...header);

  return [body as UseListCategoriesResultProps[0], status];
};

export const useGetCategory = async ({
  app,
  categoryId,
  header = ['header', ''],
}: UseGetProps): Promise<UseCategoryResultProps> => {
  const { body, status } = await getServer(app)
    .get(`/categories/${categoryId}`)
    .set(...header);

  return [body as UseCategoryResultProps[0], status];
};

export const usePutCategory = async ({
  app,
  categoryId,
  header = ['header', ''],
  props = getUpdateCategoryProps(),
}: UsePutProps): Promise<UseCategoryResultProps> => {
  const { body, status } = await getServer(app)
    .put(`/categories/${categoryId}`)
    .set(...header)
    .send(props);

  return [body as UseCategoryResultProps[0], status];
};
