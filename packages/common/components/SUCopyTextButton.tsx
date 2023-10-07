import { CheckIcon, ClipboardIcon } from "@heroicons/react/solid";
import { useState } from "react";
import SUButton from "./SUButton";

interface ISUCopyTextButtonProps {
  text: string;
  disabled: boolean;
}

export default function SUCopyTextButton({
  text,
  disabled,
}: ISUCopyTextButtonProps) {
  const [isCopied, setCopied] = useState(false);

  return (
    <SUButton
      className="h-10"
      color={isCopied ? "green" : "blue"}
      disabled={disabled}
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
      }}
    >
      {isCopied ? (
        <CheckIcon className="w-4 h-4" />
      ) : (
        <ClipboardIcon className="w-4 h-4" />
      )}
    </SUButton>
  );
}
