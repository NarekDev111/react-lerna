import { post } from "../../axios";
import IPendingUser from "../interfaces/IPendingUser";
import rest from "../rest/rest";

const { one, list, patch, remove } = rest<IPendingUser>("pendingUser");

async function invite(id: string) {
  return post(`/pendingUser/${id}/invite`);
}

export { one, list, patch, invite, remove };
