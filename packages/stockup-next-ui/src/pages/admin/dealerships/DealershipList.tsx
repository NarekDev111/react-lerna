import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { SearchIcon, UsersIcon } from "@heroicons/react/solid";
import { Card, CardBody, Chip } from "@material-tailwind/react";
import { createContext, useContext, useEffect, useState } from "react";
import PleaseWait from "../../../components/PleaseWait";
import SUButton from "../../../components/SUButton";
import SUInput from "../../../components/SUInput";
import SUPagination from "../../../components/SUPagination";
import * as clientLocationsApi from "../../../services/api/endpoints/clientLocation";
import * as usersApi from "../../../services/api/endpoints/user";
import IClientLocation from "../../../services/api/interfaces/IClientLocation";
import IMongoDocument from "../../../services/api/interfaces/IMongoDocument";
import IUser from "../../../services/api/interfaces/IUser";
import {
  EOperator,
  IListOptions,
  IListResultMeta,
} from "../../../services/api/rest/rest";
import StatusChip from "../components/StatusChip";
import DealershipDetails from "./DealershipDetails";
import UserDetails from "./UserDetails";

export const DealershipsContext = createContext<{
  onDealershipSelect:(id: string) => void;
  onUserSelect: (id: string) => void;
  refresh: () => void;
}>({
  onDealershipSelect: (id: string) => {
    console.log("Dealership selected with id:" + id);
  },
  onUserSelect: (id: string) => {
    console.log("User selected with id:" + id);
  },
  refresh: () => {
    console.log("Not implemented");
  },
});

function DealershipUsers({
  client_location_id,
  inv, // a random string to make sure component rerenders with the parent list. a bit of a hack but works
}: {
  client_location_id: string;
  inv: string;
}) {
  const [users, setUsers] = useState<(IUser & IMongoDocument)[]>([]);
  const [isLoading, setLoading] = useState(true);
  const dealershipsContext = useContext(DealershipsContext);

  useEffect(() => {
    setLoading(true);
    usersApi.list({ params: { client_location_id } }).then((user_list) => {
      setUsers(user_list.list);
      setLoading(false);
    });
  }, [client_location_id, inv]);

  return (
    <Card className="mb-1">
      <CardBody>
        {isLoading && users.length === 0 ? (
          <div className="flex">
            <div className="m-auto">
              <PleaseWait />
            </div>
          </div>
        ) : users.length ? (
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-[200px] text-left p-2">Name</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Bidder Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => dealershipsContext.onUserSelect(user._id)}
                  >
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">
                      {user.status_cd ? (
                        <StatusChip status={user.status_cd} />
                      ) : (
                        <div>N/A</div>
                      )}
                    </td>
                    <td className="p-2">
                      {!user.bidder_status ? (
                        <Chip color="red" value="No" />
                      ) : (
                        <Chip color="green" value="Yes" />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <>No users</>
        )}
      </CardBody>
    </Card>
  );
}

function DealershipItem({
  clientLocation,
  searchUsers,
}: {
  clientLocation: IClientLocation & IMongoDocument;
  searchUsers: (IUser & IMongoDocument)[];
}) {
  const [isOpen, setOpen] = useState(false);

  const dealershipsContext = useContext(DealershipsContext);

  const foundUsers = searchUsers.filter(
    (u) => u.client_location_id === clientLocation._id
  );

  return (
    <>
      <tr
        onClick={() => {
          setOpen(!isOpen);
        }}
        className="cursor-pointer text-xl hover:bg-gray-100"
      >
        <td className="w-6">
          {isOpen ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </td>
        <td>
          <span className="font-bold">{clientLocation.dealership_name}</span>

          <span className="text-gray-600 text-sm ml-2">
            {[
              clientLocation.address.street,
              clientLocation.address.city,
              clientLocation.address.state,
              clientLocation.address.zip,
            ].join(", ")}
          </span>
        </td>
        <td>
          <StatusChip status={clientLocation.status_cd} />
        </td>
      </tr>
      {!isOpen && foundUsers.length > 0 ? (
        <tr>
          <td />
          <td colSpan={5}>
            <div className="pl-4 flex flex-wrap">
              <div className="flex">
                <UsersIcon className="w-4 h-4 text-blue-800 mr-2 m-auto" />
              </div>
              {foundUsers.map((user) => (
                <div className="text-blue-800 mr-2" key={`user_${user._id}`}>
                  <span className="font-bold">{user.name}</span> ({user.email})
                </div>
              ))}
            </div>
          </td>
        </tr>
      ) : null}
      {isOpen ? (
        <tr>
          <td />
          <td colSpan={5}>
            <SUButton
              className="mb-2"
              onClick={() => {
                dealershipsContext.onDealershipSelect(clientLocation._id);
              }}
            >
              Dealership Details
            </SUButton>
            <DealershipUsers
              client_location_id={clientLocation._id}
              inv={Math.random().toString(16)}
            />
          </td>
        </tr>
      ) : null}
    </>
  );
}

export default function DealershipList() {
  const [clientLocations, setClientLocations] = useState<(IClientLocation & IMongoDocument)[]
  >([]);
  const [clientLocationsListMeta, setClientLocationsListMeta] =
    useState<IListResultMeta>();

  const [searchTerm, setSearchTerm] = useState<string>();

  const [selectedDealershipId, setSelectedDealershipId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  const [listOptions, setListOptions] = useState<IListOptions>({
    page: 0,
    pageSize: 20,
    sortBy: "dealership_name",
  });

  const [searchUsers, setSearchUsers] = useState<(IUser & IMongoDocument)[]>(
    []);

  const [isLoading, setLoading] = useState(false);

  function onDealershipSelect(id: string) {
    setSelectedDealershipId(id);
  }

  function onUserSelect(id: string) {
    setSelectedUserId(id);
  }

  const [requestTimer, setRequestTimer] = useState<NodeJS.Timeout | null>(null);

  async function refresh() {
    setLoading(true);

    const foundUsers = searchTerm
      ? (
          await usersApi.list({
            pageSize: 1000,
            params: {
              email: `/${searchTerm}`,
              name: `/${searchTerm}`,
              $op: EOperator.or,
            },
            select: "email,name,client_location_id",
          })
        ).list.filter((u) => u.client_location_id != null)
      : [];

    setSearchUsers(foundUsers);

    const cll = await clientLocationsApi.list({
      ...listOptions,
      params: searchTerm
        ? {
            dealership_name: searchTerm ? `/${searchTerm}` : "",
            _id: JSON.stringify(foundUsers.map((u) => u.client_location_id)),
            $op: EOperator.or,
          }
        : undefined,
    });
    setClientLocationsListMeta(cll.meta);
    setClientLocations(cll.list);
    setLoading(false);
  }

  function onPaginationChange(options: IListOptions) {
    setListOptions(options);
  }

  useEffect(() => {
    if (requestTimer != null) {
      clearTimeout(requestTimer);
      setRequestTimer(null);
    }

    const newTimer = setTimeout(() => {
      setRequestTimer(null);
      refresh();
    }, 300);
    setRequestTimer(newTimer);
  }, [searchTerm]);

  useEffect(() => {
    refresh();
  }, [listOptions]);

  return (
    <DealershipsContext.Provider
      value={{ onDealershipSelect, onUserSelect, refresh }}
    >
      {selectedDealershipId ? (
        <DealershipDetails
          dealershipId={selectedDealershipId}
          onClose={() => setSelectedDealershipId("")}
        />
      ) : null}

      {selectedUserId ? (
        <UserDetails
          user_id={selectedUserId}
          onClose={() => setSelectedUserId("")}
        />
      ) : null}

      <Card className="mb-4">
        <CardBody>
          <h2 className="text-xl font-bold">Dealerships</h2>
        </CardBody>
      </Card>

      <Card className="mb-4">
        <CardBody>
          <SUInput
            placeholder="Find Dealership"
            onChange={(value) => setSearchTerm(value.trim())}
            icon={<SearchIcon className="w-5 h-5" />}
          />
          <table className={`w-full ${isLoading ? "animate-pulse" : ""}`}>
            <thead>
              <tr>
                <th />
                <th className="text-left min-w-[200px]">Dealership</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {clientLocations.map((cl) => {
                return (
                  <DealershipItem
                    key={cl._id}
                    clientLocation={cl}
                    searchUsers={searchUsers}
                  />
                );
              })}
            </tbody>
          </table>

          {clientLocationsListMeta ? (
            <div className="text-right">
              <SUPagination
                meta={clientLocationsListMeta}
                onChange={onPaginationChange}
              />
            </div>
          ) : null}
        </CardBody>
      </Card>
    </DealershipsContext.Provider>
  );
}
