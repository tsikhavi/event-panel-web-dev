import React from 'react';
import ResetPassword from '@eventpanel/front/services/components/auth/ResetPassword/ResetPassword';
import FieldContainer from '@eventpanel/front/services/components/form/FieldContainer';
import AuthGroup from '@eventpanel/front/ui/components/atoms/AuthGroup/AuthGroup';
import Button from '@eventpanel/front/ui/components/atoms/Buttons/Button/Button';
import Link from '@eventpanel/front/ui/components/atoms/Buttons/Link/Link';
import TextField from '@eventpanel/front/ui/components/atoms/Inputs/TextField/TextField';
import Loader from '@eventpanel/front/ui/components/atoms/Loader/Loader';
import Alert from '@eventpanel/front/ui/components/atoms/Messages/Alert/Alert';
import Typography from '@eventpanel/front/ui/components/atoms/Typography/Typography';
import AuthLayout from '@eventpanel/front/ui/components/organisms/layouts/AuthLayout/AuthLayout';

import ROUTES from '../routes.json';

const ResetPasswordPage = () => {
  return (
    <AuthLayout>
      <ResetPassword
        render={({ isLoading, error, isFilled, ...other }) => (
          <AuthLayout.Form>
            <Loader isLoading={isLoading} />

            <AuthGroup>
              <Typography centerAlign variant="h2">
                Reset Password
              </Typography>
              <Typography centerAlign variant="bodyXS">
                Enter the email address you used when you joined and we’ll send you instructions to reset your password.
              </Typography>
            </AuthGroup>

            {error && <Alert variant="error" message={error} />}

            <FieldContainer
              {...other}
              name="email"
              render={(props) => <TextField {...props} autoFocus type="email" label="Email" placeholder="Email" />}
            />

            <AuthGroup>
              <Button fullWidth type="submit" label="Reset Password" disabled={!isFilled} />

              <Typography variant="bodyXS" color="secondary">
                Back to <Link to={ROUTES.SIGN_IN}>Sign In</Link>
              </Typography>
            </AuthGroup>
          </AuthLayout.Form>
        )}
      />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
