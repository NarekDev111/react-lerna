import { Checkbox } from "@material-tailwind/react";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorAlert from "../../components/ErrorAlert";
import SUButton from "../../components/SUButton";
import SUInput from "../../components/SUInput";
import { useSessionStart } from "../../context/AuthProvider";
import signin from "../../services/api/endpoints/auth/signin";
import { get, post } from "../../services/axios";
import isPassword from "../../services/validators/isPassword";
import AuthCard from "./components/AuthCard";
import ShowPasswordButton from "./components/ShowPasswordButton";

export default function CreatePassword() {
  const navigate = useNavigate();

  const sessionStart = useSessionStart();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    get(`/auth/invite/${id}`)
      .then(() => {
        setInvalid(false);
        setLoading(false);
      })
      .catch(() => {
        setInvalid(true);
      });
  }, [id]);

  async function createPassword() {
    setError("");
    if (password === confirmPassword) {
      setLoading(true);
      try {
        const inviteResponse = await post(`/auth/invite/accept/${id}`, {
          password,
        });

        const { email } = inviteResponse.data;

        const response = await signin(email, password);
        sessionStart(response);

        if (response.user.type === "GaugeRep") {
          navigate("/admin");
        } else {
          navigate("/inventory");
        }
      } catch (error) {
        setError((error as AxiosError).message);
      }
    } else {
      setError("Passwords do not match");
    }
  }

  return (
    <AuthCard title="Invitation">
      {invalid ? (
        <div className="flex p-10">
          <div className="m-auto font-bold">Invalid invite link</div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center flex-col p-5">
          <SUInput
            disabled={loading}
            label="New Password"
            type={showPassword ? "text" : "password"}
            icon={
              <ShowPasswordButton
                shown={showPassword}
                onToggle={() => setShowPassword(!showPassword)}
              />
            }
            onChange={(value) => setPassword(value)}
            validator={isPassword}
           />
          <br />
          <SUInput
            disabled={loading}
            label="Confirm Password"
            type={showPassword1 ? "text" : "password"}
            icon={
              <ShowPasswordButton
                shown={showPassword1}
                onToggle={() => setShowPassword1(!showPassword1)}
              />
            }
            onChange={(value) => setConfirmPassword(value)}
            validator={isPassword}
           />

          {error ? <ErrorAlert>{error}</ErrorAlert> : null}

          <div className="w-full mr-7 flex items-center justify-start">
            <Checkbox
              onChange={() => {
                setAcceptTerms(!acceptTerms);
              }}
            />
            <div className="mt-4 text-sm">
              I accept the{" "}
              <Link className="text-link" to="/privacy-policy">
                Privacy Policy
              </Link>{" "}
              and the{" "}
              <Link className="text-link" to="/terms-of-services">
                Terms of Services
              </Link>
            </div>
          </div>
          <SUButton
            disabled={
              !(
                isPassword(password) &&
                isPassword(confirmPassword) &&
                acceptTerms
              )
            }
            loading={loading}
            className="mt-10 w-full"
            onClick={createPassword}
          >
            Sign In
          </SUButton>
        </div>
      )}
    </AuthCard>
  );
}
