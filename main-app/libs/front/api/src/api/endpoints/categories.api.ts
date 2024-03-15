import { CategoryDto } from '@eventpanel/shared/dto/categories/category.dto';
import { CreateCategoryDto } from '@eventpanel/shared/dto/categories/create-category.dto';

import BaseApi from '../base.api';
import { GetCategoriesListDTO } from '../dto';

class CategoriesApi {
  constructor(private baseApi: BaseApi) {}

  baseUrl = '/categories';

  getCategoriesList = async ({ workspaceId }: GetCategoriesListDTO) => {
    const url = `${this.baseUrl}/workspace/${workspaceId}`;
    const { data } = await this.baseApi.get<CategoryDto[]>(url);
    return data;
  };

  getCategoryById = async (categoryId: string) => {
    const url = `${this.baseUrl}/${categoryId}`;
    const { data } = await this.baseApi.get<CategoryDto>(url);
    return data;
  };

  createCategory = async (body: CreateCategoryDto) => {
    const { data } = await this.baseApi.post<CategoryDto, CreateCategoryDto>(this.baseUrl, body);
    return data;
  };
}

export default CategoriesApi;
