import { useMutation, useQuery } from "@tanstack/react-query";
import { odataCrudDataProvider } from "../providers/odataCrudDataProvider";
import { HttpError } from "../providers/types/HttpError";
import { useState } from "react";
import { dataProvider as provider } from "@/providers/dataProvider";

// Initialize dataProvider with API URL
// const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
// const provider = odataCrudDataProvider(apiUrl);

interface MetaQuery {
  join: string[];
}

interface UseListParams {
  resource: string;
  pagination?: {
    current?: number;
    pageSize?: number;
  };
  filters?: any[];
  sorters?: any[];
  meta?: MetaQuery;
}

export const useList = <T = any>(params: UseListParams) => {
  const [pageSize, setPageSize] = useState(params.pagination?.pageSize || 10);
  const [page, setPage] = useState(params.pagination?.current || 1);

  const query = useQuery({
    queryKey: [
      "list",
      params.resource,
      { ...params, pagination: { pageSize, page } },
    ],
    queryFn: async () => {
      const result = await provider.getList({
        ...params,
        pagination: {
          pageSize,
          current: page,
        },
      });
      return {
        data: result.data as T[],
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
    pagination: {
      current: page,
      pageSize,
    },
  };
};

interface UseManyParams {
  resource: string;
  ids: (string | number)[];
  meta?: MetaQuery;
}

export const useMany = <T = any>(params: UseManyParams) => {
  return useQuery({
    queryKey: ["many", params.resource, params.ids, params.meta],
    queryFn: async () => {
      const result = await provider.getMany(params);
      return {
        data: result.data as T[],
      };
    },
    enabled: params.ids.length > 0,
  });
};

interface UseOneParams {
  resource: string;
  id: string | number;
  meta?: MetaQuery;
}

export const useOne = <T = any>(params: UseOneParams) => {
  return useQuery({
    queryKey: ["one", params.resource, params.id, params.meta],
    queryFn: async () => {
      const result = await provider.getOne(params);
      return {
        data: result.data as T,
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
    onSuccess(data, variables, context) {
      
    },
  });
};

interface UseUpdateParams<T = any> {
  resource: string;
  id: string | number;
  variables: T;
}

export const useUpdate = <T = any>(params: UseUpdateParams<T>) => {
  return useMutation({
    mutationFn: async (variables?: T) => {
      const result = await provider.update({
        resource: params.resource,
        id: params.id,
        variables: variables || params.variables,
      });
      return result.data as T;
    },
  });
};

interface UseDeleteParams {
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
