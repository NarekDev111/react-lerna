import IShortLink from "../interfaces/IShortLink";
import rest from "../rest/rest";

const { one, put } = rest<IShortLink>("shortLink");

export { one, put };
