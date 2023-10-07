import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../common/UseQuery";
import ErrorAlert from "../../components/ErrorAlert";
import LoadingSpinner from "../../components/LoadingSpinner";
import SUButton from "../../components/SUButton";
import SUInput from "../../components/SUInput";
import resetToken from "../../services/api/endpoints/auth/resetToken";
import verifyToken from "../../services/api/endpoints/auth/verifyToken";
import AuthCard from "./components/AuthCard";

const TOKEN_REQUEST_TIMEOUT = 30;
interface IVerifyTokenErrorResponse {
  message: string;
}

export default function ResetPasswordToken() {
  const navigate = useNavigate();

  const [counter, setCounter] = useState<number>(0);
  const query = useQuery();
  const queryToken: string | null = query.get("token");
  const queryEmail = query.get("email") as string;

  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingRequestToken, setLoadingRequestToken] = useState(false);
  const [error, setError] = useState("");

  let timerId: NodeJS.Timer;

  function stopTimer() {
    clearInterval(timerId);
  }

  function startTimer() {
    setCounter(TOKEN_REQUEST_TIMEOUT);

    timerId = setInterval(() => {
      setCounter((counter) => {
        const newCounter = counter - 1;
        if (newCounter <= 0) stopTimer();
        return newCounter;
      });
    }, 1000);
  }

  async function requestAnotherToken() {
    setLoading(true);
    setLoadingRequestToken(true);

    setToken("");

    try {
      await resetToken(queryEmail);
      startTimer();
    } catch (err) {
      setError(
        ((err as AxiosError).response?.data as IVerifyTokenErrorResponse)
          .message
      );
    }

    setLoading(false);
    setLoadingRequestToken(false);
  }

  async function submitResetToken() {
    setLoading(true);

    try {
      await verifyToken(queryEmail, token);
    } catch (error) {
      setLoading(false);
      setError("Invalid Token");
      return;
    }

    navigate(`/auth/reset-password-new?email=${queryEmail}&code=${token}`);
  }

  useEffect(() => {
    if (queryToken) {
      setToken(queryToken);
      submitResetToken();
    } else {
      startTimer();
    }
  }, [queryToken]);

  return (
    <AuthCard title="Reset Password">
      <div className="w-full flex items-center justify-center flex-col p-5">
        <p className="pb-6 text-sm">
          Please enter the token you’ve received in the Email:
        </p>
        <SUInput
          disabled={loading}
          value={token}
          label="Token"
          type="text"
          onChange={(value) => setToken(value)}
         />
        <div className="w-full flex justify-end mt-5 text-sm text-end">
          {loadingRequestToken ? (
            <LoadingSpinner className="w-4 h-4" />
          ) : counter === 0 ? (
            <a
              onClick={
                loading
                  ? undefined
                  : () => {
                      requestAnotherToken();
                    }
              }
              className="cursor-pointer font-bold"
            >
              Request another token
            </a>
          ) : (
            <span>Request another token in {counter}s</span>
          )}
        </div>
        {error ? <ErrorAlert>{error}</ErrorAlert> : null}
        <SUButton
          disabled={!token?.trim()}
          loading={loading}
          className="mt-10 w-full"
          onClick={() => {
            submitResetToken();
          }}
        >
          Reset Password
        </SUButton>
      </div>
    </AuthCard>
  );
}
