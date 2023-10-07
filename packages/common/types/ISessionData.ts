export default interface ISessionData {
  access_token: string;
  refresh_token: string;
  user: {
    _id: string;
    email: string;
    type: "Admin" | "GaugeRep" | "DealerBuyer";
    bidder_status: boolean;
    client_location_id: string;
  };
}
