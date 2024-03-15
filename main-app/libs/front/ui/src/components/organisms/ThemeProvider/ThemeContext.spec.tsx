import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { useThemeContext } from './ThemeContext';

describe('useThemeContext', () => {
  it('should throw an error if used outside a ThemeContext', () => {
    jest.spyOn(React, 'useContext').mockReturnValue(undefined);

    const { result } = renderHook(() => useThemeContext());

    expect(result.error).toEqual(new Error('useThemeContext must be used within a ThemeContext'));
  });
});
