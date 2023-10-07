import { formatString } from "../App";

interface MetaDataProps {
  data: {
    key: string;
    value: number | string;
  };
}

const MetaData = ({ data }: MetaDataProps) => {
  const regex = new RegExp("time", "i");

  let formatedValue;
  if (regex.test(data.key) && typeof data.value === "number") {
    const date = new Date(data.value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    formatedValue = `${month}/${day}/${year}`;
  } else {
    formatedValue = data.value;
  }

  return (
    <div>
      <p className=" text-xs font-semibold text-blue-900">
        {formatString(data.key)}
      </p>
      <p className="font-bold">{formatedValue}</p>
    </div>
  );
};

export default MetaData;
