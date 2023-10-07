export enum ESuggestionType {
  MAKE = "make",
  MODEL = "model",
  TRIM = "trim",
  YEAR = "year",
  MIL = "mileage",
  VIN = "vin",
}

export const ComparisonTypes = {
  equal: "equal",
  greater: "greater",
  less: "less",
  range: "range",
} as const;

export type ComparisonT = typeof ComparisonTypes[keyof typeof ComparisonTypes];

export interface ISuggestedItem {
  _id: string;
  value: string;
  type: ESuggestionType;
  score?: number;
  make?: ISuggestedItem;
  model?: ISuggestedItem;
  moreLessFlag?: ComparisonT;
  itemFormat?: string;
}

export type YearType = {
  _id: string;
  value: number;
};

export const FLAG_COLOR = {
  make: "#3FBAFF",
  model: "#FF6D86",
  trim: "#66bf99",
  year: "#dfbf75",
  mileage: "#8F9BB3",
  vin: "#A28EDA",
} as const;

export type FLAG_COLORS_TYPES = typeof FLAG_COLOR[keyof typeof FLAG_COLOR];
