import { ReactNode } from "react";
import IConditionReport from "../../../services/api/interfaces/IConditionReport";
import { format_cr } from "../../../services/format";
import { capitalize } from "../../../services/strings";

function listToStr(input: string[], zeroResult = "N/A"): string {
  if (input.length > 0) {
    return input.map((i) => capitalize(i)).join(", ");
  }

  return zeroResult;
}



export default function ConditionReport({ cr }: { cr: IConditionReport }) {
  const questions: {
    title: string;
    field?: keyof IConditionReport;
    format?: (s: any) => string;
  }[] = [
    { title: "Is the vehicle running?", field: "running_cd" },
    { title: "Issues with the engine", field: "engine_issues" },
    {
      title: "Does the transmission work without issues?",
      field: "transmission",
      format: (val: boolean) => (val ? "Yes" : "No"),
    },
    {
      title: "Transmission issues (check all that apply):",
      field: "transmission_issues",
    },
    {
      title: "How many accidents has the vehicle been in?",
      field: "accidents_cd",
    },
    {
      title: "Has there been any other serious damage to the vehicle?",
      field: "other_serious_damage",
    },
    {
      title: "Which damage does the vehicle have (check all that apply)?",
      field: "other_serious_damage_issues",
    },
    { title: "What condition are the body panels in?", field: "panels_cd" },
    {
      title: "Issues with the body panels (check all that apply):",
      field: "panel_issues",
    },
    { title: "What's the condition of the exterior paint?", field: "paint_cd" },
    {
      title: "Issues with the exterior paint (check all that apply):",
      field: "paint_issues",
    },
    {
      title: "Does the glass (windows or windshields) have any imperfections?",
      field: "glass",
    },
    {
      title: "Issues with the glass (check all that apply):",
      field: "glass_issues",
    },
    {
      title: "Have there ever been any issues with the vehicle's frame?",
      field: "frame",
    },
    {
      title: "Issues with the vehicle's frame (check all that apply):",
      field: "frame_issues",
    },
    {
      title: "Does the vehicle need any maintenance right now?",
      field: "maintenance",
    },
    {
      title:
        "Is the vehicle currently due for any maintenance (check all that apply)?",
      field: "maintenance_issues",
    },
    { title: "Are any dashboard warning lights on?" },
    {
      title: "Which dashboard lights are on (check all that apply)?",
      field: "dash_lights",
    },
    {
      title:
        "Describe the condition of the vehicle's interior (vinyl, upholstery, floorboards, etc.):",
      field: "interior_cd",
    },
    {
      title: "Issues with the interior (check all that apply):",
      field: "interior_issues",
    },
    {
      title: "Are there any issues with the electrical or any accessories?",
      field: "electrical_accessories",
    },
    {
      title: "Which of the following have issues (check all that apply)?",
      field: "electrical_accessories_issues",
    },
    {
      title: "How many miles are on the tires?",
      field: "tire_mileage_cd",
      format: (v: string) => v.replace("_", " - "),
    },
    {
      title: "Tire tread depth:",
      field: "tire_tread_depth_cd",
      format: (v: string) => {
        switch (v.toLocaleLowerCase()) {
          case "lt_4":
            return "Less than 4/32";
          case "btw_4/6":
            return "Between 4/32 and 6/32";
          case "gt_6":
            return "Greater than 6/32";
          default:
            return v;
        }
      },
    },
    {
      title: "Do all four tires match (same brand, size, and style)?",
      field: "tires_match",
    },
    { title: "Additional notes about the tires", field: "tires_notes" },
    {
      title: "Wheel type (meaning the metal wheel, not the rubber tire):",
      field: "wheel_type_cd",
    },
    {
      title: "Are there any issues with the wheels (check all that apply)?",
      field: "wheels",
    },
    { title: "Wheel size:", field: "wheel_size" },
    { title: "How many keys do you have for the vehicle?", field: "keys_cd" },
  ];

  return (
    <>
      {cr.condition_report_scores[0]?.cr_score && (
        <div className="mb-2">
          <h3 className="font-bold uppercase">CR Score:</h3>
          <blockquote className="pl-2 border-l-4">
            {format_cr(cr.condition_report_scores[0].cr_score)}
          </blockquote>
        </div>
      )}

      <div className="mb-2">
        <h3 className="font-bold uppercase">Summary:</h3>
        <blockquote className="pl-2 border-l-4">{cr.summary}</blockquote>
      </div>

      <hr className="mb-1 mt-1" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {questions.map((q, index) => (
          <div className="mb-4" key={index}>
            <h4 className="font-bold">{q.title}</h4>
            <div className="border-l-4 p-2">
              {q.field && cr[q.field]
                ? (function (): ReactNode {
                    const val = q.format ? q.format(cr[q.field]) : cr[q.field];

                    if (val === true || val === false) return val ? "Yes" : "No";

                    if (Array.isArray(val)) return listToStr(val, "No");

                    return capitalize(`${val}`);
                  }())
                : "N/A"}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
