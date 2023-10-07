import { Alert } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SUButton from "../../components/SUButton";
import SUNavbar from "../../components/SUNavbar";
import {
  useAuth,
  useSessionEnd,
  useSessionStart,
} from "../../context/AuthProvider";
import linked from "../../services/api/endpoints/auth/linked";
import { me } from "../../services/api/endpoints/user";
import IMongoDocument from "../../services/api/interfaces/IMongoDocument";
import IUser from "../../services/api/interfaces/IUser";

export default function Auction() {
  const [showWarning, setShowWarning] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [linkedUsers, setLinkedUsers] = useState<(IUser & IMongoDocument)[]>();
  const auth = useAuth();
  const navigate = useNavigate();
  const sessionEnd = useSessionEnd();
  const sessionStart = useSessionStart();

  async function dealerBuyerSignIn() {
    if (!auth) return;
    if (!linkedUsers || linkedUsers.length === 0) return;

    setLoading(true);

    const sessionData = (await linked(linkedUsers[0]._id)).data;

    if (!sessionData) {
      setLoading(false);
      alert(
        "Failed to sign in as a DealerBuyer. Possibly no linked DealerBuyer user account"
      );
      return;
    }

    sessionEnd();
    sessionStart(sessionData);

    window.location.reload();
  }

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith("/auction")) {
      navigate(`${path.replace("/auction", "/inventory")}`);
    }

    if (auth) {
      me().then((response) => {
        setLinkedUsers(response.data.linked_users);
      });
    }
  }, []);

  useEffect(() => {
    if (auth && auth.user.type !== "DealerBuyer") {
      setShowWarning(true);
    }
  }, [auth]);

  return (
    <>
      {showWarning && (
        <Alert
            color="red"
            className="rounded-none fixed z-20"
            dismissible={{
              onClose: () => {
                setShowWarning(false);
              },
            }}
          >
            <div>
              <strong>WARNING</strong>: You are viewing the website as a{" "}
              <strong>Gauge Representative</strong> user which means that you
              cannot place bids and other features may be unavailable to you.
            </div>
            <div className="flex gap-2">
              <SUButton
                color="green"
                onClick={() => navigate("/admin")}
                disabled={isLoading}
              >
                Admin Interface
              </SUButton>
              {linkedUsers?.length && (
                <SUButton
                  disabled={isLoading}
                  onClick={() => dealerBuyerSignIn()}
                >
                  Dealer Buyer Sign-In
                </SUButton>
              )}
            </div>
        </Alert>
      )}
      <SUNavbar />

      <div className="h-full">
        <Outlet />
      </div>
    </>
  );
}
