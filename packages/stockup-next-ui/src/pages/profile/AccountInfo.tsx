import { Alert } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import SUButton from "../../components/SUButton";
import SUInputEx from "../../components/SUInputEx";
import { me, password, update } from "../../services/api/endpoints/user";
import IMongoDocument from "../../services/api/interfaces/IMongoDocument";
import IUser from "../../services/api/interfaces/IUser";
import { generatePassword } from "../../services/misc";

const MIN_PASSWORD_LEN = 6;

export default function AccountInfo() {
  const [user, setUser] = useState<IUser & IMongoDocument>();
  const [changePhone, setChangePhone] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState<string>(
    generatePassword(MIN_PASSWORD_LEN)
  );
  const [newPhone, setNewPhone] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  async function setPassword() {
    if (user) {
      setLoading(true);
      await password(user._id, newPassword);
      setChangePassword(false);
      setLoading(false);
      setUpdateSuccess(true);
    }
  }

  async function updateUser() {
    if (user) {
      setLoading(true);
      setUser({ ...user, cell: newPhone });
      await update({ cell: newPhone });
      setChangePhone(false);
      setUpdateSuccess(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    me().then((response) => {
      setUser(response.data.user);
      setNewPhone(response.data.user.cell);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <h3 className="font-bold text-lg">Account info</h3>

      <Alert
        color="green"
        show={updateSuccess}
        dismissible={{
          onClose: () => {
            setUpdateSuccess(false);
          },
        }}
      >
        Successfully updated
      </Alert>

      <table className="" cellPadding={5}>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>{user?.name}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{user?.email}</td>
          </tr>
          <tr>
            <td>Phone:</td>
            <td>
              {changePhone ? (
                <div className="flex place-items-center gap-1">
                  <SUInputEx
                    value={newPhone}
                    onChange={(val) => setNewPhone(val)}
                  />
                  <SUButton
                    size="sm"
                    disabled={isLoading}
                    onClick={() => updateUser()}
                  >
                    Change
                  </SUButton>
                  <SUButton
                    size="sm"
                    color="red"
                    disabled={isLoading}
                    onClick={() => setChangePhone(false)}
                  >
                    Cancel
                  </SUButton>
                </div>
              ) : (
                <>
                  {user?.cell}{" "}
                  <SUButton
                    size="sm"
                    onClick={() => setChangePhone(true)}
                    disabled={isLoading}
                  >
                    change
                  </SUButton>
                </>
              )}
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <hr className="pt-1 pb-1" />
            </td>
          </tr>
        </tbody>
      </table>
      {changePassword ? (
        <>
          <div className="flex gap-2 place-items-center">
            <div>
              <SUInputEx
                label="New password:"
                value={newPassword}
                onChange={(val) => setNewPassword(val)}
                disabled={isLoading}
                isInvalid={newPassword.length < MIN_PASSWORD_LEN}
              />
            </div>
            <SUButton
              size="sm"
              disabled={isLoading || newPassword.length < MIN_PASSWORD_LEN}
              onClick={() => setPassword()}
            >
              Set password
            </SUButton>
            <SUButton
              size="sm"
              color="red"
              disabled={isLoading}
              onClick={() => setChangePassword(false)}
            >
              Cancel
            </SUButton>
          </div>
          {newPassword.length < MIN_PASSWORD_LEN && (
            <p className="text-red-500">
              Password should be at least {MIN_PASSWORD_LEN} characters long
            </p>
          )}
          <button
            className="text-link text-sm"
            onClick={() => setNewPassword(generatePassword(MIN_PASSWORD_LEN))}
            disabled={isLoading}
          >
            Generate new password
          </button>
        </>
      ) : (
        <SUButton
            size="sm"
            onClick={() => setChangePassword(true)}
            disabled={isLoading}
          >
            Reset password
        </SUButton>
      )}
    </>
  );
}
