import { act, renderHook } from '../../../jest.setup';
import * as useRequest from '../useRequest';

import { useGetWorkspacesList } from './useGetWorkspacesList';

describe('useGetWorkspacesList', () => {
  it('should return default', () => {
    const { result } = renderHook(() => useGetWorkspacesList());

    expect(result.current.workspaces).toEqual([]);
    expect(typeof result.current.loadWorkspacesList).toBe('function');

    expect(result.current.error).toBeNull();
    expect(typeof result.current.status).toBe('string');
    expect(typeof result.current.isLoading).toBe('boolean');
  });

  it('should call makeRequest with NULL', () => {
    const makeRequest = jest.fn();

    jest.mock('../useRequest');
    jest
      .spyOn(useRequest, 'useRequest')
      .mockReturnValue({ makeRequest, status: 'idle', isLoading: false, response: null, error: null });

    const { result } = renderHook(() => useGetWorkspacesList());

    act(() => {
      result.current.loadWorkspacesList();
    });

    expect(makeRequest).toHaveBeenCalledTimes(1);
    expect(makeRequest).toHaveBeenCalledWith(null);
  });
});
