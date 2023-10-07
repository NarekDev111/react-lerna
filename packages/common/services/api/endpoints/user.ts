import { AxiosResponse } from "axios";
import { get, post } from "../../axios";
import IMongoDocument from "../interfaces/IMongoDocument";
import IUser from "../interfaces/IUser";
import rest from "../rest/rest";

const { list, one, patch, put } = rest<IUser>("user");

export interface IMeResponse {
  user: IUser & IMongoDocument;
  linked_users: (IUser & IMongoDocument)[];
}

function me(): Promise<AxiosResponse<IMeResponse>> {
  return get("/auth/me");
}

function status(): Promise<AxiosResponse<string[]>> {
  return get("/user/status");
}

function password(id: string, newPassword: string) {
  return post(`/user/${id}/password`, {
    password: newPassword,
  });
}

function update(data: { [K in keyof IUser]?: IUser[K] }) {
  return post("/user/update", data);
}

function current() {
  return get<IUser>(`/user/current`);
}

export { one, list, patch, me, status, password, update, put, current };
