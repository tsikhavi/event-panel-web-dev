import { renderHook } from '../../../jest.setup';

import { useSignUp } from './useSignUp';

describe('useSignUp', () => {
  it('should return default', async () => {
    const { result } = renderHook(() => useSignUp());

    expect(result.current.user).toBeNull();
    expect(typeof result.current.signUp).toBe('function');

    expect(result.current.error).toBeNull();
    expect(typeof result.current.status).toBe('string');
    expect(typeof result.current.isLoading).toBe('boolean');
  });
});
