import { CreateWorkspaceDto } from '@eventpanel/shared/dto/workspaces/create-workspace.dto';
import { UpdateWorkspaceDto } from '@eventpanel/shared/dto/workspaces/update-workspace.dto';

import { Source } from '../sources/entities/source.entity';
import { Workspace } from '../workspaces/entities/workspace.entity';

import { user } from './users.test-data';

export const workspace: Workspace = {
  id: 'workspaceId',
  name: 'New Workspace',
  maxNumberOfMembers: 1,
  expiredDate: null,
  transactions: [],
  properties: [],
  categories: [],
  events: [],
  groups: [],
  sources: [],
  author: user,
};

export const workspacesList: Workspace[] = [
  {
    id: 'workspaceId-1',
    name: 'New Workspace',
    maxNumberOfMembers: 1,
    expiredDate: null,
    transactions: [],
    properties: [],
    categories: [],
    events: [],
    groups: [],
    sources: [],
    author: user,
  },
  {
    id: 'workspaceId-2',
    name: 'Another Workspace',
    maxNumberOfMembers: 1,
    expiredDate: null,
    transactions: [],
    properties: [],
    categories: [],
    events: [],
    groups: [],
    sources: [],
    author: user,
  },
];

export const source: Source = {
  id: 'workspaceId',
  name: 'New Workspace',
  workspace: new Workspace(),
};

export const sourcesList: Source[] = [
  {
    id: 'workspaceId',
    name: 'New Workspace',
    workspace: new Workspace(),
  },
  {
    id: 'workspaceId',
    name: 'New Workspace',
    workspace: new Workspace(),
  },
];

export const workspaceCreate: CreateWorkspaceDto = { name: 'New Workspace' };

export const workspaceUpdate: UpdateWorkspaceDto = { name: 'Wubba Lubba Dub Dub' };
