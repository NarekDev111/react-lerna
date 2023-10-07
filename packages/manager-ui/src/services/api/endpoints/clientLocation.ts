import { AxiosResponse } from "axios";
import { IClientLocation } from "@sellgauge/common";
import { get } from "../../axios";
import rest from "../rest/rest";

const { one, list, patch, put } = rest<IClientLocation>("clientLocation");

function status(): Promise<AxiosResponse<string[]>> {
  return get("/clientLocation/status");
}

export { one, list, patch, put, status };
