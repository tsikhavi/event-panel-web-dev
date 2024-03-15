import { CreatePropertyDto } from '@eventpanel/shared/dto/properties/create-property.dto';
import { PropertyDto } from '@eventpanel/shared/dto/properties/property.dto';

import BaseApi from '../base.api';
import { GetPropertiesListDTO } from '../dto';

class PropertiesApi {
  constructor(private baseApi: BaseApi) {}

  baseUrl = '/properties';

  getPropertiesList = async ({ workspaceId }: GetPropertiesListDTO) => {
    const url = `${this.baseUrl}/workspace/${workspaceId}`;
    const { data } = await this.baseApi.get<PropertyDto[]>(url);
    return data;
  };

  getPropertyById = async (propertyId: string) => {
    const url = `${this.baseUrl}/${propertyId}`;
    const { data } = await this.baseApi.get<PropertyDto>(url);
    return data;
  };

  createProperty = async (body: CreatePropertyDto) => {
    const { data } = await this.baseApi.post<PropertyDto, CreatePropertyDto>(this.baseUrl, body);
    return data;
  };
}

export default PropertiesApi;
