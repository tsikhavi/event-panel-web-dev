import React, { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '@eventpanel/front/services/components/auth/AuthProvider/AuthProvider';
import WorkspaceProvider from '@eventpanel/front/services/components/workspaces/WorkspaceProvider/WorkspaceProvider';
import ModalProvider from '@eventpanel/front/ui/components/atoms/Modals/ModalProvider/ModalProvider';
import GlobalStyles from '@eventpanel/front/ui/components/organisms/GlobalStyles/GlobalStyles';
import ThemeProvider from '@eventpanel/front/ui/components/organisms/ThemeProvider/ThemeProvider';
import useTheme from '@eventpanel/front/ui/hooks/useTheme';
import { darkTheme, lightTheme } from '@eventpanel/front/ui/theme/theme';

import 'reflect-metadata';

import Pages from './pages/Pages';

export function App() {
  const theme = useTheme({ darkTheme, lightTheme });

  return (
    <StrictMode>
      <AuthProvider>
        <WorkspaceProvider>
          <ThemeProvider {...theme}>
            <GlobalStyles />
            <ModalProvider>
              <BrowserRouter>
                <Pages />
              </BrowserRouter>
            </ModalProvider>
          </ThemeProvider>
        </WorkspaceProvider>
      </AuthProvider>
    </StrictMode>
  );
}

export default App;
