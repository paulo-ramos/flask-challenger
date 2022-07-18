import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {

  if (error.message === 'Network Error') {
    return Promise.reject(new Error(error.request.Url));
  }

  return Promise.reject(error);
};