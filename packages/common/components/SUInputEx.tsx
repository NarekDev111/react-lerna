import { MouseEventHandler, useId } from "react";

interface ISUInputEx {
  value: string;
  label?: string;
  onChange?: (val: string) => void;
  onClick?: MouseEventHandler<HTMLInputElement>;
  onBlur?: () => void;
  placeholder?: string;
  type?: string;
  isInvalid?: boolean;
  disabled?: boolean;
  readonly?: boolean;
}

export default function SUInputEx({
  value,
  onChange,
  onClick,
  onBlur,
  label,
  placeholder,
  type,
  isInvalid,
  disabled,
  readonly,
}: ISUInputEx) {
  const id = useId();
  return (
    <div className="relative w-full h-full">
      <input
        id={id}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        onClick={onClick}
        onBlur={onBlur}
        placeholder={placeholder || label || undefined}
        type={type}
        className={
          `w-full peer outline-none border-b-[1px] placeholder-transparent ${
          isInvalid
            ? "border-red-500 focus:border-red-500 text-red-500"
            : "border-gray-400 focus:border-blue-500 text-blue-gray-700"
          } focus:border-b-[2px] pb-2 pt-2 focus:placeholder-transparent text-sm transition-all `
        }
        disabled={disabled}
        readOnly={readonly}
      />
      {label && (
        <label
          htmlFor={id}
          className={
            `absolute pointer-events-none transition-all left-0 text-xs top-[-10px] peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:top-[-10px] peer-focus:opacity-100  peer-focus:text-xs ${
            isInvalid
              ? "text-red-500"
              : "text-gray-600 peer-focus:text-blue-500"}`
          }
        >
          {label}
        </label>
      )}
    </div>
  );
}
