import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PleaseWait from "../../components/PleaseWait";
import SUButton from "../../components/SUButton";
import { useAuth } from "../../context/AuthProvider";
import { offers, one } from "../../services/api/endpoints/auction";
import IMongoDocument from "../../services/api/interfaces/IMongoDocument";
import IOffer from "../../services/api/interfaces/IOffer";
import IOpportunity from "../../services/api/interfaces/IOpportunity";
import { mileage } from "../../services/format";
import { getMaxOffer } from "../../services/misc";
import { capitalize } from "../../services/strings";
import BidForm from "./components/BidForm";
import BiddingHistory from "./components/BiddingHistory";
import { lightCSSColor } from "./components/ColorBadge";
import ConditionReport from "./components/ConditionReport";
import { IPhotoGalleryItem, ImageSlider } from "@sellgauge/common";
import OpportunityTitle from "./components/OpportunityTitle";
import ShortLinkShare from "./components/ShortLinkShare";

interface IAuctionDetailsProps {
  opportunityId: string;
  inPopup?: boolean;
  onLoaded?: (opportunity: IOpportunity) => void;
  shortLink?: string;
}

export const GROUP_TYPES = {
  ALL: "ALL",
  EXT: "EXT",
  INT: "INT",
};

export type PhotoGroups = {
  ALL: IPhotoGalleryItem[];
  EXT: IPhotoGalleryItem[];
  INT: IPhotoGalleryItem[];
};

type PhotoGroupArray = {
  ALL?: string[];
  EXT: string[];
  INT: string[];
};

const photoGroupArray: PhotoGroupArray = {
  EXT: [
    "front_driver",
    "front",
    "rear",
    "tire_depth",
    "wheel",
    "driver_side",
    "rear_side",
  ],
  INT: [
    "odometer",
    "rear_passenger",
    "passenger",
    "front_passenger",
    "front_seats",
    "back_seats",
    "cockpit",
    "dashboard",
  ],
};

export default function AuctionDetails({
  opportunityId,
  inPopup,
  onLoaded,
  shortLink,
}: IAuctionDetailsProps) {
  const [isLoading, setLoading] = useState(true);
  const [opportunity, setOpportunity] = useState<
    IOpportunity & IMongoDocument
  >();
  const [offersHistory, setOffersHistory] =
    useState<(IOffer & IMongoDocument)[]>();

  // Check if the slider full screen
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  async function load() {
    setLoading(true);

    const params: { [key: string]: string } = {};

    if (shortLink) params["short_link_id"] = shortLink;

    const access_key = searchParams.get("access_key");
    if (access_key) params["access_key"] = access_key;

    const loadedOpportunity = await one(opportunityId, { params });
    const opportunity_offers = await offers(opportunityId);

    setOffersHistory(opportunity_offers.data);

    setOpportunity(loadedOpportunity);
    setLoading(false);

    if (onLoaded) onLoaded(loadedOpportunity);
  }

  useEffect(() => {
    load();
  }, [opportunityId]);

  const photos: IPhotoGalleryItem[] = (() => {
    function getReportPhoto(
      report: any & IMongoDocument,
      field: string
    ): string {
      const val = report[field];

      return `https://gauge-live-bucket.s3.amazonaws.com/uploads/condition_report/${report._id}/${field}/${val}`;
    }

    if (opportunity) {
      const result: IPhotoGalleryItem[] = [];

      for (const report of opportunity.condition_reports) {
        if (report["front_driver"]) {
          result.push({
            url: getReportPhoto(report, "front_driver"),
            name: "front_driver",
          });
        }

        for (const field in report) {
          if (field === "front_driver") continue;

          if ((report as any)[field]) {
            const val = `${
              (report as any as { [key: string]: string })[field]
            }`;

            if (val.endsWith(".jpeg") || val.endsWith(".jpg")) {
              result.push({ url: getReportPhoto(report, field), name: field });
            }
          }
        }

        for (const img of report.additional_images) {
          result.push({
            url: `https://gauge-live-bucket.s3.us-east-2.amazonaws.com/uploads/condition_report_additional_image/${img._id}/image/${img.image}`,
          });
        }
      }

      return result;
    }
    return [];
  })();

  const photoGroups: PhotoGroups = {
    ALL: photos,
    EXT: photos.filter((photo) => photoGroupArray["EXT"].includes(photo.name)),
    INT: photos.filter((photo) => photoGroupArray["INT"].includes(photo.name)),
  };

  const vehicleDetails: {
    title: string;
    field: string;
    format?: (s: string) => string;
  }[] = [
    { title: "Year", field: "year" },
    { title: "Make", field: "make" },
    { title: "Model", field: "model" },
    { title: "Trim Name", field: "trim" },
    { title: "Body Style", field: "body_type_cd" },
    {
      title: "VIN",
      field: "vin",
      format: (s) => (s ? s.toUpperCase() : "N/A"),
    },
    { title: "Exterior Color", field: "exterior_color" },
    { title: "Interior Color", field: "interior_color" },
    { title: "Transmission Type", field: "transmission_cd" },
    { title: "Transmission Detail", field: "transmission_detail" },
    { title: "Drivetrain", field: "drivetrain_cd" },
    { title: "Condition", field: "condition_cd" },
    { title: "Aftermarket Parts", field: "after_market_parts" },
    { title: "Mileage", field: "mileage", format: (s) => mileage(parseInt(s)) },
    { title: "Fuel Type", field: "fuel_type_cd" },
    { title: "Engine Cylinders", field: "engine_cylinder" },
    { title: "Engine Detail", field: "engine_detail" },
  ];

  const currentBid = getMaxOffer(opportunity ? opportunity.offers : []);

  return isLoading ? (
    <div className="flex w-full h-full">
      <div className="m-auto">
        <PleaseWait />
      </div>
    </div>
  ) : (
    <div className="w-full">
      {/* Grid */}
      <div
        className={`md:grid container mx-auto ${
          opportunity &&
          auth?.user.bidder_status &&
          auth.user.type === "DealerBuyer"
            ? "lg:grid-cols-[2fr_1fr]"
            : "lg:grid-cols-1"
        }  lg:gap-5`}>
        <div
          className={`overflow-hidden flex flex-col  ${
            isFullScreen && "fixed top-0 left-0 h-screen w-screen z-10"
          }`}>
          {!inPopup && opportunity && !isFullScreen && (
            <h1 className="flex font-bold text-xl md:text-2xl md:pt-2 md:pb-2">
              <OpportunityTitle opportunity={opportunity} />
            </h1>
          )}
          {photos.length > 0 && (
            <ImageSlider
              isfullScreen={isFullScreen}
              setIsFullScreen={setIsFullScreen}
              photoGroups={photoGroups}
              images={photos}
            />
          )}
        </div>
        {opportunity &&
          auth?.user.bidder_status &&
          auth.user.type === "DealerBuyer" && (
            <BidForm
              opportunity={opportunity}
              currentBid={currentBid}
              onBidCreated={load}
            />
          )}
      </div>

      {auth && auth.user.type !== "DealerBuyer" && opportunity && (
        <div className="my-4">
          <ShortLinkShare
            type="opportunity"
            data={{
              id: opportunity._id,
            }}
            opportunity={opportunity}
          />
        </div>
      )}

      {!auth && (
        <div className="flex p-3 justify-center">
          <SUButton size="lg" onClick={() => navigate("/auth/signin")}>
            Place a bid
          </SUButton>
        </div>
      )}

      <div
        className={`rounded drop-shadow-sm bg-white ${
          auth && auth.user.type !== "DealerBuyer" ? "lg:mt-0" : "lg:mt-10"
        } `}>
        <Tabs value="details">
          <TabsHeader>
            <Tab value="details">Vehicle Details</Tab>
            {opportunity?.condition_reports &&
              opportunity.condition_reports.length > 0 && (
                <Tab value="condition_report">Condition Report</Tab>
              )}
            {offersHistory && offersHistory.length > 0 && (
              <Tab value="bidding_history">Bidding History</Tab>
            )}
          </TabsHeader>
          <TabsBody>
            <TabPanel value="details">
              <table className="w-full">
                <tbody>
                  {vehicleDetails.map((d, index) => (
                    <tr className="odd:bg-gray-100" key={index}>
                      <td className="font-bold p-2">{d.title}:</td>
                      <td className="p-2">
                        {d.format
                          ? d.format((opportunity?.vehicle_id as any)[d.field])
                          : capitalize(
                              (opportunity?.vehicle_id as any)[d.field]
                            ) || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabPanel>

            <TabPanel value="condition_report">
              <div className="mb-2">
                {opportunity?.light.map((l) => (
                  <div
                    className="rounded inline text-white p-2 mr-2"
                    style={{ backgroundColor: lightCSSColor(l) }}
                    key={l}>
                    {capitalize(l)}
                  </div>
                ))}
              </div>
              {opportunity?.condition_reports &&
                opportunity.condition_reports.length > 0 && (
                  <ConditionReport cr={opportunity?.condition_reports[0]} />
                )}
            </TabPanel>

            <TabPanel value="bidding_history">
              {offersHistory && (
                <BiddingHistory offersHistory={offersHistory} />
              )}
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
}
