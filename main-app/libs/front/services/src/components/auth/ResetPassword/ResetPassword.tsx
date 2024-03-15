import React from 'react';
import { useResetPassword } from '@eventpanel/front/api';
import { CheckEmailDto } from '@eventpanel/shared/dto/users/check-email.dto';

import FormContainer, { FormContainerRenderProps } from '../../form/FormContainer';

type RenderProps = {
  isLoading: boolean;
  error: string | null;
  token: string | null;
} & FormContainerRenderProps<CheckEmailDto>;

export type ResetPasswordProps = {
  render: (props: RenderProps) => JSX.Element;
};

const ResetPassword: React.FC<ResetPasswordProps> = ({ render }) => {
  const { resetPassword, user, error, isLoading } = useResetPassword();

  return (
    <FormContainer
      onSubmit={resetPassword}
      initForm={{ email: '' }}
      Resolver={CheckEmailDto}
      render={(props) => render({ ...props, error, isLoading, token: user?.token || null })}
    />
  );
};

export default ResetPassword;
