import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export type ErrorType = {
  message: string;
};

class BaseApi {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({ baseURL });

    // Request
    this.axiosInstance.interceptors.request.use(this.addTokenInterceptors);

    // Response
    this.axiosInstance.interceptors.response.use(null, this.addErrorHandlerInterceptors);
  }

  async get<Resp>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Resp>> {
    return this.axiosInstance.get<Resp>(url, config);
  }

  async post<Resp, Req>(url: string, data?: Req, config?: AxiosRequestConfig): Promise<AxiosResponse<Resp>> {
    return this.axiosInstance.post<Resp>(url, data, config);
  }

  async put<Resp, Req>(url: string, data?: Req, config?: AxiosRequestConfig): Promise<AxiosResponse<Resp>> {
    return this.axiosInstance.put<Resp>(url, data, config);
  }

  async delete<Resp>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Resp>> {
    return this.axiosInstance.delete<Resp>(url, config);
  }

  addTokenInterceptors(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const token = JSON.parse(localStorage.getItem('TOKEN') || JSON.stringify(null));

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }

  addErrorHandlerInterceptors(error: AxiosError<ErrorType>): Promise<ErrorType> {
    return Promise.reject({
      message: error.response?.data.message || error.message,
    });
  }
}

export default BaseApi;
