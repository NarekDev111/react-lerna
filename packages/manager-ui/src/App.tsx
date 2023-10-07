import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";

import Auth from "./pages/auth/Auth";

import SignIn from "./pages/auth/SignIn";
import { useAuth } from "./context/AuthProvider";
import Admin from "./pages/admin/Admin";
import Dealerships from "./pages/admin/Dealerships";

function App() {
  const auth = useAuth();

  return (
    <div className="h-screen">
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route path="signin" element={<SignIn />} />
        </Route>

        {auth ? (
          <Route path="/admin" element={<Admin />}>
            <Route path="" element={<Navigate to="/admin/dealerships" />} />
            <Route path="dealerships" element={<Dealerships />} />
          </Route>
        ) : null}

        <Route path="*" element={<Navigate to="/auth/signin" />} />
      </Routes>
    </div>
  );
}

export default App;
