import { Alert, Option, Select } from "@material-tailwind/react";
import { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import SUButton from "../../components/SUButton";
import SUInput from "../../components/SUInput";
import signup from "../../services/api/endpoints/auth/signup";
import usStates from "../../us-codes.json";
import AuthCard from "./components/AuthCard";

import isNotEmpty from "../../services/validators/isNotEmpty";
import isZipCode from "../../services/validators/isZipCode";

export default function SignUp() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");

  const [dealershipName, setDealershipName] = useState("");
  const [website, setWebsite] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>();

  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setLoading(true);
    setErrorMessage(undefined);

    try {
      await signup({
        user: {
          firstName,
          lastName,
          email,
          phoneNumber,
        },
        dealership: {
          name: dealershipName,
          address: {
            city,
            state,
            zip,
            street,
          },
          website,
        },
      });
      setFormSubmitted(true);
    } catch (error) {
      setLoading(false);

      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
          const data = axiosError.response.data as { error: string };

          if (data.error) setErrorMessage(data.error);
        }
      }
    }
  }

  return (
    <div className="w-full flex items-center justify-center mx-4">
      <AuthCard title="Sign Up" className="relative top-8 md:static">
        {!formSubmitted ? (
          <div className="w-full p-7 flex flex-col ">
            {errorMessage ? <Alert color="red">{errorMessage}</Alert> : null}
            <h1 className="font-bold">PROFILE:</h1>
            <h2 className="text-sm">
              Tell us who you are so that we can get to know you better:
            </h2>
            <div className="w-full flex mt-1 mb-1 items-stretch gap-5 flex-col md:flex-row">
              <div className=" w-full">
                <SUInput
                  label="First Name*"
                  disabled={loading}
                  onChange={(value) => setFirstName(value)}
                  validator={isNotEmpty}
                />
              </div>

              <div className="w-full">
                <SUInput
                  label="Last Name*"
                  disabled={loading}
                  onChange={(value) => setLastName(value)}
                  validator={isNotEmpty}
                />
              </div>
            </div>
            <SUInput
              label="Email*"
              validator={isEmail}
              disabled={loading}
              onChange={(value) => setEmail(value)}
            />
            <SUInput
              label="Phone Number*"
              disabled={loading}
              onChange={(value) => setPhoneNumber(value)}
              validator={isNotEmpty}
            />
            <br />
            <h1 className="font-bold">DEALERSHIP INFORMATION:</h1>
            <SUInput
              label="Dealership Name*"
              disabled={loading}
              onChange={(value) => setDealershipName(value)}
              validator={isNotEmpty}
            />
            <div className="flex w-full md:gap-5 flex-col md:flex-row">
              <SUInput
                label="City*"
                disabled={loading}
                onChange={(value) => setCity(value)}
                validator={isNotEmpty}
              />

              <div>
                <Select
                  label="State*"
                  disabled={loading}
                  variant="standard"
                  onChange={(value) => setState(`${value}`)}
                  success={!!state}>
                  {usStates.map((state) => {
                    return (
                      <Option
                        className="list-none"
                        value={state.Code}
                        key={state.Code}>
                        {state.Name}
                      </Option>
                    );
                  })}
                </Select>
              </div>

              <SUInput
                label="Zip Code*"
                disabled={loading}
                onChange={(value) => setZip(value)}
                validator={isZipCode}
              />
            </div>

            <SUInput
              label="Street Address*"
              disabled={loading}
              onChange={(value) => setStreet(value)}
              validator={isNotEmpty}
            />

            <SUInput
              label="Website"
              disabled={loading}
              onChange={(value) => setWebsite(value)}
            />
            <div className="w-full flex justify-center">
              <SUButton
                onClick={onSubmit}
                loading={loading}
                disabled={
                  !loading &&
                  !(
                    phoneNumber &&
                    firstName &&
                    lastName &&
                    isEmail(email) &&
                    dealershipName &&
                    isZipCode(zip) &&
                    city &&
                    state &&
                    street
                  )
                }
                className="w-44 h-14 mt-7">
                SEND ME AN INVITE
              </SUButton>
            </div>
            <h2 className="text-sm text-center mt-1">
              Already have an account?{" "}
              <Link className="text-link" to="/auth/signin">
                Sign In
              </Link>
            </h2>
          </div>
        ) : (
          <div className="flex flex-col w-full items-center justify-center">
            <h1 className="text-center py-12 px-10">
              Your application is being processed. An invite will be sent to
              your email once the process is done.
            </h1>
            <SUButton className="mb-5" onClick={() => navigate("/")}>
              OK
            </SUButton>
          </div>
        )}
      </AuthCard>
    </div>
  );
}
