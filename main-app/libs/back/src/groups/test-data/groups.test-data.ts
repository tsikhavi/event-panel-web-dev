import { CreateGroupDto } from '@eventpanel/shared/dto/groups/create-group.dto';
import { UpdateGroupDto } from '@eventpanel/shared/dto/groups/update-group.dto';

import { workspace } from '../../__test-data__/workspaces.test-data';
import { Group } from '../entities/group.entity';

export const group: Group = {
  workspace,
  id: 'group-id-123',
  name: 'Group Name',
  description: 'Some Group Description',
};

export const groupsList: Group[] = [
  {
    workspace,
    id: 'group-id-123',
    name: 'Group Name',
    description: 'Some Group Description',
  },
  {
    workspace,
    id: 'group-id-456',
    name: 'Another Group',
    description: 'Another Group Description',
  },
];

export const createGroup: CreateGroupDto = {
  name: 'New Group',
  description: 'Description for new group',
  workspaceId: 'workspace-id-123',
};

export const updateGroup: UpdateGroupDto = {
  name: 'New Group',
  description: 'Description for new group',
};
