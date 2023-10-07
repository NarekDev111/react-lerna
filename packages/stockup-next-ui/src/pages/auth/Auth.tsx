import { Outlet } from "react-router-dom";
import SUFooter from "../../components/SUFooter";
import SUNavbar from "../../components/SUNavbar";
import carParkStockup from "../../images/car-park-stockup.jpeg";

export default function Auth() {
  return (
    <>
      <SUNavbar />
      <div
        className="bg-cover h-full flex"
        style={{
          background:
            `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.35)), url(${
            carParkStockup
            })`,
        }}
      >
        <Outlet />
      </div>
      <SUFooter />
    </>
  );
}
