import { AxiosRequestConfig } from 'axios';

export const API_URL = 'https://api.koalasharing.com/';

export const axiosRequestConfiguration: AxiosRequestConfig = {
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
};
