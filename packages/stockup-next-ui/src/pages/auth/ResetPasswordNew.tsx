import { Input } from "@material-tailwind/react";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../common/UseQuery";
import ErrorAlert from "../../components/ErrorAlert";
import SUButton from "../../components/SUButton";
import resetPassword from "../../services/api/endpoints/auth/resetPassword";
import AuthCard from "./components/AuthCard";
import ShowPasswordButton from "./components/ShowPasswordButton";

export default function ResetPasswordNew() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const [loading, setLoading] = useState(false);
  const query = useQuery();
  const queryEmail = query.get("email") as string;
  const queryCode = query.get("code") as string;

  const navigate = useNavigate();
  async function UpdatePassword() {
    const newPassword = password.trim();

    if (newPassword !== confirmPassword.trim()) {
      setError("Passwords do not match");
    } else {
      setError("");
      setLoading(true);
      try {
        await resetPassword(queryEmail, queryCode, newPassword);
        navigate("/auth/signin");
      } catch (error) {
        setError((error as AxiosError).message);
        setLoading(false);
      }
    }
  }
  return (
    <AuthCard title="Reset Password">
      <div className="w-full  flex items-center justify-center flex-col p-5">
        <Input
          disabled={loading}
          variant="standard"
          label="New Password"
          type={showPassword ? "text" : "password"}
          icon={
            <ShowPasswordButton
              shown={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
            />
          }
          onChange={(e) => {
            setPassword(e.target.value);
          }}
         />
        <br />
        <Input
          disabled={loading}
          variant="standard"
          label="Confirm Password"
          type={showPassword1 ? "text" : "password"}
          icon={
            <ShowPasswordButton
              shown={showPassword1}
              onToggle={() => setShowPassword1(!showPassword1)}
            />
          }
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
         />
        {error ? <ErrorAlert>{error}</ErrorAlert> : null}
        <SUButton
          disabled={!password.trim() || !confirmPassword.trim()}
          loading={loading}
          className="mt-10 w-full"
          onClick={() => {
            UpdatePassword();
          }}
        >
          Update Password
        </SUButton>
      </div>
    </AuthCard>
  );
}
