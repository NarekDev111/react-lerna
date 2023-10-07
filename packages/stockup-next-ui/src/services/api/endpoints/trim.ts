import ITrim from "../interfaces/ITrim";
import rest from "../rest/rest";

const { list } = rest<ITrim>("trim");

export { list };
