import { act, renderHook } from '@testing-library/react';

import { useSearchField } from './useSearchField';

describe('useSearchField', () => {
  it('should change value onSearch', () => {
    const value = 'value';
    const { result } = renderHook(() => useSearchField());

    expect(result.current.value).toEqual('');

    act(() => result.current.onSearch(value));
    expect(result.current.value).toEqual(value);
  });

  it('should set initValue', () => {
    const initValue = 'initValue';
    const { result } = renderHook(() => useSearchField({ initValue }));

    expect(result.current.value).toEqual(initValue);
  });

  it('should call loadSuggestions onSearch', () => {
    const value = 'value';
    const loadSuggestions = jest.fn();
    const { result } = renderHook(() => useSearchField({ loadSuggestions }));

    act(() => result.current.onSearch(value));
    expect(loadSuggestions).toHaveBeenCalledTimes(1);
    expect(loadSuggestions).toHaveBeenCalledWith(value);
  });
});
