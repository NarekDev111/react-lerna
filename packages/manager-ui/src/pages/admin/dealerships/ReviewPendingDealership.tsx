import { useEffect, useState } from "react";
import {
  PleaseWait,
  SUPopup,
  IMongoDocument,
  IPendingUser,
} from "@sellgauge/common";

import * as pendingUserApi from "../../../services/api/endpoints/pendingUsers";

import CreateDealership from "./CreateDealership";
import FindDealership from "./FindDealership";

interface IReviewPendingDealershipProps {
  pendingClientLocationId: string;
  pendingUserId: string;
  onClose: () => void;
}

export default function ReviewPendingDealership({
  pendingClientLocationId,
  pendingUserId,
  onClose,
}: IReviewPendingDealershipProps) {
  const [pendingUser, setPendingUser] = useState<
    IPendingUser & IMongoDocument
  >();
  const [isAssigning, setAssigning] = useState(false);

  function assignDealership(id: string) {
    if (pendingUser) {
      setAssigning(true);

      pendingUserApi
        .patch(pendingUser._id, { client_location_id: id })
        .then(() => {
          onClose();
        });
    }
  }

  useEffect(() => {
    pendingUserApi.one(pendingUserId).then((u) => {
      setPendingUser(u);
    });
  }, [pendingUserId]);

  return (
    <SUPopup open title="Review Pending Dealership" onClose={onClose} size="xl">
      {isAssigning ? (
        <PleaseWait />
      ) : (
        <div className="flex w-full">
          <div className="flex-1">
            <h2 className="uppercase text-xl font-bold border-b-2 mb-3">
              Create New Dealership
            </h2>

            <CreateDealership
              pendingClientLocationId={pendingClientLocationId}
              onCreated={assignDealership}
            />
          </div>
          <div className="text-center flex font-bold p-6">
            <div className="m-auto">OR</div>
          </div>
          <div className="flex-1">
            <h2 className="uppercase text-xl font-bold border-b-2 mb-3">
              Assign Existing Dealership
            </h2>

            <FindDealership onSelected={assignDealership} />
          </div>
        </div>
      )}
    </SUPopup>
  );
}
