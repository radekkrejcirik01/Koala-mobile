import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { axiosRequestConfiguration } from '@utils/Axios/Axios.config';
import store from '@store/index/index';
import { mockAdapter } from '@utils/Axios/Axios.mock';
import { resetUserState } from '@store/UserReducer';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';

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

  // Session revoked (e.g. password reset on another device): log out, but only
  // when the request carried the current token, so failed login/sign-up don't
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const { token } = store.getState().user;
      if (
        error.response?.status === 401 &&
        token &&
        error.config?.headers?.authorization === `Bearer ${token}`
      ) {
        store.dispatch(resetUserState());
        PersistStorage.setItem(PersistStorageKeys.TOKEN, '').catch();
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const axiosInstance = initializeAxios(axiosRequestConfiguration);
