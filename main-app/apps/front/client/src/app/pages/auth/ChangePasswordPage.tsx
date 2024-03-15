import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@eventpanel/front/services/components/auth/AuthProvider/AuthProvider';
import ChangePassword from '@eventpanel/front/services/components/auth/ChangePassword/ChangePassword';
import FieldContainer from '@eventpanel/front/services/components/form/FieldContainer';
import Button from '@eventpanel/front/ui/components/atoms/Buttons/Button/Button';
import Link from '@eventpanel/front/ui/components/atoms/Buttons/Link/Link';
import TextField from '@eventpanel/front/ui/components/atoms/Inputs/TextField/TextField';
import Loader from '@eventpanel/front/ui/components/atoms/Loader/Loader';
import Alert from '@eventpanel/front/ui/components/atoms/Messages/Alert/Alert';
import Typography from '@eventpanel/front/ui/components/atoms/Typography/Typography';
import AuthLayout from '@eventpanel/front/ui/components/organisms/layouts/AuthLayout/AuthLayout';

import ROUTES from '../routes.json';

const ChangePasswordPage = () => {
  const { token } = useParams<{ token: string }>();
  const { login } = useAuth();

  return (
    <AuthLayout>
      <ChangePassword
        token={token!}
        onSuccess={login}
        render={({ isLoading, error, ...other }) => (
          <AuthLayout.Form>
            <Loader isLoading={isLoading} />

            <Typography centerAlign variant="h3">
              Change Password
            </Typography>

            {error && <Alert variant="error" message={error} />}

            <FieldContainer
              {...other}
              name="password"
              render={(props) => <TextField {...props} autoFocus type="password" label="Password" />}
            />

            <Button fullWidth type="submit" label="Change Password" />

            <Typography centerAlign variant="bodyXS">
              Back to <Link to={ROUTES.SIGN_IN}>Sign IN</Link>
            </Typography>
          </AuthLayout.Form>
        )}
      />
    </AuthLayout>
  );
};

export default ChangePasswordPage;
