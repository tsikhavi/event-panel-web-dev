import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../app.module';

import {
  getChangePasswordErrorCases,
  getChangePasswordProps,
  getCheckEmailErrorCases,
  getSelfUserPros,
  getSignErrorCases,
  getUpdateSelfErrorCases,
  getUpdateSelfResultCases,
} from './test-data/users.test-data';
import {
  useChangePassword,
  useCheckEmail,
  useGetAuthHeader,
  useGetSelf,
  usePutSelf,
  useSignIn,
  useSignUp,
} from './test-utils/users.test-utils';

describe('UserController (e2e)', () => {
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

  describe('/users/signup (POST)', () => {
    it('should create a new user & return accessToken', async () => {
      const [{ id, accessToken, ...other }, status] = await useSignUp({ app });

      expect(status).toBe(201);
      expect(id).toBeDefined();
      expect(accessToken).toBeDefined();
      expect(other).toEqual(getSelfUserPros());
    });

    it.each<(typeof getSignErrorCases)[0]>(getSignErrorCases)(
      'should return a validation error when: $case',
      async ({ props: user, error }) => {
        const [{ message }, status] = await useSignUp({ app, user });

        expect(status).toBe(400);
        expect(message).toContain(error);
      }
    );

    it('should return a conflict error when user with email exists', async () => {
      await useSignUp({ app });
      const [{ message }, status] = await useSignUp({ app });

      expect(status).toBe(409);
      expect(message).toBe('user already exists');
    });
  });

  describe('/users/signin (POST)', () => {
    it('should sign in a user & return an accessToken', async () => {
      await useSignUp({ app });
      const [{ id, accessToken, ...other }, status] = await useSignIn({ app });

      expect(status).toBe(200);
      expect(id).toBeDefined();
      expect(accessToken).toBeDefined();
      expect(other).toEqual(getSelfUserPros());
    });

    it.each<(typeof getSignErrorCases)[0]>(getSignErrorCases)(
      'should return a validation error when: $case',
      async ({ props: user, error }) => {
        const [{ message }, status] = await useSignIn({ app, user });

        expect(status).toBe(400);
        expect(message).toContain(error);
      }
    );

    it('should return an unauthorized error when credentials are incorrect', async () => {
      const [{ message }, status] = await useSignIn({ app });

      expect(status).toBe(401);
      expect(message).toBe('Incorrect email or password.');
    });
  });

  describe('users/checkEmail (POST)', () => {
    it('should successfully check email & return token', async () => {
      const [{ email }] = await useSignUp({ app });
      const [{ token }, status] = await useCheckEmail({ app, data: { email } });

      expect(status).toBe(200);
      expect(token).toBeDefined();
    });

    it.each<(typeof getCheckEmailErrorCases)[0]>(getCheckEmailErrorCases)(
      'should return a validation error when email: $case',
      async ({ props: data, error }) => {
        const [{ message }] = await useCheckEmail({ app, data });

        expect(message).toContain(error);
      }
    );
  });

  describe('users/changePassword (POST)', () => {
    it('should reset password & return accessToken', async () => {
      const [{ email }] = await useSignUp({ app });
      const [{ token }] = await useCheckEmail({ app, data: { email } });

      const data = getChangePasswordProps({ token });
      const [{ id, accessToken, ...other }, status] = await useChangePassword({ app, data });

      expect(status).toBe(200);
      expect(id).toBeDefined();
      expect(accessToken).toBeDefined();
      expect(other).toEqual(getSelfUserPros());
    });

    it.each<(typeof getChangePasswordErrorCases)[0]>(getChangePasswordErrorCases)(
      'should return an error when: $case',
      async ({ props: data, error }) => {
        const [{ message }] = await useChangePassword({ app, data });

        expect(message).toContain(error);
      }
    );
  });

  describe('/users/self (GET)', () => {
    it('should return the current user', async () => {
      const header = await useGetAuthHeader({ app });
      const [{ id, ...other }, status] = await useGetSelf({ app, header });

      expect(status).toBe(200);
      expect(id).toBeDefined();
      expect(other).toEqual(getSelfUserPros());
    });

    it('should return an unauthorized error when auth header not provided', async () => {
      const [{ message }, status] = await useGetSelf({ app });

      expect(status).toBe(401);
      expect(message).toBe('Unauthorized');
    });
  });

  describe('/users/self (PUT)', () => {
    it.each<(typeof getUpdateSelfResultCases)[0]>(getUpdateSelfResultCases)(
      'should return an updated user when $case',
      async ({ props, result }) => {
        const header = await useGetAuthHeader({ app });
        const [{ id, ...other }, status] = await usePutSelf({ app, header, props });

        expect(status).toBe(200);
        expect(id).toBeDefined();
        expect(other).toEqual(result);
      }
    );

    it.each<(typeof getUpdateSelfErrorCases)[0]>(getUpdateSelfErrorCases)(
      'should return an error when: $case',
      async ({ props, error }) => {
        const header = await useGetAuthHeader({ app });
        const [{ message }, status] = await usePutSelf({ app, header, props });

        expect(status).toBe(400);
        expect(message).toContain(error);
      }
    );

    it('should return an unauthorized error when no auth is provided', async () => {
      const [{ message }, status] = await usePutSelf({ app });

      expect(status).toBe(401);
      expect(message).toBe('Unauthorized');
    });
  });
});
