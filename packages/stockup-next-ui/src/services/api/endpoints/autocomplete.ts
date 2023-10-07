import rest, { IListOptions, IListParams, IListResult } from "../rest/rest";

import ISuggestions from "../interfaces/ISuggestions";

const { list } = rest<ISuggestions>("autocomplete");

async function suggestList(
  options?: IListParams<ISuggestions> & IListOptions
): Promise<IListResult<ISuggestions>> {
  return rest<ISuggestions>("autocomplete/vehicle").list(options);
}

export { list, suggestList };
