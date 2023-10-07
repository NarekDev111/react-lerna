import { Chip } from "@material-tailwind/react";
import { color } from "@material-tailwind/react/types/components/chip";

export function statusColor(status: string): color {
  switch (status) {
    case "active":
      return "green";
    case "inactive":
      return "red";
    case "prospect":
      return "blue";
    default:
      return "gray";
  }
}

export default function StatusChip({ status }: { status: string }) {
  return <Chip color={statusColor(status)} value={status} />;
}
