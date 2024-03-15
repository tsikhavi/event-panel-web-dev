import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../app.module';

import { getFindByIdErrorCases } from './test-data/test-data';
import {
  getCreateWorkspaceErrorCases,
  getCreateWorkspaceProps,
  getCreateWorkspaceResultCases,
  getWorkspaceProps,
} from './test-data/workspaces.test-data';
import { getUUID } from './test-utils/test-utils';
import { useGetAuthHeader } from './test-utils/users.test-utils';
import {
  useGetWorkspaceById,
  useGetWorkspacesList,
  usePostWorkspace,
  usePutWorkspace,
} from './test-utils/workspaces.test-utils';

describe('WorkspacesController (e2e)', () => {
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

  describe('/workspaces (POST)', () => {
    it.each<(typeof getCreateWorkspaceResultCases)[0]>(getCreateWorkspaceResultCases)(
      'should return a new workspace when: $case',
      async ({ props, result }) => {
        const header = await useGetAuthHeader({ app });
        const [{ id, ...other }, status] = await usePostWorkspace({ app, header, props });

        expect(status).toEqual(201);
        expect(id).toBeDefined();
        expect(other).toEqual(result);
      }
    );

    it.each<(typeof getCreateWorkspaceErrorCases)[0]>(getCreateWorkspaceErrorCases)(
      'should return an error when: $case',
      async ({ props, error }) => {
        const header = await useGetAuthHeader({ app });
        const [{ message }, status] = await usePostWorkspace({ app, header, props });

        expect(status).toEqual(400);
        expect(message).toContain(error);
      }
    );

    it('should return an unauthorized error when auth header not provided', async () => {
      const [{ message }, status] = await usePostWorkspace({ app });

      expect(status).toEqual(401);
      expect(message).toEqual('Unauthorized');
    });
  });

  describe('/workspaces (GET)', () => {
    it('should return an empty list', async () => {
      const header = await useGetAuthHeader({ app });
      const [body, status] = await useGetWorkspacesList({ app, header });

      expect(status).toBe(200);
      expect(body).toEqual([]);
    });

    it('should return a list of workspaces', async () => {
      const header = await useGetAuthHeader({ app });

      const result = [
        (await usePostWorkspace({ app, header, props: getCreateWorkspaceProps({ name: 'One Workspace' }) }))[0],
      ];

      const [body, status] = await useGetWorkspacesList({ app, header });

      expect(status).toBe(200);
      expect(body).toEqual(result);
    });

    it('should return an error when the auth header was not provided', async () => {
      const [{ message }, status] = await useGetWorkspacesList({ app });

      expect(status).toBe(401);
      expect(message).toEqual('Unauthorized');
    });
  });

  describe('/workspaces/:id (GET)', () => {
    it('should return a workspace by id', async () => {
      const header = await useGetAuthHeader({ app });
      const [{ id: workspaceId }] = await usePostWorkspace({ app, header });
      const [{ id, ...other }, status] = await useGetWorkspaceById({ app, header, workspaceId });

      expect(status).toEqual(200);
      expect(id).toEqual(workspaceId);
      expect(other).toEqual(getWorkspaceProps());
    });

    it.each<(typeof getFindByIdErrorCases)[0]>(getFindByIdErrorCases)(
      'should return error when: $case',
      async ({ id, error, code }) => {
        const header = await useGetAuthHeader({ app });
        const [{ message }, status] = await useGetWorkspaceById({ app, header, workspaceId: id });

        expect(status).toEqual(code);
        expect(message).toContain(error);
      }
    );

    it('should return an unauthorized error when auth header not provided', async () => {
      const [{ message }, status] = await useGetWorkspaceById({ app, workspaceId: getUUID() });

      expect(status).toEqual(401);
      expect(message).toEqual('Unauthorized');
    });
  });

  describe('/workspaces/:id (PUT)', () => {
    it.each<(typeof getCreateWorkspaceResultCases)[0]>(getCreateWorkspaceResultCases)(
      'should update a workspace when: $case',
      async ({ props, result }) => {
        const header = await useGetAuthHeader({ app });
        const [{ id: workspaceId }] = await usePostWorkspace({ app, header });
        const [{ id, ...other }, status] = await usePutWorkspace({ app, header, workspaceId, props });

        expect(status).toEqual(200);
        expect(id).toBeDefined();
        expect(other).toEqual(result);
      }
    );

    it.each<(typeof getCreateWorkspaceErrorCases)[0]>(getCreateWorkspaceErrorCases)(
      'should return an error when: $case',
      async ({ props, error }) => {
        const header = await useGetAuthHeader({ app });
        const [{ id: workspaceId }] = await usePostWorkspace({ app, header });
        const [{ message }, status] = await usePutWorkspace({ app, header, workspaceId, props });

        expect(status).toEqual(400);
        expect(message).toContain(error);
      }
    );

    it.each<(typeof getFindByIdErrorCases)[0]>(getFindByIdErrorCases)(
      'should return error when: $case',
      async ({ id, error, code }) => {
        const header = await useGetAuthHeader({ app });
        const [{ message }, status] = await usePutWorkspace({ app, header, workspaceId: id });

        expect(status).toEqual(code);
        expect(message).toContain(error);
      }
    );

    it('should return an unauthorized error when auth header not provided', async () => {
      const [{ message }, status] = await usePutWorkspace({ app, workspaceId: getUUID() });

      expect(status).toEqual(401);
      expect(message).toEqual('Unauthorized');
    });
  });
});
