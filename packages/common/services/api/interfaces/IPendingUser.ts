import IClientLocation from "./IClientLocation";
import IPendingClientLocation from "./IPendingClientLocation";
import IUser from "./IUser";

export default interface IPendingUser {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  client_location_id: string | IClientLocation;
  pending_client_location_id: string | IPendingClientLocation;
  bidder_status: boolean;
  invitation?: {
    id: string;
    sent: Date;
    accepted?: Date;
  };
  user?: IUser | string | null;
}
