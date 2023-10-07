import { useEffect, useState } from "react";
import RenderDamages from "./RenderDamages";
import { groups } from "./data";

import WheelAndTire from "./components/WheelAndTire";
import MetaData from "./components/MetaData";
import { Button } from "@material-tailwind/react";

import { PhotoGroups, ImageSlider } from "@sellgauge/common";

const API_URL = "https://stockup-api.gacloud.io";

type ReportData = {
  _id: string;
  created_at: Date;
  report: object[];
};
export interface IDamage {
  damageType: number;
  damageTypeName: string;
  images: string[];
  damageid: number;
  decisionStatus: string;
  locationName: string;
  partName: string;
  severity: number;
}

export type KeyedReportData<T> = {
  key: string;
  value: T extends object ? T[] : T;
}[];

function RenderDamage({ damages }: { damages: IDamage[] }) {
  return (
    <table
      style={{ border: "2px black", borderCollapse: "collapse" }}
      border={1}>
      <thead>
        <tr>
          <th>damageTypeName</th>
          <th>images</th>
          <th>decisionStatus</th>
          <th>locationName</th>
          <th>partName</th>
          <th>severity</th>
        </tr>
      </thead>
      <tbody>
        {damages.map((d) => (
          <tr key={d.damageid}>
            <td>{d.damageTypeName}</td>
            <td>
              {d.images.map((i) => (
                <a key={i} href={i}>
                  <img src={i} style={{ height: "100px" }} alt="img" />
                </a>
              ))}
            </td>
            <td>{d.decisionStatus}</td>
            <td>{d.locationName}</td>
            <td>{d.partName}</td>
            <td>{d.severity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function KeyValue({ value }: { value: string | number | IDamage[] }) {
  return (
    <>{typeof value == "object" ? <RenderDamage damages={value} /> : value}</>
  );
}

export interface FormattedWheelAndTireData {
  [thing: string]: {
    [sideView: string]: {
      [remains: string]: any;
    };
  };
}

function App() {
  const [reportId, setReportId] = useState("");
  const [reports, setReports] = useState<ReportData[]>();
  const [loading, setLoading] = useState(false);

  //! For Showing old version
  const [allReportData, setAllReportData] = useState<
    KeyedReportData<number | string | IDamage>
  >([]);
  const [showOldVersion, setShowOldVerson] = useState<boolean>(true);

  const [reportData, setReportData] = useState<
    KeyedReportData<string | number>
  >([]);
  const [metaData, wheelAndTireData] = formatReportData(reportData);
  const CG = metaData.find((el) => el.key === "ConditionGrade");

  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const formatedWheelAndTireData: FormattedWheelAndTireData =
    wheelAndTireData.reduce<FormattedWheelAndTireData>(
      (total, current) => {
        const [side, view, _, ...remains] = formatString(current.key).split(
          " "
        );

        console.log(_);

        if (!total["Tire & Wheel"][`${side} ${view}`])
          total["Tire & Wheel"][`${side} ${view}`] = {};
        total["Tire & Wheel"][`${side} ${view}`][remains.join(" ")] =
          current.value;

        return total;
      },
      { "Tire & Wheel": {} }
    );

  const [reportDamages, setReportDamages] = useState<KeyedReportData<IDamage>>(
    []
  );

  const formatedReportDamages = formatObjectByKeys(groups, reportDamages);

  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  //! Temp
  const allImageUrls = reportDamages.flatMap((obj) =>
    obj.value.flatMap((damage) => damage.images.map((img) => ({ url: img })))
  );

  const photoGroups: PhotoGroups = {
    ALL: allImageUrls,
    EXT: [],
    INT: [],
  };

  const selectIssue = (issue: string) => {
    setSelectedIssue(issue);
  };

  async function loadReport() {
    setReportData([]);
    setReportDamages([]);
    setSelectedIssue(null);
    setLoading(true);
    const report = (await (
      await fetch(`${API_URL}/webhook/ravin/${reportId}`)
    ).json()) as KeyedReportData<string | number | IDamage>;

    setAllReportData(report);

    const [reportDataRes, reportDamagesRes] = separateObjects(report);

    setReportData(reportDataRes);
    setReportDamages(reportDamagesRes);
    setLoading(false);
  }

  useEffect(() => {
    fetch(`${API_URL}/webhook/ravin/list`)
      .then((r) => r.json())
      .then((data) => {
        setReports(data);
      });
  }, []);

  return (
    <div>
      {(reports && reports.length > 0 && (
        <>
          <div>
            <h2>Ravin Report:</h2>
            <select onChange={(e) => setReportId(e.target.value)}>
              {reports.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.created_at.toString()}
                </option>
              ))}
            </select>
            <button onClick={() => loadReport()}>View</button>
          </div>

          <div className="flex  gap-4 my-5">
            <Button color="teal" onClick={() => setShowOldVerson(true)}>
              Old Layout
            </Button>
            <Button onClick={() => setShowOldVerson(false)}>New Layout</Button>
          </div>

          {(reportData && (
            <>
              {!showOldVersion && (
                <div className="container mx-auto m-10">
                  <div className="grid grid-cols-2">
                    <div
                      className={`${
                        isFullScreen &&
                        "fixed top-0 left-0 h-screen w-screen z-10"
                      }`}>
                      <ImageSlider
                        isfullScreen={isFullScreen}
                        setIsFullScreen={setIsFullScreen}
                        photoGroups={photoGroups}
                        images={photoGroups["ALL"]}
                      />
                    </div>

                    <div>
                      <div className="p-5 space-y-5">
                        {CG && (
                          <div className="flex items-center gap-2 ">
                            <h2 className="font-bold text-lg border-b border-blue-900 text-blue-900">
                              {" "}
                              {formatString(CG["key"])} - {CG["value"]}
                            </h2>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <h2 className="font-bold text-2xl border-b border-blue-900 text-blue-900">
                            General Information
                          </h2>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="white"
                            className="w-6 h-6 bg-yellow-800 rounded-full">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                            />
                          </svg>
                        </div>

                        <div className="report grid grid-cols-3 gap-3 text-sm ">
                          {metaData.map((md) => {
                            return <MetaData key={md.key} data={md} />;
                          })}
                        </div>
                      </div>
                      <div className="p-5 space-y-5">
                        <div className="flex items-center gap-2">
                          <h2 className="font-bold text-2xl border-b text-blue-900">
                            Tire & Wheel
                          </h2>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="white"
                            className="w-6 h-6 bg-yellow-800 rounded-full">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                            />
                          </svg>
                        </div>

                        <div className="report grid grid-cols-4 gap-3 text-sm ">
                          <WheelAndTire
                            formattedWheelAndTireData={formatedWheelAndTireData}
                          />
                        </div>
                      </div>
                      <div className="p-5 space-y-5">
                        <div className="flex items-center gap-2">
                          <h2 className="font-bold text-2xl border-b border-blue-900 text-blue-900">
                            Issues
                          </h2>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="white"
                            className="w-6 h-6 bg-red-600 rounded-full">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                            />
                          </svg>
                        </div>

                        <div className="report flex item-center gap-3 text-sm ">
                          {Object.entries(formatedReportDamages).map(
                            ([key, value]) => {
                              return (
                                <div
                                  key={key}
                                  className="bg-blue-900 px-2 py-1 rounded flex items-center gap-2">
                                  <h2 className="font-bold text-white">
                                    {key}
                                  </h2>
                                  <p
                                    className=" bg-red-600 font-bold flex item-center
                                 justify-center text-white h-full flex-grow w-5 rounded">
                                    {getDamageQuantity(value)}
                                  </p>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <RenderDamages
                      groups={formatedReportDamages}
                      selectIssue={selectIssue}
                      selectedIssue={selectedIssue}
                    />
                  </div>
                </div>
              )}

              {showOldVersion && (
                <table>
                  <tbody>
                    {allReportData.map((item) => (
                      <tr
                        key={item.key}
                        className="border-2 border-black"
                        style={{ borderBottom: "1px bold" }}>
                        <td className="border-2 border-black">{item.key}</td>
                        <td className="border-2 border-black">
                          <KeyValue value={item.value} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )) ||
            (loading && <>Loading...</>)}
        </>
      )) || <>Please wait...</>}
    </div>
  );
}

export default App;

function separateObjects(
  arr: KeyedReportData<string | number | IDamage>
): [KeyedReportData<string | number>, KeyedReportData<IDamage>] {
  const stringObjects: KeyedReportData<string | number> = [];
  const objectObjects: KeyedReportData<IDamage> = [];

  for (const obj of arr) {
    if (typeof obj.value === "object") {
      objectObjects.push({ key: obj.key, value: obj.value });
    } else {
      stringObjects.push({ key: obj.key, value: obj.value });
    }
  }

  return [stringObjects, objectObjects];
}

function formatObjectByKeys(
  groupKeys: Record<string, string[]>,
  damages: KeyedReportData<IDamage>
) {
  const finalObj: Record<string, IDamage[]> = {};

  for (const [groupName, keySelector] of Object.entries(groupKeys)) {
    for (const ks of keySelector) {
      for (const damage of damages) {
        const regex = new RegExp(ks, "i");
        if (regex.test(damage.key)) {
          if (finalObj[groupName]) {
            finalObj[groupName] = [...finalObj[groupName], ...damage.value];
          } else {
            finalObj[groupName] = [...damage.value];
          }
        }
      }
    }
  }

  return finalObj;
}

export function formatString(inputString: string): string {
  const words = inputString.split(/(?=[A-Z])/);

  const formattedWords = words.map((word) => {
    const lowercaseWord = word.toLowerCase();
    const firstLetter = lowercaseWord.charAt(0).toUpperCase();
    return firstLetter + lowercaseWord.slice(1);
  });

  const outputString = formattedWords.join(" ");

  return outputString;
}

export function formatReportData(arr: KeyedReportData<string | number>) {
  const regexWheel = new RegExp("wheel", "i");
  const regexTire = new RegExp("tire", "i");

  const metaData: KeyedReportData<number | string> = [];
  const wheelAndTireData: KeyedReportData<number | string> = [];

  for (const data of arr) {
    if (regexWheel.test(data.key) || regexTire.test(data.key)) {
      wheelAndTireData.push(data);
    } else {
      metaData.push(data);
    }
  }

  return [metaData, wheelAndTireData];
}

export function getDamageQuantity(arr: IDamage[]) {
  return arr.reduce((total, current) => {
    return total + current.severity;
  }, 0);
}
