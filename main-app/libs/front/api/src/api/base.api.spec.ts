import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { baseURL } from '../../jest.setup';

import BaseApi, { ErrorType } from './base.api';

describe('BaseApi', () => {
  let baseApi: BaseApi;

  const url = '/endpoint';
  const body = { test: 'Test' };
  const config = undefined;

  beforeEach(() => {
    baseApi = new BaseApi(baseURL);
  });

  afterAll(() => {
    localStorage.clear();
  });

  describe('Interceptors', () => {
    it('should NOT return Authorization token', () => {
      const { headers } = baseApi.addTokenInterceptors({ headers: {} } as InternalAxiosRequestConfig);
      expect(headers.Authorization).toBe(undefined);
    });

    it('should return Authorization token', () => {
      const token = 'token';
      localStorage.setItem('TOKEN', JSON.stringify(token));

      const { headers } = baseApi.addTokenInterceptors({ headers: {} } as InternalAxiosRequestConfig);
      expect(headers.Authorization).toBe(`Bearer ${token}`);
    });

    it('should return error message', async () => {
      const axiosError = { message: 'some error' } as AxiosError<ErrorType>;
      try {
        await baseApi.addErrorHandlerInterceptors(axiosError);
      } catch (error) {
        expect(error).toEqual(axiosError);
      }
    });
  });

  it('should create an instance of Axios with the provided baseURL', () => {
    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  it('should make a GET request with URL', async () => {
    await baseApi.get(url);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(url, config);
  });

  it('should make a PUT request with URL & body', async () => {
    await baseApi.put(url, body);

    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith(url, body, config);
  });

  it('should make a POST request with URL & body', async () => {
    await baseApi.post(url, body);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(url, body, config);
  });

  it('should make a DELETE request with URL', async () => {
    await baseApi.delete(url);

    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith(url, config);
  });
});
