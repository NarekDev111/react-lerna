import { RefreshIcon } from "@heroicons/react/outline";

export default function LoadingSpinner({ className }: { className: string }) {
  return (
    <div className="animate-spin">
      <RefreshIcon className={`-scale-x-100 ${className}`} />
    </div>
  );
}
