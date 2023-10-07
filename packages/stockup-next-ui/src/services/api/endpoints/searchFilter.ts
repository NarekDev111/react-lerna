import { ISearchFilter } from "../interfaces/ISearchFilter";
import rest from "../rest/rest";

const { one, put, list, patch, remove } = rest<ISearchFilter>("searchFilter");

export { one, put, list, patch, remove };
