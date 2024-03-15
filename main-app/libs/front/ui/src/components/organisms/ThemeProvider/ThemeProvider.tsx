import React, { FC, ReactNode } from 'react';

import { Theme } from '../../../theme/theme';

import ThemeContext from './ThemeContext';

export type ThemeProviderProps = {
  theme: Theme;
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
  toggleMode: () => void;
  children: ReactNode;
};

const ThemeProvider: FC<ThemeProviderProps> = ({ children, ...other }) => {
  return <ThemeContext.Provider value={other}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
