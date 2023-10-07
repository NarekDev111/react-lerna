import { SearchIcon } from "@heroicons/react/outline";
import { v4 as uuidv4 } from "uuid";
import {
  ESuggestionType,
  FLAG_COLOR,
  ISuggestedItem,
} from "../types/suggestions";

import { mileage } from "../../../services/format";
import { capitalize } from "../../../services/strings";
import { YearType } from "../helper/suggestions";

interface ISuggestedTermListProps {
  focus: boolean;
  autoLoading: boolean;
  isEmpty: boolean;
  searchTerm: string;
  typedYears: YearType | null;
  typedMil: null | number;
  typedVin: null | string;
  typedTrim: null | string;
  suggestions: ISuggestedItem[];
  showSuggestion: boolean;
  onSelectHandler: (arg: ISuggestedItem) => void;
  showCarByType: (arg: ISuggestedItem) => (string | undefined)[];
  setYearFrom: (arg: number) => void;
  setYearTo: (arg: number) => void;
  setMileageFrom: (arg: number) => void;
  setMileageTo: (arg: number) => void;
}

export default function SuggestedTermList({
  focus,
  autoLoading,
  isEmpty,
  searchTerm,
  suggestions,
  showSuggestion,
  typedYears,
  typedMil,
  typedVin,
  typedTrim,
  onSelectHandler,
  showCarByType,
  setYearFrom,
  setYearTo,
  setMileageFrom,
  setMileageTo,
}: ISuggestedTermListProps) {
  return (
    <div
      className="absolute right-0 mt-2 w-full origin-top-right rounded-md bg-[#EDF1F7]
     shadow-lg left-0 top-full z-50 ring-black ring-opacity-5 focus:outline-none
     border-[#C5CEE0]
     "
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
    >
      {focus &&
        showSuggestion &&
        autoLoading &&
        !isEmpty &&
        searchTerm.length > 2 && (
          <div className="gap-x-2 px-2 py-4 text-gray-500 flex items-center">
            Loading...
          </div>
        )}
      {focus &&
        showSuggestion &&
        isEmpty &&
        searchTerm.length > 2 &&
        !autoLoading &&
        !typedYears &&
        !typedMil &&
        !typedVin &&
        !typedTrim && (
          <div className="gap-x-2 px-2 py-4 text-gray-500 flex items-center">
            Not results
          </div>
        )}
      {focus && showSuggestion && searchTerm.length < 2 && (
        <div className="gap-x-2 px-2 py-4 text-gray-500 flex items-center">
          <SearchIcon className="w-5 h-5" /> Search
        </div>
      )}
      {focus && showSuggestion && !autoLoading && searchTerm.length > 1 && (
        <ul className="list-none" role="none">
          {suggestions.map((c: ISuggestedItem) => {
            return (
              <li
                className="hover:bg-[#d9dde3] cursor-pointer px-2 py-4 text-black list-none flex items-center
                 gap-x-4 border-b-[#C5CEE0] border"
                onMouseDown={() => {
                  onSelectHandler(c);
                }}
                key={c._id}
              >
                <span
                  style={{ backgroundColor: FLAG_COLOR[c.type] }}
                  className={` text-white p-1 rounded-lg text-xs shadow-xl tracking-wider font-bold`}
                >
                  {capitalize(c.type)}
                </span>
                <span>{showCarByType(c).join(" ")}</span>
              </li>
            );
          })}

          {/* Years */}

          {typedYears && (
            <>
              <li
                className="hover:bg-[#d9dde3] cursor-pointer px-2 py-4 text-black list-none flex items-center
                gap-x-4 border-b-[#C5CEE0] border"
                onMouseDown={() => {
                  setYearFrom(+typedYears.value);
                  setYearTo(+typedYears.value);
                }}
              >
                <span
                  style={{ backgroundColor: FLAG_COLOR.year }}
                  className={` text-white p-1 rounded-lg text-xs shadow-xl tracking-wider font-bold `}
                >
                  Year
                </span>
                <span>{typedYears.value}</span>
              </li>

              <li
                className="hover:bg-[#d9dde3] cursor-pointer px-2 py-4 text-black list-none flex items-center
                gap-x-4 border-b-[#C5CEE0] border"
                onMouseDown={() => {
                  setYearFrom(+typedYears.value);
                  setYearTo(-1);
                }}
              >
                <span
                  style={{ backgroundColor: FLAG_COLOR.year }}
                  className={` text-white p-1 rounded-lg text-xs shadow-xl tracking-wider font-bold `}
                >
                  Year
                </span>
                <span>
                  {typedYears.value}{" "}
                  <span className="font-bold">and newer</span>
                </span>
              </li>

              <li
                className="hover:bg-[#d9dde3] cursor-pointer px-2 py-4 text-black list-none flex items-center
                gap-x-4 border-b-[#C5CEE0] border"
                onMouseDown={() => {
                  setYearFrom(-1);
                  setYearTo(+typedYears.value);
                }}
              >
                <span
                  style={{ backgroundColor: FLAG_COLOR.year }}
                  className={` text-white p-1 rounded-lg text-xs shadow-xl tracking-wider font-bold `}
                >
                  Year
                </span>
                <span>
                  {typedYears.value}{" "}
                  <span className="font-bold">and older</span>
                </span>
              </li>
            </>
          )}

          {typedMil && (
            <>
              <li
                className="hover:bg-[#d9dde3] cursor-pointer px-2 py-4 text-black list-none flex items-center
               gap-x-4 border-b-[#C5CEE0] border"
                onMouseDown={() => {
                  setMileageFrom(+typedMil);
                  setMileageTo(-1);
                }}
              >
                <span
                  style={{ backgroundColor: FLAG_COLOR.mileage }}
                  className={` text-white p-1 rounded-lg text-xs shadow-xl tracking-wider font-bold `}
                >
                  Mileage
                </span>
                <span>
                  {mileage(typedMil)}{" "}
                  <span className="font-bold">and more</span>
                </span>
              </li>

              <li
                className="hover:bg-[#d9dde3] cursor-pointer px-2 py-4 text-black list-none flex items-center
               gap-x-4 border-b-[#C5CEE0] border"
                onMouseDown={() => {
                  setMileageFrom(-1);
                  setMileageTo(typedMil);
                }}
              >
                <span
                  style={{ backgroundColor: FLAG_COLOR.mileage }}
                  className={` text-white p-1 rounded-lg text-xs shadow-xl tracking-wider font-bold `}
                >
                  Mileage
                </span>
                <span>
                  {mileage(typedMil)}{" "}
                  <span className="font-bold">and less</span>
                </span>
              </li>
            </>
          )}

          {typedTrim && (
            <li
              className="hover:bg-[#d9dde3] cursor-pointer px-2 py-4 text-black list-none flex items-center
            gap-x-4 border-b-[#C5CEE0] border"
              onMouseDown={() => {
                onSelectHandler({
                  _id: uuidv4(),
                  type: ESuggestionType.TRIM,
                  value: typedTrim.toString(),
                });
              }}
            >
              <span
                style={{ backgroundColor: FLAG_COLOR.trim }}
                className={` text-white p-1 rounded-lg text-xs shadow-xl tracking-wider font-bold `}
              >
                Trim contains:
              </span>
              <span className="font-bold"> "{typedTrim}"</span>
            </li>
          )}

          {typedVin && (
            <li
              className="hover:bg-[#d9dde3] cursor-pointer px-2 py-4 text-black list-none flex items-center
            gap-x-4 border-b-[#C5CEE0] border"
              onMouseDown={() => {
                onSelectHandler({
                  _id: uuidv4(),
                  type: ESuggestionType.VIN,
                  value: typedVin.toString(),
                });
              }}
            >
              <span
                style={{ backgroundColor: FLAG_COLOR.vin }}
                className={` text-white p-1 rounded-lg text-xs shadow-xl tracking-wider font-bold `}
              >
                {searchTerm.length === 17 ? "VIN is:" : "VIN contains:"}
              </span>
              <span className="font-bold"> "{typedVin}"</span>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
