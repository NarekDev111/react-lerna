import { put } from "../../axios";
import IOffer from "../interfaces/IOffer";
import rest from "../rest/rest";

const { list } = rest<IOffer>("offer");

const dealership = rest<IOffer>("offer/dealership").list;

interface IPlaceOffer {
  amount: number;
  opportunity_id: string;
  dealer_buyer_id?: string;
  post_sale_inspection: boolean;
  transportation: boolean;
  m2m_transportation: boolean;
}

function placeOffer(type: "" | "pre" | "proxy", offerData: IPlaceOffer) {
  return put<IOffer, IOffer, IPlaceOffer>(`/offer/${type}`, offerData);
}

export { list, dealership, placeOffer };
