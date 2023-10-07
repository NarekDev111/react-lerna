import IAddress from "./IAddress";

export default interface IClientLocation {
  dealership_name: string;
  address: IAddress;
  gauge_location_id: string;
  m2m_transportation: boolean;
  website: string;
  gauge_rep_id: string;
  status_cd: string;
}
