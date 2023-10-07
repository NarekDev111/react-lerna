import { Outlet, Navigate } from "react-router-dom";
import carParkStockup from "../../images/car-park-stockup.jpeg";
import { useAuth } from "../../context/AuthProvider";

export default function Auth() {
  const auth = useAuth();

  return (
    <>
      {!auth ? (
        <div
          className="bg-cover h-full flex"
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.35)), url(${carParkStockup})`,
          }}>
          <Outlet />
        </div>
      ) : (
        <Navigate to="/admin" />
      )}
    </>
  );
}
