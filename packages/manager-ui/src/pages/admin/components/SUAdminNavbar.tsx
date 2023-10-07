import { ChevronDownIcon, LogoutIcon } from "@heroicons/react/outline";
import { UserIcon } from "@heroicons/react/solid";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SUButton, IMongoDocument, IUser } from "@sellgauge/common";
import {
  useAuth,
  useSessionEnd,
  useSessionStart,
} from "../../../context/AuthProvider";
import env from "../../../env";
import logoImage from "../../../images/logo.png";
import linked from "../../../services/api/endpoints/auth/linked";
import { me } from "../../../services/api/endpoints/user";

export default function SUAdminNavbar() {
  const sessionEnd = useSessionEnd();
  const sessionStart = useSessionStart();
  const navigate = useNavigate();
  const auth = useAuth();

  const [currentUser, setCurrentUser] = useState<IUser & IMongoDocument>();
  const [linkedUsers, setLinkedUsers] = useState<(IUser & IMongoDocument)[]>(
    []);
  const [isLoading, setLoading] = useState(false);

  function signOut() {
    sessionEnd();
    window.location.href = "/auth/signin";
  }

  async function onDealerBuyerSignIn(id: string) {
    setLoading(true);

    const sessionData = (await linked(id)).data;

    if (!sessionData) {
      setLoading(false);
      return;
    }

    sessionEnd();
    sessionStart(sessionData);

    navigate("/inventory");
  }

   function onTheLotSignIn() {
    if (!auth) return;

    const theLotUrl = `${
      env.theLotUrl
    }/admin/tokens?access_token=${encodeURIComponent(
      auth.access_token
    )}&refresh_token=${encodeURIComponent(auth.refresh_token)}&type=${
      auth.user.type
    }`;

    window.open(theLotUrl, "_blank");
  }

  useEffect(() => {
    me().then((response) => {
      setCurrentUser(response.data.user);
      setLinkedUsers(response.data.linked_users);
    });
  }, []);

  return (
    <header className="w-full bg-stockup-pink">
      <div className="flex h-[80px] justify-between  w-full m-auto">
        <div className="flex items-center ml-14 ">
          <a href="/admin" className="flex h-full items-center">
            <img
              alt="Stockup"
              src={logoImage}
              className="w-[120px] h-[60px] m-auto"
             />
          </a>
          <h1 className="text-white ml-2 font-bold text-xl">ADMIN</h1>
        </div>

        <div className="flex">
          <div className="flex m-4 gap-2">
            <SUButton
              size="sm"
              color="green"
              loading={isLoading}
              onClick={() => {
                setLoading(true);
                navigate("/auction");
              }}
            >
              Go to Inventory
            </SUButton>
            {linkedUsers.length > 0 ? (
              <SUButton
                  size="sm"
                  loading={isLoading}
                  onClick={() => onDealerBuyerSignIn(linkedUsers[0]._id)}
                >
                  Dealer Buyer Sign-In
              </SUButton>
            ) : null}
            <SUButton
              size="sm"
              loading={isLoading}
              color="orange"
              onClick={onTheLotSignIn}
            >
              TheLot Sign-In
            </SUButton>
          </div>

          <div className="text-white flex font-bold mr-7 items-center cursor-pointer">
            <UserIcon className="w-5 h-5 " />

            {currentUser && (
              <Menu>
                <MenuHandler>
                  <span className="flex items-center">
                    {currentUser.email}
                    <ChevronDownIcon className="w-4 h-4" />
                  </span>
                </MenuHandler>
                <MenuList>
                  <MenuItem className="flex items-center" onClick={signOut}>
                    <LogoutIcon className="w-5 h-5 mx-1" /> Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
