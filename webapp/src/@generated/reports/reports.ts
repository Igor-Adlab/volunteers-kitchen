/**
 * Generated by orval v6.12.1 🍺
 * Do not edit manually.
 * Vol
 * Registration api
 * OpenAPI spec version: 0.1
 */
import {
  useQuery
} from 'react-query'
import type {
  UseQueryOptions,
  QueryFunction,
  UseQueryResult,
  QueryKey
} from 'react-query'
import type {
  DailyReportDto,
  ReportControllerGetDailyReportParams,
  WeeklyReportDto,
  ReportControllerGetWeeklyReportParams,
  MonthlyReportDto,
  ReportControllerGetMonthlyReportParams,
  VisitorDto,
  ReportControllerGetExtendedMonthlyReportParams
} from '.././schemas'
import { api } from '../../axios';
import type { ErrorType } from '../../axios';


// eslint-disable-next-line
  type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P,
) => any
  ? P
  : never;

export const reportControllerGetDailyReport = (
    params: ReportControllerGetDailyReportParams,
 options?: SecondParameter<typeof api>,signal?: AbortSignal
) => {
      return api<DailyReportDto>(
      {url: `/report/daily`, method: 'get',
        params, signal
    },
      options);
    }
  

export const getReportControllerGetDailyReportQueryKey = (params: ReportControllerGetDailyReportParams,) => [`/report/daily`, ...(params ? [params]: [])];

    
export type ReportControllerGetDailyReportQueryResult = NonNullable<Awaited<ReturnType<typeof reportControllerGetDailyReport>>>
export type ReportControllerGetDailyReportQueryError = ErrorType<unknown>

export const useReportControllerGetDailyReport = <TData = Awaited<ReturnType<typeof reportControllerGetDailyReport>>, TError = ErrorType<unknown>>(
 params: ReportControllerGetDailyReportParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof reportControllerGetDailyReport>>, TError, TData>, request?: SecondParameter<typeof api>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getReportControllerGetDailyReportQueryKey(params);

  


  const queryFn: QueryFunction<Awaited<ReturnType<typeof reportControllerGetDailyReport>>> = ({ signal }) => reportControllerGetDailyReport(params, requestOptions, signal);


  

  const query = useQuery<Awaited<ReturnType<typeof reportControllerGetDailyReport>>, TError, TData>({ queryKey, queryFn, ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export const reportControllerGetWeeklyReport = (
    params: ReportControllerGetWeeklyReportParams,
 options?: SecondParameter<typeof api>,signal?: AbortSignal
) => {
      return api<WeeklyReportDto>(
      {url: `/report/weekly`, method: 'get',
        params, signal
    },
      options);
    }
  

export const getReportControllerGetWeeklyReportQueryKey = (params: ReportControllerGetWeeklyReportParams,) => [`/report/weekly`, ...(params ? [params]: [])];

    
export type ReportControllerGetWeeklyReportQueryResult = NonNullable<Awaited<ReturnType<typeof reportControllerGetWeeklyReport>>>
export type ReportControllerGetWeeklyReportQueryError = ErrorType<unknown>

export const useReportControllerGetWeeklyReport = <TData = Awaited<ReturnType<typeof reportControllerGetWeeklyReport>>, TError = ErrorType<unknown>>(
 params: ReportControllerGetWeeklyReportParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof reportControllerGetWeeklyReport>>, TError, TData>, request?: SecondParameter<typeof api>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getReportControllerGetWeeklyReportQueryKey(params);

  


  const queryFn: QueryFunction<Awaited<ReturnType<typeof reportControllerGetWeeklyReport>>> = ({ signal }) => reportControllerGetWeeklyReport(params, requestOptions, signal);


  

  const query = useQuery<Awaited<ReturnType<typeof reportControllerGetWeeklyReport>>, TError, TData>({ queryKey, queryFn, ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export const reportControllerGetMonthlyReport = (
    params: ReportControllerGetMonthlyReportParams,
 options?: SecondParameter<typeof api>,signal?: AbortSignal
) => {
      return api<MonthlyReportDto>(
      {url: `/report/monthly`, method: 'get',
        params, signal
    },
      options);
    }
  

export const getReportControllerGetMonthlyReportQueryKey = (params: ReportControllerGetMonthlyReportParams,) => [`/report/monthly`, ...(params ? [params]: [])];

    
export type ReportControllerGetMonthlyReportQueryResult = NonNullable<Awaited<ReturnType<typeof reportControllerGetMonthlyReport>>>
export type ReportControllerGetMonthlyReportQueryError = ErrorType<unknown>

export const useReportControllerGetMonthlyReport = <TData = Awaited<ReturnType<typeof reportControllerGetMonthlyReport>>, TError = ErrorType<unknown>>(
 params: ReportControllerGetMonthlyReportParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof reportControllerGetMonthlyReport>>, TError, TData>, request?: SecondParameter<typeof api>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getReportControllerGetMonthlyReportQueryKey(params);

  


  const queryFn: QueryFunction<Awaited<ReturnType<typeof reportControllerGetMonthlyReport>>> = ({ signal }) => reportControllerGetMonthlyReport(params, requestOptions, signal);


  

  const query = useQuery<Awaited<ReturnType<typeof reportControllerGetMonthlyReport>>, TError, TData>({ queryKey, queryFn, ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export const reportControllerGetExtendedMonthlyReport = (
    params: ReportControllerGetExtendedMonthlyReportParams,
 options?: SecondParameter<typeof api>,signal?: AbortSignal
) => {
      return api<VisitorDto[]>(
      {url: `/report/extended/monthly`, method: 'get',
        params, signal
    },
      options);
    }
  

export const getReportControllerGetExtendedMonthlyReportQueryKey = (params: ReportControllerGetExtendedMonthlyReportParams,) => [`/report/extended/monthly`, ...(params ? [params]: [])];

    
export type ReportControllerGetExtendedMonthlyReportQueryResult = NonNullable<Awaited<ReturnType<typeof reportControllerGetExtendedMonthlyReport>>>
export type ReportControllerGetExtendedMonthlyReportQueryError = ErrorType<unknown>

export const useReportControllerGetExtendedMonthlyReport = <TData = Awaited<ReturnType<typeof reportControllerGetExtendedMonthlyReport>>, TError = ErrorType<unknown>>(
 params: ReportControllerGetExtendedMonthlyReportParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof reportControllerGetExtendedMonthlyReport>>, TError, TData>, request?: SecondParameter<typeof api>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getReportControllerGetExtendedMonthlyReportQueryKey(params);

  


  const queryFn: QueryFunction<Awaited<ReturnType<typeof reportControllerGetExtendedMonthlyReport>>> = ({ signal }) => reportControllerGetExtendedMonthlyReport(params, requestOptions, signal);


  

  const query = useQuery<Awaited<ReturnType<typeof reportControllerGetExtendedMonthlyReport>>, TError, TData>({ queryKey, queryFn, ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

