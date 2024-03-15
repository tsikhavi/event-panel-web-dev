import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@eventpanel/front/services/components/auth/AuthProvider/AuthProvider';
import Logo from '@eventpanel/front/ui/components/atoms/Logo/Logo';
import NotFound from '@eventpanel/front/ui/components/atoms/NotFound/NotFound';
import PageLayout from '@eventpanel/front/ui/components/organisms/layouts/PageLayout/PageLayout';

const ErrorPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <PageLayout
      Header={!user ? <Logo /> : null}
      Content={<NotFound isAuth={Boolean(user)} onNavigate={() => navigate('/')} />}
    />
  );
};

export default ErrorPage;
