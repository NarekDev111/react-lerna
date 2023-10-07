import { Input } from "@material-tailwind/react";
import { ReactElement, useRef } from "react";

export interface ISUInputNewProps {
  autoFocus: boolean;
  value?: string;
  placeholder?: string;
  icon?: ReactElement;
  onChange: (value: string) => void;
  onFocusHandler: () => void;
  onBlurHandler: () => void;
}

export default function SUInput({
  autoFocus,
  value,
  placeholder,
  icon,
  onChange,
  onFocusHandler,
  onBlurHandler,
}: ISUInputNewProps) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col w-full mb-2 ">
      <Input
        ref={ref}
        autoFocus={autoFocus}
        onFocus={onFocusHandler}
        value={value}
        type="text"
        className="text-[#0095FF]"
        variant="standard"
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlurHandler}
        placeholder={placeholder}
        icon={icon}
       />
    </div>
  );
}
