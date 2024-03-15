import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../app.module';

import {
  getCreatePropertyErrorCases,
  getCreatePropertyProps,
  getCreatePropertyResultCases,
  getPropertyProps,
  getUpdatePropertyErrorCases,
  getUpdatePropertyResultCases,
} from './test-data/properties.test-data';
import { getFindByIdErrorCases } from './test-data/test-data';
import {
  useGetListProperties,
  useGetProperty,
  usePostProperty,
  usePutProperty,
} from './test-utils/properties.test-utils';
import { getUUID } from './test-utils/test-utils';
import { useGetAuthHeader } from './test-utils/users.test-utils';
import { usePostWorkspace } from './test-utils/workspaces.test-utils';

describe('PropertiesController (e2e)', () => {
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

  describe('/properties (POST)', () => {
    it.each<(typeof getCreatePropertyResultCases)[0]>(getCreatePropertyResultCases)(
      'should return a new property when: $case',
      async ({ props, result }) => {
        const header = await useGetAuthHeader({ app });
        const [workspace] = await usePostWorkspace({ app, header });

        props.workspaceId = workspace.id;
        const [{ id, workspaceId, ...other }, status] = await usePostProperty({ app, header, props });

        expect(status).toBe(201);
        expect(id).toBeDefined();
        expect(workspaceId).toBeDefined();
        expect(other).toEqual(result);
      }
    );

    it.each<(typeof getCreatePropertyErrorCases)[0]>(getCreatePropertyErrorCases)(
      'should return an error when: $case',
      async ({ props, error }) => {
        const header = await useGetAuthHeader({ app });
        const [{ message }, status] = await usePostProperty({ app, header, props });

        expect(status).toBe(400);
        expect(message).toContain(error);
      }
    );

    it('should return an error when the auth header was not provided', async () => {
      const [{ message }, status] = await usePostProperty({ app });

      expect(status).toBe(401);
      expect(message).toEqual('Unauthorized');
    });
  });

  describe('/properties/workspace/:id (GET)', () => {
    it('should return an empty list', async () => {
      const header = await useGetAuthHeader({ app });
      const [{ id: workspaceId }] = await usePostWorkspace({ app, header });
      const [body, status] = await useGetListProperties({ app, header, workspaceId });

      expect(status).toBe(200);
      expect(body).toEqual([]);
    });

    it('should return a list of properties', async () => {
      const header = await useGetAuthHeader({ app });
      const [{ id: workspaceId }] = await usePostWorkspace({ app, header });

      const result = [
        (
          await usePostProperty({ app, header, props: getCreatePropertyProps({ workspaceId, name: 'One Property' }) })
        )[0],
      ];

      const [body, status] = await useGetListProperties({ app, header, workspaceId });

      expect(status).toBe(200);
      expect(body).toEqual(result);
    });

    it('should return an error when the auth header was not provided', async () => {
      const [{ message }, status] = await useGetListProperties({ app, workspaceId: getUUID() });

      expect(status).toBe(401);
      expect(message).toEqual('Unauthorized');
    });
  });

  describe('/properties/:id (GET)', () => {
    it('should return a property', async () => {
      const header = await useGetAuthHeader({ app });
      const [workspace] = await usePostWorkspace({ app, header });

      const props = getCreatePropertyProps({ workspaceId: workspace.id });
      const [{ id: propertyId }] = await usePostProperty({ app, header, props });
      const [{ id, workspaceId, ...other }, status] = await useGetProperty({ app, header, propertyId });

      expect(status).toBe(200);
      expect(id).toBeDefined();
      expect(workspaceId).toBeDefined();
      expect(other).toEqual(getPropertyProps());
    });

    it.each<(typeof getFindByIdErrorCases)[0]>(getFindByIdErrorCases)(
      'should return an error when: $case',
      async ({ id, error, code }) => {
        const header = await useGetAuthHeader({ app });
        const [{ message }, status] = await useGetProperty({ app, header, propertyId: id });

        expect(status).toBe(code);
        expect(message).toContain(error);
      }
    );

    it('should return an error when the auth header was not provided', async () => {
      const [{ message }, status] = await useGetProperty({ app, propertyId: getUUID() });

      expect(status).toBe(401);
      expect(message).toEqual('Unauthorized');
    });
  });

  describe('/properties/:id (PUT)', () => {
    it.each<(typeof getUpdatePropertyResultCases)[0]>(getUpdatePropertyResultCases)(
      'should return an updated property when: $case',
      async ({ props, result }) => {
        const header = await useGetAuthHeader({ app });
        const [workspace] = await usePostWorkspace({ app, header });

        const createProps = getCreatePropertyProps({ workspaceId: workspace.id });
        const [{ id: propertyId }] = await usePostProperty({ app, header, props: createProps });
        const [{ id, workspaceId, ...other }, status] = await usePutProperty({ app, header, propertyId, props });

        expect(status).toBe(200);
        expect(id).toBeDefined();
        expect(workspaceId).toBeDefined();
        expect(other).toEqual(result);
      }
    );

    it.each<(typeof getUpdatePropertyErrorCases)[0]>(getUpdatePropertyErrorCases)(
      'should return an error when: $case',
      async ({ props, error }) => {
        const header = await useGetAuthHeader({ app });
        const [{ id: propertyId }] = await usePostProperty({ app, header });
        const [{ message }, status] = await usePutProperty({ app, header, props, propertyId });

        expect(status).toBe(400);
        expect(message).toContain(error);
      }
    );

    it('should return an error when the auth header was not provided', async () => {
      const [{ message }, status] = await usePutProperty({ app, propertyId: getUUID() });

      expect(status).toBe(401);
      expect(message).toEqual('Unauthorized');
    });
  });
});
