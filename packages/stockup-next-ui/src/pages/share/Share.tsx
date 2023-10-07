import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SUFooter from "../../components/SUFooter";
import SUNavbar from "../../components/SUNavbar";
import { one } from "../../services/api/endpoints/shortLink";
import AuctionDetails from "../auction/AuctionDetails";

export default function Share() {
  const { shortid } = useParams();
  const [isNotFound, setNotFound] = useState(false);
  const [opportunityId, setOpportunityId] = useState<string>();

  useEffect(() => {
    if (!shortid) return;
    one(shortid)
      .then((result) => {
        const opportunity_data = result.data as { id: string };

        setOpportunityId(opportunity_data.id);
      })
      .catch(() => {
        setNotFound(true);
      });
  }, [shortid]);

  return (
    <>
      <SUNavbar />
      <div className="w-full h-full">
        {isNotFound && (
          <div className="flex w-full h-full">
            <div className="m-auto">
              <div className="text-4xl">Not found</div>
            </div>
          </div>
        )}

        {opportunityId && (
          <AuctionDetails
            opportunityId={opportunityId}
            inPopup={false}
            shortLink={shortid}
          />
        )}
        <SUFooter />
      </div>
    </>
  );
}
