import { ISessionData } from "@sellgauge/common";
import { post } from "../../../axios";

export default async function linked(id: string) {
  return post<ISessionData>(`/auth/signin/linked/${id}`);
}
