import { get } from "../../axios";

export interface IFees {
  m2m_transportation_fee: number;
  local_transportation_fee: number;
  post_sale_inspection_price: number;
  transportation: { from: string; to: string };
}

const fees = (opportunity_id: string) => get<IFees>("/fees", { params: { opportunity: opportunity_id } });

export default fees;
