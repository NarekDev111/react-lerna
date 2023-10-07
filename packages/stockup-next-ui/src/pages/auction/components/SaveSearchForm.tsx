import { SaveIcon } from "@heroicons/react/outline";
import { useState } from "react";
import SUButton from "../../../components/SUButton";
import SUCheckbox from "../../../components/SUCheckbox";
import SUInputEx from "../../../components/SUInputEx";
import SUPopup from "../../../components/SUPopup";
import { put } from "../../../services/api/endpoints/searchFilter";
import IMongoDocument from "../../../services/api/interfaces/IMongoDocument";
import { ISearchFilter } from "../../../services/api/interfaces/ISearchFilter";
import isEmpty from "../../../services/validators/isEmpty";

interface ISaveSearchFormProps {
  terms: { [key: string]: any }[];
  onSaved: (search: ISearchFilter & IMongoDocument) => void;
  selectedSearch?: (ISearchFilter & IMongoDocument) | null;
}

export default function SaveSearchForm({
  terms,
  onSaved,
  selectedSearch,
}: ISaveSearchFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [sms, setSms] = useState(false);
  const [email, setEmail] = useState(false);
  const [isLoading, setLoading] = useState(false);

  async function createSearch() {
    setLoading(true);

    try {
      const result = await put({
        name,
        terms,
        notifications: {
          email,
          sms,
        },
      });
      onSaved(result);
      gtag("event", "search_saved", result.notifications);
    } catch (error) {
      // TODO: handle save search error
    }

    setLoading(false);
    setShowForm(false);
  }

  return (
    <>
      <SUPopup
        title="Save Search"
        open={showForm}
        onClose={() => setShowForm(false)}>
        <div className="flex flex-col w-full gap-4">
          <SUInputEx
            label="Search name"
            value={name}
            onChange={(val) => setName(val)}
            disabled={isLoading}
          />
          <div>
            <p className="font-bold">Notifications:</p>
            <div className="flex gap-4">
              <SUCheckbox
                label="Email"
                checked={email}
                onChange={(val) => setEmail(val)}
                disabled={isLoading}
              />
              <SUCheckbox
                label="SMS"
                checked={sms}
                onChange={(val) => setSms(val)}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="h-13">
            <SUButton
              disabled={isEmpty(name)}
              loading={isLoading}
              onClick={() => createSearch()}>
              Save
            </SUButton>
          </div>
        </div>
      </SUPopup>
      {selectedSearch === null && (
        <div className="flex m-3">
          <SUButton size="sm" onClick={() => setShowForm(true)}>
            <div className="flex gap-1">
              <SaveIcon className="w-4 h-4" />
              Save this search
            </div>
          </SUButton>
        </div>
      )}
    </>
  );
}
