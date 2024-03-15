import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from '@eventpanel/front/services/components/auth/AuthProvider/AuthProvider';
import { useWorkspace } from '@eventpanel/front/services/components/workspaces/WorkspaceProvider/WorkspaceProvider';
import { useLogout } from '@eventpanel/front/services/hooks/useLogout';
import { Map, Setting } from '@eventpanel/front/ui/assets/images';
import UserInfo from '@eventpanel/front/ui/components/atoms/UserInfo/UserInfo';
import SidebarLayout from '@eventpanel/front/ui/components/organisms/layouts/SidebarLayout/SidebarLayout';

import ChangePasswordPage from './auth/ChangePasswordPage';
import ResetPasswordPage from './auth/ResetPasswordPage';
import SignInPage from './auth/SignInPage';
import SignUpPage from './auth/SignUpPage';
import CategoriesPage from './categories/CategoriesPage';
import ErrorPage from './errors/ErrorPage';
import EventsPage from './events/EventsPage';
import GroupsPage from './groups/GroupsPage';
import WelcomePage from './landing/WelcomePage';
import PropertiesPage from './properties/PropertiesPage';
import WorkspacesPage from './workspaces/WorkspacesPage';
import ROUTES from './routes.json';

const Pages = () => {
  const { user } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  const { workspace } = useWorkspace();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return user ? (
    <SidebarLayout
      onNavigate={(page) => navigate(page)}
      navigations={[
        [
          {
            icon: Map,
            variant: 'head',
            label: 'Workspace',
          },
          { path: '/', label: 'Events', variant: 'item' },
          { path: '/properties', label: 'Properties', variant: 'item' },
          { path: '/categories', label: 'Categories', variant: 'item' },
          { path: '/tags', label: 'Tags', variant: 'item' },
        ],
        [
          {
            icon: Setting,
            variant: 'head',
            label: 'Settings',
          },
          { path: '/settings', label: 'Workspace Settings', variant: 'item' },
          { path: '/billing', label: 'Billing', variant: 'item' },
          { path: '/import', label: 'Import', variant: 'item' },
          { path: '/export', label: 'Export', variant: 'item' },
        ],
      ]}
      Footer={
        <UserInfo
          workspace={workspace?.name}
          email={user.email}
          actions={[
            {
              label: 'Switch workspace',
              onClick: () => navigate('/switch'),
            },
            {
              label: 'Logout',
              onClick: handleLogout,
            },
          ]}
        />
      }
    >
      <Routes>
        <>
          <Route path="/" element={<EventsPage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/switch" element={<WorkspacesPage />} />
          <Route path="*" element={<ErrorPage />} />
        </>
      </Routes>
    </SidebarLayout>
  ) : (
    <Routes>
      <>
        <Route index element={<WelcomePage />} />
        <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
        <Route path={ROUTES.CHANGE_PASSWORD + '/:token'} element={<ChangePasswordPage />} />
        <Route path="/properties" element={<SignInPage />} />
        <Route path="/categories" element={<SignInPage />} />
        <Route path="/groups" element={<SignInPage />} />
        <Route path="/switch" element={<SignInPage />} />
        <Route path="*" element={<ErrorPage />} />
      </>
    </Routes>
  );
};

export default Pages;
