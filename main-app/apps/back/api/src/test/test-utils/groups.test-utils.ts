import { CreateGroupDto } from '@eventpanel/shared/dto/groups/create-group.dto';
import { GroupDto } from '@eventpanel/shared/dto/groups/group.dto';
import { UpdateGroupDto } from '@eventpanel/shared/dto/groups/update-group.dto';

import { getCreateGroupProps, getUpdateGroupProps } from '../test-data/groups.test-data';

import { getServer } from './test-utils';
import { ErrorType, UseProps } from './types';

type UsePostProps = UseProps & {
  props?: CreateGroupDto;
};

type UseGetListProps = UseProps & {
  workspaceId: string;
};

type UseGetProps = UseProps & {
  groupId: string;
};

type UsePutProps = UseProps &
  UseGetProps & {
    props?: UpdateGroupDto;
  };

type UseGroupResultProps = [GroupDto & ErrorType, number];

type UseListGroupsResultProps = [GroupDto[] & ErrorType, number];

export const usePostGroup = async ({
  app,
  header = ['header', ''],
  props = getCreateGroupProps(),
}: UsePostProps): Promise<UseGroupResultProps> => {
  const { body, status } = await getServer(app)
    .post('/groups')
    .set(...header)
    .send(props);

  return [body as UseGroupResultProps[0], status];
};

export const useGetListGroups = async ({
  app,
  workspaceId,
  header = ['header', ''],
}: UseGetListProps): Promise<UseListGroupsResultProps> => {
  const { body, status } = await getServer(app)
    .get(`/groups/workspace/${workspaceId}`)
    .set(...header);

  return [body as UseListGroupsResultProps[0], status];
};

export const useGetGroup = async ({
  app,
  groupId,
  header = ['header', ''],
}: UseGetProps): Promise<UseGroupResultProps> => {
  const { body, status } = await getServer(app)
    .get(`/groups/${groupId}`)
    .set(...header);

  return [body as UseGroupResultProps[0], status];
};

export const usePutGroup = async ({
  app,
  groupId,
  header = ['header', ''],
  props = getUpdateGroupProps(),
}: UsePutProps): Promise<UseGroupResultProps> => {
  const { body, status } = await getServer(app)
    .put(`/groups/${groupId}`)
    .set(...header)
    .send(props);

  return [body as UseGroupResultProps[0], status];
};
