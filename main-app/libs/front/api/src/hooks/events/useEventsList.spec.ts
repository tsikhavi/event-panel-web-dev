import { renderHook } from '../../../jest.setup';

import { useEventsList } from './useEventsList';

describe('useEventsList', () => {
  it('should return default', () => {
    const { result } = renderHook(() => useEventsList());

    expect(result.current.list).toEqual([]);
    expect(typeof result.current.getList).toBe('function');
  });
});
