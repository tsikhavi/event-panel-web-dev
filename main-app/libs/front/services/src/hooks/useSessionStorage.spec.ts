import { act, renderHook } from '@testing-library/react';

import useSessionStorage, { SessionStorageKeys } from './useSessionStorage';

const key: SessionStorageKeys = 'USER';

describe('useSessionStorage', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should set and get a value in sessionStorage', () => {
    const value1 = 'value1';
    const { result } = renderHook(() => useSessionStorage(key, value1));

    expect(result.current[0]).toBe(value1);

    const value2 = 'value2';
    act(() => result.current[1](value2));

    expect(JSON.parse(sessionStorage.getItem(key) || '')).toBe(value2);
    expect(result.current[0]).toBe(value2);
  });

  it('should return the initial value if no value is in sessionStorage', () => {
    sessionStorage.clear();

    const value = 'value';
    const { result } = renderHook(() => useSessionStorage(key, value));

    expect(result.current[0]).toBe(value);
  });

  it('should clear the value from sessionStorage when set to null', () => {
    const value = 'value';

    sessionStorage.setItem(key, JSON.stringify(value));

    const { result } = renderHook(() => useSessionStorage(key, value));

    act(() => result.current[1](null));

    expect(sessionStorage.getItem(key)).toBe(null);
    expect(result.current[0]).toBe(null);
  });
});
