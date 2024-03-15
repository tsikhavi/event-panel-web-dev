import { CategoryDto } from '@eventpanel/shared/dto/categories/category.dto';
import { CreateCategoryDto } from '@eventpanel/shared/dto/categories/create-category.dto';
import { UpdateCategoryDto } from '@eventpanel/shared/dto/categories/update-category.dto';

import { getLorem, getUUID } from '../test-utils/test-utils';

export const getCreateCategoryProps = (props: Partial<CreateCategoryDto> = {}): CreateCategoryDto => ({
  name: 'Jedi Category',
  description: 'May the Force be with You',
  workspaceId: getUUID(),
  ...props,
});

export const getUpdateCategoryProps = (props: Partial<UpdateCategoryDto> = {}): UpdateCategoryDto => ({
  name: 'Jedi Category',
  description: 'May the Force be with You',
  ...props,
});

export const getCategoryProps = (
  props: Partial<Omit<CategoryDto, 'id'>> = {}
): Omit<CategoryDto, 'id' | 'workspaceId'> => ({
  name: 'Jedi Category',
  description: 'May the Force be with You',
  ...props,
});

export const getCreateCategoryResultCases: {
  case: string;
  props: CreateCategoryDto;
  result: Omit<CategoryDto, 'id' | 'workspaceId'>;
}[] = [
  {
    case: 'default body',
    props: getCreateCategoryProps(),
    result: getCategoryProps(),
  },
  {
    case: 'name string has spaces around it',
    props: getCreateCategoryProps({ name: '    Obi-Wan Kenobi    ' }),
    result: getCategoryProps({ name: 'Obi-Wan Kenobi' }),
  },
  {
    case: 'description is empty string',
    props: getCreateCategoryProps({ description: '' }),
    result: getCategoryProps({ description: '' }),
  },
  {
    case: 'description string has spaces around it',
    props: getCreateCategoryProps({ description: '    May not spaces be with You    ' }),
    result: getCategoryProps({ description: 'May not spaces be with You' }),
  },
];

export const getUpdateCategoryResultCases: {
  case: string;
  props: UpdateCategoryDto;
  result: Omit<CategoryDto, 'id' | 'workspaceId'>;
}[] = [
  {
    case: 'default body',
    props: getUpdateCategoryProps(),
    result: getCategoryProps(),
  },
  {
    case: 'name string has spaces around it',
    props: getUpdateCategoryProps({ name: '    Obi-Wan Kenobi    ' }),
    result: getCategoryProps({ name: 'Obi-Wan Kenobi' }),
  },
  {
    case: 'description is empty string',
    props: getUpdateCategoryProps({ description: '' }),
    result: getCategoryProps({ description: '' }),
  },
  {
    case: 'description string has spaces around it',
    props: getUpdateCategoryProps({ description: '    May not spaces be with You    ' }),
    result: getCategoryProps({ description: 'May not spaces be with You' }),
  },
];

export const getCreateCategoryErrorCases: { case: string; props: CreateCategoryDto; error: string }[] = [
  {
    case: 'name is null',
    props: getCreateCategoryProps({ name: null }),
    error: 'name must be a string',
  },
  {
    case: 'name is empty string',
    props: getCreateCategoryProps({ name: '' }),
    error: 'name must be longer than or equal to 3 characters',
  },
  {
    case: 'name is too long',
    props: getCreateCategoryProps({ name: 'Very long name of Category, to check validation and get error' }),
    error: 'name must be shorter than or equal to 48 characters',
  },
  {
    case: 'description is too long',
    props: getCreateCategoryProps({ description: getLorem(5) }),
    error: 'description must be shorter than or equal to 1000 characters',
  },
  {
    case: 'workspaceId is null',
    props: getCreateCategoryProps({ workspaceId: null }),
    error: 'workspaceId must be a UUID',
  },
  {
    case: 'workspaceId is 123',
    props: getCreateCategoryProps({ workspaceId: '123' }),
    error: 'workspaceId must be a UUID',
  },
  {
    case: 'workspaceId not of UUID format',
    props: getCreateCategoryProps({ workspaceId: 'not-uuid' }),
    error: 'workspaceId must be a UUID',
  },
  {
    case: 'workspaceId is random UUID',
    props: getCreateCategoryProps({ workspaceId: getUUID() }),
    error: 'workspace not found',
  },
];

export const getUpdateCategoryErrorCases: { case: string; props: UpdateCategoryDto; error: string }[] = [
  {
    case: 'name is null',
    props: getUpdateCategoryProps({ name: null }),
    error: 'name must be a string',
  },
  {
    case: 'name is empty string',
    props: getUpdateCategoryProps({ name: '' }),
    error: 'name must be longer than or equal to 3 characters',
  },
  {
    case: 'name is too long',
    props: getUpdateCategoryProps({ name: 'Very long name of Category, to check validation and get error' }),
    error: 'name must be shorter than or equal to 48 characters',
  },
  {
    case: 'description is too long',
    props: getUpdateCategoryProps({ description: getLorem(5) }),
    error: 'description must be shorter than or equal to 1000 characters',
  },
];
