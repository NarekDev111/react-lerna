import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";

export default function ShowPasswordButton(props: {
  shown: boolean;
  onToggle: () => void;
  className?: string;
}) {
  const iconClassName = "w-5 h-5 m-auto";
  return (
    <button
      className={props.className}
      onClick={props.onToggle}
      title={props.shown ? "Hide password" : "Show password"}
      tabIndex={-1}
    >
      {props.shown ? (
        <EyeOffIcon className={iconClassName} />
      ) : (
        <EyeIcon className={iconClassName} />
      )}
    </button>
  );
}
