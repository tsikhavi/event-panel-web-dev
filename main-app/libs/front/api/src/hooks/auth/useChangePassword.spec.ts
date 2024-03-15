import { renderHook } from '../../../jest.setup';

import { useChangePassword } from './useChangePassword';

describe('useChangePassword', () => {
  it('should return default', async () => {
    const { result } = renderHook(() => useChangePassword());

    expect(result.current.user).toBeNull();
    expect(typeof result.current.changePassword).toBe('function');

    expect(result.current.error).toBeNull();
    expect(typeof result.current.status).toBe('string');
    expect(typeof result.current.isLoading).toBe('boolean');
  });
});
