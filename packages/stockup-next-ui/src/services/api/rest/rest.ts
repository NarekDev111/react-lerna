import { AxiosRequestHeaders } from "axios";
import { get, patch, put, remove } from "../../axios";
import IMongoDocument from "../interfaces/IMongoDocument";

export enum EOperator {
  and = "and",
  or = "or",
}

export interface IOneOptions {
  params?: { [key: string]: string };
  populate?: string[];
}

export interface IListOptions {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDir?: string;
  select?: string;
  populate?: string[];
}

export interface IListParams<T> {
  params?: { [K in keyof T]?: T[K] } & {
    [K in keyof IMongoDocument]?: IMongoDocument[K];
  } & { $op?: EOperator } & { [key: string]: string };
}

export interface IListResultMeta {
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  sortBy: string;
  sortDir: string;
}

export interface IListResult<T> {
  list: (T & IMongoDocument)[];
  meta: IListResultMeta;
}

export default function rest<T>(modelName: string) {
  return {
    async one(id: string, options?: IOneOptions) {
      const headers: AxiosRequestHeaders = {};

      if (options) {
        if (options.populate) {
          headers["x-populate"] = JSON.stringify(options.populate);
        }
      }

      const params = options?.params || {};

      return (await get(`/${modelName}/${id}`, { headers, params })).data as T &
        IMongoDocument;
    },
    async list(
      options?: IListParams<T> & IListOptions,
      abortController?: AbortController
    ): Promise<IListResult<T>> {
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

      if (options.populate) headers["x-populate"] = JSON.stringify(options.populate);

      const response = await get<(T & IMongoDocument)[]>(`${modelName}`, {
        headers,
        params: options.params,
        signal: abortController?.signal,
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
    },
    async put(data: { [K in keyof T]?: T[K] }) {
      return (await put<T & IMongoDocument>(`${modelName}`, data)).data;
    },
    async patch(id: string, fields: { [K in keyof T]?: T[K] }) {
      return (await patch<T & IMongoDocument>(`${modelName}/${id}`, fields))
        .data;
    },
    async remove(id: string) {
      return remove(`${modelName}/${id}`);
    },
  };
}
