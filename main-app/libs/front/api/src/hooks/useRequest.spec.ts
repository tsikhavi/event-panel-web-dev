import { AxiosError } from 'axios';

import { act, renderHook } from '../../jest.setup';
import { ErrorType } from '../api/base.api';

import { useRequest } from './useRequest';

describe('useRequest', () => {
  it('should return init values', () => {
    const { result } = renderHook(() => useRequest(jest.fn()));

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.status).toBe('idle');
    expect(result.current.response).toBeNull();
    expect(result.current.error).toBeNull();
  });

  describe('request function', () => {
    it('should handle a successful request', async () => {
      const response = 'Success';
      const requestFn = jest.fn().mockResolvedValue(response);
      const { result, waitForNextUpdate } = renderHook(() => useRequest(requestFn));

      act(() => {
        result.current.makeRequest({});
      });

      expect(result.current.status).toBe('pending');
      expect(result.current.isLoading).toBeTruthy();

      await waitForNextUpdate();

      expect(result.current.response).toBe(response);
      expect(result.current.status).toBe('success');
      expect(result.current.isLoading).toBeFalsy();
      expect(result.current.error).toBeNull();
    });

    it('should handle a failed request', async () => {
      const errorMessage = 'Error Message';
      const requestFn = jest.fn().mockRejectedValue({ message: errorMessage } as AxiosError<ErrorType>);
      const { result, waitForNextUpdate } = renderHook(() => useRequest(requestFn));

      act(() => {
        result.current.makeRequest({});
      });

      expect(result.current.status).toBe('pending');
      expect(result.current.isLoading).toBeTruthy();

      await waitForNextUpdate();

      expect(result.current.error).toBe(errorMessage);
      expect(result.current.isLoading).toBeFalsy();
      expect(result.current.status).toBe('failed');
      expect(result.current.response).toBeNull();
    });
  });
});
