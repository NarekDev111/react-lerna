import IPendingClientLocation from "../interfaces/IPendingClientLocation";
import rest from "../rest/rest";

const { one, list } = rest<IPendingClientLocation>("pendingClientLocation");

export { one, list };
