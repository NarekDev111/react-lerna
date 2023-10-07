import { useAuth } from "../../../context/AuthProvider";

export enum EAuctionTab {
  ACTIVE = "active",
  MY_BIDS = "my_bids",
  WON_BIDS = "won_bids",
  RUN_LIST = "run_list",
}

interface IAuctionTabs {
  active: EAuctionTab;
  onChange: (value: EAuctionTab) => void;
  loading?: boolean;
}

export default function AuctionTabs({
  active,
  onChange,
  loading,
}: IAuctionTabs) {
  const auth = useAuth();

  const options: {
    title: string;
    type: EAuctionTab;
    color: string;
    show: boolean;
  }[] = [
    { title: "Main", type: EAuctionTab.ACTIVE, color: "blue", show: true },
    {
      title: "Our Bids",
      type: EAuctionTab.MY_BIDS,
      color: "green",
      show: auth?.user.bidder_status,
    },
    {
      title: "Won Bids",
      type: EAuctionTab.WON_BIDS,
      color: "green",
      show: auth?.user.bidder_status,
    },
    {
      title: "Run List",
      type: EAuctionTab.RUN_LIST,
      color: "blue-gray",
      show: true,
    },
  ];

  return (
    <div
      className={`fixed z-50 md:static md:-z-20 md:m-3 text-xs md:text-base left-0 right-0 bottom-0 md:justify-start  bg-gray-100 rounded md:p-1 shadow-inner md:block grid grid-cols-${
        options.filter((item) => item.show).length
      } `}>
      {options
        .filter((item) => item.show)
        .map((item, index) => (
          <button
            key={`tab_${index}`}
            className={`rounded grow md:grow-0 p-2 pl-3 pr-3 md:p-3 md:pl-4 md:pr-4 m-2 drop-shadow md:w-[150px] whitespace-nowrap ${
              loading && " cursor-wait "
            }${
              item.type === active
                ? `${
                    loading ? " bg-gray-600 " : ` bg-${item.color}-500 `
                  } text-white `
                : ` bg-gray-50`
            }`}
            onClick={() => {
              if (!loading) onChange(item.type);
            }}>
            {item.title}
          </button>
        ))}
    </div>
  );
}
