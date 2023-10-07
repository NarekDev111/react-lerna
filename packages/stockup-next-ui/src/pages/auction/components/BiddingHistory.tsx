import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import IClientLocation from "../../../services/api/interfaces/IClientLocation";
import IMongoDocument from "../../../services/api/interfaces/IMongoDocument";
import IOffer from "../../../services/api/interfaces/IOffer";
import { price } from "../../../services/format";
import { capitalize } from "../../../services/strings";

dayjs.extend(relativeTime);

interface IBiddingHistoryProps {
  offersHistory: (IOffer & IMongoDocument)[];
}

function BiddingHistoryItem({ offer }: { offer: IOffer & IMongoDocument }) {
  const [showCreatedDate, setShowCreatedDate] = useState(false);
  const [showExpireDate, setShowExpireDate] = useState(false);

  const expireDate = dayjs(offer.created_at).add(7, "days");

  const btn_class = "p-1 pl-2 pr-2 rounded text-sm font-bold whitespace-nowrap";

  const isExpired = expireDate.diff(new Date()) < 0;

  const status_color = (() => {
    switch (offer.status_cd) {
      case "active":
        return "text-green-600";
      case "expired":
        return "text-red-600";
      default:
        return "text-grey-600";
    }
  })();

  return (
    <tr className="">
      <td>
        <button
          className={`${btn_class} bg-blue-100`}
          onClick={() => setShowCreatedDate(!showCreatedDate)}>
          {showCreatedDate
            ? dayjs(offer.created_at).format("MMMM D, YYYY h:mm a")
            : dayjs(offer.created_at).fromNow()}
        </button>
      </td>
      <td>
        <button
          className={`${btn_class} ${isExpired ? "bg-red-100" : "bg-blue-100"}`}
          onClick={() => setShowExpireDate(!showExpireDate)}>
          {showExpireDate
            ? dayjs(expireDate).format("MMMM D, YYYY h:mm a")
            : dayjs(expireDate).fromNow()}
        </button>
      </td>
      <td>
        <span className={`${status_color} font-bold`}>
          {capitalize(offer.status_cd)}
        </span>
      </td>
      <td>
        {
          (offer.dealer_buyer_id.client_location_id as IClientLocation)
            .dealership_name
        }
      </td>
      <td>{offer.dealer_buyer_id.name}</td>
      <td className="text-center font-bold text-green-600">
        {price(offer.amount)}
      </td>
    </tr>
  );
}

export default function BiddingHistory({
  offersHistory,
}: IBiddingHistoryProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table-fixed border-separate border-spacing-2 whitespace-nowrap">
        <thead>
          <tr>
            <th>Placed</th>
            <th>Expires</th>
            <th>Status</th>
            <th>Dealership</th>
            <th>Buyer</th>
            <th>Bid Amount</th>
          </tr>
        </thead>
        <tbody>
          {offersHistory
            .sort((a, b) => b.amount - a.amount)
            .map((offer) => (
              <BiddingHistoryItem key={offer._id} offer={offer} />
            ))}
        </tbody>
      </table>
    </div>
  );
}
