import { renderHook } from '../../../jest.setup';

import { useGroupsList } from './useGroupsList';

describe('useGroupsList', () => {
  it('should return default', () => {
    const { result } = renderHook(() => useGroupsList());

    expect(result.current.list).toEqual([]);
    expect(typeof result.current.getList).toBe('function');
  });
});
