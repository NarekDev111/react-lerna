import { AxiosResponse } from "axios";
import { get } from "../../axios";
import IClientLocation from "../interfaces/IClientLocation";
import rest from "../rest/rest";

const { one, list, patch, put } = rest<IClientLocation>("clientLocation");

function status(): Promise<AxiosResponse<string[]>> {
  return get("/clientLocation/status");
}

export { one, list, patch, put, status };
