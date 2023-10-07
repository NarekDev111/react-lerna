import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { Alert } from "@material-tailwind/react";
import { ReactNode } from "react";

interface IErrorAlertProps {
  children: ReactNode;
}

export default function ErrorAlert({ children }: IErrorAlertProps) {
  return (
    <Alert color="red" className="mb-2 mt-2">
      <div className="flex items-center text-sm">
        <ExclamationCircleIcon className="w-8 h-8 mr-2" />
        {children}
      </div>
    </Alert>
  );
}
