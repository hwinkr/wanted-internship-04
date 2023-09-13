import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const initAxiosIntance = (baseUrl: string, options?: AxiosRequestConfig): AxiosInstance => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });
};

export default initAxiosIntance;
