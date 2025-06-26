import { AxiosInstance } from "axios";
import { axiosInstance, transformHttpError } from "./utils";
import {
  CrudFilter,
  CrudFilters,
  IDataContextProvider,
  Join,
  MetaQueryMode,
  ODataConfig,
} from "./types/IDataContext";
import { HttpError } from "./types/HttpError";

// Helper function to format filter value
const formatFilterValue = (value: any, isUuid?: boolean): string => {
  if (isUuid) {
    return value;
  }
  if (typeof value === "string") {
    return `'${value}'`;
  }
  if (Array.isArray(value)) {
    return value.map((v: any) => `'${v}'`).join(",");
  }
  return value;
};

// Helper function to build filter condition
const buildFilterCondition = (filter: CrudFilter): string => {
  if ("field" in filter) {
    const { field, operator, value, isUuid = false } = filter;
    const formattedValue = formatFilterValue(value, isUuid);

    const operatorMap: Record<string, string> = {
      eq: "eq",
      ne: "ne",
      gt: "gt",
      gte: "ge",
      lt: "lt",
      lte: "le",
      contains: `contains(tolower(${field}),'${value}')`,
      in: `${field} in (${formattedValue})`,
    };

    if (operator === "contains" || operator === "in") {
      return operatorMap[operator];
    }

    return `${field} ${operatorMap[operator]} ${formattedValue}`;
  }
  return "";
};

// Helper function to build filter string
const buildFilterString = (filters?: CrudFilters): string => {
  if (!filters || !Array.isArray(filters) || filters.length === 0) {
    return "";
  }

  const validFilters = filters.filter((filter) => "field" in filter);
  if (validFilters.length === 0) {
    return "";
  }

  const filterConditions = validFilters
    .map(buildFilterCondition)
    .filter((condition) => condition !== "");
  console.log(filterConditions);

  return filterConditions.length > 0
    ? `$filter=${filterConditions.join(" and ")}`
    : "";
};

// Helper function to build orderby string
const buildOrderByString = (sorters?: any[]): string => {
  if (!sorters || sorters.length === 0) {
    return "";
  }

  const orderBy = sorters
    .map(
      (sorter) => `${sorter.field} ${sorter.order === "desc" ? "desc" : "asc"}`
    )
    .join(",");

  return `$orderby=${orderBy}`;
};

// Helper function to build pagination string
const buildPaginationString = (pagination?: {
  current?: number;
  pageSize?: number;
}): string[] => {
  if (!pagination?.current || !pagination?.pageSize) {
    return [];
  }

  const { current, pageSize } = pagination;
  return [`$skip=${(current - 1) * pageSize}`, `$top=${pageSize}`];
};

// Helper function to build expand string
const buildExpandString = (
  join?: Array<string | { name: string; filters?: CrudFilters }>
): string => {
  if (!join || join.length === 0) {
    return "";
  }

  const expandConditions = join
    .map((joinItem) => {
      if (typeof joinItem === "string") {
        return joinItem;
      }

      if (typeof joinItem === "object" && joinItem.name) {
        let expandString = joinItem.name;

        if (joinItem.filters && joinItem.filters.length > 0) {
          const filterString = buildFilterString(joinItem.filters);
          if (filterString) {
            expandString += `(${filterString})`;
          }
        }

        return expandString;
      }

      return "";
    })
    .filter((condition) => condition !== "");

  return expandConditions.length > 0
    ? `$expand=${expandConditions.join(",")}`
    : "";
};

const buildODataQuery = (params: {
  filters?: CrudFilters;
  sorters?: any[];
  pagination?: {
    current?: number;
    pageSize?: number;
  };
  join?: Array<Join>;
}) => {
  const queryParams: string[] = [];

  // Build filter query
  const filterQuery = buildFilterString(params.filters);
  if (filterQuery) queryParams.push(filterQuery);

  // Build orderby query
  const orderByQuery = buildOrderByString(params.sorters);
  if (orderByQuery) queryParams.push(orderByQuery);

  // Build pagination query
  const paginationQueries = buildPaginationString(params.pagination);
  queryParams.push(...paginationQueries);

  // Build expand query
  const expandQuery = buildExpandString(params.join);
  if (expandQuery) queryParams.push(expandQuery);

  return queryParams.join("&");
};

export const odataCrudDataProvider = (
  apiUrl: string,
  serverSideApiUrl?: string,
  httpClient: AxiosInstance = axiosInstance
): Required<IDataContextProvider> => {
  const buildUrl = (resource: string, config: ODataConfig = {}) => {
    const { subSystem = "buss", auth = "public", mode = "client" } = config;
    return `${
      mode === "client" ? apiUrl : serverSideApiUrl
    }/${subSystem}/${auth}/${resource}`;
  };

  return {
    getList: async ({ resource, pagination, filters, sorters, meta }) => {
      console.log("filters: ", filters);

      const url = buildUrl(resource, meta?.config);
      const query = buildODataQuery({
        filters,
        sorters,
        pagination,
        join: meta?.join,
      });

      const queryUrl = query ? `${url}?${query}` : url;
      console.log(`Query URL: ${queryUrl}`);

      const { data } = await httpClient.get(queryUrl);

      return {
        data: data.value || data,
        total:
          data["@odata.count"] ||
          (data.value ? data.value.length : data.length),
      };
    },

    getMany: async ({ resource, ids, meta }) => {
      const url = buildUrl(resource, meta?.config);
      const query = buildODataQuery({
        filters: [{ field: "id", operator: "in", value: ids }],
        join: meta?.join,
      });
      const queryUrl = `${url}?${query}`;

      const { data } = await httpClient.get(queryUrl);

      return {
        data: data.value || data,
      };
    },

    create: async ({ resource, variables, meta }) => {
      const url = buildUrl(resource, meta?.config);

      try {
        const { data } = await httpClient.post(url, variables);

        return {
          data,
        };
      } catch (error) {
        const httpError = transformHttpError(error);
        throw httpError;
      }
    },

    update: async ({ resource, id, variables, meta }) => {
      const url = buildUrl(resource, meta?.config);

      try {
        const { data } = await httpClient.patch(`${url}(${id})`, variables);

        return {
          data,
        };
      } catch (error) {
        const httpError = transformHttpError(error);
        throw httpError;
      }
    },

    updateNew: async ({ resource, id, variables, meta }) => {
      const url = buildUrl(resource, meta?.config);

      try {
        const { data } = await httpClient.patch(`${url}${id}`, variables);

        return {
          data,
        };
      } catch (error) {
        const httpError = transformHttpError(error);
        throw httpError;
      }
    },

    updateMany: async ({ resource, ids, variables, meta }) => {
      const errors: HttpError[] = [];
      const baseUrl = buildUrl(resource, meta?.config);

      const response = await Promise.all(
        ids.map(async (id) => {
          try {
            const { data } = await httpClient.patch(
              `${baseUrl}/${id}`,
              variables
            );
            return data;
          } catch (error) {
            const httpError = transformHttpError(error);
            errors.push(httpError);
          }
        })
      );

      if (errors.length > 0) {
        throw errors;
      }

      return { data: response };
    },

    createMany: async ({ resource, variables, meta }) => {
      const url = buildUrl(resource, meta?.config);

      try {
        const { data } = await httpClient.post(url, { value: variables });

        return {
          data,
        };
      } catch (error) {
        const httpError = transformHttpError(error);
        throw httpError;
      }
    },

    getOne: async ({ resource, id, meta }) => {
      const url = buildUrl(resource, meta?.config);
      const query = buildODataQuery({ join: meta?.join });
      const queryUrl = query ? `${url}(${id})?${query}` : `${url}(${id})`;

      const { data } = await httpClient.get(queryUrl);

      return {
        data,
      };
    },

    deleteOne: async ({ resource, id, meta }) => {
      const url = buildUrl(resource, meta?.config);

      const { data } = await httpClient.delete(`${url}(${id})`);

      return {
        data,
      };
    },

    deleteMany: async ({ resource, ids, meta }) => {
      const url = buildUrl(resource, meta?.config);
      const query = buildODataQuery({
        filters: [{ field: "id", operator: "in", value: ids }],
      });
      const queryUrl = `${url}?${query}`;

      const { data } = await httpClient.delete(queryUrl);
      return { data };
    },

    getApiUrl: () => {
      return apiUrl;
    },

    custom: async ({
      url,
      method,
      meta,
      filters,
      sorters,
      payload,
      query,
      headers,
    }) => {
      const odataQuery = buildODataQuery({
        filters,
        sorters,
        join: meta?.join,
      });
      let requestUrl = url;

      if (odataQuery) {
        requestUrl = `${url}${url.includes("?") ? "&" : "?"}${odataQuery}`;
      }

      if (query) {
        requestUrl = `${requestUrl}${
          requestUrl.includes("?") ? "&" : "?"
        }${query}`;
      }

      let axiosResponse;
      switch (method) {
        case "put":
        case "post":
        case "patch":
          axiosResponse = await httpClient[method](url, payload, {
            headers,
          });
          break;
        case "delete":
          axiosResponse = await httpClient.delete(url, {
            data: payload,
            headers: headers,
          });
          break;
        default:
          axiosResponse = await httpClient.get(requestUrl, { headers });
          break;
      }

      const {
        data,
        status,
        statusText,
        headers: axiosResponseHeaders,
        config,
      } = axiosResponse;

      return {
        data,
        status,
        statusText,
        headers: axiosResponseHeaders,
        config,
      };
    },

    getAttachment: async ({ type, key }) => {
      const resource = "Storage/GetAttachments";
      const config: ODataConfig = {
        subSystem: "default",
      };
      const queryUrl = buildUrl(resource, config);
      const data = await httpClient.get(queryUrl);
      return data;
    },
    getSource: (path: string) => {
      const resource = `Storage/Download/${path}`;
      const queryUrl = buildUrl(resource, { subSystem: "default" });
      return queryUrl;
    },
  };
};
