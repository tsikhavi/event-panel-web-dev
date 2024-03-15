import { renderHook } from '../../../jest.setup';

import { useCreateGroup } from './useCreateGroup';

describe('useCreateGroup', () => {
  it('should return default', () => {
    const { result } = renderHook(() => useCreateGroup());

    expect(result.current.group).toEqual(null);
    expect(typeof result.current.createGroup).toBe('function');
  });
});
