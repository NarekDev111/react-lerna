import IAddress from "./IAddress";

export default interface IGaugeLocation {
  address: IAddress;
  name: string;
  updated_at: Date;
  created_at: Date;
  main_phone: string;
  zip_codes: string[];
}
