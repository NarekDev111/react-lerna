import { AxiosRequestConfig } from "axios";
import { post } from "../../../axios";

export interface ISignInResponse {
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

export default async function signin(
  email: string,
  password: string
): Promise<ISignInResponse> {
  const response = await post("/auth/signin", { email, password }, {
    skipAuthRefresh: true,
  } as AxiosRequestConfig);
  return response.data;
}
