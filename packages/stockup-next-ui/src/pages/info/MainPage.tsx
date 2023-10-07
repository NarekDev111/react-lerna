import { Outlet } from "react-router-dom";
import SUNavbar from "../../components/SUNavbar";

export default function MainPage() {
  return (
    <>
      <SUNavbar />
      <Outlet />
    </>
  );
}
