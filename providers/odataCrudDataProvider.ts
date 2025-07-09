import { AxiosInstance } from "axios";
import { axiosInstance, transformHttpError } from "./utils";
import {
  CrudFilter,
  CrudFilters,
  CrudSorting,
  IDataContextProvider,
  Join,
  MetaQueryMode,
  ODataConfig,
} from "./types/IDataContext";
import { HttpError } from "./types/HttpError";

// Helper function to escape single quotes in OData strings.
const escapeODataString = (value: string): string => value.replace(/'/g, "''");

// Helper function to format filter value
const formatFilterValue = (value: any, isUuid?: boolean): string => {
  if (isUuid) {
    return String(value);
  }
  if (typeof value === "string") {
    return `'${escapeODataString(value)}'`;
  }
  if (Array.isArray(value)) {
    return value
      .map((v: any) =>
        typeof v === "string" ? `'${escapeODataString(v)}'` : v
      )
      .join(",");
  }
  return String(value);
};

const OPERATOR_MAP: Record<string, string> = {
  eq: "eq",
  ne: "ne",
  gt: "gt",
  gte: "ge",
  lt: "lt",
  lte: "le",
};

// Helper function to build a single filter condition
const buildFilterCondition = (filter: CrudFilter): string => {
  if (!("field" in filter)) {
    return "";
  }

  const { field, operator, value, isUuid = false } = filter;

  if (OPERATOR_MAP[operator]) {
    return `${field} ${OPERATOR_MAP[operator]} ${formatFilterValue(
      value,
      isUuid
    )}`;
  }

  if (operator === "contains") {
    const stringValue = String(value).toLowerCase();
    return `contains(tolower(${field}), '${escapeODataString(stringValue)}')`;
  }

  if (operator === "in") {
    return `${field} in (${formatFilterValue(value, isUuid)})`;
  }

  return "";
};

// Helper function to build the filter expression (the part after $filter=)
const buildFilterExpression = (filters?: CrudFilters): string => {
  if (!filters || filters.length === 0) {
    return "";
  }
  return filters.map(buildFilterCondition).filter(Boolean).join(" and ");
};

// Helper function to build the full $filter query string
const buildFilterString = (filters?: CrudFilters): string => {
  const expression = buildFilterExpression(filters);
  return expression ? `$filter=${expression}` : "";
};

// Helper function to build orderby string
const buildOrderByString = (sorters?: CrudSorting): string => {
  if (!sorters || sorters.length === 0) {
    return "";
  }

  const orderBy = sorters
    .map(
      (sorter) => `${sorter.field} ${sorter.order === "desc" ? "desc" : "asc"}`
    )
    .join(",");

  return orderBy ? `$orderby=${orderBy}` : "";
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
const buildExpandString = (join?: Join[]): string => {
  if (!join || join.length === 0) {
    return "";
  }

  const expandConditions = join
    .map((joinItem) => {
      if (typeof joinItem === "string") {
        return joinItem;
      }

      if (typeof joinItem === "object" && joinItem.name) {
        const filterExpression = buildFilterExpression(joinItem.filters);
        if (filterExpression) {
          return `${joinItem.name}($filter=${filterExpression})`;
        }
        return joinItem.name;
      }

      return "";
    })
    .filter(Boolean);

  return expandConditions.length > 0
    ? `$expand=${expandConditions.join(",")}`
    : "";
};

const buildODataQuery = (params: {
  filters?: CrudFilters;
  sorters?: CrudSorting;
  pagination?: {
    current?: number;
    pageSize?: number;
  };
  join?: Array<Join>;
}) => {
  const { filters, sorters, pagination, join } = params;
  const queryParams = [
    buildFilterString(filters),
    buildOrderByString(sorters),
    ...buildPaginationString(pagination),
    buildExpandString(join),
  ].filter(Boolean);

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
      const url = buildUrl(resource, meta?.config);
      const query = buildODataQuery({
        filters,
        sorters,
        pagination,
        join: meta?.join,
      });

      const queryUrl = query ? `${url}?${query}` : url;

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
        // OData requires the key to be in parentheses
        const { data } = await httpClient.patch(`${url}(${id})`, variables);

        return {
          data,
        };
      } catch (error) {
        const httpError = transformHttpError(error);
        throw httpError;
      }
    },

    updateMany: async ({ resource, ids, variables, meta }) => {
      const baseUrl = buildUrl(resource, meta?.config);
      const results = await Promise.allSettled(
        ids.map((id) => httpClient.patch(`${baseUrl}(${id})`, variables))
      );

      const errors = results
        .filter((result) => result.status === "rejected")
        .map((result) =>
          transformHttpError((result as PromiseRejectedResult).reason)
        );

      if (errors.length > 0) {
        // Throw an array of HttpError, consistent with potential partial failure
        throw errors;
      }

      const data = results
        .filter(
          (result): result is PromiseFulfilledResult<any> =>
            result.status === "fulfilled"
        )
        .map((result) => result.value.data);

      return { data };
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
      const baseUrl = buildUrl(resource, meta?.config);
      // OData does not typically support DELETE with a $filter.
      // Instead, we send individual DELETE requests for each ID.
      const results = await Promise.allSettled(
        ids.map((id) => httpClient.delete(`${baseUrl}(${id})`))
      );

      const errors = results
        .filter((result) => result.status === "rejected")
        .map((result) =>
          transformHttpError((result as PromiseRejectedResult).reason)
        );

      if (errors.length > 0) {
        throw errors;
      }

      // To satisfy the return type, we return the IDs of the successfully deleted items
      // wrapped in objects, as the framework expects an array of records.
      const data = ids
        .filter((_, index) => results[index].status === "fulfilled")
        .map((id) => ({ id }));

      return { data: data as any };
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
      const queryParts = [odataQuery, query].filter(Boolean);

      if (queryParts.length > 0) {
        const queryString = queryParts.join("&");
        requestUrl = `${requestUrl}${
          requestUrl.includes("?") ? "&" : "?"
        }${queryString}`;
      }

      let axiosResponse;
      switch (method) {
        case "put":
        case "post":
        case "patch":
          axiosResponse = await httpClient[method](requestUrl, payload, {
            headers,
          });
          break;
        case "delete":
          axiosResponse = await httpClient.delete(requestUrl, {
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
      const { data } = await httpClient.get(queryUrl);
      return data;
    },
    getSource: (path: string) => {
      const resource = `Storage/Download/${path}`;
      const queryUrl = buildUrl(resource, { subSystem: "default" });
      return queryUrl;
    },
  };
};
