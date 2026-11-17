import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { catchError, defer, map, Observable, of } from 'rxjs';
import { axiosInstance } from '@utils/Axios/Axios.instance';
import { API_URL } from '@utils/Axios/Axios.config';

// The account email and password reset endpoints answer wrong input with 400
// and the reason in the body, `errorBody` passes that body on instead of null
type RequestConfig = AxiosRequestConfig & { errorBody?: boolean };

const catchErrorFunction = (error: AxiosError, config?: RequestConfig) => {
  if (config?.errorBody && error.response?.status === 400) {
    return of(error.response.data);
  }
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
  config?: RequestConfig
): Observable<T> =>
  defer(() => axiosInstance.post(`${API_URL}${endpoint}`, data, config)).pipe(
    map((result: AxiosResponse<T>) => result.data),
    catchError((err: AxiosError) => catchErrorFunction(err, config))
  );

export const putRequest = <T, B>(
  endpoint: string,
  data?: B,
  config?: RequestConfig
): Observable<T> =>
  defer(() => axiosInstance.put(`${API_URL}${endpoint}`, data, config)).pipe(
    map((result: AxiosResponse<T>) => result.data),
    catchError((err: AxiosError) => catchErrorFunction(err, config))
  );

export const deleteRequest = <T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Observable<T> =>
  defer(() => axiosInstance.delete(`${API_URL}${endpoint}`, config)).pipe(
    map((result: AxiosResponse<T>) => result.data),
    catchError((err: AxiosError) => catchErrorFunction(err))
  );
