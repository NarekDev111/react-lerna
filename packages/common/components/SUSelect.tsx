import { ReactNode } from "react";

const VariantsType = ["standard", "outlined", "static"] as const;

type SUSelectStyleType<T extends readonly PropertyKey[]> = {
  readonly [K in T[number]]: { label?: string; select?: string };
};

const SUSelectStyle: SUSelectStyleType<typeof VariantsType> = {
  standard: {
    label: "text-sm",
    select:
      "w-full p-2 border-b-[1px] bg-white border-gray-500 focus:border-blue-500",
  },
  outlined: {
    label: "absolute top-0 left-3 px-1 text-sm -translate-y-1/2 bg-white",
    select: "w-full p-2 border-2 rounded-lg focus:outline-hidden",
  },

  static: {
    label: "",
    select: "",
  },
};

interface ISUSelectProps {
  value: string;
  onChange?: (value: string) => void;
  children: ReactNode;
  label?: string;
  disabled?: boolean;
  className?: string;
  variant?: typeof VariantsType[number];
  style?: React.CSSProperties;
}

export default function SUSelect({
  value,
  onChange,
  children,
  label,
  className,
  disabled,
  variant = "standard",
  style,
}: ISUSelectProps) {
  return (
    <div className="relative">
      {label && <label className={SUSelectStyle[variant].label}>{label}</label>}
      <select
        style={style || undefined}
        value={value}
        onChange={(e) => (onChange ? onChange(e.target.value) : undefined)}
        disabled={disabled}
        className={`${SUSelectStyle[variant].select} ${
          disabled && "text-gray-500"
        } ${className}`}
      >
        {children}
      </select>
    </div>
  );
}
