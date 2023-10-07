import { XIcon } from "@heroicons/react/outline";
import { ShareIcon } from "@heroicons/react/solid";
import { useState } from "react";
import SUButton from "../../../components/SUButton";
import SUCopyTextButton from "../../../components/SUCopyTextButton";
import SUInputEx from "../../../components/SUInputEx";
import SUSelect from "../../../components/SUSelect";
import { put } from "../../../services/api/endpoints/shortLink";
import IMongoDocument from "../../../services/api/interfaces/IMongoDocument";
import IOpportunity from "../../../services/api/interfaces/IOpportunity";
import { createSlug } from "../../../services/misc";
import isEmpty from "../../../services/validators/isEmpty";

interface IShortLinkShareProps {
  type: "opportunity";
  data: object;
  opportunity: IOpportunity & IMongoDocument;
}

export default function ShortLinkShare({
  type,
  data,
  opportunity,
}: IShortLinkShareProps) {
  const [showForm, setShowForm] = useState(false);
  const [expireDays, setExpireDays] = useState("2");
  const [generatedLink, setGeneratedLink] = useState("");
  const [isLoading, setLoading] = useState(false);

  async function generateLink() {
    setLoading(true);

    const expires = new Date();

    expires.setDate(expires.getDate() + parseInt(expireDays));

    const result = await put({ type, data, expires });

    setGeneratedLink(
      `${process.env["REACT_APP_HOST"]}/share/${result.short_id}`
    );

    setLoading(false);
  }

  const permanentLink = `${process.env["REACT_APP_HOST"]}/inventory/${
    opportunity._id
  }/${createSlug(opportunity)}?access_key=${opportunity.access_key}`;

  return (
    <>
      {showForm ? (
        <div className="flex justify-center">
          <div className="flex flex-col w-full md:w-[600px] gap-4 p-2 rounded bg-white drop-shadow">
            <div className="flex w-full justify-between">
              <h2 className="font-bold text-xl">Share anonymous link</h2>
              <button onClick={() => setShowForm(false)}>
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            <hr />
            {opportunity.access_key && (
              <>
                <div className="flex">
                  <SUInputEx
                    label="Permanent anonymous link:"
                    value={`${permanentLink}`}
                    readonly
                  />
                  <SUCopyTextButton text={permanentLink} disabled={isLoading} />
                </div>
                <hr />
              </>
            )}
            <h3 className="font-bold">Generate temporary link:</h3>
            <SUSelect
              value={expireDays}
              onChange={(val) => setExpireDays(val)}
              label="Expires in:"
              disabled={isLoading}>
              <option value="1">1 day</option>
              <option value="2">2 days</option>
              <option value="7">1 week</option>
              <option value="30">30 days</option>
            </SUSelect>

            <div className="flex gap-1">
              <SUInputEx
                value={generatedLink}
                label="The link will be generated here"
                onClick={(e) => e.currentTarget.select()}
                readonly
                disabled={isLoading}
              />

              <SUCopyTextButton
                text={generatedLink}
                disabled={isEmpty(generatedLink) || isLoading}
              />
            </div>

            <SUButton
              loading={isLoading}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                generateLink();
              }}>
              Generate
            </SUButton>
          </div>
        </div>
      ) : (
        <div className="flex justify-center w-full ">
          <SUButton onClick={() => setShowForm(true)}>
            <div className="flex gap-1">
              <ShareIcon className="w-4 h-4" />
              Share anonymous link
            </div>
          </SUButton>
        </div>
      )}
    </>
  );
}
