import { XIcon } from "@heroicons/react/outline";
import { color } from "@material-tailwind/react/types/components/chip";
import { ReactNode } from "react";
import { FLAG_COLORS_TYPES } from "../types/suggestions";

interface ISUChipProp {
  color?: color;
  onClick?: () => void;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  dynamicColor?: FLAG_COLORS_TYPES;
}

export default function SUChip({
  color,
  children,
  onClick,
  onClose,
  className,
  dynamicColor,
}: ISUChipProp) {
  return (
    <div
      className={`bg-${color}-500 text-white font-bold pl-2 pr-2 py-1.5 rounded-lg cursor-pointer select-none ${className}`}
      onClick={onClick}
      style={{ backgroundColor: dynamicColor || "" }}
    >
      <div className="flex gap-2">
        <div className="pl-1">{children}</div>

        {onClose && (
          <div
            className="bg-[#2E3A59]/90 hover:bg-[#2E3A59] m-auto rounded-lg p-1 font-bold"
            onClick={(e) => {
              onClose();
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <XIcon className="w-3 h-3" />
          </div>
        )}
      </div>
    </div>
  );
}
