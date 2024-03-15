import { Test, TestingModule } from '@nestjs/testing';

import { createUser, selfUser, token, tokenUser, updateUser, user } from '../__test-data__/users.test-data';

import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let authService: AuthService;

  const mockUsersService: Partial<UsersService> = {
    update: jest.fn().mockResolvedValue(selfUser),
  };

  const mockAuthService: Partial<AuthService> = {
    signUp: jest.fn().mockResolvedValue(tokenUser),
    signIn: jest.fn().mockResolvedValue(tokenUser),
    checkEmail: jest.fn().mockResolvedValue({ token }),
    changePassword: jest.fn().mockResolvedValue(tokenUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signUp', () => {
    it('should call authService.signUp and return the result', async () => {
      const result = await usersController.signUp(createUser);

      expect(authService.signUp).toHaveBeenCalledWith(createUser);
      expect(result).toEqual(tokenUser);
    });
  });

  describe('signIn', () => {
    it('should call authService.signIn and return the result', async () => {
      const result = await usersController.signIn(createUser);

      expect(authService.signIn).toHaveBeenCalledWith(createUser);
      expect(result).toEqual(tokenUser);
    });
  });

  describe('checkEmail', () => {
    it('should call authService.checkEmail and return the result', async () => {
      const { token } = await usersController.checkEmail({ email: createUser.email });

      expect(authService.checkEmail).toHaveBeenCalledWith({ email: createUser.email });
      expect(token).toBeDefined();
    });
  });

  describe('changePassword', () => {
    it('should call authService.changePassword and return the result', async () => {
      const result = await usersController.changePassword({ token, password: createUser.password });

      expect(authService.changePassword).toHaveBeenCalledWith({ token, password: createUser.password });
      expect(result).toEqual(tokenUser);
    });
  });

  describe('getSelf', () => {
    it('should return current user', async () => {
      const result = await usersController.getSelf(user);

      expect(result).toEqual(user);
    });
  });

  describe('updateSelf', () => {
    it('should call usersService.update and return the result', async () => {
      const result = await usersController.updateSelf(updateUser, user);

      expect(usersService.update).toHaveBeenCalledWith(user.id, updateUser);
      expect(result).toEqual(selfUser);
    });
  });
});
