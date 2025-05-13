import { AxiosInstance } from "axios";
import { axiosInstance, transformHttpError } from "./utils";
import { IDataContextProvider } from "./types/IDataContext";
import { HttpError } from "./types/HttpError";

const buildODataQuery = (params: {
  filters?: any[];
  sorters?: any[];
  pagination?: {
    current?: number;
    pageSize?: number;
  };
  join?: string[];
}) => {
  const queryParams: string[] = [];

  // Handle filters
  if (params.filters && params.filters.length > 0) {
    const filterConditions = params.filters.map((filter) => {
      const { field, operator, value } = filter;
      switch (operator) {
        case "eq":
          return `${field} eq ${
            typeof value === "string" ? `'${value}'` : value
          }`;
        case "ne":
          return `${field} ne ${
            typeof value === "string" ? `'${value}'` : value
          }`;
        case "gt":
          return `${field} gt ${value}`;
        case "gte":
          return `${field} ge ${value}`;
        case "lt":
          return `${field} lt ${value}`;
        case "lte":
          return `${field} le ${value}`;
        case "contains":
          return `contains(${field},'${value}')`;
        case "in":
          return `${field} in (${value.map((v: any) => `'${v}'`).join(",")})`;
        default:
          return "";
      }
    });
    if (filterConditions.length > 0) {
      queryParams.push(`$filter=${filterConditions.join(" and ")}`);
    }
  }

  // Handle sorting
  if (params.sorters && params.sorters.length > 0) {
    const orderBy = params.sorters
      .map(
        (sorter) =>
          `${sorter.field} ${sorter.order === "desc" ? "desc" : "asc"}`
      )
      .join(",");
    queryParams.push(`$orderby=${orderBy}`);
  }

  // Handle pagination
  if (params.pagination?.current && params.pagination?.pageSize) {
    const { current, pageSize } = params.pagination;
    queryParams.push(`$skip=${(current - 1) * pageSize}`);
    queryParams.push(`$top=${pageSize}`);
  }

  // Handle expand (join)
  if (params.join && params.join.length > 0) {
    queryParams.push(`$expand=${params.join.join(",")}`);
  }

  return queryParams.join("&");
};

export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance
): Required<IDataContextProvider> => ({
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const url = `${apiUrl}/${resource}`;
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
        data["@odata.count"] || (data.value ? data.value.length : data.length),
    };
  },

  getMany: async ({ resource, ids, meta }) => {
    const url = `${apiUrl}/${resource}`;
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

  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;

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

  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    try {
      const { data } = await httpClient.patch(url, variables);

      return {
        data,
      };
    } catch (error) {
      const httpError = transformHttpError(error);
      throw httpError;
    }
  },

  updateMany: async ({ resource, ids, variables }) => {
    const errors: HttpError[] = [];

    const response = await Promise.all(
      ids.map(async (id) => {
        try {
          const { data } = await httpClient.patch(
            `${apiUrl}/${resource}/${id}`,
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

  createMany: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;

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
    // OData convention: /resource(id)
    const url = `${apiUrl}/${resource}(${id})`;
    const query = buildODataQuery({ join: meta?.join });
    const queryUrl = query ? `${url}?${query}` : url;

    const { data } = await httpClient.get(queryUrl);

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id }) => {
    // OData convention: /resource(id)
    const url = `${apiUrl}/${resource}(${id})`;

    const { data } = await httpClient.delete(url);

    return {
      data,
    };
  },

  deleteMany: async ({ resource, ids }) => {
    // For deleteMany, we'll use $filter to delete multiple records
    const url = `${apiUrl}/${resource}`;
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
    const odataQuery = buildODataQuery({ filters, sorters, join: meta?.join });
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

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
});
