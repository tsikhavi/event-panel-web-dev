import { renderHook } from '../../../jest.setup';

import { useGroup } from './useGroup';

describe('useGroup', () => {
  it('should return default', () => {
    const { result } = renderHook(() => useGroup());

    expect(result.current.group).toEqual(null);
    expect(typeof result.current.getGroup).toBe('function');
  });
});
