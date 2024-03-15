import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { createUser, token, user } from '../__test-data__/users.test-data';

import { AuthService } from './auth.service';
import { UsersService } from './users.service';

jest.mock('bcrypt');

describe('AuthService', () => {
  let authService: AuthService;

  const mockUsersService: Partial<UsersService> = {
    create: jest.fn().mockReturnValue(user),
    findOne: jest.fn().mockResolvedValue(user),
    changePassword: jest.fn().mockResolvedValue(user),
  };

  const mockJwtService: Partial<JwtService> = {
    sign: jest.fn().mockReturnValue(token),
    decode: jest.fn().mockReturnValue({ payload: { id: user.id, exp: Date.now() / 1000 + 300 } }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('getToken', () => {
    it('should return a JWT token', () => {
      const result = authService.getToken(user.id);

      expect(mockJwtService.sign).toHaveBeenCalledWith({ id: user.id });
      expect(result).toEqual(token);
    });
  });

  describe('getIdFromToken', () => {
    it('should return user ID', async () => {
      const token = authService.getToken(user.id);
      const result = await authService.getIdFromToken(token);

      expect(result).toBe(user.id);
    });

    it('should return null when invalid token', async () => {
      jest.spyOn(mockJwtService, 'decode').mockReturnValue(null);

      const result = await authService.getIdFromToken('InvalidToken');

      expect(result).toBe(null);
    });

    it('should throw BadRequestException when expired', async () => {
      jest.spyOn(mockJwtService, 'decode').mockReturnValue({ payload: { id: user.id, exp: Date.now() / 1000 - 300 } });

      const result = await authService.getIdFromToken(user.id);

      expect(result).toBe(null);
    });
  });

  describe('signUp', () => {
    it('should create a new user and return the user object with access token', async () => {
      const result = await authService.signUp(createUser);

      expect(mockUsersService.create).toHaveBeenCalledWith(createUser);
      expect(mockJwtService.sign).toHaveBeenCalledWith({ id: user.id });
      expect(result).toEqual({ ...user, accessToken: token });
    });
  });

  describe('signIn', () => {
    it('should return the user object with access token if credentials are valid', async () => {
      const compareMock = jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));

      const result = await authService.signIn(createUser);

      expect(mockUsersService.findOne).toHaveBeenCalledWith({ email: createUser.email });
      expect(compareMock).toHaveBeenCalledWith(createUser.password, user.hash);
      expect(mockJwtService.sign).toHaveBeenCalledWith({ id: user.id });
      expect(result).toEqual({ ...user, accessToken: token });
    });

    it('should throw UnauthorizedException when credentials are invalid', async () => {
      const compareMock = jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));

      await expect(authService.signIn(createUser)).rejects.toThrow(UnauthorizedException);

      expect(mockUsersService.findOne).toHaveBeenCalledWith({ email: createUser.email });
      expect(compareMock).toHaveBeenCalledWith(createUser.password, user.hash);
    });

    it('should throw UnauthorizedException when user not found', async () => {
      jest.spyOn(mockUsersService, 'findOne').mockRejectedValueOnce(new NotFoundException());

      await expect(authService.signIn(createUser)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('checkEmail', () => {
    it('should find user by email and send token', async () => {
      const { token } = await authService.checkEmail({ email: createUser.email });

      expect(mockUsersService.findOne).toHaveBeenCalledWith({ email: createUser.email });
      expect(mockUsersService.findOne).toHaveBeenCalledTimes(1);
      expect(token).toBeDefined();
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(mockUsersService, 'findOne').mockRejectedValueOnce(new NotFoundException());

      await expect(authService.checkEmail({ email: createUser.email })).rejects.toThrow(NotFoundException);
    });
  });

  describe('changePassword', () => {
    it('should reset password & return user with accessToken', async () => {
      jest.spyOn(authService, 'getIdFromToken').mockReturnValue(user.id);

      const result = await authService.changePassword({ token, password: createUser.password });

      expect(result).toEqual({ ...user, accessToken: token });
    });

    it('should throw BadRequestException', async () => {
      jest.spyOn(authService, 'getIdFromToken').mockReturnValue(null);

      const data = { token, password: createUser.password };
      await expect(authService.changePassword(data)).rejects.toThrow(BadRequestException);
    });
  });
});
