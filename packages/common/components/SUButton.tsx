import { Button, Tooltip } from "@material-tailwind/react";
import { color, size } from "@material-tailwind/react/types/components/button";
import { MouseEvent, ReactNode } from "react";
import LoadingSpinner from "./LoadingSpinner";

type placement =
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end";

interface ISUButtonProps {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  color?: color;
  size?: size;
  title?: string;
  className?: string;
  tooltip?: {
    content: string;
    placement: placement;
  };
  onClick?: (event: MouseEvent) => void;
}

export default function SUButton({
  children,
  disabled,
  loading,
  color,
  size,
  title,
  className,
  tooltip,
  onClick,
}: ISUButtonProps) {
  return (
    <Tooltip
      hidden={!tooltip}
      content={tooltip?.content}
      placement={tooltip?.placement}
    >
      <Button
        disabled={disabled}
        color={disabled || loading ? "gray" : color || "blue"}
        size={size}
        title={title}
        onClick={disabled || loading ? undefined : onClick}
        className={`${
          disabled || loading ? "pointer-events-none" : ""
        } ${className}`}
      >
        <div className="flex w-full h-full items-center">
          <div className="m-auto flex">
            <div className="">{children}</div>
            {loading ? (
              <div className="ml-2">
                  <LoadingSpinner className="w-4 h-4" />
              </div>
            ) : null}
          </div>
        </div>
      </Button>
    </Tooltip>
  );
}
