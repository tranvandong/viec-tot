import { RequestQueryBuilder } from "@nestjsx/crud-request";
import { Pagination } from "../types/IDataContext";

export const handlePagination = (
  query: RequestQueryBuilder,
  pagination?: Pagination
) => {
  const { current = 1, pageSize = 10 } = pagination ?? {};

  query
    .setLimit(pageSize)
    .setPage(current)
    .setOffset((current - 1) * pageSize);

  return query;
};
