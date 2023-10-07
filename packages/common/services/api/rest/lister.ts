import { IListOptions, IListParams } from "./rest";
import { axios } from "@sellgauge/common/services/axios";
import { AxiosRequestHeaders } from "axios";

export default async function lister<T, D>(
  endpoint: string,
  method: "get" | "post",
  options?: IListParams<T> & IListOptions,
  data?: D
) {
  options = options || {
    page: 0,
    pageSize: 50,
  };

  const headers: AxiosRequestHeaders = {
    "x-page-size": `${options.pageSize || 50}`,
    "x-page-current": `${options.page || 0}`,
  };

  if (options.sortBy) {
    headers["x-sort-by"] = options.sortBy;
    headers["x-sort-dir"] = options.sortDir || "asc";
  }

  if (options.select) headers["x-select"] = options.select;

  if (options.populate)
    headers["x-populate"] = JSON.stringify(options.populate);

  const response = await axios({
    url: endpoint,
    method,
    headers,
    params: options.params,
    data,
  });

  return {
    list: response.data,
    meta: {
      page: parseInt(response.headers["x-page-current"] || "0"),
      pageSize: parseInt(response.headers["x-page-size"] || "0"),
      total: parseInt(response.headers["x-page-total-items"] || "0"),
      totalPages: parseInt(response.headers["x-page-total-pages"] || "0"),
      sortBy: response.headers["x-sort-by"] || "",
      sortDir: response.headers["x-sort-dir"] || "asc",
    },
  };
}
