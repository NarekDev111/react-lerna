import IAddress from "./IAddress";

export default interface IPendingClientLocation {
  name: string;
  address: IAddress;
  website: string;
  created_at: Date;
  updated_at: Date;
}
