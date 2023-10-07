import { CheckIcon, ExclamationIcon } from "@heroicons/react/outline";
import { Input } from "@material-tailwind/react";
import { ReactElement, useEffect, useId, useRef, useState } from "react";

export interface IValidationResult {
  result: boolean;
  msg?: string;
}

export interface ISUInputProps {
  autoFocus?: boolean;
  label?: string;
  disabled?: boolean;
  type?: string;
  value?: string;
  options?: string[];
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  icon?: ReactElement;
  forceFocus?: boolean;
  onChange?: (value: string) => void;
  validator?: (input: string) => boolean | IValidationResult;
  validationOptions?: {
    allowEmpty?: boolean;
  };
  width?: number | string;
  setFocus?: (value: boolean) => void;
  onBlurHandler?: () => void;
}

const ICON_CLASS_NAME = "w-5 h-5 m-auto";
const SUCCESS_COLOR = "text-green-500";
const ERROR_COLOR = "text-red-500";

export default function SUInput({
  autoFocus,
  label,
  disabled,
  type,
  value,
  options,
  icon,
  forceFocus,
  className,
  inputClassName,
  placeholder,
  onChange,
  validator,
  validationOptions,
  width,
  setFocus,
  onBlurHandler,
}: ISUInputProps) {
  const id = useId();

  const [input, setInput] = useState(value || "");
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const [message, setMessage] = useState<string>();

  function updateInput(val: string) {
    setMessage(undefined);
    setError(false);
    setSuccess(false);
    setInput(val);
    if (onChange) onChange(val);
  }

  function validate() {
    if (validationOptions) {
      if (validationOptions.allowEmpty && input.trim().length === 0) {
        setError(false);
        setMessage(undefined);
        setSuccess(false);
        return;
      }
    }

    if (validator) {
      const validationResult = validator(input);

      if (typeof validationResult === "boolean") {
        if (validationResult) {
          setError(false);
          setSuccess(true);
        } else {
          setError(true);
          setSuccess(false);
        }
      } else {
        const { result } = validationResult as IValidationResult;

        if (result) {
          setError(false);
          setSuccess(true);
          setMessage(undefined);
        } else {
          setError(true);
          setSuccess(false);
          setMessage((validationResult as IValidationResult).msg);
        }
      }
    }

    if (onBlurHandler) onBlurHandler();
  }

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (forceFocus) {
      ref.current?.querySelector("input")?.focus();
    }
  }, [forceFocus]);

  function onFocusHanlder() {
    if (!setFocus) return;
    setFocus(true);
  }

  return (
    <div className={`flex flex-col w-full mb-2 ${className}`}>
      <Input
        ref={ref}
        autoFocus={autoFocus}
        onFocus={onFocusHanlder}
        list={options ? id : undefined}
        value={value}
        label={label}
        variant="standard"
        success={isSuccess}
        error={isError}
        onChange={(e) => updateInput(e.target.value)}
        onBlur={validate}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        icon={
          icon ||
          (isSuccess ? (
            <CheckIcon className={`${ICON_CLASS_NAME} ${SUCCESS_COLOR}`} />
          ) : null || isError ? (
            <ExclamationIcon className={`${ICON_CLASS_NAME} ${ERROR_COLOR}`} />
          ) : null)
        }
        className={`${inputClassName} ${isError ? ERROR_COLOR : ""}`}
        width={width}
      />
      {options ? (
        <datalist id={id}>
          {options?.map((value: string, index: number) => {
            return <option key={index}>{value}</option>;
          })}
        </datalist>
      ) : null}

      {message ? (
        <p
          className={`${
            isError ? ERROR_COLOR : isSuccess ? SUCCESS_COLOR : ""
          } mt-1 text-sm`}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
