import IUser from "./IUser";

export interface IMileage {
  from: number;
  to: number;
}

export interface ICriteria {
  year?: number;
  make: string;
  model: string;
  mileage?: IMileage;
}

export interface ISearchFilter {
  name: string;
  owned_by?: string | IUser;
  criteria: ICriteria;
  terms: {
    make?: string;
    model?: string;
    trim?: string;
    vin?: string;
    mileage?: {
      $gte?: string;
      $lte?: string;
    };
    year?: {
      $gte?: string;
      $lte?: string;
    };
  }[];
  notifications: {
    email: boolean;
    sms: boolean;
  };
  created_at?: Date;
  updated_at?: Date;
}
