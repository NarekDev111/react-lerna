import { XIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import SUCheckbox from "../../components/SUCheckbox";
import { list, patch, remove } from "../../services/api/endpoints/searchFilter";
import { current, update } from "../../services/api/endpoints/user";
import IMongoDocument from "../../services/api/interfaces/IMongoDocument";
import { ISearchFilter } from "../../services/api/interfaces/ISearchFilter";

export default function Notifications() {
  const [searchList, setSearchList] =
    useState<(ISearchFilter & IMongoDocument)[]>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [outbid, setOutbid] = useState<boolean>(false);
  const [settings, setSettings] = useState<{
    notifications?: { [key: string]: boolean };
  }>({});

  function updateList() {
    list().then((data) => {
      setSearchList(data.list);
      setLoading(false);
    });
  }

  useEffect(() => {
    updateList();
    current().then((res) => {
      if (res.data) {
        setSettings(res.data.settings);
        setOutbid(res.data.settings?.notifications?.outbid);
      }
    });
  }, []);

  function updateSMSNotifications(id: string, value: boolean) {
    const email: boolean = (() => {
      for (const item of searchList || []) {
        if (item._id === id) return item.notifications.email;
      }
      return false;
    })();
    patch(id, { notifications: { sms: value, email } });
    setSearchList(
      searchList?.map((item) => (item._id === id
          ? {
              ...item,
              notifications: {
                email,
                sms: value,
              },
            }
          : item))
    );
  }

  function updateEmailNotifications(id: string, value: boolean) {
    const sms: boolean = (() => {
      for (const item of searchList || []) {
        if (item._id === id) return item.notifications.sms;
      }
      return false;
    })();
    patch(id, { notifications: { sms, email: value } });
    setSearchList(
      searchList?.map((item) => (item._id === id
          ? {
              ...item,
              notifications: {
                email: value,
                sms,
              },
            }
          : item))
    );
  }

  async function deleteSearch(id: string) {
    setSearchList(searchList?.filter((item) => item._id !== id));
    await remove(id);
    updateList();
  }
  async function updateUserInfo(val: boolean) {
    setOutbid(val);

    if (settings && Object.keys(settings).length) {
      await update({
        settings: {
          ...settings,
          notifications: {
            ...settings.notifications,
            outbid: val,
          },
        },
      });
    } else {
      await update({
        settings: {
          notifications: {
            outbid: val,
          },
        },
      });
    }
  }

  return isLoading ? (
    <>Please wait...</>
  ) : (
    <>
      <div className="font-bold  flex gap-1 py-1">
        <SUCheckbox
          checked={outbid}
          onChange={(e) => {
            updateUserInfo(e);
          }}
        />{" "}
        Outbid notifications
      </div>
      {searchList && searchList.length > 0 && (
        <>
          <h3 className="font-bold text-lg">Saved Searches</h3>
          <table cellPadding={2} cellSpacing={5}>
            <thead className="bg-gray-300">
              <tr>
                <th rowSpan={2} className="p-2">
                  Search name
                </th>
                <th colSpan={2} className="p-2 text-center">
                  Notifications
                </th>
                <th />
              </tr>
              <tr>
                <th className="text-center p-2">SMS</th>
                <th className="text-center p-2">Email</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {searchList?.map((item) => (
                <tr key={item._id} className="hover:bg-gray-200 cursor-pointer">
                  <td>
                    <div className="flex gap-2">
                      <span className="font-bold">{item.name}</span>
                    </div>
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      onChange={(e) => updateSMSNotifications(item._id, e.target.checked)}
                      checked={item.notifications.sms}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      onChange={(e) => updateEmailNotifications(item._id, e.target.checked)}
                      checked={item.notifications.email}
                    />
                  </td>
                  <td>
                    <button
                      title="Delete"
                      className="p-2"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this saved search?"
                          )
                        ) {
                          deleteSearch(item._id);
                        }
                      }}
                    >
                      <XIcon className="w-5 h-5 text-red-900" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
