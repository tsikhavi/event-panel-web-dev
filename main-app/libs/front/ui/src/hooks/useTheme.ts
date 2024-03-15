import { useState } from 'react';

import { Theme } from '../theme/theme';

type UseThemeProps = {
  lightTheme: Theme;
  darkTheme: Theme;
};

const useTheme = ({ lightTheme, darkTheme }: UseThemeProps) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleMode = () => {
    setMode((old) => (old === 'light' ? 'dark' : 'light'));
  };

  return {
    mode,
    setMode,
    toggleMode,
    theme: { ...(mode === 'light' ? lightTheme : darkTheme) },
  };
};

export default useTheme;
