import React from "react";

import { FormattedWheelAndTireData } from "../App";

interface WheelAndTireProps {
  formattedWheelAndTireData: FormattedWheelAndTireData;
}

const vehicleSides = ["Left Rear", "Left Front", "Right Rear", "Right Front"];

const WheelAndTire = ({ formattedWheelAndTireData }: WheelAndTireProps) => {
  return (
    <>
      {Object.entries(formattedWheelAndTireData).map((data) => {
        return Object.entries(data[1]).map(([innerKey, innerValue]) => {
          return (
            vehicleSides.includes(innerKey) && (
              <div>
                <div className="font-bold text-blue-900 text-xs">
                  <p className="text text-sm ">{innerKey}</p>
                  <p className="text-black font-normal text-xs">
                    {innerValue["Brand"]}
                  </p>
                </div>
                <p className="text-base font-bold tracking-wider">
                  {innerValue["Tread Depth"] + '"'}
                </p>
                <p className="text-black text-xs">
                  {innerValue["Width"]}/{innerValue["Aspect Ratio"]}
                </p>
              </div>
            )
          );
        });
      })}
    </>
  );
};

export default WheelAndTire;
