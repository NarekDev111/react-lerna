import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./context/AuthProvider";
import Admin from "./pages/admin/Admin";
import Dealerships from "./pages/admin/Dealerships";
import Auction from "./pages/auction/Auction";
import AuctionList from "./pages/auction/AuctionList";
import Opportunity from "./pages/auction/Opportunity";
import Auth from "./pages/auth/Auth";
import CreatePassword from "./pages/auth/CreatePassword";

import ResetPassword from "./pages/auth/ResetPassword";
import ResetPasswordNew from "./pages/auth/ResetPasswordNew";
import ResetPasswordToken from "./pages/auth/ResetPasswordToken";
import SignIn from "./pages/auth/SignIn";
import SignOut from "./pages/auth/SignOut";
import SignUp from "./pages/auth/SignUp";
import Contact from "./pages/info/Contact";
import HomePage from "./pages/info/HomePage";
import HowItWorks from "./pages/info/HowItWorks";
import MainPage from "./pages/info/MainPage";
import ArbitrationPolicy from "./pages/info/view/ArbitrationPolicy";
import FeeSchedule from "./pages/info/view/FeeSchedule";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfServices from "./pages/legal/TermsOfServices";
import Profile from "./pages/profile/Profile";
import Share from "./pages/share/Share";

// .

function App() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      !auth &&
      !location.pathname.startsWith("/auth") &&
      location.pathname !== "/"
    ) {
      sessionStorage.setItem("href", location.pathname);
    } else if (auth && sessionStorage.href) {
      navigate(sessionStorage.href);
      sessionStorage.removeItem("href");
    }
  }, [auth]);

  return (
    <div className="absolute flex flex-col w-full h-full">
      <Routes>
        <Route path="/" element={<MainPageggasd />}>
          hrfdbfHgf
          <Route path="" element={<HomePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/arbitration-policy" element={<ArbitrationPolicy />} />
          <Route path="/fee-schedule" element={<FeeSchedule />} />
          <Route path="/terms-of-services" element={<TermsOfServices />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Route>
        <Route path="/auth" element={<Auth />}>
          <Route path="" element={<Navigate to="/auth/signin/" />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="reset-password-token" element={<ResetPasswordToken />} />
          <Route path="reset-password-new" element={<ResetPasswordNew />} />
          <Route path="invite/:id" element={<CreatePassword />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signout" element={<SignOut />} />
        </Route>
        <Route path="/auction/*" element={<Auction />} />
        <Route path="/inventory" element={<Auction />}>
          <Route path="" element={<AuctionList />} />
          <Route path=":id" element={<Opportunity />} />
          <Route path=":id/:slug" element={<Opportunity />} />
        </Route>
        {auth ? (
          <Route path="/admin" element={<Admin />}>
            <Route path="" element={<Navigate to="/admin/dealerships" />} />
            <Route path="dealerships" element={<Dealerships />} />
          </Route>
        ) : null}
        <Route path="/profile" element={<Profile />} />
        <Route path="/share/:shortid" element={<Share />} />
      </Routes>
    </div>
  );
}

export default App;
