import React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import SidebarProvider, { useSidebar } from './SidebarProvider';

describe('SidebarContext', () => {
  describe('useSidebar', () => {
    it('should throw an error if used outside of the SidebarContext', () => {
      jest.spyOn(React, 'useContext').mockReturnValue(undefined);

      const { result } = renderHook(() => useSidebar());

      expect(result.error).toEqual(new Error('useSidebar must be used within a SidebarProvider'));
    });
  });

  describe('SidebarProvider', () => {
    it('should render children', () => {
      const children = 'Some Children';
      const { getByText } = render(
        <SidebarProvider>
          <div>{children}</div>
        </SidebarProvider>
      );

      expect(getByText(children)).toBeInTheDocument();
    });
  });
});
