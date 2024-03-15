import React from 'react';
import * as authHook from '@eventpanel/front/api';
import { SignInUserDto } from '@eventpanel/shared/dto/users/signin-user.dto';
import { TokenUserDto } from '@eventpanel/shared/dto/users/token-user.dto';

import { customRender } from '../../../test-utils';
import { FormContainerRenderProps } from '../../form/FormContainer';

import SignIn, { SignInProps } from './SignIn';

type ResultType = ReturnType<typeof authHook.useSignIn>;
const mockSignIn = jest.fn();
const getResult = (result: Partial<ResultType> = {}): ResultType => ({
  user: null,
  error: null,
  status: 'idle',
  isLoading: false,
  signIn: mockSignIn,
  ...result,
});
jest.mock('@eventpanel/front/api', () => ({
  useSignIn: jest.fn<ResultType, unknown[]>(() => getResult()),
}));

const getForm = (form: Partial<SignInUserDto> = {}): SignInUserDto => ({
  email: 'mail@mail.com',
  password: 'password123',
  ...form,
});
const renderForm = (control: FormContainerRenderProps<SignInUserDto>['control'], form: SignInUserDto = getForm()) => {
  control.current.setValue('email', form.email);
  control.current.setValue('password', form.password);
  return <div />;
};

const getProps = (props: Partial<SignInProps> = {}): SignInProps => ({
  onSuccess: jest.fn(),
  render: ({ control }) => renderForm(control),
  ...props,
});

describe('SignIn', () => {
  it('should render default', () => {
    const test = 'test';
    const props = getProps({ render: () => <div>{test}</div> });
    const { getByText } = customRender(<SignIn {...props} />);

    expect(props.onSuccess).not.toHaveBeenCalled();
    expect(getByText(test)).toBeInTheDocument();
  });

  it('should call onSuccess', () => {
    jest.spyOn(authHook, 'useSignIn').mockReturnValue(getResult({ user: {} as TokenUserDto, status: 'success' }));

    const props = getProps();
    customRender(<SignIn {...props} />);

    expect(props.onSuccess).toHaveBeenCalledTimes(1);
  });
});
