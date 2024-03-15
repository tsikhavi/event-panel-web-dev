import { CreateWorkspaceDto } from '@eventpanel/shared/dto/workspaces/create-workspace.dto';
import { WorkspaceDto } from '@eventpanel/shared/dto/workspaces/workspace.dto';

import BaseApi from '../base.api';

class WorkspacesApi {
  private url = '/workspaces';

  constructor(private baseApi: BaseApi) {}

  createWorkspace = async (body: CreateWorkspaceDto) => {
    const { data } = await this.baseApi.post<WorkspaceDto, CreateWorkspaceDto>(this.url, body);
    return data;
  };

  getWorkspacesList = async () => {
    const { data } = await this.baseApi.get<WorkspaceDto[]>(this.url);
    return data;
  };
}

export default WorkspacesApi;
