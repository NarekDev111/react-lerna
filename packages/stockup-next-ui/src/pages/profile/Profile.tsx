import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import SUButton from "../../components/SUButton";
import SUFooter from "../../components/SUFooter";
import SUNavbar from "../../components/SUNavbar";
import AccountInfo from "./AccountInfo";
import Notifications from "./Notifications";

export default function Profile() {
  const navigate = useNavigate();

  function onSignOut() {
    if (window.confirm("Are you sure you want to sign out?")) {
      navigate("/auth/signout");
    }
  }

  return (
    <>
      <SUNavbar />
      <div className="flex h-full">
        <div className="w-full md:ml-auto md:mr-auto md:w-[1000px]">
          <div className="flex w-full justify-between pb-2 pt-2">
            <h2 className="font-bold text-xl">My Profile</h2>

            <SUButton size="sm" color="red" onClick={onSignOut}>
              Sign Out
            </SUButton>
          </div>

          <Tabs value="info">
            <TabsHeader>
              <Tab value="info">Account Info</Tab>
              <Tab value="searches">Notifications</Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel value="info">
                <AccountInfo />
              </TabPanel>
              <TabPanel value="searches">
                <Notifications />
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </div>
      <SUFooter />
    </>
  );
}
