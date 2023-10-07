import { Card, CardBody, Checkbox } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import SUButton from "../../../components/SUButton";
import { list } from "../../../services/api/endpoints/pendingUsers";
import IMongoDocument from "../../../services/api/interfaces/IMongoDocument";
import IPendingUser from "../../../services/api/interfaces/IPendingUser";

import * as pendingUsersApi from "../../../services/api/endpoints/pendingUsers";

import LoadingSpinner from "../../../components/LoadingSpinner";
import PleaseWait from "../../../components/PleaseWait";
import SUPopup from "../../../components/SUPopup";
import { put } from "../../../services/api/endpoints/user";
import IClientLocation from "../../../services/api/interfaces/IClientLocation";
import IPendingClientLocation from "../../../services/api/interfaces/IPendingClientLocation";
import IUser from "../../../services/api/interfaces/IUser";
import AssignUser from "./AssignUser";
import ReviewPendingDealership from "./ReviewPendingDealership";

const DATE_FORMAT = "MMMM D, YYYY h:mm a";

dayjs.extend(relativeTime);

export default function PendingUsers() {
  const [pendingUsers, setPendingUsers] =
    useState<(IPendingUser & IMongoDocument)[]>();

  const [selectedPendingUserId, setSelectedPendingUserId] = useState<string>();
  const [selectedPendingDealerShipId, setSelectedPendingDealershipId] =
    useState<string>();

  const [isLoading, setLoading] = useState(true);
  const [showDiscardPopup, setShowDiscardPopup] = useState(false);

  const [pendingUserAssign, setPendingUserAssign] = useState<
    (IPendingUser & IMongoDocument) | null
  >();

  async function refresh() {
    setLoading(true);
    const pendingUsersList = await list({
      populate: ["user"],
    });
    setPendingUsers(pendingUsersList.list);
    setLoading(false);
  }

  async function changeBidderStatus(userId: string, newValue: boolean) {
    setLoading(true);
    await pendingUsersApi.patch(userId, { bidder_status: newValue });
    await refresh();
  }

  async function inviteUser(userId: string) {
    setLoading(true);
    try {
      await pendingUsersApi.invite(userId);
      await refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError;
        console.log(axiosError.message);
      }
      setLoading(false);
    }
  }

  async function discardUser() {
    if (selectedPendingUserId) {
      await pendingUsersApi.remove(selectedPendingUserId);
      refresh();
    }
  }

  async function assignUser(id: string) {
    if (!id) {
      setPendingUserAssign(null);
      return;
    }

    if (!pendingUserAssign) return;

    setPendingUserAssign(null);

    await pendingUsersApi.patch(pendingUserAssign._id, { user: id });

    refresh();
  }

  async function createAssignUser() {
    if (!pendingUserAssign) return;

    setLoading(true);

    const {
      email,
      firstName,
      lastName,
      phoneNumber,
      client_location_id,
      bidder_status,
    } = pendingUserAssign;
    const name = `${firstName} ${lastName}`;

    const result = await put({
      email,
      name,
      cell: phoneNumber,
      _type: "DealerBuyer",
      status_cd: "new",
      user_verified: true,
      client_location_id,
      bidder_status,
    });

    await pendingUsersApi.patch(pendingUserAssign._id, { user: result._id });

    setPendingUserAssign(null);

    refresh();
  }

  async function unassignUser(pendingUserId: string) {
    setLoading(true);
    await pendingUsersApi.patch(pendingUserId, { user: null });
    refresh();
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <SUPopup
        title="Discard Pending User?"
        onClose={() => setShowDiscardPopup(false)}
        open={showDiscardPopup}
        size="sm">
        <div className="flex flex-col w-full">
          <p>The user won't be notified.</p>
          <p>This action is irreversible.</p>
          <p>Proceed?</p>

          <div className="flex place-content-between mt-3">
            <SUButton
              color="red"
              onClick={() => {
                setShowDiscardPopup(false);
                discardUser();
              }}>
              Discard
            </SUButton>
            <SUButton color="blue" onClick={() => setShowDiscardPopup(false)}>
              Don't discard
            </SUButton>
          </div>
        </div>
      </SUPopup>

      {pendingUsers && pendingUsers.length > 0 ? (
        <>
          {selectedPendingDealerShipId && selectedPendingUserId ? (
            <ReviewPendingDealership
              pendingClientLocationId={selectedPendingDealerShipId}
              pendingUserId={selectedPendingUserId}
              onClose={() => {
                setSelectedPendingDealershipId(undefined);
                setSelectedPendingUserId(undefined);
                refresh();
              }}
            />
          ) : null}

          <AssignUser
            onCreate={createAssignUser}
            pendingUser={pendingUserAssign}
            onUserId={assignUser}
            onClose={() => setPendingUserAssign(null)}
          />

          <Card className="mb-4">
            <CardBody>
              <h2 className="text-xl font-bold">Pending Users</h2>
            </CardBody>
          </Card>

          <Card className="mb-4">
            <CardBody>
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="p-2">Signed Up</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Phone #</th>
                    <th className="p-2">Dealership</th>
                    <th className="p-2">User</th>
                    <th className="p-2 text-center">Bidder status</th>
                    <th className="p-2">Invitation</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingUsers.map((pendingUser) => {
                    const pendingClientLocation =
                      pendingUser.pending_client_location_id as IPendingClientLocation &
                        IMongoDocument;

                    const clientLocation =
                      pendingUser.client_location_id as IClientLocation &
                        IMongoDocument;

                    return (
                      <tr
                        key={pendingUser._id}
                        className="hover:bg-gray-100 cursor-pointer">
                        <td className="p-2">
                          <abbr
                            title={dayjs(pendingUser.created_at).format(
                              DATE_FORMAT
                            )}>
                            {dayjs(pendingUser.created_at).fromNow()}
                          </abbr>
                        </td>
                        <td className="p-2">
                          {pendingUser.firstName} {pendingUser.lastName}
                        </td>
                        <td className="p-2">
                          <a
                            href={`mailto:${pendingUser.email}`}
                            className="text-link">
                            {pendingUser.email}
                          </a>
                        </td>
                        <td className="p-2">{pendingUser.phoneNumber}</td>
                        <td className="p-2">
                          {pendingUser.client_location_id ? (
                            <>
                              {clientLocation.dealership_name}
                              &nbsp;
                              <button
                                className="text-link"
                                onClick={() => {
                                  setSelectedPendingDealershipId(
                                    pendingClientLocation._id
                                  );
                                  setSelectedPendingUserId(pendingUser._id);
                                }}>
                                change
                              </button>
                            </>
                          ) : (
                            <div className="">
                              <strong>{pendingClientLocation.name}</strong>:{" "}
                              {[
                                pendingClientLocation.address.street,
                                pendingClientLocation.address.city,
                                pendingClientLocation.address.state,
                                pendingClientLocation.address.zip,
                              ].join(", ")}
                              <SUButton
                                color="blue"
                                size="sm"
                                className="ml-2"
                                onClick={() => {
                                  setSelectedPendingDealershipId(
                                    pendingClientLocation._id
                                  );
                                  setSelectedPendingUserId(pendingUser._id);
                                }}
                                disabled={isLoading}>
                                review
                              </SUButton>
                            </div>
                          )}
                        </td>
                        <td>
                          {pendingUser.client_location_id &&
                            (pendingUser.user ? (
                              <>
                                {(pendingUser.user as IUser).email}
                                <br />
                                <button
                                  className="text-link"
                                  onClick={() => {
                                    setPendingUserAssign(pendingUser);
                                  }}>
                                  change
                                </button>
                                &nbsp;
                                <button
                                  className="text-link"
                                  onClick={() => unassignUser(pendingUser._id)}>
                                  unassign
                                </button>
                              </>
                            ) : (
                              <SUButton
                                size="sm"
                                onClick={() =>
                                  setPendingUserAssign(pendingUser)
                                }>
                                Assign user
                              </SUButton>
                            ))}
                        </td>
                        <td className="flex text-center p-2">
                          <div className="m-auto">
                            {isLoading ? (
                              <LoadingSpinner className="w-10 h-10" />
                            ) : (
                              <Checkbox
                                checked={pendingUser.bidder_status}
                                onChange={(v) =>
                                  changeBidderStatus(
                                    pendingUser._id,
                                    v.target.checked
                                  )
                                }
                                disabled={isLoading}
                                color={isLoading ? "gray" : undefined}
                              />
                            )}
                          </div>
                        </td>
                        <td className="p-2">
                          {pendingUser.invitation ? (
                            <div className="flex">
                              <abbr
                                title={dayjs(
                                  pendingUser.invitation.sent
                                ).format(DATE_FORMAT)}>
                                {dayjs(pendingUser.invitation.sent).fromNow()}
                              </abbr>
                              &nbsp;
                              <a
                                href={`${process.env["REACT_APP_HOST"]}/auth/invite/${pendingUser.invitation.id}`}
                                className="text-link">
                                link
                              </a>
                              &nbsp;
                            </div>
                          ) : (
                            <>
                              <SUButton
                                color="green"
                                size="sm"
                                disabled={
                                  !pendingUser.client_location_id || isLoading
                                }
                                title={
                                  pendingUser.client_location_id
                                    ? undefined
                                    : "Dealership must be assigned in order to invite the user"
                                }
                                onClick={() => inviteUser(pendingUser._id)}>
                                Invite
                              </SUButton>{" "}
                              <SUButton
                                color="red"
                                size="sm"
                                disabled={isLoading}
                                onClick={() => {
                                  setSelectedPendingUserId(pendingUser._id);
                                  setShowDiscardPopup(true);
                                }}>
                                Discard
                              </SUButton>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </>
      ) : !pendingUsers ? (
        <PleaseWait />
      ) : null}
    </>
  );
}
