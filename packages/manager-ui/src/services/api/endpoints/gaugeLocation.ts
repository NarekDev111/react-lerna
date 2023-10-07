import { IGaugeLocation } from "@sellgauge/common";
import rest from "../rest/rest";

const { list } = rest<IGaugeLocation>("gaugeLocation");

export { list };
