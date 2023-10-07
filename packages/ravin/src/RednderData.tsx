import { KeyedReportData, formatString } from "./App";

interface RednerDataProps {
  data: KeyedReportData<string | number>;
}

const RenderData = ({ data }: RednerDataProps) => {
  return (
    <>
      {data.map(({ key, value }) => {
        return (
          <div key={key} className="space-y-1">
            <p className="font-semibold">{formatString(key)}</p>
            <p className=" text-gray-600 ">{value}</p>
          </div>
        );
      })}
    </>
  );
};

export default RenderData;
