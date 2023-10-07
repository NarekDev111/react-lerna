import IMake from "../interfaces/IMake";
import rest from "../rest/rest";

const { list } = rest<IMake>("make");

export { list };
