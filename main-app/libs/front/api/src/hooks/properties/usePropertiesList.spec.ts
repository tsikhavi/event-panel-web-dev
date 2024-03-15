import { renderHook } from '../../../jest.setup';

import { usePropertiesList } from './usePropertiesList';

describe('usePropertiesList', () => {
  it('should return default', () => {
    const { result } = renderHook(() => usePropertiesList());

    expect(result.current.list).toEqual([]);
    expect(typeof result.current.getList).toBe('function');
  });
});
