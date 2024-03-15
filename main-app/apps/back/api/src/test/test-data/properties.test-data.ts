import { CreatePropertyDto } from '@eventpanel/shared/dto/properties/create-property.dto';
import { PropertyDto } from '@eventpanel/shared/dto/properties/property.dto';
import { UpdatePropertyDto } from '@eventpanel/shared/dto/properties/update-property.dto';

import { getLorem, getUUID } from '../test-utils/test-utils';

export const getCreatePropertyProps = (props: Partial<CreatePropertyDto> = {}): CreatePropertyDto => ({
  name: 'Jedi Property',
  description: 'May the Force be with You',
  workspaceId: getUUID(),
  ...props,
});

export const getUpdatePropertyProps = (props: Partial<UpdatePropertyDto> = {}): UpdatePropertyDto => ({
  name: 'Jedi Property',
  description: 'May the Force be with You',
  ...props,
});

export const getPropertyProps = (
  props: Partial<Omit<PropertyDto, 'id'>> = {}
): Omit<PropertyDto, 'id' | 'workspaceId'> => ({
  name: 'Jedi Property',
  description: 'May the Force be with You',
  ...props,
});

export const getCreatePropertyResultCases: {
  case: string;
  props: CreatePropertyDto;
  result: Omit<PropertyDto, 'id' | 'workspaceId'>;
}[] = [
  {
    case: 'default body',
    props: getCreatePropertyProps(),
    result: getPropertyProps(),
  },
  {
    case: 'name string has spaces around it',
    props: getCreatePropertyProps({ name: '    Obi-Wan Kenobi    ' }),
    result: getPropertyProps({ name: 'Obi-Wan Kenobi' }),
  },
  {
    case: 'description is empty string',
    props: getCreatePropertyProps({ description: '' }),
    result: getPropertyProps({ description: '' }),
  },
  {
    case: 'description string has spaces around it',
    props: getCreatePropertyProps({ description: '    May not spaces be with You    ' }),
    result: getPropertyProps({ description: 'May not spaces be with You' }),
  },
];

export const getUpdatePropertyResultCases: {
  case: string;
  props: UpdatePropertyDto;
  result: Omit<PropertyDto, 'id' | 'workspaceId'>;
}[] = [
  {
    case: 'default body',
    props: getUpdatePropertyProps(),
    result: getPropertyProps(),
  },
  {
    case: 'name string has spaces around it',
    props: getUpdatePropertyProps({ name: '    Obi-Wan Kenobi    ' }),
    result: getPropertyProps({ name: 'Obi-Wan Kenobi' }),
  },
  {
    case: 'description is empty string',
    props: getUpdatePropertyProps({ description: '' }),
    result: getPropertyProps({ description: '' }),
  },
  {
    case: 'description string has spaces around it',
    props: getUpdatePropertyProps({ description: '    May not spaces be with You    ' }),
    result: getPropertyProps({ description: 'May not spaces be with You' }),
  },
];

export const getCreatePropertyErrorCases: { case: string; props: CreatePropertyDto; error: string }[] = [
  {
    case: 'name is null',
    props: getCreatePropertyProps({ name: null }),
    error: 'name must be a string',
  },
  {
    case: 'name is empty string',
    props: getCreatePropertyProps({ name: '' }),
    error: 'name must be longer than or equal to 3 characters',
  },
  {
    case: 'name is too long',
    props: getCreatePropertyProps({ name: 'Very long name of Property, to check validation and get error' }),
    error: 'name must be shorter than or equal to 48 characters',
  },
  {
    case: 'description is too long',
    props: getCreatePropertyProps({ description: getLorem(5) }),
    error: 'description must be shorter than or equal to 1000 characters',
  },
  {
    case: 'workspaceId is null',
    props: getCreatePropertyProps({ workspaceId: null }),
    error: 'workspaceId must be a UUID',
  },
  {
    case: 'workspaceId is 123',
    props: getCreatePropertyProps({ workspaceId: '123' }),
    error: 'workspaceId must be a UUID',
  },
  {
    case: 'workspaceId not of UUID format',
    props: getCreatePropertyProps({ workspaceId: 'not-uuid' }),
    error: 'workspaceId must be a UUID',
  },
  {
    case: 'workspaceId is random UUID',
    props: getCreatePropertyProps({ workspaceId: getUUID() }),
    error: 'workspace not found',
  },
];

export const getUpdatePropertyErrorCases: { case: string; props: UpdatePropertyDto; error: string }[] = [
  {
    case: 'name is null',
    props: getUpdatePropertyProps({ name: null }),
    error: 'name must be a string',
  },
  {
    case: 'name is empty string',
    props: getUpdatePropertyProps({ name: '' }),
    error: 'name must be longer than or equal to 3 characters',
  },
  {
    case: 'name is too long',
    props: getUpdatePropertyProps({ name: 'Very long name of Property, to check validation and get error' }),
    error: 'name must be shorter than or equal to 48 characters',
  },
  {
    case: 'description is too long',
    props: getUpdatePropertyProps({ description: getLorem(5) }),
    error: 'description must be shorter than or equal to 1000 characters',
  },
];
