import { renderHook } from '../../../jest.setup';

import { useCreateEvent } from './useCreateEvent';

describe('useCreateEvent', () => {
  it('should return default', () => {
    const { result } = renderHook(() => useCreateEvent());

    expect(result.current.event).toEqual(null);
    expect(typeof result.current.createEvent).toBe('function');
  });
});
