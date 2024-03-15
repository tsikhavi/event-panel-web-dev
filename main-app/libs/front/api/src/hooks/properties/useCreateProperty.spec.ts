import { renderHook } from '../../../jest.setup';

import { useCreateProperty } from './useCreateProperty';

describe('useCreateProperty', () => {
  it('should return default', () => {
    const { result } = renderHook(() => useCreateProperty());

    expect(result.current.property).toEqual(null);
    expect(typeof result.current.createProperty).toBe('function');
  });
});
