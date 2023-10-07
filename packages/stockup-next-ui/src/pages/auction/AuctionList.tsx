import { XIcon } from "@heroicons/react/solid";
import { Alert } from "@material-tailwind/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/outline";
import axios from "axios";
import debounce from "lodash.debounce";
import { v4 as uuidv4 } from "uuid";
import SUInputNew from "@sellgauge/common/components/SUInputNew";
import SUPopup from "@sellgauge/common/components/SUPopup";
import { useAuth } from "@sellgauge/common/context/AuthProvider";
import { opportunities } from "@sellgauge/common/services/api/endpoints/auction";
import IMongoDocument from "@sellgauge/common/services/api/interfaces/IMongoDocument";
import IOpportunity from "@sellgauge/common/services/api/interfaces/IOpportunity";
import lister from "@sellgauge/common/services/api/rest/lister";

import { ISearchFilter } from "@sellgauge/common/services/api/interfaces/ISearchFilter";
import {
  IListOptions,
  IListParams,
  IListResultMeta,
} from "@sellgauge/common/services/api/rest/rest";
import AuctionDetails from "./AuctionDetails";
import AuctionItem from "./components/AuctionItem";
import AuctionTabs, { EAuctionTab } from "./components/AuctionTabs";
import OpportunityTitle, {
  textOpportunityTitle,
} from "./components/OpportunityTitle";
import SavedSearchList from "./components/SavedSearchList";

//* Autocomplete
import SaveSearchForm from "./components/SaveSearchForm";
import SearchCriteriaView from "./components/SearchCriteriaView";
import SuggestedTermList from "./components/SuggestedTermList";
import {
  generateYearRange,
  showCarByType,
  VinValidaTorReg,
  assignFormat,
  createFilterQuery,
} from "./helper/suggestions";
import {
  ComparisonTypes,
  ESuggestionType,
  ISuggestedItem,
  YearType,
} from "./types/suggestions";

import { useOutsideClick } from "../../hooks/useOutsideClick";
import { createSlug } from "../../services/misc";
import YearMileageForm from "./components/YearMileageForm";

import IInventoryItem from "@sellgauge/common/services/api/interfaces/IInventoryItem";

export default function AuctionList() {
  const [isLoading, setLoading] = useState(true);
  const [list, setList] = useState<(IInventoryItem & IMongoDocument)[]>([]);
  const [meta, setMeta] = useState<IListResultMeta>();
  const [selectedOpportunityId, setSelectedOpportunityId] =
    useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [listOptions, setListOptions] = useState<
    IListParams<IOpportunity> & IListOptions
  >();

  const [updateFiltersList, setUpdateFiltersList] = useState(
    `${Math.random().toString(16)}`
  );
  const [selectedSearch, setSelectedSearch] = useState<
    (ISearchFilter & IMongoDocument) | null
  >(null);
  const [viewOpportunity, setViewOpportunity] = useState<IOpportunity | null>();
  const [auctionTab, setAuctionTab] = useState<EAuctionTab>(EAuctionTab.ACTIVE);
  const [needLoadMore, setNeedLoadMore] = useState(false);
  const [deletedSearches, setDeletedSearches] = useState<string[]>([]);

  const auth = useAuth();
  // todo Autocomplete state starts:

  const [suggestions, setSuggestions] = useState<ISuggestedItem[]>([]);
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);

  const [autoLoading, setAutoLoading] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const [focus, setFocus] = useState<boolean>(false);

  const [selectedCriteria, setSelectedCriteria] = useState<ISuggestedItem[]>(
    []
  );

  const signalRef = useRef<any>(null);
  const UQController = useRef<any>(null);

  //* Date - suggestions
  const years = useMemo(() => generateYearRange(), []);
  const [typedYears, setTypedYears] = useState<null | YearType>(null);

  //* Mileage
  const [typedMil, setTypedMil] = useState<null | number>(null);

  //* VIN
  const [typedVin, setTypedVin] = useState<null | string>(null);

  //* Trim contains
  const [typedTrim, setTypedTrim] = useState<null | string>(null);

  //* Temp

  const filterOpen = useState<boolean>(false);
  const setFilterOpen = filterOpen[1];

  //* Filter Seelct
  const [yearFrom, setYearFrom] = useState<number>(-1);
  const [yearTo, setYearTo] = useState<number>(-1);

  const [mileageFrom, setMileageFrom] = useState<number>(-1);
  const [mileageTo, setMileageTo] = useState<number>(-1);

  const abortControllers = useRef<any[]>([]);

  const anyFilter =
    yearFrom !== -1 || yearTo !== -1 || mileageFrom !== -1 || mileageTo !== -1;

  const outClickRef = useRef(null);
  useOutsideClick(
    outClickRef,
    () => {
      setFocus(anyFilter);
      setShowSuggestion(false);
    },
    [anyFilter]
  );

  // todo Autocomplete state ends

  async function loadList() {
    setLoading(true);
    try {
      const abortController = new AbortController();
      UQController.current = abortController;
      abortControllers.current.push(abortController);

      const start_time = Date.now();

      if ([EAuctionTab.WON_BIDS].indexOf(auctionTab) === -1) {
        let list = "main";

        switch (auctionTab) {
          case EAuctionTab.ACTIVE:
            list = "main";
            break;
          case EAuctionTab.MY_BIDS:
            list = "our-bids";
            break;
          case EAuctionTab.RUN_LIST:
            list = "run-list";
            break;
        }

        const response = await lister<IInventoryItem, object>(
          `inventory/${list}`,
          "post",
          listOptions,
          { suggested: createFilterQuery(selectedCriteria) }
        );
        setList(response.list);
        setMeta(response.meta);
      } else {
        const response = await opportunities(listOptions, abortController);
        setList(
          response.list.map(function (
            o: IOpportunity & IMongoDocument
          ): IInventoryItem & IMongoDocument {
            return {
              _id: uuidv4(),
              created_at: new Date(),
              updated_at: new Date(),
              opportunity: o,
              cr: o.condition_reports[0]?.condition_report_scores[0]?.cr_score,
              main_image_url: o.main_image,
            };
          })
        );
        setMeta(response.meta);
      }
      gtag("event", "inventory_list_load_time", {
        time: Date.now() - start_time,
      });
    } finally {
      setLoading(false);
    }
  }

  function loadMore() {
    const pageSize = (listOptions?.pageSize || 0) + 12;

    gtag("event", "load_more", {
      tab: auctionTab,
      pageSize,
    });

    setListOptions({ ...listOptions, pageSize });
  }

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setNeedLoadMore(true);
    } else {
      setNeedLoadMore(false);
    }
  }

  useEffect(() => {
    if (needLoadMore && !isLoading && meta && list.length < meta.total) {
      loadMore();
    }
  }, [needLoadMore, meta, isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function onSavedSearchSelected(
    search: (ISearchFilter & IMongoDocument) | null
  ) {
    if (search === null) {
      loadList();
      setSelectedSearch(null);
      return;
    }

    setSelectedSearch(search);

    const newCriteria: ISuggestedItem[] = [];

    // TODO: Remove spaghetti

    for (const term of search.terms) {
      if (term.year) {
        if (term.year.$gte) setYearFrom(parseInt(term.year.$gte));
        if (term.year.$lte) setYearTo(parseInt(term.year.$lte));
      }

      if (term.mileage) {
        if (term.mileage.$gte) setMileageFrom(parseInt(term.mileage.$gte));
        if (term.mileage.$lte) setMileageTo(parseInt(term.mileage.$lte));
      }

      if (term.trim && term.make && term.model) {
        newCriteria.push({
          _id: uuidv4(),
          type: ESuggestionType.TRIM,
          value: term.trim,
          make: {
            _id: uuidv4(),
            type: ESuggestionType.MODEL,
            value: term.make,
          },
          model: {
            _id: uuidv4(),
            type: ESuggestionType.MODEL,
            value: term.model,
          },
        });
      } else if (term.trim) {
        newCriteria.push({
          _id: uuidv4(),
          type: ESuggestionType.TRIM,
          value: term.trim,
        });
      } else if (term.model && term.make) {
        newCriteria.push({
          _id: uuidv4(),
          type: ESuggestionType.MODEL,
          value: term.model,
          make: {
            _id: uuidv4(),
            type: ESuggestionType.MAKE,
            value: term.make,
          },
        });
      } else if (term.make) {
        newCriteria.push({
          _id: uuidv4(),
          type: ESuggestionType.MAKE,
          value: term.make,
        });
      } else if (term.vin) {
        newCriteria.push({
          _id: uuidv4(),
          type: ESuggestionType.VIN,
          value: term.vin,
        });
      }
    }

    setSelectedCriteria(newCriteria);
    setFocus(true);
  }

  function hideSearch(id: string): void {
    if (selectedSearch?._id === id) onSavedSearchSelected(null);
    setDeletedSearches([id, ...deletedSearches]);
  }

  function updateQuery() {
    const params: { [key: string]: string } = {};

    const filterParams = createFilterQuery(selectedCriteria);

    params["$suggested"] = JSON.stringify(filterParams);

    params["$list"] = auctionTab;

    const newListOptions = listOptions || { pageSize: 12 };

    setListOptions({
      ...newListOptions,
      params,
    });
  }

  useEffect(() => {
    if (listOptions) loadList();
  }, [listOptions]);

  useEffect(() => {
    if (auctionTab) {
      setList([]);
      updateQuery();
    }
  }, [auctionTab]);

  useEffect(() => {
    if (selectedOpportunityId) setViewOpportunity(null);
  }, [selectedOpportunityId]);

  useEffect(() => {
    if (viewOpportunity) {
      document.title = `${textOpportunityTitle(
        viewOpportunity
      )} - StockUp Solutions`;
    } else {
      document.title = "Inventory - StockUp Solutions";
    }
  }, [viewOpportunity]);

  const path = window.location.pathname;

  useEffect(() => {
    if (["/auction", "/inventory"].indexOf(path) !== -1) {
      setSelectedOpportunityId("");
    }
  }, [path]);

  useEffect(() => {
    updateQuery();

    return () => {
      if (abortControllers.current && Array.isArray(abortControllers.current)) {
        for (const controller of abortControllers.current) {
          controller.abort();
        }
      }
    };
  }, [selectedCriteria]);

  useEffect(() => {
    if (searchTerm.length < 3) {
      setSuggestions([]);
      setTypedYears(null);
      setTypedMil(null);
      setTypedVin(null);
    }
  }, [searchTerm]);

  //* Year range
  useEffect(() => {
    setSelectedCriteria(
      selectedCriteria.filter((s) => s.type !== ESuggestionType.YEAR)
    );

    if (yearFrom !== -1 && yearTo === -1) {
      onSuggestionSelected({
        _id: uuidv4(),
        type: ESuggestionType.YEAR,
        value: yearFrom.toString(),
        moreLessFlag: ComparisonTypes.greater,
      });
    }

    if (yearFrom === -1 && yearTo !== -1) {
      onSuggestionSelected({
        _id: uuidv4(),
        type: ESuggestionType.YEAR,
        value: yearTo.toString(),
        moreLessFlag: ComparisonTypes.less,
      });
    }

    if (yearFrom !== -1 && yearTo !== -1 && yearFrom === yearTo) {
      onSuggestionSelected({
        _id: uuidv4(),
        type: ESuggestionType.YEAR,
        value: yearFrom.toString(),
        moreLessFlag: ComparisonTypes.equal,
      });

      return;
    }

    if (yearFrom !== -1 && yearTo !== -1) {
      onSuggestionSelected({
        _id: uuidv4(),
        type: ESuggestionType.YEAR,
        value: `${yearFrom}-${yearTo}`,
        moreLessFlag: ComparisonTypes.range,
      });
    }
  }, [yearFrom, yearTo]);

  //* Mileage range
  useEffect(() => {
    setSelectedCriteria(
      selectedCriteria.filter((s) => s.type !== ESuggestionType.MIL)
    );

    if (mileageFrom !== -1 && mileageTo === -1) {
      onSuggestionSelected({
        _id: uuidv4(),
        type: ESuggestionType.MIL,
        value: mileageFrom.toString(),
        moreLessFlag: ComparisonTypes.greater,
      });
    }

    if (mileageFrom === -1 && mileageTo !== -1) {
      onSuggestionSelected({
        _id: uuidv4(),
        type: ESuggestionType.MIL,
        value: mileageTo.toString(),
        moreLessFlag: ComparisonTypes.less,
      });
    }

    if (mileageFrom !== -1 && mileageTo !== -1 && mileageFrom === mileageTo) {
      onSuggestionSelected({
        _id: uuidv4(),
        type: ESuggestionType.MIL,
        value: mileageFrom.toString(),
        moreLessFlag: ComparisonTypes.equal,
      });

      return;
    }

    if (mileageFrom !== -1 && mileageTo !== -1) {
      onSuggestionSelected({
        _id: uuidv4(),
        type: ESuggestionType.MIL,
        value: `${mileageFrom}-${mileageTo}`,
        moreLessFlag: ComparisonTypes.range,
      });
    }
  }, [mileageFrom, mileageTo]);

  //* Close Unfocus input on esc

  async function makeQuery(term: string) {
    if (signalRef.current) signalRef.current.abort();

    signalRef.current = new AbortController();

    try {
      // Get Make/models/trim
      // TODO: wrap into a /services/api function
      const res = await axios.get(
        `${process.env["REACT_APP_API_URL"]}/autocomplete/vehicle?term=${term}`,
        { signal: signalRef.current.signal }
      );

      const { data } = res.data;

      if (data.length === 0) {
        setIsEmpty(true);
      }

      setSuggestions(data);
    } finally {
      setAutoLoading(false);
    }
  }

  function updateAutocompleteQuery(value: string) {
    setIsEmpty(false);

    //* Dates
    const year = years.find((y) => y.value === +value);
    if (year) {
      setTypedYears(year);
    } else {
      setTypedYears(null);
    }

    //* Mils
    if (!Number.isNaN(+value) && +value >= 100 && +value <= 120000) {
      setTypedMil(+value);
    } else {
      setTypedMil(null);
    }

    //* VIN
    if (VinValidaTorReg.test(value)) {
      setTypedVin(value);
    } else {
      setTypedVin(null);
    }

    //* Trim contains
    if (value.length > 1) {
      setTypedTrim(value);
    } else {
      setTypedTrim(null);
    }

    //* Make query part
    if (value.length < 3) return setSuggestions([]);
    setAutoLoading(true);
    makeQuery(value);
  }

  function updateInput(val: string) {
    setSearchTerm(val);
    debouncedChange(val);
  }

  function onBlurHandler() {
    setShowSuggestion(false);

    setAutoLoading(false);
    if (!signalRef.current) return;
    signalRef.current.abort();
  }

  function onFocusHandler() {
    setFocus(true);
    setShowSuggestion(true);
  }

  const debouncedFunctionRef = useRef<any>();
  debouncedFunctionRef.current = (value: string) =>
    updateAutocompleteQuery(value);

  const debouncedChange = useCallback(
    debounce((value: string) => debouncedFunctionRef.current(value), 300),
    []
  );

  function onSuggestionSelected(c: ISuggestedItem) {
    if (UQController.current) {
      UQController.current.abort();
    }
    const isExist = selectedCriteria.find(
      (sc: ISuggestedItem) => sc._id === c._id
    );

    if (isExist) return;
    assignFormat(c);

    gtag("event", "fuzzy_search_term_selected", c);

    setSelectedCriteria((prev: ISuggestedItem[]) => [...prev, c]);
    setSearchTerm("");
    setSelectedSearch(null);
  }

  function onDeleteSelectedSuggestion(c: ISuggestedItem) {
    if (c.type === ESuggestionType.YEAR) {
      setYearFrom(-1);
      setYearTo(-1);
    }

    const filtered = selectedCriteria.filter(
      (sc: ISuggestedItem) => sc._id !== c._id
    );
    setSelectedCriteria(filtered);
    setSelectedSearch(null);
  }

  return (
    <>
      {selectedOpportunityId ? (
        <SUPopup
          open
          size="xxl"
          container
          title={
            <div>
              {viewOpportunity ? (
                <OpportunityTitle opportunity={viewOpportunity} />
              ) : (
                "Please wait..."
              )}
            </div>
          }
          className="overflow-auto relative poppy"
          onClose={() => {
            setSelectedOpportunityId("");
            window.history.pushState({}, "Inventory", "/inventory");
          }}>
          <AuctionDetails
            opportunityId={selectedOpportunityId}
            onLoaded={(opp) => setViewOpportunity(opp)}
            inPopup
          />
        </SUPopup>
      ) : null}

      <div
        ref={outClickRef}
        className="rounded relative z-20 flex flex-col bg-white drop-shadow p-2 m-3">
        <div className="flex">
          <SUInputNew
            value={searchTerm}
            placeholder="Search by Make, Model, Trim."
            onChange={updateInput}
            autoFocus={focus}
            onBlurHandler={onBlurHandler}
            onFocusHandler={onFocusHandler}
            icon={
              searchTerm.length > 0 ? (
                <button onClick={() => setSearchTerm("")}>
                  <XIcon className="w-5 h-5" />
                </button>
              ) : (
                <SearchIcon className="w-5 h-5" />
              )
            }
          />

          {/* Create component for that */}

          <SuggestedTermList
            suggestions={suggestions}
            showSuggestion={showSuggestion}
            autoLoading={autoLoading}
            focus={focus}
            typedYears={typedYears}
            typedMil={typedMil}
            typedVin={typedVin}
            typedTrim={typedTrim}
            searchTerm={searchTerm}
            showCarByType={showCarByType}
            isEmpty={isEmpty}
            onSelectHandler={onSuggestionSelected}
            setYearTo={setYearTo}
            setYearFrom={setYearFrom}
            setMileageFrom={setMileageFrom}
            setMileageTo={setMileageTo}
          />
        </div>

        {focus && (
          <YearMileageForm
            yearTo={yearTo}
            yearFrom={yearFrom}
            mileageTo={mileageTo}
            mileageFrom={mileageFrom}
            setMileageTo={setMileageTo}
            setMileageFrom={setMileageFrom}
            setYearTo={setYearTo}
            setYearFrom={setYearFrom}
            setFilterOpen={setFilterOpen}
          />
        )}
      </div>

      {/* Autocomplete Chips  */}

      <SearchCriteriaView
        showSuggestion={showSuggestion}
        showCarByType={showCarByType}
        selectedFilters={selectedCriteria}
        onDeleteSelectedCar={onDeleteSelectedSuggestion}
      />

      {auth && (
        <>
          {selectedCriteria.length > 0 && (
            <SaveSearchForm
              onSaved={(search) => {
                setUpdateFiltersList(`${Math.random().toString(16)}`);
                setSelectedSearch(search);
              }}
              terms={createFilterQuery(selectedCriteria)}
              selectedSearch={selectedSearch}
            />
          )}
          <SavedSearchList
            deleted={deletedSearches}
            needsUpdate={updateFiltersList}
            selectedId={selectedSearch ? selectedSearch._id : ""}
            onSelect={onSavedSearchSelected}
            onDelete={(id) => hideSearch(id)}
          />
        </>
      )}

      <AuctionTabs
        active={auctionTab}
        onChange={(tab) => {
          setAuctionTab(tab);
        }}
        loading={isLoading}
      />

      {meta && !isLoading ? (
        <div className="pl-3">
          Shown: <span className="font-bold">{list.length}</span> of{" "}
          <span className="font-bold">{meta?.total}</span>
        </div>
      ) : isLoading ? (
        <div className="pl-3 font-bold">Loading. Please wait...</div>
      ) : null}

      <div
        className={`grid grid-cols-1 gap-3 -z-20 lg:grid-cols-3 lg:gap-5 2xl:grid-cols-4 p-3 ${
          isLoading ? "animate-pulse" : ""
        }`}>
        {list.length > 0 || isLoading ? (
          list.map((item) => (
            <Link
              to={`/inventory/${item.opportunity._id}/${createSlug(
                item.opportunity
              )}`}
              key={item._id}
              className="transition-all"
              onClick={(e) => {
                window.history.pushState(
                  {},
                  "Inventory Item",
                  `/inventory/${item.opportunity._id}/${createSlug(
                    item.opportunity
                  )}`
                );
                setSelectedOpportunityId(item.opportunity._id);
                e.preventDefault();
              }}>
              <AuctionItem opportunity={item} loading={isLoading} />
            </Link>
          ))
        ) : (
          <Alert color="gray" className="w-full col-span-3 lg:col-span-4 p-5">
            No items to show
          </Alert>
        )}

        {isLoading
          ? Array.from(
              Array(meta ? Math.min(12, meta.total - list.length) : 12).keys()
            ).map((k) => <AuctionItem key={`loading_${k}`} loading />)
          : null}
      </div>
    </>
  );
}
