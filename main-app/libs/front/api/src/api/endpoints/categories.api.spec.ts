import { CreateCategoryDto } from '@eventpanel/shared/dto/categories/create-category.dto';
import axios from 'axios';

import { baseURL } from '../../../jest.setup';
import BaseApi from '../base.api';

import CategoriesApi from './categories.api';

describe('CategoriesApi', () => {
  let Api: CategoriesApi;

  const root = '/categories';
  const body: CreateCategoryDto = {
    workspaceId: 'workspaceId',
    name: 'Category Name',
    description: 'Category Description',
  };
  const config = undefined;

  beforeEach(() => {
    Api = new CategoriesApi(new BaseApi(baseURL));
  });

  it('should make getCategoriesList request', async () => {
    const workspaceId = 'workspaceId';
    await Api.getCategoriesList({ workspaceId });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${root}/workspace/${workspaceId}`, config);
  });

  it('should make getCategoryById request', async () => {
    const categoryId = 'categoryId';
    await Api.getCategoryById(categoryId);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${root}/${categoryId}`, config);
  });

  it('should make createCategory request', async () => {
    await Api.createCategory(body);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(root, body, config);
  });
});
