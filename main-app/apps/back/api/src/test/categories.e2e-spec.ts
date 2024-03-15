import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../app.module';

import {
  getCategoryProps,
  getCreateCategoryErrorCases,
  getCreateCategoryProps,
  getCreateCategoryResultCases,
  getUpdateCategoryErrorCases,
  getUpdateCategoryResultCases,
} from './test-data/categories.test-data';
import { getFindByIdErrorCases } from './test-data/test-data';
import {
  useGetCategory,
  useGetListCategories,
  usePostCategory,
  usePutCategory,
} from './test-utils/categories.test-utils';
import { getUUID } from './test-utils/test-utils';
import { useGetAuthHeader } from './test-utils/users.test-utils';
import { usePostWorkspace } from './test-utils/workspaces.test-utils';

describe('CategoriesController (e2e)', () => {
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

  describe('/categories (POST)', () => {
    it.each<(typeof getCreateCategoryResultCases)[0]>(getCreateCategoryResultCases)(
      'should return a new category when: $case',
      async ({ props, result }) => {
        const header = await useGetAuthHeader({ app });
        const [workspace] = await usePostWorkspace({ app, header });

        props.workspaceId = workspace.id;
        const [{ id, workspaceId, ...other }, status] = await usePostCategory({ app, header, props });

        expect(status).toBe(201);
        expect(id).toBeDefined();
        expect(workspaceId).toBeDefined();
        expect(other).toEqual(result);
      }
    );

    it.each<(typeof getCreateCategoryErrorCases)[0]>(getCreateCategoryErrorCases)(
      'should return an error when: $case',
      async ({ props, error }) => {
        const header = await useGetAuthHeader({ app });
        const [{ message }, status] = await usePostCategory({ app, header, props });

        expect(status).toBe(400);
        expect(message).toContain(error);
      }
    );

    it('should return an error when the auth header was not provided', async () => {
      const [{ message }, status] = await usePostCategory({ app });

      expect(status).toBe(401);
      expect(message).toEqual('Unauthorized');
    });
  });

  describe('/categories/workspace/:id (GET)', () => {
    it('should return an empty list', async () => {
      const header = await useGetAuthHeader({ app });
      const [{ id: workspaceId }] = await usePostWorkspace({ app, header });
      const [body, status] = await useGetListCategories({ app, header, workspaceId });

      expect(status).toBe(200);
      expect(body).toEqual([]);
    });

    it('should return a list of categories', async () => {
      const header = await useGetAuthHeader({ app });
      const [{ id: workspaceId }] = await usePostWorkspace({ app, header });

      const result = [
        (
          await usePostCategory({ app, header, props: getCreateCategoryProps({ workspaceId, name: 'One Category' }) })
        )[0],
      ];

      const [body, status] = await useGetListCategories({ app, header, workspaceId });

      expect(status).toBe(200);
      expect(body).toEqual(result);
    });

    it('should return an error when the auth header was not provided', async () => {
      const [{ message }, status] = await useGetListCategories({ app, workspaceId: getUUID() });

      expect(status).toBe(401);
      expect(message).toEqual('Unauthorized');
    });
  });

  describe('/categories/:id (GET)', () => {
    it('should return a category', async () => {
      const header = await useGetAuthHeader({ app });
      const [workspace] = await usePostWorkspace({ app, header });

      const props = getCreateCategoryProps({ workspaceId: workspace.id });
      const [{ id: categoryId }] = await usePostCategory({ app, header, props });
      const [{ id, workspaceId, ...other }, status] = await useGetCategory({ app, header, categoryId });

      expect(status).toBe(200);
      expect(id).toBeDefined();
      expect(workspaceId).toBeDefined();
      expect(other).toEqual(getCategoryProps());
    });

    it.each<(typeof getFindByIdErrorCases)[0]>(getFindByIdErrorCases)(
      'should return an error when: $case',
      async ({ id, error, code }) => {
        const header = await useGetAuthHeader({ app });
        const [{ message }, status] = await useGetCategory({ app, header, categoryId: id });

        expect(status).toBe(code);
        expect(message).toContain(error);
      }
    );

    it('should return an error when the auth header was not provided', async () => {
      const [{ message }, status] = await useGetCategory({ app, categoryId: getUUID() });

      expect(status).toBe(401);
      expect(message).toEqual('Unauthorized');
    });
  });

  describe('/categories/:id (PUT)', () => {
    it.each<(typeof getUpdateCategoryResultCases)[0]>(getUpdateCategoryResultCases)(
      'should return an updated category when: $case',
      async ({ props, result }) => {
        const header = await useGetAuthHeader({ app });
        const [workspace] = await usePostWorkspace({ app, header });

        const createProps = getCreateCategoryProps({ workspaceId: workspace.id });
        const [{ id: categoryId }] = await usePostCategory({ app, header, props: createProps });
        const [{ id, workspaceId, ...other }, status] = await usePutCategory({ app, header, categoryId, props });

        expect(status).toBe(200);
        expect(id).toBeDefined();
        expect(workspaceId).toBeDefined();
        expect(other).toEqual(result);
      }
    );

    it.each<(typeof getUpdateCategoryErrorCases)[0]>(getUpdateCategoryErrorCases)(
      'should return an error when: $case',
      async ({ props, error }) => {
        const header = await useGetAuthHeader({ app });
        const [{ id: categoryId }] = await usePostCategory({ app, header });
        const [{ message }, status] = await usePutCategory({ app, header, props, categoryId });

        expect(status).toBe(400);
        expect(message).toContain(error);
      }
    );

    it('should return an error when the auth header was not provided', async () => {
      const [{ message }, status] = await usePutCategory({ app, categoryId: getUUID() });

      expect(status).toBe(401);
      expect(message).toEqual('Unauthorized');
    });
  });
});
