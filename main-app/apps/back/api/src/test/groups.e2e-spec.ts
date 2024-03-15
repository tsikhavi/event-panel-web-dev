import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../app.module';

import {
  getCreateGroupErrorCases,
  getCreateGroupProps,
  getCreateGroupResultCases,
  getGroupProps,
  getUpdateGroupErrorCases,
  getUpdateGroupResultCases,
} from './test-data/groups.test-data';
import { getFindByIdErrorCases } from './test-data/test-data';
import { useGetGroup, useGetListGroups, usePostGroup, usePutGroup } from './test-utils/groups.test-utils';
import { getUUID } from './test-utils/test-utils';
import { useGetAuthHeader } from './test-utils/users.test-utils';
import { usePostWorkspace } from './test-utils/workspaces.test-utils';

describe('GroupsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/groups (POST)', () => {
    it.each<(typeof getCreateGroupResultCases)[0]>(getCreateGroupResultCases)(
      'should return a new group when: $case',
      async ({ props, result }) => {
        const header = await useGetAuthHeader({ app });
        const [workspace] = await usePostWorkspace({ app, header });

        props.workspaceId = workspace.id;
        const [{ id, workspaceId, ...other }, status] = await usePostGroup({ app, header, props });

        expect(status).toBe(201);
        expect(id).toBeDefined();
        expect(workspaceId).toBeDefined();
        expect(other).toEqual(result);
      }
    );

    it.each<(typeof getCreateGroupErrorCases)[0]>(getCreateGroupErrorCases)(
      'should return an error when: $case',
      async ({ props, error }) => {
        const header = await useGetAuthHeader({ app });
        const [{ message }, status] = await usePostGroup({ app, header, props });

        expect(status).toBe(400);
        expect(message).toContain(error);
      }
    );

    it('should return an error when the auth header was not provided', async () => {
      const [{ message }, status] = await usePostGroup({ app });

      expect(status).toBe(401);
      expect(message).toEqual('Unauthorized');
    });
  });

  describe('/groups/workspace/:id (GET)', () => {
    it('should return an empty list', async () => {
      const header = await useGetAuthHeader({ app });
      const [{ id: workspaceId }] = await usePostWorkspace({ app, header });
      const [body, status] = await useGetListGroups({ app, header, workspaceId });

      expect(status).toBe(200);
      expect(body).toEqual([]);
    });

    it('should return a list of groups', async () => {
      const header = await useGetAuthHeader({ app });
      const [{ id: workspaceId }] = await usePostWorkspace({ app, header });

      const result = [
        (await usePostGroup({ app, header, props: getCreateGroupProps({ workspaceId, name: 'One Group' }) }))[0],
      ];

      const [body, status] = await useGetListGroups({ app, header, workspaceId });

      expect(status).toBe(200);
      expect(body).toEqual(result);
    });

    it('should return an error when the auth header was not provided', async () => {
      const [{ message }, status] = await useGetListGroups({ app, workspaceId: getUUID() });

      expect(status).toBe(401);
      expect(message).toEqual('Unauthorized');
    });
  });

  describe('/groups/:id (GET)', () => {
    it('should return a group', async () => {
      const header = await useGetAuthHeader({ app });
      const [workspace] = await usePostWorkspace({ app, header });

      const props = getCreateGroupProps({ workspaceId: workspace.id });
      const [{ id: groupId }] = await usePostGroup({ app, header, props });
      const [{ id, workspaceId, ...other }, status] = await useGetGroup({ app, header, groupId });

      expect(status).toBe(200);
      expect(id).toBeDefined();
      expect(workspaceId).toBeDefined();
      expect(other).toEqual(getGroupProps());
    });

    it.each<(typeof getFindByIdErrorCases)[0]>(getFindByIdErrorCases)(
      'should return an error when: $case',
      async ({ id, error, code }) => {
        const header = await useGetAuthHeader({ app });
        const [{ message }, status] = await useGetGroup({ app, header, groupId: id });

        expect(status).toBe(code);
        expect(message).toContain(error);
      }
    );

    it('should return an error when the auth header was not provided', async () => {
      const [{ message }, status] = await useGetGroup({ app, groupId: getUUID() });

      expect(status).toBe(401);
      expect(message).toEqual('Unauthorized');
    });
  });

  describe('/groups/:id (PUT)', () => {
    it.each<(typeof getUpdateGroupResultCases)[0]>(getUpdateGroupResultCases)(
      'should return an updated group when: $case',
      async ({ props, result }) => {
        const header = await useGetAuthHeader({ app });
        const [workspace] = await usePostWorkspace({ app, header });

        const createProps = getCreateGroupProps({ workspaceId: workspace.id });
        const [{ id: groupId }] = await usePostGroup({ app, header, props: createProps });
        const [{ id, workspaceId, ...other }, status] = await usePutGroup({ app, header, groupId, props });

        expect(status).toBe(200);
        expect(id).toBeDefined();
        expect(workspaceId).toBeDefined();
        expect(other).toEqual(result);
      }
    );

    it.each<(typeof getUpdateGroupErrorCases)[0]>(getUpdateGroupErrorCases)(
      'should return an error when: $case',
      async ({ props, error }) => {
        const header = await useGetAuthHeader({ app });
        const [{ id: groupId }] = await usePostGroup({ app, header });
        const [{ message }, status] = await usePutGroup({ app, header, props, groupId });

        expect(status).toBe(400);
        expect(message).toContain(error);
      }
    );

    it('should return an error when the auth header was not provided', async () => {
      const [{ message }, status] = await usePutGroup({ app, groupId: getUUID() });

      expect(status).toBe(401);
      expect(message).toEqual('Unauthorized');
    });
  });
});
