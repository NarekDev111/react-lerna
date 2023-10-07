import IModel from "../interfaces/IModel";
import rest from "../rest/rest";

const { list } = rest<IModel>("model");

export { list };
