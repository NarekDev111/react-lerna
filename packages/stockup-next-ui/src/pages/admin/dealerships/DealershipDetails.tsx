import { Alert, Option, Select } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import PleaseWait from "../../../components/PleaseWait";
import SUPopup from "../../../components/SUPopup";
import {
  one,
  patch,
  status,
} from "../../../services/api/endpoints/clientLocation";
import IClientLocation from "../../../services/api/interfaces/IClientLocation";
import IMongoDocument from "../../../services/api/interfaces/IMongoDocument";
import StatusChip from "../components/StatusChip";
import { DealershipsContext } from "./DealershipList";

interface IDealershipDetailsProps {
  dealershipId: string;
  onClose: () => void;
}

export default function DealershipDetails({
  dealershipId,
  onClose,
}: IDealershipDetailsProps) {
  const [dealership, setDealership] = useState<
    IClientLocation & IMongoDocument
  >();
  const [isLoading, setLoading] = useState(false);
  const [statuses, setStatuses] = useState<string[]>();
  const [isUpdated, setUpdated] = useState(false);

  const dealershipsContext = useContext(DealershipsContext);

  async function load() {
    setLoading(true);
    const data = await one(dealershipId);
    setDealership(data);
    setLoading(false);
  }

  async function updateStatus(newStatus: string) {
    if (dealership) {
      setUpdated(false);
      await patch(dealership._id, { status_cd: newStatus });
      setUpdated(true);
      dealershipsContext.refresh();
    }
  }

  useEffect(() => {
    status().then((res) => {
      setStatuses(res.data);
    });
  }, []);

  useEffect(() => {
    load();
  }, [dealershipId]);

  return (
    <SUPopup
        title={
          isLoading || !dealership
            ? "Please wait..."
            : dealership.dealership_name
        }
        size="sm"
        open
        onClose={onClose}
      >
        {isLoading || !dealership ? (
          <PleaseWait />
        ) : (
          <div className="flex flex-col w-full">
            <table>
              <tbody>
                <tr>
                  <td>Status:</td>
                  <td>
                    {statuses ? (
                      <Select
                        value={dealership.status_cd}
                        variant="standard"
                        onChange={(value) => updateStatus(`${value}`)}
                      >
                        {statuses.map((status) => (
                          <Option value={status} key={status}>
                            <StatusChip status={status} />
                          </Option>
                        ))}
                      </Select>
                    ) : (
                      <PleaseWait />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            <Alert color="green" className="mt-2" show={isUpdated}>
              Dealership info has been successfully updated
            </Alert>
          </div>
        )}
    </SUPopup>
  );
}
