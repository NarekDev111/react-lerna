import { useEffect, useState } from "react";
import {
  PleaseWait,
  SUButton,
  SUInputEx,
  SUPopup,
  IMongoDocument,
  IPendingUser,
  IUser,
} from "@sellgauge/common";

import { list } from "../../../services/api/endpoints/user";

interface IAssignUserProps {
  pendingUser?: (IPendingUser & IMongoDocument) | null;
  onUserId: (id: string) => void;
  onClose: () => void;
  onCreate: () => void;
}

export default function AssignUser({
  pendingUser,
  onClose,
  onUserId,
  onCreate,
}: IAssignUserProps) {
  const [isLoading, setLoading] = useState(false);
  const [suggestedUsers, setSuggestedUsers] =
    useState<(IUser & IMongoDocument)[]>();

  const [findEmail, setFindEmail] = useState("");

  async function findUser() {
    setLoading(true);

    const result = await list({ params: { email: `/${findEmail}` } });

    setSuggestedUsers(result.list);

    setLoading(false);
  }

  useEffect(() => {
    setSuggestedUsers([]);
    setFindEmail("");
    if (pendingUser) {
      setLoading(true);

      list({ params: { email: pendingUser.email } }).then((result) => {
        setSuggestedUsers(result.list);
        setLoading(false);
      });
    }
  }, [pendingUser]);

  return (
    <SUPopup
      size="md"
      open={!!pendingUser}
      onClose={onClose}
      title="Assign user"
    >
      <div className="flex flex-col">
        <div>
          User's record will be created in the database automatically as soon as
          the they accept the invite. However you can create this record now or
          choose an existing user record that will be associated with the
          invited user
        </div>
        <hr />
        {isLoading && <PleaseWait />}
        <div>
          {suggestedUsers?.length ? (
            <>
              <h2>Users with matching emails were found in the database:</h2>
              <div className="pl-2 pt-2 pb-2">
                {suggestedUsers.map((user) => (
                  <div key={user._id} className="hover:bg-gray-100 cursor-pointer p-1">
                    {user.name} (<strong>{user.email}</strong>)
                    <SUButton
                      className="ml-2"
                      size="sm"
                      onClick={() => onUserId(user._id)}
                    >
                      assign
                    </SUButton>
                  </div>
                ))}
              </div>
            </>
          ) : (
            !isLoading && (
              <>
                No users found with matching email (
                <strong>{pendingUser?.email}</strong>)
              </>
            )
          )}
        </div>
        <div className="pt-1 pb-1">
          <strong>Find another user:</strong>
          <div className="flex gap-1">
            <SUInputEx
              value={findEmail}
              onChange={(val) => setFindEmail(val)}
              disabled={isLoading}
              label="Email"
            />
            <SUButton onClick={() => findUser()} disabled={isLoading}>
              Find
            </SUButton>
          </div>
        </div>
        <div className="flex justify-items-stretch m-1">
          <div className="border-1 border-black flex-auto h-full" />
          <div className="font-bold">OR</div>
          <div className="border-1 border-black flex-auto h-full" />
        </div>
        <SUButton disabled={isLoading} onClick={onCreate}>
          Create a new User
        </SUButton>
        <p>User will be created based on the Sign-Up form data</p>
      </div>
    </SUPopup>
  );
}
