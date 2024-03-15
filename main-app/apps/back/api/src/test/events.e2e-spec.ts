import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../app.module';

import {
  getCreateEventErrorCases,
  getCreateEventProps,
  getCreateEventResultCases,
  getEventProps,
  getUpdateEventErrorCases,
  getUpdateEventResultCases,
} from './test-data/events.test-data';
import { getFindByIdErrorCases } from './test-data/test-data';
import { useGetEvent, useGetListEvents, usePostEvent, usePutEvent } from './test-utils/events.test-utils';
import { getUUID } from './test-utils/test-utils';
import { useGetAuthHeader } from './test-utils/users.test-utils';
import { usePostWorkspace } from './test-utils/workspaces.test-utils';

describe('EventsController (e2e)', () => {
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

  describe('/events (POST)', () => {
    it.each<(typeof getCreateEventResultCases)[0]>(getCreateEventResultCases)(
      'should return a new event when: $case',
      async ({ props, result }) => {
        const header = await useGetAuthHeader({ app });
        const [workspace] = await usePostWorkspace({ app, header });

        props.workspaceId = workspace.id;
        const [{ id, workspaceId, ...other }, status] = await usePostEvent({ app, header, props });

        expect(status).toBe(201);
        expect(id).toBeDefined();
        expect(workspaceId).toBeDefined();
        expect(other).toEqual(result);
      }
    );

    it.each<(typeof getCreateEventErrorCases)[0]>(getCreateEventErrorCases)(
      'should return an error when: $case',
      async ({ props, error }) => {
        const header = await useGetAuthHeader({ app });
        const [{ message }, status] = await usePostEvent({ app, header, props });

        expect(status).toBe(400);
        expect(message).toContain(error);
      }
    );

    it('should return an error when the auth header was not provided', async () => {
      const [{ message }, status] = await usePostEvent({ app });

      expect(status).toBe(401);
      expect(message).toEqual('Unauthorized');
    });
  });

  describe('/events/workspace/:id (GET)', () => {
    it('should return an empty list', async () => {
      const header = await useGetAuthHeader({ app });
      const [{ id: workspaceId }] = await usePostWorkspace({ app, header });
      const [body, status] = await useGetListEvents({ app, header, workspaceId });

      expect(status).toBe(200);
      expect(body).toEqual([]);
    });

    it('should return a list of events', async () => {
      const header = await useGetAuthHeader({ app });
      const [{ id: workspaceId }] = await usePostWorkspace({ app, header });

      const result = [
        (await usePostEvent({ app, header, props: getCreateEventProps({ workspaceId, name: 'One Event' }) }))[0],
      ];

      const [body, status] = await useGetListEvents({ app, header, workspaceId });

      expect(status).toBe(200);
      expect(body).toEqual(result);
    });

    it('should return an error when the auth header was not provided', async () => {
      const [{ message }, status] = await useGetListEvents({ app, workspaceId: getUUID() });

      expect(status).toBe(401);
      expect(message).toEqual('Unauthorized');
    });
  });

  describe('/events/:id (GET)', () => {
    it('should return a event', async () => {
      const header = await useGetAuthHeader({ app });
      const [workspace] = await usePostWorkspace({ app, header });

      const props = getCreateEventProps({ workspaceId: workspace.id });
      const [{ id: eventId }] = await usePostEvent({ app, header, props });
      const [{ id, workspaceId, ...other }, status] = await useGetEvent({ app, header, eventId });

      expect(status).toBe(200);
      expect(id).toBeDefined();
      expect(workspaceId).toBeDefined();
      expect(other).toEqual(getEventProps());
    });

    it.each<(typeof getFindByIdErrorCases)[0]>(getFindByIdErrorCases)(
      'should return an error when: $case',
      async ({ id, error, code }) => {
        const header = await useGetAuthHeader({ app });
        const [{ message }, status] = await useGetEvent({ app, header, eventId: id });

        expect(status).toBe(code);
        expect(message).toContain(error);
      }
    );

    it('should return an error when the auth header was not provided', async () => {
      const [{ message }, status] = await useGetEvent({ app, eventId: getUUID() });

      expect(status).toBe(401);
      expect(message).toEqual('Unauthorized');
    });
  });

  describe('/events/:id (PUT)', () => {
    it.each<(typeof getUpdateEventResultCases)[0]>(getUpdateEventResultCases)(
      'should return an updated event when: $case',
      async ({ props, result }) => {
        const header = await useGetAuthHeader({ app });
        const [workspace] = await usePostWorkspace({ app, header });

        const createProps = getCreateEventProps({ workspaceId: workspace.id });
        const [{ id: eventId }] = await usePostEvent({ app, header, props: createProps });
        const [{ id, workspaceId, ...other }, status] = await usePutEvent({ app, header, eventId, props });

        expect(status).toBe(200);
        expect(id).toBeDefined();
        expect(workspaceId).toBeDefined();
        expect(other).toEqual(result);
      }
    );

    it.each<(typeof getUpdateEventErrorCases)[0]>(getUpdateEventErrorCases)(
      'should return an error when: $case',
      async ({ props, error }) => {
        const header = await useGetAuthHeader({ app });
        const [{ id: eventId }] = await usePostEvent({ app, header });
        const [{ message }, status] = await usePutEvent({ app, header, props, eventId });

        expect(status).toBe(400);
        expect(message).toContain(error);
      }
    );

    it('should return an error when the auth header was not provided', async () => {
      const [{ message }, status] = await usePutEvent({ app, eventId: getUUID() });

      expect(status).toBe(401);
      expect(message).toEqual('Unauthorized');
    });
  });
});
