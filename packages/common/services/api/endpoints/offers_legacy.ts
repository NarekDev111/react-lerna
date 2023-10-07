import { post } from "../../axios";

interface IOfferData {
  offer: {
    opportunity_id: string;
    amount: number;
    dealer_buyer_id: string;
    post_sale_inspection_price: number;
    post_sale_inspection: boolean;
    proxy_bid: boolean;
    total: number;
    buy_fee: number;
    transportation: boolean;
    transportation_fee: number;
    status_cd: string;
    m2m_transportation_fee?: number;
    m2m_transportation?: boolean;
  };
}

function postOffer_legacy(data: IOfferData) {
  return post("/offers", data);
}

export { postOffer_legacy };
