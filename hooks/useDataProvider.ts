import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { odataCrudDataProvider } from "../providers/odataCrudDataProvider";
import { HttpError } from "../providers/types/HttpError";
import { useState } from "react";
import { dataProvider as provider } from "@/providers/dataProvider";
import {
  BaseRecord,
  CrudFilters,
  CrudSorting,
  CustomParams,
  CustomResponse,
  GetListResponse,
  GetManyResponse,
  GetOneResponse,
} from "@/providers/types/IDataContext";

// Initialize dataProvider with API URL
// const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
// const provider = odataCrudDataProvider(apiUrl);

type Resource =
  | "Organizations"
  | "Jobs"
  | "Applicants"
  | "Favorites"
  | "DMTinhs"
  | "DMXas"
  | "DMHuyens"
  | "Applications"
  | "Resumes"
  | "DMCategories";

interface MetaQuery {
  join?: string[];
  config?: {
    subSystem?: "admin" | "buss" | "default";
    auth?: "allow" | "auth" | "public";
  };
}

interface UseListParams<TQueryFnData> {
  resource: Resource;
  pagination?: {
    current?: number;
    pageSize?: number;
  };
  filters?: any[];
  sorters?: any[];
  meta?: MetaQuery;
  queryOptions?: Omit<
    UseQueryOptions<GetListResponse<TQueryFnData>>,
    "queryKey"
  >;
}

export const useList = <TQueryFnData extends BaseRecord = BaseRecord>(
  params: UseListParams<TQueryFnData>
) => {
  const [pageSize, setPageSize] = useState(params.pagination?.pageSize || 10);
  const [page, setPage] = useState(params.pagination?.current || 1);
  const [filters, setFilters] = useState(params.filters || []);
  const [sorters, setSorters] = useState(params.sorters || []);

  const queryKey = [
    "list",
    params.resource,
    {
      ...params,
      pagination: { pageSize, page },
      filters,
      sorters,
    },
  ];

  const query = useQuery({
    ...params.queryOptions,
    queryKey,
    queryFn: async () => {
      const result = await provider.getList({
        ...params,
        filters,
        sorters,
        pagination: {
          pageSize,
          current: page,
        },
      });
      return {
        data: result.data as TQueryFnData[],
        total: result.total,
      };
    },
  });

  const pageCount = query.data?.total
    ? Math.ceil(query.data.total / pageSize)
    : 0;

  return {
    ...query,
    pageCount,
    setPageSize,
    setPage,
    setFilters,
    setSorters,
    filters,
    sorters,
    pagination: {
      current: page,
      pageSize,
    },
    reload: query.refetch,
  };
};

interface UseManyParams<TQueryFnData> {
  resource: string;
  ids: (string | number)[];
  meta?: MetaQuery;
  queryOptions?: Omit<
    UseQueryOptions<GetManyResponse<TQueryFnData>>,
    "queryKey"
  >;
}

export const useMany = <TQueryFnData extends BaseRecord = BaseRecord>(
  params: UseManyParams<TQueryFnData>
) => {
  const queryKey = ["many", params.resource, params.ids, params.meta];

  return useQuery({
    ...params.queryOptions,
    queryKey,
    queryFn: async () => {
      const result = await provider.getMany(params);
      return {
        data: result.data as TQueryFnData[],
      };
    },
    enabled: params.ids.length > 0,
  });
};

interface UseOneParams<TQueryFnData> {
  resource: string;
  id: string | number;
  meta?: MetaQuery;
  queryOptions?: Omit<
    UseQueryOptions<GetOneResponse<TQueryFnData>>,
    "queryKey"
  >;
}

export const useOne = <TQueryFnData extends BaseRecord = BaseRecord>(
  params: UseOneParams<TQueryFnData>
) => {
  const queryKey = ["one", params.resource, params.id, params.meta];

  return useQuery({
    ...params.queryOptions,
    queryKey,
    queryFn: async () => {
      const result = await provider.getOne(params);
      return {
        data: result.data as TQueryFnData,
      };
    },
    enabled: !!params.id,
  });
};

interface UseCreateParams<T = any> {
  resource: string;
}

export const useCreate = <T = any>(params: UseCreateParams<T>) => {
  return useMutation({
    mutationFn: async (variables: T) => {
      const result = await provider.create({
        resource: params.resource,
        variables: variables,
      });
      return result.data as T;
    },
    onSuccess(data, variables, context) {},
  });
};

interface UseUpdateParams<T = any> {
  resource: string;
  id: string | number;
  variables?: T;
  meta?: MetaQuery;
}

export const useUpdate = <T = any>(params: UseUpdateParams<T>) => {
  return useMutation({
    mutationFn: async (variables?: T) => {
      const result = await provider.update({
        resource: params.resource,
        id: params.id,
        variables: variables || params.variables,
        ...(params.meta ? { meta: params.meta } : {}),
      });
      return result.data as T;
    },
  });
};

export const useUpdateNew = <T = any>(params: UseUpdateParams<T>) => {
  return useMutation({
    mutationFn: async (variables?: T) => {
      const result = await provider.updateNew({
        resource: params.resource,
        id: params.id,
        variables: variables || params.variables,
        ...(params.meta ? { meta: params.meta } : {}),
      });
      return result.data as T;
    },
  });
};

export interface UseDeleteParams {
  resource: string;
  id: string | number;
}

export const useDelete = (params: UseDeleteParams) => {
  return useMutation({
    mutationFn: async () => {
      await provider.deleteOne(params);
    },
  });
};


export const useDeleteNew = () => {
  return useMutation({
    mutationFn: async (params: UseDeleteParams) => {
      await provider.deleteOne(params);
    },
  });
};

interface UseDeleteManyParams {
  resource: string;
  ids: (string | number)[];
}

export const useDeleteMany = (params: UseDeleteManyParams) => {
  return useMutation({
    mutationFn: async () => {
      await provider.deleteMany(params);
    },
  });
};

export const useApi = () => provider.getApiUrl();

interface UseCustomConfig<TQuery = unknown, TPayload = unknown> {
  sort?: CrudSorting;
  sorters?: CrudSorting;
  filters?: CrudFilters;
  query?: TQuery;
  payload?: TPayload;
  headers?: {};
}

type Method = "get" | "delete" | "head" | "options" | "post" | "put" | "patch";

export type UseCustomProps<TQueryFnData, TError, TQuery, TPayload, TData> = {
  /**
   * request's URL
   */
  url: string;
  /**
   * request's method (`GET`, `POST`, etc.)
   */
  method: "get";
  /**
   * The config of your request. You can send headers, payload, query, filters and sorters using this field
   */
  config?: UseCustomConfig<TQuery, TPayload>;
  /**
   * react-query's [useQuery](https://tanstack.com/query/v4/docs/reference/useQuery) options"
   */
  queryOptions?: Omit<
    UseQueryOptions<
      CustomResponse<TQueryFnData>,
      TError,
      CustomResponse<TData>
    >,
    "queryKey"
  >;

  /**
   * meta data for `dataProvider`
   */
  meta?: MetaQuery;
  payload?: TPayload;
};

export const useCustom = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TQuery = unknown,
  TPayload = unknown,
  TData extends BaseRecord = TQueryFnData
>({
  url,
  method,
  config,
  queryOptions,
  meta,
}: UseCustomProps<TQueryFnData, TError, TQuery, TPayload, TData>) => {
  return useQuery({
    queryKey: ["custom", url, method, config, meta],
    queryFn: () =>
      provider.custom<TQueryFnData>({
        url,
        method,
        meta,
      }),
    ...queryOptions,
  });
};

export type UseCustomMutationProps<
  TQueryFnData,
  TError,
  TQuery,
  TPayload,
  TData
> = {
  method: Exclude<Method, "get">;
  url: string;
  config?: UseCustomConfig<TQuery, TPayload>;
  queryOptions?: Omit<
    UseMutationOptions<CustomResponse<TQueryFnData>, TError, TPayload>,
    "mutationKey"
  >;
  meta?: MetaQuery;
};

export const useCustomMutation = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TQuery = unknown,
  TPayload = unknown,
  TData extends BaseRecord = TQueryFnData
>({
  url,
  method,
  config,
  queryOptions,
  meta,
}: UseCustomMutationProps<TQueryFnData, TError, TQuery, TPayload, TData>) => {
  return useMutation({
    mutationKey: ["custom", url, method, config, meta],
    mutationFn: (payload: TPayload) =>
      provider.custom<TQueryFnData>({
        url,
        method,
        meta,
        payload,
      }),
    ...queryOptions,
  });
};
