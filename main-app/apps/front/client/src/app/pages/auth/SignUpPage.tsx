import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@eventpanel/front/services/components/auth/AuthProvider/AuthProvider';
import SignUp from '@eventpanel/front/services/components/auth/SignUp/SignUp';
import FieldContainer from '@eventpanel/front/services/components/form/FieldContainer';
import { Google } from '@eventpanel/front/ui/assets/images';
import AuthGroup from '@eventpanel/front/ui/components/atoms/AuthGroup/AuthGroup';
import Button from '@eventpanel/front/ui/components/atoms/Buttons/Button/Button';
import Link from '@eventpanel/front/ui/components/atoms/Buttons/Link/Link';
import Divider from '@eventpanel/front/ui/components/atoms/Divider/Divider';
import TextField from '@eventpanel/front/ui/components/atoms/Inputs/TextField/TextField';
import Loader from '@eventpanel/front/ui/components/atoms/Loader/Loader';
import Alert from '@eventpanel/front/ui/components/atoms/Messages/Alert/Alert';
import Typography from '@eventpanel/front/ui/components/atoms/Typography/Typography';
import AuthLayout from '@eventpanel/front/ui/components/organisms/layouts/AuthLayout/AuthLayout';

import ROUTES from '../routes.json';

const SignInPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <SignUp
        onSuccess={(data) => {
          login(data);
          navigate('/');
        }}
        render={({ isLoading, error, isFilled, ...other }) => (
          <AuthLayout.Form>
            <Loader isLoading={isLoading} />

            <AuthGroup>
              <Typography centerAlign variant="h2">
                Sign Up
              </Typography>

              <Typography centerAlign variant="bodyS">
                Please provide your name and email.
              </Typography>
            </AuthGroup>

            <Button
              label="Sign up with Google"
              type="button"
              variant="authorization"
              startIcon={Google}
              iconSize="lg"
              fullWidth
            />

            <Divider label="or" />

            {error && <Alert variant="error" message={error} />}

            <FieldContainer
              {...other}
              name="lastName"
              render={(props) => <TextField {...props} autoFocus label="Name" placeholder="Name" />}
            />

            <FieldContainer
              {...other}
              name="email"
              render={(props) => <TextField {...props} type="email" label="Email" placeholder="Email" />}
            />

            <FieldContainer
              {...other}
              name="password"
              render={(props) => <TextField {...props} type="password" label="Password" placeholder="Password" />}
            />

            <AuthGroup>
              <Button fullWidth label="Sign Up" type="submit" disabled={!isFilled} />

              <Typography variant="bodyXS" color="secondary">
                Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
              </Typography>
            </AuthGroup>

            <Typography variant="bodyXS" color="secondary">
              By continuing you agree to our <Link to={'#'}>Terms and Conditions</Link>,{' '}
              <Link to={'#'}>Privacy Policy</Link> and <Link to={'#'}>Cookie Policy</Link>.
            </Typography>
          </AuthLayout.Form>
        )}
      />
    </AuthLayout>
  );
};

export default SignInPage;
