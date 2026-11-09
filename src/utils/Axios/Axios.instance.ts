import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { axiosRequestConfiguration } from '@utils/Axios/Axios.config';
import store from '@store/index/index';
import { mockAdapter } from '@utils/Axios/Axios.mock';

// Serves fake data for App Store screenshots, never ship enabled
const MOCK_DATA = __DEV__ && false;

const initializeAxios = (config: AxiosRequestConfig): AxiosInstance => {
  const axiosInstance: AxiosInstance = axios.create(
    MOCK_DATA ? { ...config, adapter: mockAdapter } : config
  );

  axiosInstance.interceptors.request.use(
    (request: AxiosRequestConfig) => {
      const { token } = store.getState().user;
      if (token) {
        request.headers = {
          ...request.headers,
          authorization: `Bearer ${token}`
        };
      }
      return request;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  return axiosInstance;
};

export const axiosInstance = initializeAxios(axiosRequestConfiguration);
