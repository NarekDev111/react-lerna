import { IPendingClientLocation } from "@sellgauge/common";
import rest from "../rest/rest";

const { one, list } = rest<IPendingClientLocation>("pendingClientLocation");

export { one, list };
