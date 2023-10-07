import { SearchIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import SUButton from "../../../components/SUButton";
import SUInput from "../../../components/SUInput";
import { list } from "../../../services/api/endpoints/clientLocation";
import IClientLocation from "../../../services/api/interfaces/IClientLocation";
import IMongoDocument from "../../../services/api/interfaces/IMongoDocument";

interface IFindDealershipProps {
  onSelected: (id: string) => void;
}

export default function FindDealership({ onSelected }: IFindDealershipProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dealerships, setDealerships] =
    useState<(IClientLocation & IMongoDocument)[]>();
  const [selectedId, setSelectedId] = useState<string>("");

  async function loadList() {
    const result = await list({
      pageSize: 8,
      sortBy: "dealership_name",
      params: { dealership_name: `/${searchTerm}` },
    });

    const selectedExists =
      result.list.filter((i) => i._id === selectedId).length === 1;

    if (!selectedExists) setSelectedId("");

    setDealerships(result.list);
  }

  const [listTimer, setListTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (listTimer != null) {
      clearTimeout(listTimer);
      setListTimer(null);
    }

    const newTimer = setTimeout(() => {
      loadList();
    }, 300);

    setListTimer(newTimer);
  }, [searchTerm]);

  function onAssign() {
    onSelected(selectedId);
  }

  return (
    <>
      <SUInput
        placeholder="Find Dealership"
        icon={<SearchIcon className="w-5 h-5" />}
        onChange={(value) => {
          if (value) setSearchTerm(value);
        }}
       />

      {dealerships?.map((dealership) => {
        return (
          <div
            className={
              `cursor-pointer mb-1 p-1 pl-3 hover:bg-gray-100 ${
              dealership._id === selectedId ? " !bg-blue-300 text-white" : ""}`
            }
            onClick={() => setSelectedId(dealership._id)}
            key={dealership._id}
          >
            {dealership.dealership_name}
            {dealership._id === selectedId ? (
              <div className="text-sm">
                {[
                  dealership.address.street,
                  dealership.address.city,
                  dealership.address.state,
                  dealership.address.zip,
                ].join(", ")}
              </div>
            ) : null}
          </div>
        );
      })}

      <SUButton
        color="blue"
        className="w-full"
        disabled={!selectedId}
        onClick={onAssign}
      >
        Assign
      </SUButton>
    </>
  );
}
