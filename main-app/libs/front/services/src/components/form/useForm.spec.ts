import React from 'react';

import { act, renderHook } from '../../../jest.setup';

import { TestDto, testForm } from './__test-data__';
import { useForm } from './useForm';

const mockEvent = {
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
} as unknown as React.FormEvent<HTMLFormElement>;

describe('useForm', () => {
  it('should return default', () => {
    const { result } = renderHook(() => useForm({ initForm: testForm, Resolver: TestDto }));

    expect(result.current.control.current.getForm()).toEqual(testForm);
    expect(result.current.isSubmitted).toBeFalsy();

    expect(typeof result.current.handleSubmit).toBe('function');
  });

  it('should call callback on handleSubmit', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useForm({ initForm: testForm, Resolver: TestDto }));

    jest.spyOn(result.current.control.current, 'hasError').mockReturnValue(false);

    act(() => result.current.handleSubmit(callback)(mockEvent));

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(testForm);
    expect(result.current.isSubmitted).toBeTruthy();
  });

  it('should NOT call callback on handleSubmit when has error', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useForm({ initForm: testForm, Resolver: TestDto }));

    jest.spyOn(result.current.control.current, 'hasError').mockReturnValue(true);

    act(() => result.current.handleSubmit(callback)(mockEvent));

    expect(callback).toHaveBeenCalledTimes(0);
    expect(result.current.isSubmitted).toBeTruthy();
  });
});
