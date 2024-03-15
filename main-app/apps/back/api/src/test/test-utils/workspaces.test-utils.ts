import { CreateWorkspaceDto } from '@eventpanel/shared/dto/workspaces/create-workspace.dto';
import { WorkspaceDto } from '@eventpanel/shared/dto/workspaces/workspace.dto';

import { getCreateWorkspaceProps } from '../test-data/workspaces.test-data';

import { getServer } from './test-utils';
import { ErrorType, UseProps } from './types';

type UsePostWorkspaceProps = UseProps & {
  props?: CreateWorkspaceDto;
};

type UseGetWorkspaceByIdProps = UseProps & {
  workspaceId: string;
};

type UsePutWorkspaceProps = UseProps & {
  workspaceId: string;
  props?: CreateWorkspaceDto;
};

type UseWorkspaceResultProps = [WorkspaceDto & ErrorType, number];

export const usePostWorkspace = async ({
  app,
  header = ['header', ''],
  props = getCreateWorkspaceProps(),
}: UsePostWorkspaceProps): Promise<UseWorkspaceResultProps> => {
  const { status, body } = await getServer(app)
    .post('/workspaces')
    .set(...header)
    .send(props);

  return [body as UseWorkspaceResultProps[0], status];
};

export const useGetWorkspacesList = async ({
  app,
  header = ['header', ''],
}: UseProps): Promise<UseWorkspaceResultProps> => {
  const { status, body } = await getServer(app)
    .get(`/workspaces`)
    .set(...header);

  return [body as UseWorkspaceResultProps[0], status];
};

export const useGetWorkspaceById = async ({
  app,
  workspaceId,
  header = ['header', ''],
}: UseGetWorkspaceByIdProps): Promise<UseWorkspaceResultProps> => {
  const { status, body } = await getServer(app)
    .get(`/workspaces/${workspaceId}`)
    .set(...header);

  return [body as UseWorkspaceResultProps[0], status];
};

export const usePutWorkspace = async ({
  app,
  workspaceId,
  header = ['header', ''],
  props = getCreateWorkspaceProps(),
}: UsePutWorkspaceProps): Promise<UseWorkspaceResultProps> => {
  const { status, body } = await getServer(app)
    .put(`/workspaces/${workspaceId}`)
    .set(...header)
    .send(props);

  return [body as UseWorkspaceResultProps[0], status];
};
