/**
 * Generated by orval v6.12.1 🍺
 * Do not edit manually.
 * Vol
 * Registration api
 * OpenAPI spec version: 0.1
 */
import {
  useQuery,
  useMutation
} from 'react-query'
import type {
  UseQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  QueryKey
} from 'react-query'
import type {
  VisitorDto,
  NewVisitorDto,
  VisitorsControllerSearchParams
} from '.././schemas'
import { api } from '../../axios';
import type { ErrorType, BodyType } from '../../axios';


// eslint-disable-next-line
  type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P,
) => any
  ? P
  : never;

export const visitorsControllerCreate = (
    newVisitorDto: BodyType<NewVisitorDto>,
 options?: SecondParameter<typeof api>,) => {
      return api<VisitorDto>(
      {url: `/visitors`, method: 'post',
      headers: {'Content-Type': 'application/json', },
      data: newVisitorDto
    },
      options);
    }
  


    export type VisitorsControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof visitorsControllerCreate>>>
    export type VisitorsControllerCreateMutationBody = BodyType<NewVisitorDto>
    export type VisitorsControllerCreateMutationError = ErrorType<unknown>

    export const useVisitorsControllerCreate = <TError = ErrorType<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof visitorsControllerCreate>>, TError,{data: BodyType<NewVisitorDto>}, TContext>, request?: SecondParameter<typeof api>}
) => {
      const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof visitorsControllerCreate>>, {data: BodyType<NewVisitorDto>}> = (props) => {
          const {data} = props ?? {};

          return  visitorsControllerCreate(data,requestOptions)
        }

        

      return useMutation<Awaited<ReturnType<typeof visitorsControllerCreate>>, TError, {data: BodyType<NewVisitorDto>}, TContext>(mutationFn, mutationOptions);
    }
    export const visitorsControllerList = (
    
 options?: SecondParameter<typeof api>,signal?: AbortSignal
) => {
      return api<VisitorDto[]>(
      {url: `/visitors`, method: 'get', signal
    },
      options);
    }
  

export const getVisitorsControllerListQueryKey = () => [`/visitors`];

    
export type VisitorsControllerListQueryResult = NonNullable<Awaited<ReturnType<typeof visitorsControllerList>>>
export type VisitorsControllerListQueryError = ErrorType<unknown>

export const useVisitorsControllerList = <TData = Awaited<ReturnType<typeof visitorsControllerList>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof visitorsControllerList>>, TError, TData>, request?: SecondParameter<typeof api>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getVisitorsControllerListQueryKey();

  


  const queryFn: QueryFunction<Awaited<ReturnType<typeof visitorsControllerList>>> = ({ signal }) => visitorsControllerList(requestOptions, signal);


  

  const query = useQuery<Awaited<ReturnType<typeof visitorsControllerList>>, TError, TData>({ queryKey, queryFn, ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export const visitorsControllerSearch = (
    params: VisitorsControllerSearchParams,
 options?: SecondParameter<typeof api>,signal?: AbortSignal
) => {
      return api<VisitorDto[]>(
      {url: `/visitors/search`, method: 'get',
        params, signal
    },
      options);
    }
  

export const getVisitorsControllerSearchQueryKey = (params: VisitorsControllerSearchParams,) => [`/visitors/search`, ...(params ? [params]: [])];

    
export type VisitorsControllerSearchQueryResult = NonNullable<Awaited<ReturnType<typeof visitorsControllerSearch>>>
export type VisitorsControllerSearchQueryError = ErrorType<unknown>

export const useVisitorsControllerSearch = <TData = Awaited<ReturnType<typeof visitorsControllerSearch>>, TError = ErrorType<unknown>>(
 params: VisitorsControllerSearchParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof visitorsControllerSearch>>, TError, TData>, request?: SecondParameter<typeof api>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getVisitorsControllerSearchQueryKey(params);

  


  const queryFn: QueryFunction<Awaited<ReturnType<typeof visitorsControllerSearch>>> = ({ signal }) => visitorsControllerSearch(params, requestOptions, signal);


  

  const query = useQuery<Awaited<ReturnType<typeof visitorsControllerSearch>>, TError, TData>({ queryKey, queryFn, ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export const visitorsControllerVisit = (
    visitorId: string,
 options?: SecondParameter<typeof api>,) => {
      return api<void>(
      {url: `/visitors/${visitorId}/visit`, method: 'post'
    },
      options);
    }
  


    export type VisitorsControllerVisitMutationResult = NonNullable<Awaited<ReturnType<typeof visitorsControllerVisit>>>
    
    export type VisitorsControllerVisitMutationError = ErrorType<unknown>

    export const useVisitorsControllerVisit = <TError = ErrorType<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof visitorsControllerVisit>>, TError,{visitorId: string}, TContext>, request?: SecondParameter<typeof api>}
) => {
      const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof visitorsControllerVisit>>, {visitorId: string}> = (props) => {
          const {visitorId} = props ?? {};

          return  visitorsControllerVisit(visitorId,requestOptions)
        }

        

      return useMutation<Awaited<ReturnType<typeof visitorsControllerVisit>>, TError, {visitorId: string}, TContext>(mutationFn, mutationOptions);
    }
    export const visitorsControllerUpdateVisitor = (
    visitorId: string,
    newVisitorDto: BodyType<NewVisitorDto>,
 options?: SecondParameter<typeof api>,) => {
      return api<VisitorDto>(
      {url: `/visitors/${visitorId}`, method: 'patch',
      headers: {'Content-Type': 'application/json', },
      data: newVisitorDto
    },
      options);
    }
  


    export type VisitorsControllerUpdateVisitorMutationResult = NonNullable<Awaited<ReturnType<typeof visitorsControllerUpdateVisitor>>>
    export type VisitorsControllerUpdateVisitorMutationBody = BodyType<NewVisitorDto>
    export type VisitorsControllerUpdateVisitorMutationError = ErrorType<unknown>

    export const useVisitorsControllerUpdateVisitor = <TError = ErrorType<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof visitorsControllerUpdateVisitor>>, TError,{visitorId: string;data: BodyType<NewVisitorDto>}, TContext>, request?: SecondParameter<typeof api>}
) => {
      const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof visitorsControllerUpdateVisitor>>, {visitorId: string;data: BodyType<NewVisitorDto>}> = (props) => {
          const {visitorId,data} = props ?? {};

          return  visitorsControllerUpdateVisitor(visitorId,data,requestOptions)
        }

        

      return useMutation<Awaited<ReturnType<typeof visitorsControllerUpdateVisitor>>, TError, {visitorId: string;data: BodyType<NewVisitorDto>}, TContext>(mutationFn, mutationOptions);
    }
    