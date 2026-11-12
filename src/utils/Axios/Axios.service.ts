import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { catchError, defer, map, Observable, of } from 'rxjs';
import { axiosInstance } from '@utils/Axios/Axios.instance';
import { API_URL } from '@utils/Axios/Axios.config';

const catchErrorFunction = (error: AxiosError) => {
  console.error(error);
  return of(null);
};

export const getRequest = <T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Observable<T> =>
  defer(() => axiosInstance.get(`${API_URL}${endpoint}`, config)).pipe(
    map((result: AxiosResponse<T>) => result.data),
    catchError((err: AxiosError) => catchErrorFunction(err))
  );

export const postRequest = <T, B>(
  endpoint: string,
  data: B,
  config?: AxiosRequestConfig
): Observable<T> =>
  defer(() => axiosInstance.post(`${API_URL}${endpoint}`, data, config)).pipe(
    map((result: AxiosResponse<T>) => result.data),
    catchError((err: AxiosError) => catchErrorFunction(err))
  );

export const putRequest = <T, B>(
  endpoint: string,
  data?: B,
  config?: AxiosRequestConfig
): Observable<T> =>
  defer(() => axiosInstance.put(`${API_URL}${endpoint}`, data, config)).pipe(
    map((result: AxiosResponse<T>) => result.data),
    catchError((err: AxiosError) => catchErrorFunction(err))
  );

export const deleteRequest = <T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Observable<T> =>
  defer(() => axiosInstance.delete(`${API_URL}${endpoint}`, config)).pipe(
    map((result: AxiosResponse<T>) => result.data),
    catchError((err: AxiosError) => catchErrorFunction(err))
  );
