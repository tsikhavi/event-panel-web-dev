import React, { useContext } from 'react';

import { Theme } from '../../../theme/theme';

type ThemeContextProps = {
  theme: Theme;
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
  toggleMode: () => void;
};

const ThemeContext = React.createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error('useThemeContext must be used within a ThemeContext');

  return context;
};

export default ThemeContext;
