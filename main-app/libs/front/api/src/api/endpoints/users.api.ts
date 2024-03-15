import { ChangePasswordDto } from '@eventpanel/shared/dto/users/change-password.dto';
import { CheckEmailDto } from '@eventpanel/shared/dto/users/check-email.dto';
import { CreateUserDto } from '@eventpanel/shared/dto/users/create-user.dto';
import { SignInUserDto } from '@eventpanel/shared/dto/users/signin-user.dto';
import { TokenUserDto } from '@eventpanel/shared/dto/users/token-user.dto';

import BaseApi from '../base.api';

class UsersApi {
  constructor(private baseApi: BaseApi) {}

  signIn = async (body: SignInUserDto) => {
    const { data } = await this.baseApi.post<TokenUserDto, SignInUserDto>('/users/signIn', body);
    return data;
  };

  signUp = async (body: CreateUserDto) => {
    const { data } = await this.baseApi.post<TokenUserDto, CreateUserDto>('/users/signUp', body);
    return data;
  };

  checkEmail = async (body: CheckEmailDto) => {
    const { data } = await this.baseApi.post<{ token: string }, CheckEmailDto>('/users/checkEmail', body);
    return data;
  };

  changePassword = async (body: ChangePasswordDto) => {
    const { data } = await this.baseApi.post<TokenUserDto, ChangePasswordDto>('/users/changePassword', body);
    return data;
  };
}

export default UsersApi;
