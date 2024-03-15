import { renderHook } from '../../../jest.setup';

import { useProperty } from './useProperty';

describe('useProperty', () => {
  it('should return default', () => {
    const { result } = renderHook(() => useProperty());

    expect(result.current.property).toEqual(null);
    expect(typeof result.current.getProperty).toBe('function');
  });
});
