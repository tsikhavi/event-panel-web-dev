import React, { FC, useEffect } from 'react';
import { useSignIn } from '@eventpanel/front/api';
import { SignInUserDto } from '@eventpanel/shared/dto/users/signin-user.dto';
import { TokenUserDto } from '@eventpanel/shared/dto/users/token-user.dto';

import FormContainer, { FormContainerRenderProps } from '../../form/FormContainer';

type RenderProps = {
  isLoading: boolean;
  error: string | null;
} & FormContainerRenderProps<SignInUserDto>;

export type SignInProps = {
  onSuccess: (data: TokenUserDto) => void;
  render: (props: RenderProps) => JSX.Element;
};

const initForm: SignInUserDto = { email: '', password: '' };

const SignIn: FC<SignInProps> = ({ onSuccess, render }) => {
  const { signIn, user, error, status, isLoading } = useSignIn();

  useEffect(() => {
    if (status === 'success' && user) {
      onSuccess(user);
    }
  }, [onSuccess, status, user]);

  return (
    <FormContainer
      onSubmit={signIn}
      initForm={initForm}
      Resolver={SignInUserDto}
      render={(props) => render({ ...props, error, isLoading })}
    />
  );
};

export default SignIn;
