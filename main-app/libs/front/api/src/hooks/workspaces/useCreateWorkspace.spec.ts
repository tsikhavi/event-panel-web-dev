import { renderHook } from '../../../jest.setup';

import { useCreateWorkspace } from './useCreateWorkspace';

describe('useCreateWorkspace', () => {
  it('should return default', async () => {
    const { result } = renderHook(() => useCreateWorkspace());

    expect(result.current.data).toBeNull();
    expect(typeof result.current.createWorkspace).toBe('function');

    expect(result.current.error).toBeNull();
    expect(typeof result.current.status).toBe('string');
    expect(typeof result.current.isLoading).toBe('boolean');
  });
});
