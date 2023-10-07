import IOpportunity from "../../../services/api/interfaces/IOpportunity";
import { format_cr, mileage } from "../../../services/format";
import { capitalize } from "../../../services/strings";

type colorTypes = "GREEN" | "BLUE" | "YELLOW" | "RED";

const colors: Record<colorTypes, string> = {
  GREEN: "rgb(0, 168, 120)",
  BLUE: "rgb(0, 78, 125)",
  YELLOW: "rgb(255, 170, 0)",
  RED: "red",
};

type ItemsType = {
  year: number;
  name: string;
  mileage: string;
  opportunity?: string;
  cr?: string;
};

export function textOpportunityTitle(opportunity: IOpportunity): string {
  const { year, make, model, trim } = opportunity.vehicle_id;

  const items = [
    `${year} ${make} ${model} ${trim || ""}`,
    `${mileage(opportunity.vehicle_id.mileage)} mil.`,
  ];

  if (opportunity.light.length > 0) {
    items.push(opportunity.light.map((s) => capitalize(s)).join(", "));
  }

  if (
    opportunity.condition_reports[0]?.condition_report_scores[0]?.cr_score &&
    opportunity.auction
  ) {
    items.push(
      `CR: ${format_cr(
        opportunity.condition_reports[0].condition_report_scores[0].cr_score
      )}`
    );
  }

  return items.join(" | ");
}

export default function OpportunityTitle({
  opportunity,
}: {
  opportunity: IOpportunity;
}) {
  const { year, make, model, trim } = opportunity.vehicle_id;
  const items: string[] = [
    `${year} ${make} ${model} ${trim || ""}`,
    `${mileage(opportunity.vehicle_id.mileage)} miles`,
  ];

  const myItems: ItemsType = {
    year,
    name: `${make} ${model} ${trim || ""}`,
    mileage: mileage(opportunity.vehicle_id.mileage),
  };

  if (opportunity.light.length) {
    myItems["opportunity"] = opportunity.light
      .map((s) => capitalize(s))
      .join(", ");
    items.push(opportunity.light.map((l) => capitalize(l)).join(", "));
  }

  if (
    opportunity.condition_reports[0]?.condition_report_scores[0]?.cr_score &&
    opportunity.auction
  ) {
    items.push(
      `CR: ${format_cr(
        opportunity.condition_reports[0].condition_report_scores[0].cr_score
      )}`
    );

    myItems["cr"] = format_cr(
      opportunity.condition_reports[0].condition_report_scores[0].cr_score
    );
  }

  return (
    <div>
      {/* {item} {index < items.length - 1 && " | "} */}
      <p
        style={{
          fontSize: "1.5rem",
        }}
        className="text-[#2E3A59]">
        {myItems?.year} {myItems?.name}
      </p>
      <p
        style={{
          fontSize: "1.2rem",
          lineHeight: "1",
          fontWeight: 400,
          color: "black",
        }}
        className="text-[#2E3A59] font-normal mt-1">
        {myItems?.mileage} miles
      </p>
      <div className="text-base  flex items-center gap-2">
        {myItems.cr && (
          <span className="text-[#8F9BB3] ">CR: {myItems?.cr}</span>
        )}
        {myItems?.opportunity &&
          myItems.opportunity.split(",").map((o: string) => {
            const colorKey = o.toUpperCase().trim() as colorTypes;
            if (colorKey in colors) {
              return (
                <p
                  key={colorKey}
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: colors[colorKey] }}
                />
              );
            }
            return null;
          })}
      </div>
    </div>
  );
}
