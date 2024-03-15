import { renderHook } from '../../../jest.setup';

import { useResetPassword } from './useResetPassword';

describe('useResetPassword', () => {
  it('should return default', async () => {
    const { result } = renderHook(() => useResetPassword());

    expect(result.current.user).toBeNull();
    expect(typeof result.current.resetPassword).toBe('function');

    expect(result.current.error).toBeNull();
    expect(typeof result.current.status).toBe('string');
    expect(typeof result.current.isLoading).toBe('boolean');
  });
});
