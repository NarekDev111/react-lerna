import IClientLocation from "./IClientLocation";

export default interface IUser {
  email: string;
  name: string;
  password_digest: string;
  cell: string;
  _type: "Admin" | "GaugeRep" | "DealerBuyer";
  updated_at: Date;
  created_at: Date;
  user_verified: boolean;
  client_location_id: IClientLocation | string;
  bidder_status: boolean;
  status_cd: string;
  settings: {
    notifications: { [key: string]: boolean };
  };
}
