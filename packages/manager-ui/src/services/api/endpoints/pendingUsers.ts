import { IPendingUser } from "@sellgauge/common";
import { post } from "../../axios";
import rest from "../rest/rest";

const { one, list, patch, remove } = rest<IPendingUser>("pendingUser");

async function invite(id: string) {
  return post(`/pendingUser/${id}/invite`);
}

export { one, list, patch, invite, remove };
