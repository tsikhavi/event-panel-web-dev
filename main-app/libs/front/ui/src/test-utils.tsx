import React, { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import ThemeProvider from './components/organisms/ThemeProvider/ThemeProvider';
import { lightTheme } from './theme/theme';

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={lightTheme} mode="light" setMode={() => {}} toggleMode={() => {}}>
      {children}
    </ThemeProvider>
  );
};

const RouterProvider = ({ children }: { children: ReactNode }) => {
  return (
    <MemoryRouter>
      <ThemeProvider theme={lightTheme} mode="light" setMode={() => {}} toggleMode={() => {}}>
        {children}
      </ThemeProvider>
    </MemoryRouter>
  );
};

export const customRender = (component: ReactElement) => render(component, { wrapper: Provider });
export const routerRender = (component: ReactElement) => render(component, { wrapper: RouterProvider });

export { fireEvent, screen, renderHook };
