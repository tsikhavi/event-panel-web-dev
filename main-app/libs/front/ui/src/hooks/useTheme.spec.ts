import { act } from 'react-dom/test-utils';
import { renderHook } from '@testing-library/react-hooks';

import { darkTheme, lightTheme } from '../theme/theme';

import useTheme from './useTheme';

describe('useTheme', () => {
  it('should return new mode and theme on toggleMode', () => {
    const { result } = renderHook(() => useTheme({ lightTheme: lightTheme, darkTheme: darkTheme }));

    expect(result.current.mode).toBe('light');
    expect(result.current.theme).toEqual(lightTheme);

    act(() => result.current.toggleMode());

    expect(result.current.mode).toBe('dark');
    expect(result.current.theme).toEqual(darkTheme);
  });
});
