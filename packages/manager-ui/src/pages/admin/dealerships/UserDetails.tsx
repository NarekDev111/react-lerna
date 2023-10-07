import { XIcon } from "@heroicons/react/outline";
import { Alert, Checkbox, Option, Select } from "@material-tailwind/react";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import {
  SUButton,
  SUPopup,
  SUInputEx,
  LoadingSpinner,
  IMongoDocument,
  IUser,
} from "@sellgauge/common";
import {
  one,
  password,
  patch,
  status,
} from "../../../services/api/endpoints/user";

import { generatePassword } from "../../../services/misc";
import StatusChip from "../components/StatusChip";
import { DealershipsContext } from "./DealershipList";

export default function UserDetails({
  user_id,
  onClose,
}: {
  user_id: string;
  onClose: () => void;
}) {
  const [user, setUser] = useState<IUser & IMongoDocument>();
  const [isLoading, setLoading] = useState(false);
  const [statuses, setStatuses] = useState<string[]>();
  const [bidderStatus, setBidderStatus] = useState<boolean>();
  const [isUpdated, setUpdated] = useState(false);
  const [isSetPassword, setSetNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState<string>("");

  function genNewPassword() {
    setNewPassword(generatePassword(6));
  }

  const dealershipsContext = useContext(DealershipsContext);

  useEffect(() => {
    status().then((response) => {
      setStatuses(response.data);
    });

    genNewPassword();
  }, []);

  useEffect(() => {
    setLoading(true);
    one(user_id).then((result) => {
      setUser(result);
      setBidderStatus(result.bidder_status);
      setLoading(false);
    });
  }, [user_id]);

  function switchBidderStatus(newVal: boolean) {
    setUpdated(false);
    const currentStatus = bidderStatus;

    if (user) {
      patch(user._id, { bidder_status: newVal })
        .then(() => {
          dealershipsContext.refresh();
          setUpdated(true);
        })
        .catch(() => {
          setBidderStatus(currentStatus);
        });
    }

    setBidderStatus(newVal);
  }

  function changeStatus(newStatus: string) {
    if (user) {
      setUpdated(false);
      patch(user._id, { status_cd: newStatus }).then(() => {
        dealershipsContext.refresh();
        setUpdated(true);
      });
    }
  }

  async function updateUserPassword() {
    setLoading(true);
    try {
      await password(user_id, newPassword);
      setUpdated(true);
      setSetNewPassword(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SUPopup open title="User Details" onClose={onClose} size="xs">
      {isLoading ? (
        <div className="flex">
          <div className="m-auto">
            <LoadingSpinner className="w-5 h-5" />
          </div>
        </div>
      ) : user ? (
        <div className="flex flex-col w-full">
          <table className="w-full">
            <tbody>
              <tr>
                <td>Name</td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <a href={`mailto:${user.email}`} className="text-link">
                    {user.email}
                  </a>
                </td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{user.cell}</td>
              </tr>
              <tr>
                <td>Created at</td>
                <td>{dayjs(user.created_at).format("MMMM D, YYYY h:mm a")}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>
                  {statuses ? (
                    <Select
                      value={user.status_cd}
                      variant="standard"
                      onChange={(value) => changeStatus(`${value}`)}>
                      {statuses.map((status) => (
                        <Option value={status} key={status}>
                          <StatusChip status={status} />
                        </Option>
                      ))}
                    </Select>
                  ) : (
                    <LoadingSpinner className="w-4 h-4" />
                  )}
                </td>
              </tr>
              <tr>
                <td>Bidder status:</td>
                <td>
                  <Checkbox
                    checked={bidderStatus}
                    onChange={(e) => switchBidderStatus(e.target.checked)}
                  />
                </td>
              </tr>
              <tr>
                <td>Password</td>
                <td>
                  {!isSetPassword ? (
                    <SUButton
                      size="sm"
                      disabled={isLoading}
                      onClick={() => setSetNewPassword(true)}>
                      Set Password
                    </SUButton>
                  ) : (
                    <>
                      <div className="flex gap-2">
                        <SUInputEx
                          value={newPassword}
                          onChange={(val) => setNewPassword(val)}
                        />
                        <SUButton
                          size="sm"
                          onClick={() => {
                            const question = window.confirm(
                              "This will change user's password. This action can't be reverted"
                            );
                            if (question) {
                              updateUserPassword();
                            }
                          }}>
                          Set
                        </SUButton>
                        <button
                          type="button"
                          onClick={() => setSetNewPassword(false)}>
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <a
                        href="#"
                        onClick={(e) => {
                          genNewPassword();
                          e.preventDefault();
                        }}
                        className="text-sm text-link">
                        Generate new password
                      </a>
                    </>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <Alert color="green" show={isUpdated}>
            User has been successfully updated
          </Alert>
        </div>
      ) : (
        <></>
      )}
    </SUPopup>
  );
}
