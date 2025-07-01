import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { odataCrudDataProvider } from "../providers/odataCrudDataProvider";
import { HttpError } from "../providers/types/HttpError";
import { useCallback, useMemo, useState } from "react";
import { dataProvider as provider } from "@/providers/dataProvider";
import {
  BaseRecord,
  CreateResponse,
  CrudFilters,
  CrudSorting,
  CustomParams,
  CustomResponse,
  DeleteOneResponse,
  GetListResponse,
  GetManyResponse,
  GetOneResponse,
  Join,
  UpdateResponse,
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
  | "DMCategories"
  | "Organizations/GetByUser";

interface MetaQuery {
  join?: Join[];
  config?: {
    subSystem?: "admin" | "buss" | "default";
    auth?: "allow" | "auth" | "public"; // naming to scope
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
      ...(params.pagination && {
        pagination: { pageSize, page },
      }),
      filters,
      sorters,
    },
  ];

  const query = useQuery({
    ...params.queryOptions,
    queryKey,
    queryFn: async () => {
      const shouldPaginate = !!params.pagination;

      const result = await provider.getList({
        ...params,
        filters,
        sorters,
        ...(shouldPaginate
          ? {
              pagination: {
                pageSize,
                current: page,
              },
            }
          : {}),
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

interface UseCreateParams<T>
  extends UseMutationOptions<CreateResponse<T>, Error, T> {
  resource: string;
  meta?: Omit<MetaQuery, "join">;
}

export const useCreate = <T = BaseRecord>({
  resource,
  meta,
  ...rest
}: UseCreateParams<T>) => {
  return useMutation<CreateResponse<T>, Error, T>({
    ...rest,
    mutationFn: async (variables: T) => {
      const result = await provider.create({
        resource: resource,
        variables,
        meta: meta,
      });
      return result as CreateResponse<T>;
    },
  });
};
interface UseUpdateParams<T = BaseRecord>
  extends UseMutationOptions<UpdateResponse<T>, Error, T> {
  resource: string;
  id: string | number;
  variables?: T;
  meta?: Omit<MetaQuery, "join">;
}

export const useUpdate = <T = BaseRecord>({
  resource,
  meta,
  id,
  ...rest
}: UseUpdateParams<T>) => {
  return useMutation<UpdateResponse<T>, Error, T>({
    ...rest,
    mutationFn: async (values: T) => {
      const result = await provider.update({
        resource: resource,
        id: id,
        variables: values,
        ...(meta ? { meta: meta } : {}),
      });
      return result as UpdateResponse<T>;
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

export interface UseDeleteParams
  extends UseMutationOptions<void, Error, unknown> {
  resource: string;
  meta?: Omit<MetaQuery, "join">;
}

export const useDelete = ({ resource, meta, ...rest }: UseDeleteParams) => {
  return useMutation({
    ...rest,
    mutationFn: async (id: string) => {
      await provider.deleteOne({
        resource: resource,
        id,
        meta: meta,
      });
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

export const useGetSource = () => {
  return useCallback((path: string) => {
    if (!path) {
      return undefined;
    }
    return provider.getSource(path);
  }, []);
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
  url: string;
  method?: "get";
  queryOptions?: Omit<
    UseQueryOptions<
      CustomResponse<TQueryFnData>,
      TError,
      CustomResponse<TData>
    >,
    "queryKey"
  >;
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
  method = "get",
  queryOptions,
  meta,
}: UseCustomProps<TQueryFnData, TError, TQuery, TPayload, TData>) => {
  return useQuery({
    queryKey: ["custom", url, method, meta],
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
