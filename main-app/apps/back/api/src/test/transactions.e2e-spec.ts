import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../app.module';

import { getFindByIdErrorCases } from './test-data/test-data';
import {
  getCreateTransactionErrorCases,
  getCreateTransactionProps,
  getCreateTransactionResultCases,
} from './test-data/transactions.test-data';
import { getUUID } from './test-utils/test-utils';
import { useGetListTransactions, usePostTransaction } from './test-utils/transactions.test-utils';
import { useGetAuthHeader } from './test-utils/users.test-utils';
import { usePostWorkspace } from './test-utils/workspaces.test-utils';

describe('TransactionsController (e2e)', () => {
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

  describe('/transactions (POST)', () => {
    it.each<(typeof getCreateTransactionResultCases)[0]>(getCreateTransactionResultCases)(
      'should return a new transaction when: $case',
      async ({ props, result }) => {
        const header = await useGetAuthHeader({ app });
        const [workspace] = await usePostWorkspace({ app, header });

        props.workspaceId = workspace.id;
        const [{ id, workspaceId, createdAt, ...other }, status] = await usePostTransaction({ app, header, props });

        expect(status).toBe(201);
        expect(id).toBeDefined();
        expect(workspaceId).toBeDefined();
        expect(createdAt).toBeDefined();
        expect(other).toEqual(result);
      }
    );

    it.each<(typeof getCreateTransactionErrorCases)[0]>(getCreateTransactionErrorCases)(
      'should return an error when: $case',
      async ({ props, error }) => {
        const header = await useGetAuthHeader({ app });
        const [{ message }, status] = await usePostTransaction({ app, header, props });

        expect(status).toBe(400);
        expect(message).toContain(error);
      }
    );

    it('should return an error when the auth header was not provided', async () => {
      const [{ message }, status] = await usePostTransaction({ app });

      expect(status).toBe(401);
      expect(message).toBe('Unauthorized');
    });
  });

  describe('/transactions (GET)', () => {
    it('should return an empty list', async () => {
      const header = await useGetAuthHeader({ app });
      const [{ id: workspaceId }] = await usePostWorkspace({ app, header });
      const [body, status] = await useGetListTransactions({ app, header, workspaceId });

      expect(status).toBe(200);
      expect(body).toEqual([]);
    });

    it('should return a list of transactions', async () => {
      const header = await useGetAuthHeader({ app });
      const [{ id: workspaceId }] = await usePostWorkspace({ app, header });

      const props = getCreateTransactionProps({ workspaceId, totalPrice: 100 });

      const result = [(await usePostTransaction({ app, header, props }))[0]];

      const [body, status] = await useGetListTransactions({ app, header, workspaceId });

      expect(status).toBe(200);
      expect(body).toEqual(result);
    });

    it.each<(typeof getFindByIdErrorCases)[0]>(getFindByIdErrorCases)(
      'should return an error when: $case',
      async ({ id, error, code }) => {
        const header = await useGetAuthHeader({ app });
        const [{ message }, status] = await useGetListTransactions({ app, header, workspaceId: id });

        expect(status).toBe(code);
        expect(message).toContain(error);
      }
    );

    it('should return an error when the auth header was not provided', async () => {
      const [{ message }, status] = await useGetListTransactions({ app, workspaceId: getUUID() });

      expect(status).toBe(401);
      expect(message).toBe('Unauthorized');
    });
  });
});
