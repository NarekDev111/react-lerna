import DealershipList from "./dealerships/DealershipList";
import PendingUsers from "./dealerships/PendingUsers";

export default function Dealerships() {
  return (
    <div>
      <PendingUsers />

      <DealershipList />
    </div>
  );
}
