import LoadingSpinner from "./LoadingSpinner";

export default function PleaseWait() {
  return (
    <div className="flex place-items-center">
      <LoadingSpinner className="w-7 h-7" /> Loading. Please wait...
    </div>
  );
}
