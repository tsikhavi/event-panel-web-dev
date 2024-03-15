import { CreateUserDto } from '@eventpanel/shared/dto/users/create-user.dto';
import { SelfUserDto } from '@eventpanel/shared/dto/users/self-user.dto';
import { TokenUserDto } from '@eventpanel/shared/dto/users/token-user.dto';
import { UpdateUserDto } from '@eventpanel/shared/dto/users/update-user.dto';

import { User } from '../users/entities/user.entity';

export const salt = 'mockedSalt';
export const hash = 'mockedHash';
export const token = 'mockedToken';

export const user: User = {
  id: 'userId',
  email: 'test@mail.com',
  firstName: null,
  lastName: 'Elon Musk',
  hash: 'mockedHash',
  workspaces: [],
};

export const createUser: CreateUserDto = { lastName: 'Elon Musk', email: 'test@example.com', password: 'password123' };

export const updateUser: UpdateUserDto = { firstName: 'Tony', lastName: 'Stark' };

export const tokenUser: TokenUserDto = {
  id: 'userId',
  email: 'test@mail.com',
  firstName: 'Tony',
  lastName: 'Stark',
  accessToken: 'mockedAccessToken',
};

export const selfUser: SelfUserDto = {
  id: 'userId',
  email: 'test@mail.com',
  firstName: 'Tony',
  lastName: 'Stark',
};
