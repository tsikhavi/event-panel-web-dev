import React from 'react';
import Link from '@eventpanel/front/ui/components/atoms/Buttons/Link/Link';
import Logo from '@eventpanel/front/ui/components/atoms/Logo/Logo';
import Typography from '@eventpanel/front/ui/components/atoms/Typography/Typography';

import ROUTES from '../routes.json';

const WelcomePage = () => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Logo />

      <Typography variant="h1">Welcome to Event Panel.</Typography>

      <Typography variant="h2">
        To continue, please <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </Typography>
    </div>
  );
};

export default WelcomePage;
