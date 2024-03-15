import { renderHook } from '../../../jest.setup';

import { useSignIn } from './useSignIn';

describe('useSignIn', () => {
  it('should return default', async () => {
    const { result } = renderHook(() => useSignIn());

    expect(result.current.user).toBeNull();
    expect(typeof result.current.signIn).toBe('function');

    expect(result.current.error).toBeNull();
    expect(typeof result.current.status).toBe('string');
    expect(typeof result.current.isLoading).toBe('boolean');
  });
});
