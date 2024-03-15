import { CreateGroupDto } from '@eventpanel/shared/dto/groups/create-group.dto';
import { GroupDto } from '@eventpanel/shared/dto/groups/group.dto';
import { UpdateGroupDto } from '@eventpanel/shared/dto/groups/update-group.dto';

import { getLorem, getUUID } from '../test-utils/test-utils';

export const getCreateGroupProps = (props: Partial<CreateGroupDto> = {}): CreateGroupDto => ({
  name: 'Jedi Group',
  description: 'May the Force be with You',
  workspaceId: getUUID(),
  ...props,
});

export const getUpdateGroupProps = (props: Partial<UpdateGroupDto> = {}): UpdateGroupDto => ({
  name: 'Jedi Group',
  description: 'May the Force be with You',
  ...props,
});

export const getGroupProps = (props: Partial<Omit<GroupDto, 'id'>> = {}): Omit<GroupDto, 'id' | 'workspaceId'> => ({
  name: 'Jedi Group',
  description: 'May the Force be with You',
  ...props,
});

export const getCreateGroupResultCases: {
  case: string;
  props: CreateGroupDto;
  result: Omit<GroupDto, 'id' | 'workspaceId'>;
}[] = [
  {
    case: 'default body',
    props: getCreateGroupProps(),
    result: getGroupProps(),
  },
  {
    case: 'name string has spaces around it',
    props: getCreateGroupProps({ name: '    Obi-Wan Kenobi    ' }),
    result: getGroupProps({ name: 'Obi-Wan Kenobi' }),
  },
  {
    case: 'description is empty string',
    props: getCreateGroupProps({ description: '' }),
    result: getGroupProps({ description: '' }),
  },
  {
    case: 'description string has spaces around it',
    props: getCreateGroupProps({ description: '    May not spaces be with You    ' }),
    result: getGroupProps({ description: 'May not spaces be with You' }),
  },
];

export const getUpdateGroupResultCases: {
  case: string;
  props: UpdateGroupDto;
  result: Omit<GroupDto, 'id' | 'workspaceId'>;
}[] = [
  {
    case: 'default body',
    props: getUpdateGroupProps(),
    result: getGroupProps(),
  },
  {
    case: 'name string has spaces around it',
    props: getUpdateGroupProps({ name: '    Obi-Wan Kenobi    ' }),
    result: getGroupProps({ name: 'Obi-Wan Kenobi' }),
  },
  {
    case: 'description is empty string',
    props: getUpdateGroupProps({ description: '' }),
    result: getGroupProps({ description: '' }),
  },
  {
    case: 'description string has spaces around it',
    props: getUpdateGroupProps({ description: '    May not spaces be with You    ' }),
    result: getGroupProps({ description: 'May not spaces be with You' }),
  },
];

export const getCreateGroupErrorCases: { case: string; props: CreateGroupDto; error: string }[] = [
  {
    case: 'name is null',
    props: getCreateGroupProps({ name: null }),
    error: 'name must be a string',
  },
  {
    case: 'name is empty string',
    props: getCreateGroupProps({ name: '' }),
    error: 'name must be longer than or equal to 3 characters',
  },
  {
    case: 'name is too long',
    props: getCreateGroupProps({ name: 'Very long name of group, to check validation and get error' }),
    error: 'name must be shorter than or equal to 48 characters',
  },
  {
    case: 'description is too long',
    props: getCreateGroupProps({ description: getLorem(5) }),
    error: 'description must be shorter than or equal to 1000 characters',
  },
  {
    case: 'workspaceId is null',
    props: getCreateGroupProps({ workspaceId: null }),
    error: 'workspaceId must be a UUID',
  },
  {
    case: 'workspaceId is 123',
    props: getCreateGroupProps({ workspaceId: '123' }),
    error: 'workspaceId must be a UUID',
  },
  {
    case: 'workspaceId not of UUID format',
    props: getCreateGroupProps({ workspaceId: 'not-uuid' }),
    error: 'workspaceId must be a UUID',
  },
  {
    case: 'workspaceId is random UUID',
    props: getCreateGroupProps({ workspaceId: getUUID() }),
    error: 'workspace not found',
  },
];

export const getUpdateGroupErrorCases: { case: string; props: UpdateGroupDto; error: string }[] = [
  {
    case: 'name is null',
    props: getUpdateGroupProps({ name: null }),
    error: 'name must be a string',
  },
  {
    case: 'name is empty string',
    props: getUpdateGroupProps({ name: '' }),
    error: 'name must be longer than or equal to 3 characters',
  },
  {
    case: 'name is too long',
    props: getUpdateGroupProps({ name: 'Very long name of group, to check validation and get error' }),
    error: 'name must be shorter than or equal to 48 characters',
  },
  {
    case: 'description is too long',
    props: getUpdateGroupProps({ description: getLorem(5) }),
    error: 'description must be shorter than or equal to 1000 characters',
  },
];
