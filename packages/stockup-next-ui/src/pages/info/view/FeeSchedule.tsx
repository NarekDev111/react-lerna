export default function FeeSchedule() {
  return (
    <div className="w-full py-7 px-14">
      <div className="w-full flex border shadow-xl h-20 ">
        <div className="w-[62px] relative top-0 ml-7 h-16 bg-[rgb(24,20,48)] flex items-center justify-center text-white rounded-md shadow-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24">
            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
          </svg>
        </div>
        <div className="flex items-center">
          <p className="ml-7 text-2xl font-light">Fee Schedule </p>
        </div>
      </div>
      <div className="mt-14 px-7 border shadow-xl w-full ">
        <table className="w-full mt-24">
          <thead className="">
            <tr>
              {columns.map((el, index) => {
                return (
                  <th className="hover:text-gray-500" key={index}>
                    {el.name}
                  </th>
                );
              })}
            </tr>
            <tr className="border border-b" />
          </thead>
          <tbody>
            {data.map((el) => {
              return (
                <tr key={el.name} className="border border-b h-14">
                  <td>{el.name}</td>
                  <td>{el.fee}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <table>
            <thead>
              {columns.map((el, index) => {
                return (
                  <tr key={index}>
                    <th>{el.name}</th>
                  </tr>
                );
              })}
            </thead>
            <tbody></tbody>
          </table> */}
      </div>
    </div>
  );
}
const columns = [
  {
    name: "Vehicle Sale Price",
    selector: "name",
  },
  {
    name: "Buy Fee",
    selector: "fee",
  },
];
const data = [
  {
    name: "$0 to $5000",
    fee: "$200",
  },
  {
    name: "$5,001 to $7,500",
    fee: "$250",
  },
  {
    name: "$7,501 to $12,000",
    fee: "$300",
  },
  {
    name: "$12,001 to $18,000",
    fee: "$350",
  },
  {
    name: "$18,001 to $25,000",
    fee: "$400",
  },
  {
    name: "$25,001 to $40,000",
    fee: "$450",
  },
  {
    name: "$40,001 to $60,000",
    fee: "$500",
  },
  {
    name: "$60,001 to $80,000",
    fee: "$600",
  },
  {
    name: "$80,001 to $100,000+",
    fee: "$750",
  },
];
