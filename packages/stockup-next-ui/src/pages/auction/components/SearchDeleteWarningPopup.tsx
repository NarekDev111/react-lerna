import SUButton from "../../../components/SUButton";
import SUPopup from "../../../components/SUPopup";
import { remove } from "../../../services/api/endpoints/searchFilter";
import IMongoDocument from "../../../services/api/interfaces/IMongoDocument";
import { ISearchFilter } from "../../../services/api/interfaces/ISearchFilter";

export default function SearchDeleteWarningPopup({
  search,
  onDelete,
  onClose,
}: {
  onClose: () => void;
  onDelete: () => void;
  search: ISearchFilter & IMongoDocument;
}) {
  async function deleteSearch() {
    await remove(search._id);
  }

  return (
    <SUPopup size="sm" open title="Warning" onClose={onClose}>
        <div className="flex flex-col w-full">
          <div>
            Are you sure you want to delete this saved search:{" "}
            <strong className="font-bold">{search.name}</strong>
          </div>

          <div className="flex place-content-between">
            <SUButton onClick={onClose}>Cancel</SUButton>
            <SUButton
              color="red"
              onClick={() => {
                onDelete();
                deleteSearch();
              }}
            >
              Delete
            </SUButton>
          </div>
        </div>
    </SUPopup>
  );
}
