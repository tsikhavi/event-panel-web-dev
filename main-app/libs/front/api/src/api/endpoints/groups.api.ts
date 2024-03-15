import { CreateGroupDto } from '@eventpanel/shared/dto/groups/create-group.dto';
import { GroupDto } from '@eventpanel/shared/dto/groups/group.dto';

import BaseApi from '../base.api';
import { GetGroupsListDTO } from '../dto';

class GroupsApi {
  constructor(private baseApi: BaseApi) {}

  baseUrl = '/groups';

  getGroupsList = async ({ workspaceId }: GetGroupsListDTO) => {
    const url = `${this.baseUrl}/workspace/${workspaceId}`;
    const { data } = await this.baseApi.get<GroupDto[]>(url);
    return data;
  };

  getGroupById = async (groupId: string) => {
    const url = `${this.baseUrl}/${groupId}`;
    const { data } = await this.baseApi.get<GroupDto>(url);
    return data;
  };

  createGroup = async (body: CreateGroupDto) => {
    const { data } = await this.baseApi.post<GroupDto, CreateGroupDto>(this.baseUrl, body);
    return data;
  };
}

export default GroupsApi;
