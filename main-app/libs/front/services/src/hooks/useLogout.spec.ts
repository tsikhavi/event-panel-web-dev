import { mockUseAuth } from '../components/auth/AuthProvider/__test-data__';
import * as AuthProvider from '../components/auth/AuthProvider/AuthProvider';
import { mockUseWorkspace } from '../components/workspaces/WorkspaceProvider/__test-data__';
import * as WorkspaceProvider from '../components/workspaces/WorkspaceProvider/WorkspaceProvider';
import { renderHook } from '../test-utils';

import { useLogout } from './useLogout';

describe('useLogout', () => {
  it('should return logout function', () => {
    const logout = jest.fn();
    const clearWorkspace = jest.fn();

    jest.spyOn(AuthProvider, 'useAuth').mockReturnValue(mockUseAuth({ logout }));
    jest.spyOn(WorkspaceProvider, 'useWorkspace').mockReturnValue(mockUseWorkspace({ clearWorkspace }));

    const { result } = renderHook(() => useLogout());

    result.current();

    expect(clearWorkspace).toHaveBeenCalledTimes(1);
    expect(logout).toHaveBeenCalledTimes(1);
  });
});
