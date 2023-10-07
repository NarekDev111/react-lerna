import { CardBody, CardFooter } from "@material-tailwind/react";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { ErrorAlert, SUButton, SUInput, isNotEmpty } from "@sellgauge/common";

import { useSessionStart } from "../../context/AuthProvider";
import signin from "../../services/api/endpoints/auth/signin";
import AuthCard from "./components/AuthCard";
import ShowPasswordButton from "./components/ShowPasswordButton";

export default function SignIn() {
  const navigate = useNavigate();

  const sessionStart = useSessionStart();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>();

  async function onSignIn() {
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    setLoading(true);

    try {
      const response = await signin(email, password);
      console.log(response);

      // gtag("event", "signin_success", { email, user_type: response.user.type });

      if (response.user.type === "GaugeRep") {
        sessionStart(response);
        navigate("/admin");
      } else {
        sessionStart(response);
        navigate("/auction");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError;

        let fail_reason = "unknown";

        switch (axiosError.response?.status) {
          case 401:
            setError("Invalid password");
            fail_reason = "password";
            break;
          case 404:
            setError("Invalid email");
            fail_reason = "email";
            break;
          default:
            fail_reason = `${axiosError.message}`;
            setError(fail_reason);
        }

        // gtag("event", "signin_fail", { fail_reason });
      } else {
        setError(`${(error as Error).message}`);
      }

      setLoading(false);
    }
  }

  const canSignIn = isEmail(email) && isNotEmpty(password);

  /**
   * BEGIN of the horrible hack to make the label NOT overlap the input on autofill
   */
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPasswordFocused(true);

      setTimeout(() => {
        setEmailFocused(true);
      }, 100);
    }, 100);
  }, []);
  /**
   * /End of the horrible hack
   */

  return (
    <AuthCard className="w-[360px]" title="Sign In">
      <CardBody>
        <div className="flex flex-col">
          <SUInput
            label="Email"
            type="email"
            onChange={(value) => setEmail(value)}
            disabled={loading}
            validator={isEmail}
            className="mb-6"
            forceFocus={emailFocused}
           />

          <SUInput
            label="Password"
            type={showPassword ? "text" : "password"}
            onChange={(value) => setPassword(value)}
            disabled={loading}
            icon={
              <ShowPasswordButton
                shown={showPassword}
                onToggle={() => setShowPassword(!showPassword)}
              />
            }
            forceFocus={passwordFocused}
           />
        </div>

        {error ? <ErrorAlert>{error}</ErrorAlert> : null}

        <div className="flex justify-end mt-2 text-sm">
          <Link
            className="text-link"
            to={`/auth/reset-password?email=${email}`}
          >
            Forgot Password?
          </Link>
        </div>
      </CardBody>

      <CardFooter className="flex flex-col justify-center">
        <SUButton
          loading={loading}
          disabled={!canSignIn}
          onClick={() => onSignIn()}
        >
          Sign in
        </SUButton>
      </CardFooter>
    </AuthCard>
  );
}
