import { CreateWorkspaceDto } from '@eventpanel/shared/dto/workspaces/create-workspace.dto';
import { WorkspaceDto } from '@eventpanel/shared/dto/workspaces/workspace.dto';

const name = 'Test Workspace';

export const getCreateWorkspaceProps = (props: Partial<CreateWorkspaceDto> = {}): CreateWorkspaceDto => ({
  name,
  ...props,
});

export const getWorkspaceProps = (props: Partial<Omit<WorkspaceDto, 'id'>> = {}): Omit<WorkspaceDto, 'id'> => ({
  name,
  maxNumberOfMembers: 5,
  expiredDate: null,
  ...props,
});

export const getCreateWorkspaceResultCases: {
  case: string;
  props: CreateWorkspaceDto;
  result: Omit<WorkspaceDto, 'id'>;
}[] = [
  {
    case: 'regular name',
    props: getCreateWorkspaceProps({ name: 'Regular Name' }),
    result: getWorkspaceProps({ name: 'Regular Name' }),
  },
  {
    case: 'name surrounded by spaces',
    props: getCreateWorkspaceProps({ name: '   Regular Name   ' }),
    result: getWorkspaceProps({ name: 'Regular Name' }),
  },
];

export const getCreateWorkspaceErrorCases: { case: string; props: CreateWorkspaceDto; error: string }[] = [
  {
    case: 'name is null',
    props: getCreateWorkspaceProps({ name: null }),
    error: 'name must be a string',
  },
  {
    case: 'name is undefined',
    props: getCreateWorkspaceProps({ name: undefined }),
    error: 'name must be a string',
  },
  {
    case: 'name is empty',
    props: getCreateWorkspaceProps({ name: '' }),
    error: 'name must be longer than or equal to 3 characters',
  },
  {
    case: 'name is too long',
    props: getCreateWorkspaceProps({ name: 'very long name of workspace to check validation rules' }),
    error: 'name must be shorter than or equal to 48 characters',
  },
];
