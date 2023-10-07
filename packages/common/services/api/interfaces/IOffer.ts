import IClientLocation from "./IClientLocation";

export interface IOfferBuyer {
  name: string;
  client_location_id: IClientLocation | string;
}

export default interface IOffer {
  amount: number; // bid
  opportunity_id: any;
  dealer_buyer_id: IOfferBuyer;
  status_cd: string;
  proxy_bid_id: any;
  created_by_id: any;
  updated_at: Date;
  created_at: Date;
  buy_fee: number;
  post_sale_inspection: boolean;
  post_sale_inspection_price: number;
  total: number;
  transportation: boolean;
  transportation_fee: number;
  m2m_transportation: boolean;
  m2m_transportation_fee: number;
}
