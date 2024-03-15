import { act, renderHook } from '@testing-library/react';

import useLocalStorage, { LocalStorageKeys } from './useLocalStorage';

const key: LocalStorageKeys = 'USER';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should set and get a value in localStorage', () => {
    const value1 = 'value1';
    const { result } = renderHook(() => useLocalStorage(key, value1));

    expect(result.current[0]).toBe(value1);

    const value2 = 'value2';
    act(() => result.current[1](value2));

    expect(JSON.parse(localStorage.getItem(key) || '')).toBe(value2);
    expect(result.current[0]).toBe(value2);
  });

  it('should return the initial value if no value is in localStorage', () => {
    localStorage.clear();

    const value = 'value';
    const { result } = renderHook(() => useLocalStorage(key, value));

    expect(result.current[0]).toBe(value);
  });

  it('should clear the value from localStorage when set to null', () => {
    const value = 'value';

    localStorage.setItem(key, JSON.stringify(value));

    const { result } = renderHook(() => useLocalStorage(key, value));

    act(() => result.current[1](null));

    expect(localStorage.getItem(key)).toBeNull();
    expect(result.current[0]).toBeNull();
  });
});
