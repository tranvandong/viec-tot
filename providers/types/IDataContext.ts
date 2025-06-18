import { AxiosResponse } from "axios";

export type BaseKey = string | number;
export type BaseRecord = {
  id?: BaseKey;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type ODataConfig = {
  subSystem?: "admin" | "buss" | "default";
  auth?: "allow" | "public" | "auth";
  mode?: MetaQueryMode;
};

export type MetaQuery = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  join?: any;
  config?: ODataConfig;
};

export type MetaQueryMode = "server" | "client";

export interface Pagination {
  /**
   * Initial page index
   * @default 1
   */
  current?: number;
  /**
   * Initial number of items per page
   * @default 10
   */
  pageSize?: number;
}

// Filters are used as a suffix of a field name:

// | Filter              | Description                       |
// | ------------------- | --------------------------------- |
// | `eq`                | Equal                             |
// | ne                  | Not equal                         |
// | lt                  | Less than                         |
// | gt                  | Greater than                      |
// | lte                 | Less than or equal to             |
// | gte                 | Greater than or equal to          |
// | in                  | Included in an array              |
// | nin                 | Not included in an array          |
// | contains            | Contains                          |
// | ncontains           | Doesn't contain                   |
// | containss           | Contains, case sensitive          |
// | ncontainss          | Doesn't contain, case sensitive   |
// | null                | Is null or not null               |
// | startswith          | Starts with                       |
// | nstartswith         | Doesn't start with                |
// | startswiths         | Starts with, case sensitive       |
// | nstartswiths        | Doesn't start with, case sensitive|
// | endswith            | Ends with                         |
// | nendswith           | Doesn't end with                  |
// | endswiths           | Ends with, case sensitive         |
// | nendswiths          | Doesn't end with, case sensitive  |
export type CrudOperators =
  | "eq"
  | "ne"
  | "lt"
  | "gt"
  | "lte"
  | "gte"
  | "in"
  | "nin"
  | "contains"
  | "ncontains"
  | "containss"
  | "ncontainss"
  | "between"
  | "nbetween"
  | "null"
  | "nnull"
  | "startswith"
  | "nstartswith"
  | "startswiths"
  | "nstartswiths"
  | "endswith"
  | "nendswith"
  | "endswiths"
  | "nendswiths"
  | "or"
  | "and";

export type SortOrder = "desc" | "asc" | null;

export type LogicalFilter = {
  field: string;
  operator: Exclude<CrudOperators, "or" | "and">;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
};

export type ConditionalFilter = {
  key?: string;
  operator: Extract<CrudOperators, "or" | "and">;
  value: (LogicalFilter | ConditionalFilter)[];
};

export type CrudFilter = LogicalFilter | ConditionalFilter;
export type CrudSort = {
  field: string;
  order: "asc" | "desc";
};

export type CrudFilters = CrudFilter[];
export type CrudSorting = CrudSort[];

export interface CustomResponse<TData = BaseRecord> extends AxiosResponse {
  data: TData;
}
export interface GetListResponse<TData = BaseRecord> {
  data: TData[];
  total: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface CreateResponse<TData = BaseRecord> {
  data: TData;
}

export interface CreateManyResponse<TData = BaseRecord> {
  data: TData[];
}

export interface UpdateResponse<TData = BaseRecord> {
  data: TData;
}

export interface UpdateManyResponse<TData = BaseRecord> {
  data: TData[];
}

export interface GetOneResponse<TData = BaseRecord> {
  data: TData;
}

export interface GetManyResponse<TData = BaseRecord> {
  data: TData[];
}

export interface DeleteOneResponse<TData = BaseRecord> {
  data: TData;
}

export interface DeleteManyResponse<TData = BaseRecord> {
  data: TData[];
}

export interface GetListParams {
  resource: string;
  pagination?: Pagination;
  sorters?: CrudSorting;
  filters?: CrudFilters;
  meta?: MetaQuery;
}

export interface GetManyParams {
  resource: string;
  ids: BaseKey[];
  meta?: MetaQuery;
}

export interface GetOneParams {
  resource: string;
  id: BaseKey;
  meta?: MetaQuery;
}

export interface CreateParams<TVariables = Record<string, never>> {
  resource: string;
  variables: TVariables;
  meta?: MetaQuery;
}

export interface CreateManyParams<TVariables = Record<string, never>> {
  resource: string;
  variables: TVariables[];
  meta?: MetaQuery;
}

export interface UpdateParams<TVariables = Record<string, never>> {
  resource: string;
  id: BaseKey;
  variables: TVariables;
  meta?: MetaQuery;
}

export interface UpdateManyParams<TVariables = Record<string, never>> {
  resource: string;
  ids: BaseKey[];
  variables: TVariables;
  meta?: MetaQuery;
}

export interface DeleteOneParams<TVariables = Record<string, never>> {
  resource: string;
  id: BaseKey;
  variables?: TVariables;
  meta?: MetaQuery;
}

export interface DeleteManyParams<TVariables = Record<string, never>> {
  resource: string;
  ids: BaseKey[];
  variables?: TVariables;
  meta?: MetaQuery;
}

export interface CustomParams<TQuery = unknown, TPayload = unknown> {
  url: string;
  method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch";
  /**
   * @deprecated `sort` is deprecated, use `sorters` instead.
   */
  sort?: CrudSorting;
  sorters?: CrudSorting;
  filters?: CrudFilter[];
  payload?: TPayload;
  query?: TQuery;
  headers?: Record<string, never>;
  meta?: MetaQuery;
}

export type AttachmentType =
  | "Organization"
  | "Applicant"
  | "Job"
  | "DMCategory";

export interface DownLoadParams {
  key: string;
  type: AttachmentType;
}

export interface IDataContextProvider {
  getList: <TData extends BaseRecord = BaseRecord>(
    params: GetListParams
  ) => Promise<GetListResponse<TData>>;

  getMany?: <TData extends BaseRecord = BaseRecord>(
    params: GetManyParams
  ) => Promise<GetManyResponse<TData>>;

  getOne: <TData extends BaseRecord = BaseRecord>(
    params: GetOneParams
  ) => Promise<GetOneResponse<TData>>;

  create: <
    TData extends BaseRecord = BaseRecord,
    TVariables = Record<string, never>
  >(
    params: CreateParams<TVariables>
  ) => Promise<CreateResponse<TData>>;

  createMany?: <
    TData extends BaseRecord = BaseRecord,
    TVariables = Record<string, never>
  >(
    params: CreateManyParams<TVariables>
  ) => Promise<CreateManyResponse<TData>>;

  update: <
    TData extends BaseRecord = BaseRecord,
    TVariables = Record<string, never>
  >(
    params: UpdateParams<TVariables>
  ) => Promise<UpdateResponse<TData>>;

  updateMany?: <
    TData extends BaseRecord = BaseRecord,
    TVariables = Record<string, never>
  >(
    params: UpdateManyParams<TVariables>
  ) => Promise<UpdateManyResponse<TData>>;

  deleteOne: <
    TData extends BaseRecord = BaseRecord,
    TVariables = Record<string, never>
  >(
    params: DeleteOneParams<TVariables>
  ) => Promise<DeleteOneResponse<TData>>;

  deleteMany?: <
    TData extends BaseRecord = BaseRecord,
    TVariables = Record<string, never>
  >(
    params: DeleteManyParams<TVariables>
  ) => Promise<DeleteManyResponse<TData>>;

  getApiUrl: () => string;

  custom?: <
    TData extends BaseRecord = BaseRecord,
    TQuery = unknown,
    TPayload = unknown
  >(
    params: CustomParams<TQuery, TPayload>
  ) => Promise<CustomResponse<TData>>;

  getAttachment?: (params: DownLoadParams) => Promise<any>;
  getSource?: (path: string) => string;
}

export type IDataContext = IDataContextProvider;

export interface IDataMultipleContextProvider {
  default: IDataContextProvider;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: IDataContextProvider | any;
}
