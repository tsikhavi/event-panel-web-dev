import { renderHook } from '../../../jest.setup';

import { useCreateCategory } from './useCreateCategory';

describe('useCreateCategory', () => {
  it('should return default', () => {
    const { result } = renderHook(() => useCreateCategory());

    expect(result.current.category).toEqual(null);
    expect(typeof result.current.createCategory).toBe('function');
  });
});
