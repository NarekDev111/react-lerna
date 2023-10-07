import { useState, useEffect } from "react";
import { IDamage, formatString } from "./App";

import { ImageSlider } from "@sellgauge/common";

interface RenderDamagesProps {
  groups: Record<string, IDamage[]>;
  selectedIssue: string | null;
  selectIssue: (val: string) => void;
}

const RenderDamages = ({ groups }: RenderDamagesProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (selectedImageIndex === null) return;
    function escFunction(event: any) {
      if (event.key === "Escape") {
        setSelectedImageIndex(null);
      }
    }

    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [selectedImageIndex]);

  return (
    <>
      {Object.entries(groups).map(
        ([key, arr]) =>
          arr.length > 0 && (
            <div key={key} className="mt-3">
              <div className="relative overflow-x-auto border border-blue-900 mt-2 rounded">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs  uppercase dark:bg-gray-700 dark:text-gray-400">
                    <div className="text-blue-900 text-xl">
                      <h2 className="px-6 py-3 w-full">{key}</h2>
                    </div>
                    <tr className="bg-blue-900 text-white">
                      <th scope="col" className="px-6 py-3">
                        Damage type / Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Part name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Severity
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {arr.map((el, i) => (
                      <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {formatString(el.damageTypeName)}
                        </th>
                        <td className="px-6 py-4">{el.partName}</td>
                        <td className="px-6 py-4">{el.severity}</td>
                        <td className="px-6 py-4">{el.locationName}</td>
                        {el.images.length > 0 ? (
                          <td
                            onClick={() => setSelectedImageIndex(i)}
                            className="w-auto h-[100px] relative">
                            {selectedImageIndex === i ? (
                              <div className="fixed top-0 left-0 h-screen w-screen z-[100000]">
                                <ImageSlider
                                  isfullScreen={true}
                                  photoGroups={{
                                    ALL: el.images.map((i) => ({
                                      url: i,
                                      name: "image",
                                    })),
                                    EXT: [],
                                    INT: [],
                                  }}
                                  images={el.images.map((i) => ({
                                    url: i,
                                    name: "image",
                                  }))}
                                />
                              </div>
                            ) : (
                              <div className=" relative h-full w-full cursor-pointer">
                                <img
                                  className="object-cover align-bottom absolute top-0 left-0 w-full h-full d-block"
                                  src={el.images[0]}
                                  alt="img"
                                />

                                <div className="absolute inset-0 bg-black/30 flex items-end justify-end p-3">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="white"
                                    className="w-6 h-6">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                                    />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </td>
                        ) : (
                          <td className="w-auto h-[100px] relative">
                            <img
                              className="object-cover d-block absolute top-0 left-0 w-full h-full"
                              src={
                                "https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns="
                              }
                              alt="img"
                            />
                          </td>
                        )}
                        <td className="px-6 py-4 font-semibold">
                          <p className="text-green-500">{el.decisionStatus}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
      )}
    </>
  );
};

export default RenderDamages;
