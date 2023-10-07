import ISessionData from "../../../../types/ISessionData";
import { post } from "../../../axios";

export default async function linked(id: string) {
  return post<ISessionData>(`/auth/signin/linked/${id}`);
}
