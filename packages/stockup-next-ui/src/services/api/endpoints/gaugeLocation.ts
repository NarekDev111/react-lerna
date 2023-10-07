import IGaugeLocation from "../interfaces/IGaugeLocation";
import rest from "../rest/rest";

const { list } = rest<IGaugeLocation>("gaugeLocation");

export { list };
