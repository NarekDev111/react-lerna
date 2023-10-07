import { CheckCircleIcon, XIcon } from "@heroicons/react/outline";
import { Alert, Button } from "@material-tailwind/react";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import SUButton from "../../../components/SUButton";
import fees, { IFees } from "../../../services/api/endpoints/fees";
import { placeOffer } from "../../../services/api/endpoints/offer";
import IMongoDocument from "../../../services/api/interfaces/IMongoDocument";
import IOpportunity from "../../../services/api/interfaces/IOpportunity";
import { price } from "../../../services/format";
import { getMaxOffer } from "../../../services/misc";

const lg = 959;
type BidType = "" | "pre" | "proxy";

// https://docs.google.com/document/d/16bTF5jeI-gMymwzqXGW545v73zZ3BeYs-kYiDFPVy_8/edit
/*
    $0 to $5000          $200
    $5,001 to $7,500     $250
    $7,501 to $12,000    $300
    $12,001 to $18,000   $350
    $18,001 to $25,000   $400
    $25,001 to $40,000   $450
    $40,001 to $60,000   $500
    $60,001 to $80,000   $600
    $80,001 to $100,000+ $750
    */
function calcBuyFee(salePrice: number): number {
  const table = [
    [0, 5000, 200],
    [5001, 7500, 250],
    [7501, 12000, 300],
    [12001, 18000, 350],
    [18001, 25000, 400],
    [25001, 40000, 450],
    [40001, 60000, 500],
    [60001, 80000, 600],
    [80001, Infinity, 750],
  ];
  for (const bracket of table) {
    if (
      salePrice >= bracket[0] &&
      (!Number.isFinite(bracket[1]) || salePrice <= bracket[1])
    ) {
      return bracket[2];
    }
  }

  return 200;
}

interface IBidFormProps {
  opportunity: IOpportunity & IMongoDocument;
  currentBid: number;
  onBidCreated: () => void;
}

export default function BidForm({
  opportunity,
  onBidCreated,
  currentBid,
}: IBidFormProps) {
  const currentMaxOffer = getMaxOffer(opportunity.offers);
  const offerIncrement = currentMaxOffer <= 15000 ? 100 : 200;
  const minBid = Math.max(offerIncrement, currentMaxOffer + offerIncrement);

  const [showForm, setShowForm] = useState(false);
  const [bidValue, setBidValue] = useState<number>(minBid);
  const [isLoading, setLoading] = useState(true);
  const [feesCfg, setFeesCfg] = useState<IFees>();

  const [error, setError] = useState<string | null>(null);
  const [fatalError, setFatalError] = useState(false);

  const [postSale, setPostSale] = useState(true);
  const [localTransportation, setLocalTransportation] = useState(false);
  const [m2mTransportation, setM2mTransportation] = useState(false);

  const [bidSuccess, setBidSuccess] = useState(false);

  const bidText = price(bidValue);

  console.log("opp", opportunity);

  useEffect(() => {
    setShowForm(window.innerWidth > lg);

    const mediaQuery = window.matchMedia(`(max-width: ${lg}px)`);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setShowForm(false);
      } else {
        setShowForm(true);
      }
    };
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  function updateBidValue(text: any) {
    const val = parseInt(text.replaceAll(/\D/g, ""));
    setBidValue(Number.isNaN(val) ? 0 : val);
  }

  function changeValue(dt: number) {
    gtag("event", `bid_form_value_${dt < 0 ? "dec" : "inc"}`);
    setBidValue(Math.max(0, bidValue + dt));
  }

  useEffect(() => {
    fees(opportunity._id)
      .then((fs) => {
        setLoading(false);
        setFeesCfg(fs.data);
        setM2mTransportation(!(fs.data.m2m_transportation_fee === 0));
      })
      .catch(() => {
        setLoading(false);
        setError(
          "Could not obtain information regarding the applicable fees. Please contact us to fix this."
        );
        setFatalError(true);
      });
  }, [opportunity._id]);

  const disabled = fatalError || isLoading;

  const buyFee = calcBuyFee(bidValue);

  const total =
    bidValue +
    buyFee +
    (feesCfg
      ? (postSale ? feesCfg.post_sale_inspection_price : 0) +
        (localTransportation ? feesCfg.local_transportation_fee : 0) +
        (m2mTransportation ? feesCfg.m2m_transportation_fee : 0)
      : 0);

  async function placeBid(type: BidType = "") {
    setLoading(true);
    setError(null);

    try {
      await placeOffer(type, {
        amount: bidValue,
        post_sale_inspection: postSale,
        transportation: localTransportation,
        m2m_transportation: m2mTransportation,
        opportunity_id: opportunity._id,
      });

      gtag("event", "bid_success", {
        amount: bidValue,
        total,
        opportunity_id: opportunity._id,
        buy_fee: buyFee,
        type,
      });
      setBidSuccess(true);

      onBidCreated();
    } catch (error) {
      gtag("event", "bid_fail", { error: `${(error as Error).message}` });

      const axiosError = error as AxiosError<{ error: string }>;

      if (axiosError.response) setError(axiosError.response.data.error);
      else setError("Unexpected error");
    }

    setLoading(false);
  }

  return (
    <>
      {showForm ? (
        bidSuccess ? (
          <div className="p-5">
            <div className="flex text-2xl text-green-600">
              <CheckCircleIcon className="w-10 h-10 m-auto pr-2" />
              <div className="m-auto">Bid has been successfully placed</div>
            </div>
            <div className="text-center">
              <button
                className="text-link"
                onClick={() => {
                  setBidSuccess(false);
                }}>
                Place another bid
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`flex flex-col gap-3 p-2 bg-white rounded  mt-2 w-full${
              isLoading ? "animate-pulse" : ""
            } ${showForm && "mb-7 md:mb-0"}`}>
            <div className="flex-1 flex">
              <button
                className="ml-auto md:hidden"
                onClick={() => setShowForm(false)}>
                <XIcon className="w-8 h-8" />
              </button>
            </div>

            <div className="flex justify-around ">
              <div className="text-center">
                <p className="text-black/40 text">Current bid:</p>
                <span className="text-center text-2xl focus:outline-none font-bold    disabled:border-b-gray-500 p-1 disabled:text-gray-500 w-full  ">
                  ${currentBid.toLocaleString()}
                </span>
                {opportunity.offers.length > 0 && (
                  <p className="text-sm">
                    {opportunity.offers.length}{" "}
                    {opportunity.offers.length > 1 ? "bids" : "bid"}
                  </p>
                )}
              </div>

              {opportunity?.counter_offer && (
                <div className="text-center">
                  <p className="text-black/40">Counteroffer:</p>
                  <Button
                    onClick={() =>
                      updateBidValue(opportunity.counter_offer.toString())
                    }
                    className="py-1 text-2xl text-[#0C74BC] border-[#0C74BC]"
                    variant="outlined">
                    {price(opportunity.counter_offer)}
                  </Button>
                </div>
              )}
            </div>

            <div className="controller flex justify-center items-center  text-[30px] mt-5">
              <button
                onClick={() => changeValue(-100)}
                disabled={disabled || bidValue - 100 < minBid}
                className="border  border-[#0C74BC] transition-all disabled:border-black/40 rounded-full h-12 w-12 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={`w-6 h-6  ${
                    disabled || bidValue - 100 < minBid
                      ? "fill-black/40"
                      : "fill-[#0C74BC]"
                  }`}>
                  <path
                    fillRule="evenodd"
                    d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <input
                style={{ fontWeight: 700 }}
                className="text-center border-b-2 w-8/12 text-3xl focus:outline-none font-bold text-[#0C74BC] border-b-[#0C74BC]   disabled:border-b-gray-500 p-1 disabled:text-gray-500 "
                value={bidText}
                onChange={(e) => updateBidValue(e.target.value)}
                disabled={disabled}
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />

              <button
                color="green"
                onClick={() => changeValue(100)}
                disabled={disabled}
                className="border border-[#0C74BC] disabled:border-black/40 rounded-full h-12 w-12 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#0C74BC"
                  className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <p className="text-black/40 text-center text-sm">
              Min. {price(minBid)}
            </p>

            <div
              style={{ fontWeight: 600 }}
              className="flex justify-center text-black/80 font-semibold gap-2 mt-3 px-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                className="w-5 h-5 relative fill-black/80">
                <path
                  fillRule="evenodd"
                  d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p>
                  {opportunity.gauge_location_id.address.street},{" "}
                  {opportunity.gauge_location_id.address.city},{" "}
                  {opportunity.gauge_location_id.address.state}{" "}
                  {opportunity.gauge_location_id.address.zip}
                </p>
              </div>
            </div>

            <div className="input mt-6 text-black/80 text-lg flex flex-col gap-2">
              {feesCfg &&
                feesCfg.transportation.from !== feesCfg.transportation.to &&
                feesCfg.m2m_transportation_fee !== 0 && (
                  <div className="flex items-center  justify-between">
                    <div className="space-x-3">
                      <input
                        className="scale-150 accent-[#0C74BC]"
                        type="checkbox"
                        id="m2m"
                        checked={m2mTransportation}
                        disabled={disabled}
                        onChange={(c: any) =>
                          setM2mTransportation(c.target.checked)
                        }
                      />
                      <label htmlFor="m2m">
                        {feesCfg.transportation.from} to{" "}
                        {feesCfg.transportation.to} transportation
                      </label>
                    </div>
                    <span
                      style={{ fontWeight: m2mTransportation ? 600 : 400 }}
                      className={` ${
                        m2mTransportation ? "text-black" : "text-black/40"
                      }`}>
                      {price(feesCfg.m2m_transportation_fee)}
                    </span>
                  </div>
                )}

              <div className="flex items-center  justify-between">
                <div className="space-x-3">
                  <input
                    className="scale-150 accent-[#0C74BC]"
                    type="checkbox"
                    checked={postSale}
                    id="postsale"
                    disabled={disabled}
                    onChange={(e: any) => setPostSale(e.target.checked)}
                  />
                  <label htmlFor="postsale">Post-sale inspection</label>
                </div>
                {feesCfg && (
                  <span
                    style={{ fontWeight: postSale ? 600 : 400 }}
                    className={` ${postSale ? "text-black" : "text-black/40"}`}>
                    {price(feesCfg.post_sale_inspection_price)}
                  </span>
                )}
              </div>

              <div className="flex items-center  justify-between">
                <div className="space-x-3">
                  <input
                    className="scale-150 accent-[#0C74BC]"
                    type="checkbox"
                    id="localT"
                    checked={localTransportation}
                    disabled={disabled}
                    onChange={(c: any) =>
                      setLocalTransportation(c.target.checked)
                    }
                  />
                  <label htmlFor="localT">Local transportation</label>
                </div>
                {feesCfg && (
                  <span
                    style={{ fontWeight: localTransportation ? 600 : 400 }}
                    className={` ${
                      localTransportation ? "text-black" : "text-black/40"
                    }`}>
                    $100
                  </span>
                )}
              </div>

              <div className="flex items-center  justify-between">
                <p className="font-bold">Buy fee</p>
                <span style={{ fontWeight: 600 }} className="font-semibold">
                  {price(buyFee)}
                </span>
              </div>
            </div>

            <hr className="border" />

            <div
              style={{ fontWeight: 600 }}
              className="flex items-center  justify-between font-semibold">
              <span className="text-lg">Total price</span>
              <span>{price(total)}</span>
            </div>

            {error && (
              <div>
                <Alert color="red">
                  <strong>Error:</strong> {error}
                </Alert>
              </div>
            )}

            <div
              style={{ fontWeight: 700 }}
              className="buttons mt-3 grid grid-cols-2 gap-8 w-full text-white tecxt text-sm font-bold ">
              {opportunity.auction ? (
                <>
                  <SUButton
                    size="lg"
                    className="w-full py-4 border border-[#0C74BC] bg-[#0C74BC] hover:bg-[#0C74BC]/90 rounded"
                    disabled={disabled || bidValue < minBid}
                    onClick={() => {
                      placeBid();
                    }}>
                    bid
                  </SUButton>
                  <SUButton
                    className="w-full py-4 text-[#0C74BC] bg-white border border-[#0C74BC] hover:bg-[#0C74BC] hover:text-white transition-all rounded"
                    color="blue-gray"
                    size="lg"
                    disabled={disabled || bidValue < minBid}
                    onClick={() => {
                      placeBid("proxy");
                    }}>
                    Proxy bid
                  </SUButton>
                </>
              ) : (
                <SUButton
                  color="blue"
                  size="lg"
                  className="w-full py-4 border border-[#0C74BC] bg-[#0C74BC] hover:bg-[#0C74BC]/90 rounded"
                  disabled={disabled || bidValue < minBid}
                  onClick={() => {
                    placeBid("pre");
                  }}>
                  Pre bid
                </SUButton>
              )}
            </div>
          </div>
        )
      ) : (
        <div className="pb-4 pt-2 w-full">
          <SUButton
            size="lg"
            className="w-full"
            onClick={() => {
              if (!showForm) gtag("event", "bid_form_show");
              setShowForm(true);
            }}>
            Place a {!opportunity.auction && "pre-"}bid
          </SUButton>
        </div>
      )}
    </>
  );
}
