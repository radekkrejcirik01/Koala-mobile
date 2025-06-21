import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { catchError, defer, map, Observable, of } from 'rxjs';
import { axiosInstance } from '@utils/Axios/Axios.instance';

const catchErrorFunction = (error: AxiosError) => {
  console.error(error);
  return of(null);
};

export const getRequest = <T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Observable<T> =>
  defer(() =>
    axiosInstance.get(
      `https://f8g89472ta.execute-api.eu-central-1.amazonaws.com/koala/${endpoint}`,
      config
    )
  ).pipe(
    map((result: AxiosResponse<T>) => result.data),
    catchError((err: AxiosError) => catchErrorFunction(err))
  );

export const postRequest = <T, B>(
  endpoint: string,
  data: B,
  config?: AxiosRequestConfig
): Observable<T> =>
  defer(() =>
    axiosInstance.post(
      `https://f8g89472ta.execute-api.eu-central-1.amazonaws.com/koala/${endpoint}`,
      data,
      config
    )
  ).pipe(
    map((result: AxiosResponse<T>) => result.data),
    catchError((err: AxiosError) => catchErrorFunction(err))
  );

export const putRequest = <T, B>(
  endpoint: string,
  data?: B,
  config?: AxiosRequestConfig
): Observable<T> =>
  defer(() =>
    axiosInstance.put(
      `https://f8g89472ta.execute-api.eu-central-1.amazonaws.com/koala/${endpoint}`,
      data,
      config
    )
  ).pipe(
    map((result: AxiosResponse<T>) => result.data),
    catchError((err: AxiosError) => catchErrorFunction(err))
  );

export const deleteRequest = <T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Observable<T> =>
  defer(() =>
    axiosInstance.delete(
      `https://f8g89472ta.execute-api.eu-central-1.amazonaws.com/koala/${endpoint}`,
      config
    )
  ).pipe(
    map((result: AxiosResponse<T>) => result.data),
    catchError((err: AxiosError) => catchErrorFunction(err))
  );
