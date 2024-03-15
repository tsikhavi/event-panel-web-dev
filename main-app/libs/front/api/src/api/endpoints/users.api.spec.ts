import { ChangePasswordDto } from '@eventpanel/shared/dto/users/change-password.dto';
import { CheckEmailDto } from '@eventpanel/shared/dto/users/check-email.dto';
import { CreateUserDto } from '@eventpanel/shared/dto/users/create-user.dto';
import axios from 'axios';

import { baseURL } from '../../../jest.setup';
import BaseApi from '../base.api';

import UsersApi from './users.api';

describe('UsersApi', () => {
  let Api: UsersApi;

  const root = '/users';
  const body: CreateUserDto = { email: 'email@mail.com', password: 'passwrd123' };
  const config = undefined;

  beforeEach(() => {
    Api = new UsersApi(new BaseApi(baseURL));
  });

  it('should make signUp request', async () => {
    await Api.signUp(body);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(`${root}/signUp`, body, config);
  });

  it('should make signIn request', async () => {
    await Api.signIn(body);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(`${root}/signIn`, body, config);
  });

  it('should make checkEmail request', async () => {
    const body: CheckEmailDto = { email: 'email@mail.com' };
    await Api.checkEmail(body);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(`${root}/checkEmail`, body, config);
  });

  it('should make changePassword request', async () => {
    const body: ChangePasswordDto = { password: 'password123', token: 'some token' };
    await Api.changePassword(body);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(`${root}/changePassword`, body, config);
  });
});
