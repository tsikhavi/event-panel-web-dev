import { CreateSourceDto } from '@eventpanel/shared/dto/sources/create-source.dto';
import { SourceDto } from '@eventpanel/shared/dto/sources/source.dto';

import BaseApi from '../base.api';
import { GetSourcesListDTO } from '../dto';

class SourcesApi {
  constructor(private baseApi: BaseApi) {}

  baseUrl = '/sources';

  getSourcesList = async ({ workspaceId }: GetSourcesListDTO) => {
    const url = `${this.baseUrl}/workspace/${workspaceId}`;
    const { data } = await this.baseApi.get<SourceDto[]>(url);
    console.debug(url);
    return data;
  };

  getSourceById = async (sourceId: string) => {
    const url = `${this.baseUrl}/${sourceId}`;
    const { data } = await this.baseApi.get<SourceDto>(url);
    return data;
  };

  createSource = async (body: CreateSourceDto) => {
    const { data } = await this.baseApi.post<SourceDto, CreateSourceDto>(this.baseUrl, body);
    return data;
  };
}

export default SourcesApi;
