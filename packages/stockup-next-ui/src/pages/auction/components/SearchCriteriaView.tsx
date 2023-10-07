import SUChip from "../../../components/SUChip";
import { capitalize } from "../../../services/strings";
import {
  ESuggestionType,
  FLAG_COLOR,
  ISuggestedItem,
} from "../types/suggestions";

interface SavedSuggestionsProps {
  selectedFilters: ISuggestedItem[];
  showSuggestion?: boolean;
  showCarByType: (arg: ISuggestedItem) => (string | undefined)[];
  onDeleteSelectedCar: (arg: ISuggestedItem) => void;
}

const globalTerms = [ESuggestionType.YEAR, ESuggestionType.MIL];

export default function SearchCriteriaView({
  selectedFilters,
  showCarByType,
  onDeleteSelectedCar,
  showSuggestion,
}: SavedSuggestionsProps) {
  const selectedSpecificFilters = selectedFilters.filter(
    (f) => !globalTerms.includes(f.type)
  );

  const selected = selectedSpecificFilters.length > 0;

  return (
    <div className={`mx-3  ${showSuggestion && "-z-10"}`}>
      {selected && (
        <div className="font-bold text-blue-gray-400">Search criteria:</div>
      )}

      <div className="flex gap-2  flex-wrap">
        {selectedSpecificFilters.map((sc: ISuggestedItem) => {
          return (
            <div key={sc._id}>
              <SUChip
                className="text-white text-sm"
                dynamicColor={FLAG_COLOR[sc.type]}
                onClose={() => onDeleteSelectedCar(sc)}
              >
                <div className="flex items-center gap-2 h-full">
                  {sc.type === ESuggestionType.TRIM &&
                  !sc?.model &&
                  !sc?.make ? (
                    <span className="text-white">
                      {capitalize("trim contains")}
                    </span>
                  ) : (
                    <span className="text-white">{capitalize(sc.type)}</span>
                  )}

                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={4}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </span>
                  <span className="text-[#2E3A59]">
                    {showCarByType(sc).join(" ")}
                  </span>
                </div>
              </SUChip>
            </div>
          );
        })}
      </div>
    </div>
    // </div>
  );
}
