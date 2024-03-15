import { renderHook } from '../../../jest.setup';

import { useCategory } from './useCategory';

describe('useCategory', () => {
  it('should return default', () => {
    const { result } = renderHook(() => useCategory());

    expect(result.current.category).toEqual(null);
    expect(typeof result.current.getCategory).toBe('function');
  });
});
