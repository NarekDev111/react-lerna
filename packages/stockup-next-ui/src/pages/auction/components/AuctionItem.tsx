import IInventoryItem from "@sellgauge/common/services/api/interfaces/IInventoryItem";
import ImageLoader from "../../../components/ImageLoader";
import { useAuth } from "../../../context/AuthProvider";
import IMongoDocument from "../../../services/api/interfaces/IMongoDocument";
import { format_cr, mileage, price } from "../../../services/format";
import { getMaxOffer, opportunityName } from "../../../services/misc";
import { ColorBadge } from "./ColorBadge";

function CRChip(props: { score: number }) {
  const { score } = props;

  return (
    <div className="inline text-white pl-2 pr-2 rounded bg-blue-gray-500 mr-2 ">
      CR:&nbsp;<strong>{format_cr(score)}</strong>
    </div>
  );
}

interface IAuctionItemProps {
  opportunity?: IInventoryItem & IMongoDocument;
  loading?: boolean;
}

export default function AuctionItem({
  opportunity,
  loading,
}: IAuctionItemProps) {
  const auth = useAuth();
  const maxBidValue =
    opportunity && opportunity.opportunity.offers
      ? getMaxOffer(opportunity.opportunity.offers)
      : 0;

  const ourMaxBid = getMaxOffer(
    opportunity?.opportunity.offers.filter((offer) => {
      return (
        offer.dealer_buyer_id?.client_location_id ===
        auth?.user.client_location_id
      );
    })
  );

  return (
    <div className="bg-white rounded drop-shadow h-full">
      <div className="flex lg:flex-col">
        <div className="w-32 min-w-[150px] lg:w-full mr-4 lg:m-0 relative">
          <ImageLoader
            src={opportunity?.main_image_url}
            loading={loading}
            className="relative left-0 top-0 w-full aspect-[4/3] lg:h-auto lg:aspect-[6/4] rounded-l lg:rounded-t lg:rounded-b-none"
          />
          {opportunity && (
            <>
              <div className="absolute top-0 left-0 bg-white p-1 pr-2 pl-2 rounded-br uppercase font-bold md:text-xl drop-shadow">
                {maxBidValue > 0 ? price(maxBidValue) : "No bids"}
              </div>
              {ourMaxBid ? (
                <div className="absolute bottom-0 left-0 bg-white p-1 pr-2 pl2 rounded-tr drop-shadow">
                  Bid:{" "}
                  <strong
                    className={
                      ourMaxBid === maxBidValue
                        ? "text-green-800"
                        : "text-red-800"
                    }>
                    {price(ourMaxBid)}
                  </strong>
                </div>
              ) : null}
            </>
          )}
        </div>

        <div className="text-sm lg:text-base lg:p-3">
          <h3 className={`font-bold ${!opportunity ? "bg-gray-200" : ""}`}>
            {opportunity && opportunityName(opportunity.opportunity)}
          </h3>
          <div className="sm:flex items-center gap-2">
            <p>
              {opportunity &&
              opportunity.opportunity.vehicle_id &&
              opportunity.opportunity.vehicle_id.mileage
                ? `${mileage(opportunity.opportunity.vehicle_id.mileage)} Miles`
                : ""}
            </p>
          </div>
          {opportunity ? (
            <div className="flex flex-wrap">
              {opportunity.cr && <CRChip score={opportunity.cr} />}
              {opportunity.opportunity.light &&
                opportunity.opportunity.light.map((light, index) => (
                  <ColorBadge key={`${light}_${index}`} color={light} />
                ))}
            </div>
          ) : (
            <div className="bg-gray-200">&nbsp;</div>
          )}
        </div>
      </div>
    </div>
  );
}
