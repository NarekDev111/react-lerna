import { XIcon } from "@heroicons/react/outline";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { size } from "@material-tailwind/react/types/components/dialog";
import { ReactNode } from "react";

interface IPopupProps {
  open: boolean;
  title?: string | ReactNode;
  size?: size;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  container?: boolean;
}

export default function SUPopup({
  open,
  title,
  size,
  children,
  className,
  container,
  onClose,
}: IPopupProps) {
  return (
    <Dialog
      open={open}
      handler={onClose}
      size={size}
      className={className || "overflow-visible"}
    >
      <DialogHeader
        className={`flex justify-between  ${container && "container mx-auto"}`}
      >
        <div className="w-full flex text-sm">{title}</div>
        <XIcon
          onClick={() => onClose()}
          className={`w-7 h-7 cursor-pointer hover:scale-110 `}
        />
      </DialogHeader>
      <DialogBody divider>
        <div style={{ fontWeight: 400, color: "black" }} className="w-full">
            {children}
        </div>
      </DialogBody>
    </Dialog>
  );
}
