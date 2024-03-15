import { CreateGroupDto } from '@eventpanel/shared/dto/groups/create-group.dto';
import axios from 'axios';

import { baseURL } from '../../../jest.setup';
import BaseApi from '../base.api';

import GroupsApi from './groups.api';

describe('GroupsApi', () => {
  let Api: GroupsApi;

  const root = '/groups';
  const body: CreateGroupDto = {
    workspaceId: 'workspaceId',
    name: 'Group Name',
    description: 'Group Description',
  };
  const config = undefined;

  beforeEach(() => {
    Api = new GroupsApi(new BaseApi(baseURL));
  });

  it('should make getGroupsList request', async () => {
    const workspaceId = 'workspaceId';
    await Api.getGroupsList({ workspaceId });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${root}/workspace/${workspaceId}`, config);
  });

  it('should make getGroupById request', async () => {
    const groupId = 'groupId';
    await Api.getGroupById(groupId);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${root}/${groupId}`, config);
  });

  it('should make createGroup request', async () => {
    await Api.createGroup(body);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(root, body, config);
  });
});
