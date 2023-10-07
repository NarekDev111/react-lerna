import IOpportunity from "../interfaces/IOpportunity";
import rest, { IListOptions, IListParams, IListResult } from "../rest/rest";

const { list } = rest<IOpportunity>("opportunity");

async function auction(
  options?: IListParams<IOpportunity> & IListOptions
): Promise<IListResult<IOpportunity>> {
  return rest<IOpportunity>("opportunity/auction").list(options);
}

export { list, auction };
