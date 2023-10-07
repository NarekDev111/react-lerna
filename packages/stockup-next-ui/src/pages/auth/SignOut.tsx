import { useEffect } from "react";
import { useSessionEnd } from "../../context/AuthProvider";
import AuthCard from "./components/AuthCard";

export default function SignOut() {
  const endSession = useSessionEnd();

  useEffect(() => {
    endSession();
    window.location.href = "/";
  }, []);

  return (
    <AuthCard title="Sign Out">
      <div className="m-auto p-10">You are being signed out...</div>
    </AuthCard>
  );
}
