import { act, renderHook } from '@testing-library/react';

import { useFilter } from './useFilter';

describe('useFilter', () => {
  it('should return initValue', () => {
    const initValue = ['1'];
    const { result } = renderHook(() => useFilter({ initValue }));

    expect(result.current.value).toEqual(initValue);
  });

  it('should call loadOptions onSearch', () => {
    const loadOptions = jest.fn();
    const { result } = renderHook(() => useFilter({ loadOptions }));

    act(() => result.current.onSearch('search'));
    expect(loadOptions).toHaveBeenCalledTimes(1);
  });

  it('should change value onChange', () => {
    const value = ['value'];
    const { result } = renderHook(() => useFilter());

    act(() => result.current.onChange(value));
    expect(result.current.value).toEqual(value);
  });
});
