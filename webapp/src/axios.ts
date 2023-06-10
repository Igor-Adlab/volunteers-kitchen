import Axios, { AxiosRequestConfig, AxiosError } from 'axios';
 
 export const AXIOS_INSTANCE = Axios.create({ 
    baseURL: process.env.REACT_APP_API,
});
 
 // add a second `options` argument here if you want to pass extra options to each generated query
 export const api = <T>(
   config: AxiosRequestConfig,
   options?: AxiosRequestConfig,
 ): Promise<T> => {
   const source = Axios.CancelToken.source();
   const promise = AXIOS_INSTANCE({
     ...config,
     ...options,
     cancelToken: source.token,
   }).then(({ data }) => data);
 
   // @ts-ignore
   promise.cancel = () => {
     source.cancel('Query was cancelled');
   };
 
   return promise;
 };
 
 // In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
 export type ErrorType<Error> = AxiosError<Error>;
 // In case you want to wrap the body type (optional)
 // (if the custom instance is processing data before sending it, like changing the case for example)
 export type BodyType<BodyData> = Partial<BodyData>;