import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import SUAdminNavbar from "./components/SUAdminNavbar";

export default function Admin() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth || auth.user.type === "DealerBuyer") navigate("/inventory");
  }, []);

  if (!auth || auth.user.type !== "GaugeRep") return <></>;

  return (
    <>
      <SUAdminNavbar />
      <div className="flex">
        <div className="p-6 w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}
