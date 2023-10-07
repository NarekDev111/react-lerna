import { useEffect, useState } from "react";
import SUChip from "../../../components/SUChip";
import { list } from "../../../services/api/endpoints/searchFilter";
import IMongoDocument from "../../../services/api/interfaces/IMongoDocument";
import { ISearchFilter } from "../../../services/api/interfaces/ISearchFilter";
import SearchDeleteWarningPopup from "./SearchDeleteWarningPopup";

interface ISavedSearchListProps {
  selectedId?: string;
  needsUpdate: string;
  deleted: string[];
  onDelete: (id: string) => void;
  onSelect?: (search: ISearchFilter & IMongoDocument) => void;
}

export default function SavedSearchList({
  selectedId,
  needsUpdate,
  deleted,
  onDelete,
  onSelect,
}: ISavedSearchListProps) {
  const [searches, setSearches] = useState<(ISearchFilter & IMongoDocument)[]>(
    []);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [searchToDelete, setSearchToDelete] = useState<
    ISearchFilter & IMongoDocument
  >();

  useEffect(() => {
    list({ sortBy: "created_at", sortDir: "desc" }).then((r) => {
      setSearches(r.list);
    });
  }, [needsUpdate]);

  function selectSearch(search: ISearchFilter & IMongoDocument) {
    gtag("event", "saved_search_selected");
    if (onSelect) onSelect(search);
  }

  const finalList = searches.filter(
    (search) => deleted.indexOf(search._id) === -1
  );

  return finalList.length > 0 ? (
    <>
      {showDeleteWarning && searchToDelete && (
        <SearchDeleteWarningPopup
          onClose={() => {
            setShowDeleteWarning(false);
          }}
          onDelete={function (): void {
            setShowDeleteWarning(false);
            onDelete(searchToDelete._id);
          }}
          search={searchToDelete}
        />
      )}
      <div className="flex ml-3 mr-3 ">
        <div className="overflow-x-auto pb-4 pt-2">
          <div className="font-bold text-blue-gray-400">Saved searches:</div>
          <div className="flex gap-2">
            {finalList.map((search) => (
              <SUChip
                key={search._id}
                color={selectedId === search._id ? "green" : "blue-gray"}
                className="text-sm"
                onClick={() => {
                  if (selectedId !== search._id) selectSearch(search);
                }}
                onClose={() => {
                  setSearchToDelete(search);
                  setShowDeleteWarning(true);
                }}
              >
                {search.name}
              </SUChip>
            ))}
          </div>
        </div>
      </div>
    </>
  ) : null;
}
