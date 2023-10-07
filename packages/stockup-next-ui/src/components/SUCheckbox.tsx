import { ReactNode } from "react";

interface ISUCheckboxProps {
  label?: string | ReactNode;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (val: boolean) => void;
}

export default function SUCheckbox({
  label,
  checked,
  disabled,
  onChange,
}: ISUCheckboxProps) {
  return (
    <label className="cursor-pointer flex gap-2">
        <div className="flex">
          <input
            type="checkbox"
            className="w-5 h-5 cursor-pointer m-auto"
            checked={checked}
            onChange={(e) => (onChange ? onChange(e.target.checked) : null)}
            disabled={disabled}
          />
        </div>
        {label && (
          <div className={`flex ${disabled ? "text-gray-500" : ""}`}>
            <div className="m-auto">{label}</div>
          </div>
        )}
    </label>
  );
}
