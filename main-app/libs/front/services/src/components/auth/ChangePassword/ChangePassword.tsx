import React, { useEffect } from 'react';
import { useChangePassword } from '@eventpanel/front/api';
import { ChangePasswordNoTokenDto } from '@eventpanel/shared/dto/users/change-password.dto';
import { TokenUserDto } from '@eventpanel/shared/dto/users/token-user.dto';

import FormContainer, { FormContainerRenderProps } from '../../form/FormContainer';

type RenderProps = {
  isLoading: boolean;
  error: string | null;
} & FormContainerRenderProps<ChangePasswordNoTokenDto>;

export type ChangePasswordProps = {
  token: string;
  onSuccess: (data: TokenUserDto) => void;
  render: (props: RenderProps) => JSX.Element;
};

const ChangePassword: React.FC<ChangePasswordProps> = ({ token, onSuccess, render }) => {
  const { changePassword, user, error, status, isLoading } = useChangePassword();

  useEffect(() => {
    if (status === 'success' && user) {
      onSuccess(user);
    }
  }, [onSuccess, status, user]);

  return (
    <FormContainer
      initForm={{ password: '' }}
      Resolver={ChangePasswordNoTokenDto}
      onSubmit={(data) => changePassword({ ...data, token })}
      render={(props) => render({ ...props, error, isLoading })}
    />
  );
};

export default ChangePassword;
