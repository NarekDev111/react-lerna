import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import SUSelect from "../../../components/SUSelect";
import { mileage } from "../../../services/format";
import { FLAG_COLOR } from "../types/suggestions";

/** FIXME: Why string? */
interface IYearMileageFormProps {
  yearFrom: number;
  yearTo: number;
  mileageFrom: number;
  mileageTo: number;
  setYearFrom: (args: number) => void;
  setYearTo: (args: number) => void;
  setMileageFrom: (args: number) => void;
  setMileageTo: (args: number) => void;
  setFilterOpen: (arg: boolean) => void;
}

export default function YearMileageForm({
  yearFrom,
  yearTo,
  mileageFrom,
  mileageTo,
  setYearFrom,
  setYearTo,
  setMileageTo,
  setMileageFrom,
  setFilterOpen,
}: IYearMileageFormProps) {
  const [yearFromOptions, setYearFromOptions] = useState<number[]>([]);
  const [yearToOptions, setYearToOptions] = useState<number[]>([]);

  const [mileageFromOptions, setMileageFromOptions] = useState<number[]>([]);
  const [mileageToOptions, setMileageToOptions] = useState<number[]>([]);

  const preventHandler = () => {
    setFilterOpen(true);
  };

  //* Year Range
  useEffect(() => {
    if (yearTo === -1) {
      setYearFromOptions(getYears());
      return;
    }

    setYearFromOptions(getYears(2000, +yearTo));
  }, [yearTo]);

  useEffect(() => {
    if (yearFrom === -1) {
      setYearToOptions(getYears());
      return;
    }

    setYearToOptions(getYears(+yearFrom, new Date().getFullYear() + 1));
  }, [yearFrom]);

  //* Mileage Range
  useEffect(() => {
    if (mileageTo === -1) {
      setMileageFromOptions(getMiles(0, 200000, [mileageFrom]));
      return;
    }

    if (!getMiles().includes(mileageTo)) {
      setMileageToOptions(getMiles(0, 200000, [mileageTo]));
    }

    setMileageFromOptions(getMiles(0, +mileageTo, [mileageFrom]));
  }, [mileageTo]);

  useEffect(() => {
    if (mileageFrom === -1) {
      setMileageToOptions(getMiles(0, 200000, [mileageTo]));
      return;
    }

    if (!getMiles().includes(mileageFrom)) {
      setMileageFromOptions(getMiles(0, 200000, [mileageFrom]));
    }

    setMileageToOptions(getMiles(+mileageFrom, 200000, [mileageTo]));
  }, [mileageFrom]);

  //* Year Change Handlers
  const handleChangeYearFrom = (val: string) => {
    setYearFrom(+val);
  };

  const handleChangeYearTo = (val: string) => {
    setYearTo(+val);
  };

  //* Mileage Change Handlers
  const handleChangeMileageFrom = (val: string) => {
    setMileageFrom(+val);
  };

  const handleChangeMileageTo = (val: string) => {
    setMileageTo(+val);
  };

  return (
    <div
      onMouseDown={preventHandler}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2"
    >
      <SUSelect
        label="Year (from)"
        variant="outlined"
        onChange={handleChangeYearFrom}
        value={yearFrom.toString()}
        style={{
          borderColor: FLAG_COLOR.year,
        }}
      >
        {yearFromOptions?.map((y) => (
          <option value={y} key={uuidv4()}>
            {y === -1 ? "any" : y}
          </option>
        ))}
      </SUSelect>

      <SUSelect
        variant="outlined"
        label="Year (to)"
        onChange={handleChangeYearTo}
        value={yearTo.toString()}
        style={{
          borderColor: FLAG_COLOR.year,
        }}
      >
        {yearToOptions?.map((y) => (
          <option value={y} key={uuidv4()}>
            {y === -1 ? "any" : y}
          </option>
        ))}
      </SUSelect>

      <SUSelect
        variant="outlined"
        label="Mileage (from)"
        onChange={handleChangeMileageFrom}
        value={mileageFrom.toString()}
        style={{
          borderColor: FLAG_COLOR.mileage,
        }}
      >
        {mileageFromOptions?.map((m) => (
          <option value={m} key={uuidv4()}>
            {m === -1 ? "any" : mileage(m)}
          </option>
        ))}
      </SUSelect>

      <SUSelect
        variant="outlined"
        label="Mileage (to)"
        onChange={handleChangeMileageTo}
        value={mileageTo.toString()}
        style={{
          borderColor: FLAG_COLOR.mileage,
        }}
      >
        {mileageToOptions?.map((m) => (
          <option value={m} key={uuidv4()}>
            {m === -1 ? "any" : mileage(m)}
          </option>
        ))}
      </SUSelect>
    </div>
  );
}

//* Generating years From - To:
function getYears(
  startYear = 2000,
  currentYear: number = new Date().getFullYear() + 1
): number[] {
  const years: number[] = [-1];
  for (let i = startYear; i <= currentYear; i++) {
    years.push(i);
  }
  return years;
}

//* Generating mileage From - To:
function getMiles(
  from = 0,
  to = 200000,
  selected: number[] = []
) {
  const firstValues = [100, 1000, 5000];

  const init = firstValues.filter((el) => +el >= from && +el <= to);

  const values: number[] = init;
  for (let i = Math.ceil(from / 10000) * 10000; i <= to; i += 10000) {
    values.push(i);
  }

  return [
    -1,
    ...values,
    ...selected.filter((el) => el !== -1 && !values.includes(el)),
  ].sort((a: number, b: number) => a - b);
}
