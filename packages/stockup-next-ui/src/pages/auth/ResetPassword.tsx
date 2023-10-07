import { ArrowLeftIcon } from "@heroicons/react/outline";
import { Button } from "@material-tailwind/react";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { useQuery } from "../../common/UseQuery";
import ErrorAlert from "../../components/ErrorAlert";
import SUButton from "../../components/SUButton";
import SUInput from "../../components/SUInput";
import resetToken from "../../services/api/endpoints/auth/resetToken";
import verifyEmail from "../../services/api/endpoints/auth/verifyEmail";
import AuthCard from "./components/AuthCard";

interface IVerifyEmailErrorResponse {
  message: string;
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const query = useQuery();
  const queryEmail = query.get("email") || "";
  const [email, setEmail] = useState("" || queryEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  async function resetPassword() {
    setLoading(true);
    setError("");

    try {
      await verifyEmail(email);
    } catch (error) {
      setError(
        ((error as AxiosError).response?.data as IVerifyEmailErrorResponse)
          .message
      );
      setLoading(false);
      return;
    }

    try {
      await resetToken(email);
    } catch (err) {
      setError(
        ((err as AxiosError).response?.data as IVerifyEmailErrorResponse)
          .message
      );
      setLoading(false);
      return;
    }
    navigate(`/auth/reset-password-token?email=${email}`);
  }
  return (
    <AuthCard title="Reset Password">
      <div className="w-full flex items-center justify-center flex-col p-5">
        <p className="pb-6 text-sm">
          Please enter the Email used for registration:
        </p>
        <SUInput
          value={email}
          label="Email"
          type="email"
          onChange={(value) => setEmail(value)}
          disabled={loading}
          validator={isEmail}
         />
        {error ? <ErrorAlert>{error}</ErrorAlert> : null}
        <div className="flex  w-full items-center justify-between">
          <Button
            onClick={() => {
              navigate("/auth/signin");
            }}
            className="flex items-center mt-10"
            variant="text"
          >
            <ArrowLeftIcon className="h-5 w-5 mx-1 text-blue-400 " />
            GO BACK
          </Button>
          <SUButton
            disabled={!isEmail(email)}
            loading={loading}
            className="mt-10 "
            onClick={() => {
              resetPassword();
            }}
          >
            Reset Password
          </SUButton>
        </div>
      </div>
    </AuthCard>
  );
}
