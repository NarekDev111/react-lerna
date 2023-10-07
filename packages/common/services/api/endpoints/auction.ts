import { get } from "../../axios";
import IMongoDocument from "../interfaces/IMongoDocument";
import IOffer from "../interfaces/IOffer";
import IOpportunity from "../interfaces/IOpportunity";
import rest, { IListOptions, IListParams, IOneOptions } from "../rest/rest";

async function one(id: string, options?: IOneOptions) {
  return rest<IOpportunity>(`auction`).one(id, options);
}

async function opportunities(
  options?: IListParams<IOpportunity> & IListOptions,
  abortController?: AbortController
) {
  return rest<IOpportunity>("auction/opportunities").list(
    options,
    abortController
  );
}

function offers(id: string) {
  return get<(IOffer & IMongoDocument)[]>(`/auction/${id}/offers`);
}

export { opportunities, one, offers };
