import { ChevronLeftIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SUButton from "../../components/SUButton";
import IOpportunity from "../../services/api/interfaces/IOpportunity";
import AuctionDetails from "./AuctionDetails";
import { textOpportunityTitle } from "./components/OpportunityTitle";

export default function Opportunity() {
  const { id } = useParams();

  const [opportunity, setOpportunity] = useState<IOpportunity>();

  const navigate = useNavigate();

  useEffect(() => {
    if (opportunity) {
      window.document.title = `${textOpportunityTitle(
        opportunity
      )} - StockUp Solutions`;
    }
  }, [opportunity]);

  function loaded(opp: IOpportunity) {
    setOpportunity(opp);
  }

  return (
    <div className="h-full">
      <div className="p-2">
        <div className="pb-2">
          <SUButton
            size="sm"
            color="blue-gray"
            onClick={() => navigate("/inventory")}>
            <ChevronLeftIcon className="w-5 h-5 inline" />
            Back to Inventory
          </SUButton>
        </div>
        <AuctionDetails opportunityId={id} onLoaded={loaded} />
      </div>
    </div>
  );
}
