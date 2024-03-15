import { renderHook } from '../../../jest.setup';

import { useEvent } from './useEvent';

describe('useEvent', () => {
  it('should return default', () => {
    const { result } = renderHook(() => useEvent());

    expect(result.current.event).toEqual(null);
    expect(typeof result.current.getEvent).toBe('function');
  });
});
