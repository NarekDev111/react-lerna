import { v4 as uuidv4 } from "uuid";
import {
  ComparisonTypes,
  ESuggestionType,
  ISuggestedItem,
} from "../types/suggestions";

export const VinValidaTorReg = /\b[(A-H|J-N|P|R-Z|a-h|j-n|p|r-z|0-9)]{6,17}\b/;

export function showCarByType(c: ISuggestedItem) {
  const arr = [];
  if (c.type === ESuggestionType.MAKE) {
    arr.push(c?.value);
    return arr;
  }

  if (c.type === ESuggestionType.MODEL) {
    arr.push(c?.make?.value, c.value);
  }

  if (c.type === ESuggestionType.TRIM) {
    arr.push(c?.make?.value, c?.model?.value, c.value);
  }

  if (c.type === ESuggestionType.YEAR) {
    arr.push(c?.itemFormat);
  }

  if (c.type === ESuggestionType.MIL) {
    arr.push(c?.itemFormat);
  }

  if (c.type === ESuggestionType.VIN) {
    arr.push(c?.value);
  }

  return arr;
}

export type YearType = {
  _id: string;
  value: number;
};

export function generateYearRange(startYear?: number) {
  const currentYear = new Date().getFullYear();
  const years: YearType[] = [];
  startYear = startYear || 2000;
  while (startYear <= currentYear + 1) {
    years.push({
      _id: uuidv4(),
      value: startYear++,
    });
  }
  return years;
}

export function renderDateSuggestion(typedYears: number[]) {
  if (typedYears.length > 0) {
    const [startYear] = typedYears;

    return {
      type: ESuggestionType.YEAR,
      value: startYear,
      suggestions: [
        `${startYear}`,
        `${startYear} and newer`,
        `${startYear} and older`,
      ] as const,
    };
  }
}

export function renderMilSuggestion(typedMil: number[]) {
  if (typedMil.length > 0) {
    const [startMil] = typedMil;

    return {
      type: ESuggestionType.MIL,
      value: startMil,
      suggestions: [
        `${startMil}`,
        `${startMil} and less`,
        `${startMil} and more`,
      ] as const,
    };
  }
}

export function createFilterQuery(selectedCriteria: ISuggestedItem[]) {
  let selectedFiltersParams = selectedCriteria.reduce<any[]>((arr, current) => {
    if (current.type === ESuggestionType.MAKE) {
      arr.push({ make: current.value });
    } else if (current.type === ESuggestionType.MODEL) {
      arr.push({ model: current?.value, make: current?.make?.value });
    } else if (current.type === ESuggestionType.TRIM) {
      if (current.make && current.model) {
        arr.push({
          trim: current?.value,
          model: current?.model?.value,
          make: current?.make?.value,
        });
      } else {
        arr.push({
          trim: current?.value,
        });
      }
    } else if (current.type === ESuggestionType.VIN) {
      arr.push({
        vin: current?.value,
      });
    }

    return arr;
  }, []);

  const isFoundAnyVehicle = selectedCriteria.some(
    (sf) => sf.type === ESuggestionType.MAKE ||
      sf.type === ESuggestionType.MODEL ||
      sf.type === ESuggestionType.TRIM
  );

  const yearSelectors = selectedCriteria.find(
    (s) => s.type === ESuggestionType.YEAR
  );
  const mileSelector = selectedCriteria.find(
    (s) => s.type === ESuggestionType.MIL
  );

  let yearQuery: any;
  let milQuery: any;

  if (yearSelectors) {
    if (yearSelectors.moreLessFlag === ComparisonTypes.equal) yearQuery = yearSelectors.value;

    if (yearSelectors.moreLessFlag === ComparisonTypes.greater) yearQuery = { $gte: yearSelectors.value };

    if (yearSelectors.moreLessFlag === ComparisonTypes.less) yearQuery = { $lte: yearSelectors.value };

    if (yearSelectors.moreLessFlag === ComparisonTypes.range) {
      const [from, to] = yearSelectors.value.split("-");
      yearQuery = { $gte: from, $lte: to };
    }
  }

  if (mileSelector) {
    const milValue = mileSelector.value;

    if (mileSelector.moreLessFlag === ComparisonTypes.equal) milQuery = milValue;

    if (mileSelector.moreLessFlag === ComparisonTypes.greater) milQuery = { $gte: milValue };

    if (mileSelector.moreLessFlag === ComparisonTypes.less) milQuery = { $lte: milValue };

    if (mileSelector.moreLessFlag === ComparisonTypes.range) {
      const [from, to] = mileSelector.value.split("-");
      milQuery = { $gte: from, $lte: to };
    }
  }

  if (isFoundAnyVehicle && yearSelectors) {
    selectedFiltersParams = selectedFiltersParams.map((sf) => {
      return {
        ...sf,
        year: yearQuery,
      };
    });
  } else if (!isFoundAnyVehicle && yearSelectors) {
    selectedFiltersParams.push({ year: yearQuery });
  }

  if (isFoundAnyVehicle && mileSelector) {
    selectedFiltersParams = selectedFiltersParams.map((sf) => {
      return {
        ...sf,
        mileage: milQuery,
      };
    });
  } else if (!isFoundAnyVehicle && mileSelector) {
    selectedFiltersParams.push({ mileage: milQuery });
  }

  return selectedFiltersParams;
}

export function assignFormat(item: ISuggestedItem): ISuggestedItem {
  if (item.type === ESuggestionType.YEAR) {
    if (item.moreLessFlag === ComparisonTypes.equal) item.itemFormat = item.value;
    if (item.moreLessFlag === ComparisonTypes.greater) item.itemFormat = `${item.value} and newer`;
    if (item.moreLessFlag === ComparisonTypes.less) item.itemFormat = `${item.value} and older`;
    if (item.moreLessFlag === ComparisonTypes.range) item.itemFormat = `${item.value}`;
  }

  if (item.type === ESuggestionType.MIL) {
    if (item.moreLessFlag === ComparisonTypes.equal) item.itemFormat = item.value;
    if (item.moreLessFlag === ComparisonTypes.greater) item.itemFormat = `${item.value} and more`;
    if (item.moreLessFlag === ComparisonTypes.less) item.itemFormat = `${item.value} and less`;
    if (item.moreLessFlag === ComparisonTypes.range) item.itemFormat = `${item.value}`;
  }

  return item;
}
