import { Typography } from "@material-tailwind/react";

export default function ArbitrationPolicy() {
  return (
    <div
        className="flex w-full text-start justify-center flex-col xl:px-80"
        style={{ background: "white" }}
      >
        <div className="py-7">
          <Typography variant="h5" className="" gutterBottom>
            General Policies
          </Typography>
        </div>
        <div className="pl-7">
          <ol>
            <li>
              <Typography
                variant="subtitle1"
                style={{ display: "inline" }}
                className="heading"
                gutterBottom
              >
                Fair and Ethical Sale:
              </Typography>
              <Typography className="ml-7" variant="body1" gutterBottom>
                The sales made at an Auction are intended to promote fair and
                ethical treatment to both the Buyer and Seller. If Auction
                determines that the transaction is not fair and ethical to
                either party, the Seller and the Buyer agree that Auction may
                cancel the sale, at its sole discretion. Federal, State, and
                Local laws supersede these policies where applicable.
              </Typography>
            </li>
            <li
            //  className={classes.listItem}
            >
              <Typography
                variant="subtitle1"
                style={{ display: "inline" }}
                className="heading"
                gutterBottom
              >
                StockUp Role in Sale:
              </Typography>
              <Typography variant="body1" gutterBottom>
                All vehicles bought or sold on StockUp must be processed through
                the StockUp office. Failure to do so will result in suspension
                of buying privileges.
              </Typography>
            </li>
            <li
            // className={classes.listItem}
            >
              <Typography
                variant="subtitle1"
                style={{ display: "inline" }}
                className="heading"
                gutterBottom
              >
                Inspection Protocol:
              </Typography>
              <Typography variant="body1" gutterBottom>
                StockUp will complete a visual inspection of each vehicle, where
                applicable, prior to being placed on the site for auction.
                Special notes will accompany any Condition Report where there is
                not a StockUp completed visual inspection. Inspected vehicles
                will not be placed on a lift and therefore some items may not be
                included in the Condition Report.
              </Typography>
              <ol>
                <li id="subtitle1">
                  <Typography
                    style={{ display: "inline" }}
                    className="heading"
                    gutterBottom
                  >
                    Visual Pre-Auction Inspections:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    StockUp will be responsible for announcing vehicle parts
                    that are not functioning properly that would be easily
                    identifiable when operating or looking at the vehicle. This
                    includes:
                  </Typography>
                  <ol id="subtitle1">
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Not starting, driving, or shifting as expected.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Illuminated dashboard lights.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Leaks visible without putting the vehicle on a lift.
                      </Typography>
                      <ol>
                        <li>
                          <Typography variant="body1" gutterBottom>
                            StockUp will not cover Class 1 leaks (leaks that
                            have not developed a drip and are limited to minor
                            seepage).
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="body1" gutterBottom>
                            No leaks will be covered on a vehicle exceeding 10
                            years of age or 100,000 miles, whichever comes
                            first, even if the vehicle is listed as a green
                            light.
                          </Typography>
                        </li>
                      </ol>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Exterior or interior panel or parts damage.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Major components like battery, doors, trunk, sunroof,
                        that are inoperable or malfunctioning, or missing
                        pieces.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Sounds or vibrations when driving the vehicle at 40mph.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Malfunctioning electronic equipment, excluding stereo
                        and bluetooth.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        The visual inspection cannot always catch, due to
                        accessibility of some parts, the following:
                      </Typography>
                      <ol>
                        <li>
                          <Typography variant="body1" gutterBottom>
                            Brakes that function properly on test drive but are
                            low and cannot be visualized due to hubcaps or other
                            obstructions.
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="body1" gutterBottom>
                            Bent rims.
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="body1" gutterBottom>
                            Windshield wiper blades, filters, fluids, or other
                            wearable items.
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="body1" gutterBottom>
                            See Section 6 for more details.
                          </Typography>
                        </li>
                      </ol>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Buyer Responsibilities for interpreting visual
                        inspection results:
                      </Typography>
                      <ol>
                        <li>
                          <Typography variant="body1" gutterBottom>
                            Assume that if no photo of tire tread or OBD scan is
                            present that it was not checked and should proceed
                            with caution.
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="body1" gutterBottom>
                            Request that these items be checked, and that bid is
                            contingent upon outcomes of these checks
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="body1" gutterBottom>
                            Assume that not all dents, dings, scratches, or
                            missing pieces are photographed, but that these
                            items will be checked off on the Condition Report if
                            they are present.
                          </Typography>
                        </li>
                      </ol>
                    </li>
                  </ol>
                </li>
                <li>
                  <Typography
                    variant="subtitle1"
                    style={{ display: "inline" }}
                    className="heading"
                    gutterBottom
                  >
                    Post-Sale Inspection:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Buyer can purchase a Post-Sale Inspection when placing a
                    bid, or can set up their account to automatically purchase
                    one with each bid.
                  </Typography>
                  <ol>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        PSI will be completed at or just before picking up the
                        vehicle from the seller so that we are able to unwind
                        and not purchase if the inspection uncovers some
                        unforeseen issue.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        PSI is a non-refundable charge and is designed to ensure
                        full disclosure of any reconditioning or repair work a
                        vehicle will need upon purchase.
                      </Typography>
                    </li>
                  </ol>
                </li>
              </ol>
            </li>
            <li>
              <Typography
                variant="subtitle1"
                style={{ display: "inline" }}
                className="heading"
                gutterBottom
              >
                Auction VIN Policies
              </Typography>

              <ol>
                <li>
                  <Typography variant="body1" gutterBottom>
                    All vehicles consigned must have a visible public Vehicle
                    Identification Number (VIN) plate attached to the vehicle by
                    the manufacturer or state inspector (state-reassigned VIN
                    only). Those vehicles having a reassigned VIN plate by the
                    State in place of the original VIN plate must be announced
                    or will be subject to sale cancellation or Buyer return.
                  </Typography>
                </li>
              </ol>
            </li>
          </ol>
        </div>

        <div>
          <Typography variant="h5" className="heading" gutterBottom>
            Sale Light System:
          </Typography>
        </div>
        <Typography
          variant="subtitle1"
          style={{ display: "inline" }}
          className="heading"
          gutterBottom
         />
        <div>
          <Typography variant="body1" textTransform="none" gutterBottom>
            Auction has a standard light system to describe the condition and/or
            disclosures related to the vehicle being sold. The system is defined
            as:
            <ol>
              <li>
                <Typography
                  variant="subtitle1"
                  style={{ display: "inline" }}
                  className="heading"
                  gutterBottom
                >
                  Green Light:
                </Typography>
                The green light signals that this vehicle is guaranteed under
                the conditions outlined in this policy by the seller.
              </li>
              <li>
                <Typography
                  variant="subtitle1"
                  style={{ display: "inline" }}
                  className="heading"
                  gutterBottom
                >
                  Yellow Light:
                </Typography>
                This light is an indication to the Buyer that there are
                announcements that qualify/clarify the condition or equipment
                and limit arbitration of this vehicle. Any defects or issues
                requiring disclosure per this policy should be announced using
                the appropriate light.
              </li>
              <li>
                <Typography
                  variant="subtitle1"
                  style={{ display: "inline" }}
                  className="heading"
                  gutterBottom
                >
                  {" "}
                  Red Light:
                </Typography>
                Vehicles selling under the red light do not qualify for
                arbitration and are sold as-is.
              </li>
              <li>
                <Typography
                  variant="subtitle1"
                  style={{ display: "inline" }}
                  className="heading"
                  gutterBottom
                >
                  Blue Light:
                </Typography>
                This light is used to announce that the title is not present at
                the time of the sale. For Auction rules regarding titles please
                refer to the Title Arbitration Policy section. If “title
                attached/unavailable/absent” is not announced, a vehicle could
                be arbitrated for no title.
              </li>
            </ol>
          </Typography>
        </div>

        <div>
          <Typography variant="h5" className="heading" gutterBottom>
            Roles and Responsibilities
          </Typography>
        </div>
        <div>
          <ol>
            <li>
              <Typography
                variant="subtitle1"
                style={{ display: "inline" }}
                className="heading"
                gutterBottom
              >
                {" "}
                StockUp Responsibilities:
              </Typography>
              <ol>
                <li>
                  <Typography variant="body1" gutterBottom>
                    StockUp is responsible for the accuracy and completeness of
                    all representations or descriptions. This includes condition
                    information or vehicle listings and verbal or written
                    statements made at the time of sale. This includes the
                    condition report written by or on behalf of the seller as
                    per the “NAAA Generic Condition Report Position Statement”.
                    StockUp agrees that the sale light is a binding arbitration
                    representation of vehicle condition, and is therefore
                    responsible for ensuring that their vehicles sell under the
                    correct light.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Mileage announcements are not required for vehicles that are
                    10 years or older and/or deemed exempt from Odometer and
                    Title disclosure laws unless a mileage discrepancy is known
                    or apparent to the seller. StockUp may represent miles on
                    exempt vehicles; any disclosures made by the Seller and all
                    known odometer discrepancies are grounds for arbitration.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Title discrepancies must be announced including, but not
                    limited to: not actual miles, salvage, theft recovery,
                    stolen vehicle, flood damage, Lemon Law buybacks, and trade
                    assist.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    If a vehicle is being offered for sale by a third party, an
                    announcement of “3rd Party Seller” is required.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Announcements are required for any matters that relate to
                    the safety or integrity of the vehicle including as per the
                    stated dollar threshold and disclosure requirements stated
                    in this policy, all requirements under local, state, or
                    federal statutes or regulations. Announcements must be
                    disclosed on the auction invoice/sale contract/bill of sale
                    or equivalent document in a physical or online auction
                    environment.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    The availability of a manufacturer’s warranty shall not
                    affect a Buyer’s right to arbitrate a vehicle. Regardless of
                    the warranty coverage in terms of the root cause of the
                    complaint, an announcement may be required.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    In the event of a successful arbitration by the Buyer,
                    StockUp is responsible for reimbursement of all reasonable
                    documented expenses incurred by the Buyer (excluding profit,
                    commissions, and detail charges) on vehicles arbitrated for
                    undisclosed conditions. Reimbursements that qualify under
                    these guidelines will be at the sole discretion of StockUp
                    and will be limited to the reasonable and documented
                    expenses at auction (wholesale) repair cost.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    StockUp will not be paid for vehicles in arbitration until
                    arbitration is settled and vehicles are sold. For
                    arbitrations occurring after StockUp has been paid, StockUp
                    is required to promptly return the payment to the Buyer if
                    the transaction is voided as a result of arbitration.
                  </Typography>
                </li>
              </ol>
            </li>
            <li>
              <Typography
                variant="subtitle1"
                style={{ display: "inline" }}
                className="heading"
                gutterBottom
              >
                {" "}
                Buyer Responsibilities:
              </Typography>
              <ol>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Prior to placing bids, the Buyer is responsible for
                    thoroughly reviewing the condition report and accompanying
                    photos, and reviewing any written announcements and
                    disclosures made by StockUp. Buyer is also responsible for
                    reviewing all pertinent information available online,
                    including, but not limited to, announcements, disclosures,
                    condition reports, pictures, and online listings. Buyers are
                    also responsible for observing and understanding the sale
                    lights (Green, Yellow, Red, and/or Blue), which identify
                    various sale conditions for the vehicle. Once the vehicle is
                    sold, the Buyer must review the StockUp invoice or
                    appropriate document to confirm that vehicle price,
                    disclosures, and announcements are correct before legibly
                    printing and signing their name on the StockUp Wholesale
                    Agreement.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    It is strongly encouraged that a Buyer should have a Post
                    Sale Inspection (PSI), warranty, or assurance product on
                    vehicles purchased.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Buyer is financially responsible for any pending sale and
                    assumes all risk of loss until arbitration is final.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Buyer shall not surrender possession of the vehicle to any
                    claimant, except as required by legal process, nor shall
                    Buyer voluntarily pay or acknowledge the validity of any
                    claim, without the prior approval of StockUp. Time is of the
                    essence. Any failure on the part of the Buyer, after
                    becoming aware of said claim, to notify StockUp of any claim
                    in a timely manner or failure of the Buyer to cooperate in
                    defending any such claim shall relieve StockUp of any
                    liability under this policy.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    A vehicle is not considered returned until received,
                    inspected, and approved for return by StockUp management.
                    Any vehicle returned must be in the same or better condition
                    as when sold to Buyer. Any vehicles delivered to and left on
                    StockUp premises without StockUp approval remain the sole
                    responsibility of the Buyer. Buyer assumes all risk of loss.
                    Vehicle must be returned in a timely manner consistent with
                    StockUp direction.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Vehicles that have accrued more than 250 miles since
                    purchased by Buyer from StockUp are not eligible for
                    arbitration.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    StockUp shall not be liable for any vehicle sale or repairs
                    made by the Buyer before the title is received by the Buyer.
                  </Typography>
                </li>
              </ol>
            </li>
          </ol>
        </div>

        <div>
          <Typography variant="h5" className="heading" gutterBottom>
            Title Arbitration Policy:
          </Typography>
        </div>
        <div>
          <ol>
            <li>
              <Typography variant="body1" gutterBottom>
                All titles submitted by StockUp must have StockUp’s name on
                title or on a properly executed reassignment form. StockUp
                guarantees the titles of vehicles that are sold through the
                StockUp site. This guarantee of the title warrants that the
                title shall be marketable and free and clear of all liens and
                encumbrances. This includes any brand (such as “salvage”) noted
                upon the current or any prior certificate of title unless such
                encumbrances were announced at the time the vehicle was sold
                through StockUp and for a period of four (4) years from the date
                of sale. StockUp’s liability under this title guarantee shall
                never exceed the sale price (the “maximum amount”) of the
                vehicle, and this maximum amount shall be reduced by two percent
                (2%) per month following sale date. All liability under this
                title guarantee shall expire and terminate four (4) years after
                sale date. StockUp will not be responsible for any expenses
                incurred on vehicles returned for late title.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                StockUp warrants, represents, and guarantees possession and
                conveyance of a certificate of title, properly executed, valid
                in the state where the transaction is occurring and clear of all
                liens and encumbrances (except current year DMV fees in
                California), and StockUp warrants and will defend the title
                against the claims and demands of all persons whatsoever
              </Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                StockUp will ensure that the title will be reassigned directly
                to Buyer.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                StockUp will not be paid for vehicles until a transferable title
                is received or payoff paperwork has been received.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                StockUp must announce that the vehicle is being sold with a bill
                of sale only and that there is no title to transfer. All
                non-titled vehicles and equipment will be sold “As-Is.”
              </Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                If the title problem is due to a clerical or coding error, or
                incomplete documentation, StockUp shall be given reasonable time
                after receiving notice to have the error corrected.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                Applications or other documents related to a duplicate title
                will not be accepted, unless announced as such or if allowed by
                the appropriate jurisdiction.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                Where legal by municipal and/or state law, any vehicle being
                offered for sale with a foreign (non-US) title, must be
                disclosed prior to the sale by StockUp. Vehicle must be legal to
                sell in the United States.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                Vehicles lacking a properly assigned title or reassignment to
                transfer a title at time of sale must sell “Title Attached/Title
                Unavailable/Title Absent,” with the Blue light on.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                Vehicles lacking lien release or a valid repo affidavit for a
                repossessed vehicle (where allowed by law) must be sold “Title
                Attached/Title Unavailable/Title Absent,” with the Blue light
                on.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                Whenever any claim is made by any person against the title of a
                vehicle, whether by suit or otherwise, the Buyer, after becoming
                aware of said claim, shall immediately notify StockUp. This
                involves giving full particulars of claim, cooperating fully in
                defending any legal action, and in taking other steps to
                minimize possible loss.
              </Typography>
            </li>
          </ol>
        </div>

        <div>
          <Typography variant="h5" className="heading" gutterBottom>
            5. Previous Canadian and/or Grey Market Vehicles:
          </Typography>
        </div>
        <div>
          <ol>
            <li>
              <Typography variant="body1" gutterBottom>
                A “Previous Canadian” disclosure is required for any vehicle
                (regardless of manufacturing origin) having been registered in a
                Canadian province. Additional announcements may be required as
                well due to the use in Canada (i.e., full or partial voided
                warranty, foreign title, and etc.)
              </Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                Any vehicle not originally built to U.S. specifications can,
                under certain circumstances, be imported through a registered
                importer who modifies the vehicle to comply with U.S. equipment
                and safety regulations (DOT and NHTSA) and then certifies it as
                compliant, and an independent commercial importer who modifies
                the vehicle to comply with U.S. emissions regulations and then
                certifies it as compliant. Only vehicles properly converted to
                U.S. specifications can be sold and must be announced as such.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                Required Conversion
              </Typography>
              <ol>
                <Typography variant="body1" gutterBottom>
                  All other vehicles imported must be imported through a
                  Registered Importer. Registered Importers are required to post
                  a bond with the U.S. Department of Transportation and/or
                  National Highway Transportation Safety Administration. All
                  vehicles imported through a Registered Importer must have:
                </Typography>
                <li>
                  <ol>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        U.S. Safety Standard Certification Label that identifies
                        the Registered Importer
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        {" "}
                        Valid U.S. Title or Legal Foreign Title
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Meet ALL Federal NHTSA, D.O.T., and/or E.P.A. Mandated
                        Guidelines
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        {" "}
                        Documentation must be provided by Seller
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        {" "}
                        Cleared the mandated wait time.
                      </Typography>
                    </li>
                  </ol>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    All vehicles, whether imported by a Manufacturer or a
                    Registered Importer, must show miles per hour on the
                    speedometer and miles traveled on the odometer. Title 49,
                    United States Code, Chapter 327, Section 32704, allows
                    replacement odometers without a door frame sticker if the
                    conversion from kilometers to miles can be done without
                    changing the distance traveled by the vehicle; therefore,
                    replacement of an odometer under these circumstances does
                    not have to be announced by the Seller.
                  </Typography>
                </li>
              </ol>
            </li>
          </ol>
        </div>

        <div>
          <Typography variant="h5" className="heading" gutterBottom>
            Arbitration Guidelines:
          </Typography>
          <Typography variant="body1" gutterBottom>
            StockUp or announced at the time of sale must be reported to StockUp
            within five (5) days in order to be eligible for arbitration.
            Vehicles must be returned to StockUp in the same or better condition
            than when purchased with no more than 250 miles.
          </Typography>
        </div>

        <div>
          <ol>
            <li>
              <Typography
                variant="subtitle1"
                style={{ display: "inline" }}
                className="heading"
                gutterBottom
              >
                Time Period:
              </Typography>
              <Typography variant="body1" gutterBottom>
                Sale day is Day 1. Arbitration eligibility shall end at the
                close of business on Day 5.
              </Typography>
            </li>
            <li>
              <Typography
                variant="subtitle1"
                style={{ display: "inline" }}
                className="heading"
                gutterBottom
              >
                Process:
              </Typography>
              <Typography variant="body1" gutterBottom>
                Any single mechanical defect that has a repair cost of $1,000 or
                more is subject to arbitration on vehicles sold under qualifying
                lights and lack of announcement by StockUp. Each vehicle
                transaction is allowed one chance at arbitration. The arbitrator
                will inspect only the defect that is on the initial arbitration
                claim. Repair costs will be determined by StockUp and will
                reflect the auction cost to repair. If price adjustment is made
                and accepted, the vehicle becomes “As-Is, No Arbitration”
                property of the Buyer, and is not subject to any further
                arbitration. StockUp management makes the binding decision on
                all arbitration matters. To get approval, send in the concern
                using the form at the bottom of this page, the cause, and the
                proposed solution to the issue including labor times and part
                numbers. This includes any service information pertaining to the
                issue. StockUp may ask for more information and may send out an
                inspector to verify. If work is done before the arbitration
                request is approved by StockUp this may result in a denied
                claim.
              </Typography>
              <ol>
                <li>
                  <Typography
                    variant="subtitle1"
                    style={{ display: "inline" }}
                    className="heading"
                    gutterBottom
                  >
                    If a PSI was not purchased:
                  </Typography>
                  <ol>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        $1,000 deductible. StockUp will only cover eligible
                        repair costs above $1,000 (i.e. if the repair cost for
                        eligible repairs is $1,200, StockUp will pay $200).
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Only Class 3 leaks (dripping leaks making it to the
                        ground) will be covered without a PSI. Although we do
                        our best to ensure accuracy in disclosing leaks without
                        a thorough inspection underneath the vehicle, Class 2
                        leaks are nearly impossible to see.
                      </Typography>
                    </li>
                  </ol>
                </li>
                <li>
                  <Typography
                    variant="subtitle1"
                    style={{ display: "inline" }}
                    className="heading"
                    gutterBottom
                  >
                    If a PSI was purchased:
                  </Typography>
                  <ol>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        {" "}
                        No minimum/deductible on repairs
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Arbitration will still go through the same process and
                        require the same information.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Both Class 2 and Class 3 leaks will be covered (any
                        dripping leaks).
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        After performing the PSI, you will be contacted if
                        anything is found that was not present or visible during
                        the initial inspection to verify your bid before the
                        vehicle is purchased and delivered.
                      </Typography>
                    </li>
                  </ol>
                </li>
                <li>
                  <Typography
                    variant="subtitle1"
                    style={{ display: "inline" }}
                    className="heading"
                    gutterBottom
                  >
                    Fees:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    There will be no fee to arbitrate, but coverage will vary
                    depending on whether or not a PSI was purchased with the
                    vehicle (see above).
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="subtitle1"
                    style={{ display: "inline" }}
                    className="heading"
                    gutterBottom
                  >
                    Not subject to arbitration:
                  </Typography>
                  <ol>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Vehicles purchased for less than $5,000 and/or with
                        greater than 125,000 miles, and/or vehicles exceeding 20
                        model years.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Kit vehicles, homemade vehicles, or modified vehicles
                        are sold “AsIs” and cannot be arbitrated for odometer,
                        structural issues, warranty books, or model year.
                      </Typography>
                    </li>
                    <li>
                      <Typography
                        variant="subtitle1"
                        style={{ display: "inline" }}
                        className="heading"
                        gutterBottom
                      >
                        Inherent Conditions:
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        No arbitration can be based on conditions that are
                        inherent or typical to a particular model or
                        manufacturer. Manufacturer warranty guidelines will be
                        used where applicable to determine whether the condition
                        is inherent. Additional resources can be found on NAAA’s
                        Standards page at www.NAAA.com.
                      </Typography>
                    </li>
                    <li>
                      <Typography
                        variant="subtitle1"
                        style={{ display: "inline" }}
                        className="heading"
                        gutterBottom
                      >
                        Manual Transmissions:
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Vehicles with standard (full or partial shift)
                        transmissions cannot be arbitrated for manual clutch
                        assemblies unless the defect will not allow a safe test
                        drive.
                      </Typography>
                      <ol>
                        <li>
                          <Typography variant="body1" gutterBottom>
                            Dual clutch transmission clutches are also not
                            covered as they are a wearable and inherent issue in
                            those types of vehicles.
                          </Typography>
                        </li>
                      </ol>
                    </li>
                    <li>
                      <Typography
                        variant="subtitle1"
                        style={{ display: "inline" }}
                        className="heading"
                        gutterBottom
                      >
                        Wearable Items:
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Auction will not arbitrate vehicles for wearable items
                        normally worn vs. excessively worn or inoperative (not
                        inherent). For purposes of this policy, wearable items
                        are defined as parts of the vehicle that the
                        manufacturer recognizes the need for
                        replacement/adjustment during the expected life of the
                        vehicle driven the average miles per model year (15K).
                        These items are normally identified in the Owner’s
                        Manual for routine check and replacement and would
                        include, but are not limited to, air ride suspensions,
                        tires, wipers, brake pads, shoes, rotors, belts, hoses,
                        lubricants/fluids, timing belts, bulbs, filters, shocks,
                        and struts.
                      </Typography>
                      <ol>
                        <li>
                          <Typography variant="body1" gutterBottom>
                            Tires are eligible for arbitration regardless of the
                            cost, if the lowest measurement is not within 1/32nd
                            of the measurements stated and/or pictured.
                            Additionally tires only qualify if the lowest
                            measurement is below 4/32nd.
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="body1" gutterBottom>
                            Recommended Maintenance will also not be covered
                            whether it is due or overdue. This includes any
                            normal or scheduled maintenance on the parts and
                            services that all vehicles routinely need. This
                            includes lubrication, engine tune-ups, replacing
                            filters of any kind, coolant, shocks/struts, spark
                            plugs, bulbs or fuses (unless those costs result
                            from a covered repair), and cleaning and polishing.
                          </Typography>
                        </li>
                      </ol>
                    </li>
                    <li>
                      <Typography
                        variant="subtitle1"
                        style={{ display: "inline" }}
                        className="heading"
                        gutterBottom
                      >
                        Aftermarket Modifications:
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Aftermarket modifications and/or failures caused by them
                        will not be covered.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Vehicles may not be arbitrated based solely upon
                        information provided in Electronic Data Vehicle
                        Histories (EDVH) or printed EDVH reports. StockUp is not
                        bound by information listed in EDVH. Buyer is
                        responsible for conducting due diligence in researching
                        this or similar type of information prior to sale.
                        Examples of EDVH include Carfax, AutoCheck, NMVTIS, etc.
                        StockUp may investigate vehicle history based on
                        information found in EDVH for information that may
                        impact arbitration.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        StockUp is not bound by vehicle grades or other types of
                        scoring systems placed upon the vehicle. Buyers may only
                        arbitrate a vehicle based upon damage or defects that
                        were present at the time of the sale of the vehicle.
                        Buyers may not arbitrate against items stated or implied
                        in the condition report, or discovered issues that align
                        with statements made in the condition report. e.g.,
                      </Typography>
                      <ol>
                        <li>
                          <Typography variant="body1" gutterBottom>
                            If vibration or rattling is stated, may not
                            arbitrate the cause of the sound.
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="body1" gutterBottom>
                            If an OBD scan is not present, may not arbitrate
                            against cleared codes. Buyer may request that one be
                            performed or that their bid is contingent upon a
                            clear OBD scan.
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="body1" gutterBottom>
                            May not arbitrate against dents or dings not
                            pictured if Condition Rating and statements made in
                            the Condition Report are indicative of dents and
                            dings
                          </Typography>
                        </li>
                      </ol>
                    </li>
                  </ol>
                </li>
              </ol>
            </li>
          </ol>
        </div>

        <div>
          <Typography variant="h5" className="heading" gutterBottom>
            Structural Damage, Alteration, or Certified Structural Repair or
            Replacement Policy:
          </Typography>
          <Typography variant="body1" gutterBottom>
            The purpose of the Structural Damage Policy is to define and clarify
            terminology associated with structural issues and to specify the
            disclosure requirements. The policy is intended to provide adequate
            disclosure to the Buyer for informed purchase decisions and to limit
            arbitrations for the Seller. This policy, along with the main
            Arbitration Policy, will serve as the primary criteria for all
            arbitration proceedings.
          </Typography>
        </div>
        <div>
          <ol>
            <li>
              <Typography variant="body1" gutterBottom>
                Definitions
              </Typography>
              <ol>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Vehicle Structure - The main load-bearing platform of a
                    vehicle that gives strength, stability, and design
                    exclusivity, and to which all other components of the
                    vehicle are fastened. For purposes of this policy, there are
                    three macro types:
                  </Typography>
                  <ol>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Unibody - A type of structure whereby the floor pan
                        assembly, roof bows/braces, pillars, etc., are bonded
                        together into one unit, thereby eliminating the need for
                        a separate conventional structure
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Unibody on Frame - A type of structure whereby a
                        unitized structure is bolted to a conventional structure
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Conventional Structure - A type of structure consisting
                        of two symmetrical rails (beams) connected by various
                        crossmembers
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        UVMS - Used Vehicle Measurement Standard. The
                        commercially acceptable measurement deviation from the
                        vehicle’s original structural specification in order for
                        any deviation not to be considered structural damage.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Permanent Damage (aka “Kinked” or “Broken”) - The result
                        of two or more objects striking or coming together at a
                        significant change in velocity that permanently deforms
                        the structural component(s) rendering it non-repairable
                        per the manufacturer.
                      </Typography>
                    </li>
                  </ol>
                </li>
              </ol>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                Recommended Disclosures
              </Typography>
              <ol>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Structural Damage - Damage to the structure or a specific
                    structural component of the vehicle. Often referred to as
                    frame damage, although it also applies to Unibody and
                    Unibody on Frame structures in addition to Conventional
                    Frame.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Certified Structural Repairs/Replacement - Repairs to a
                    specifically identified structural component of a vehicle
                    that has been certified to be within the Used Vehicle
                    Measurement Standard (UVMS).
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Structural Alteration - An alteration to the vehicle’s
                    structure, including a lengthened or shortened frame, a
                    modified suspension, or the installation or removal of
                    after-market accessories.
                  </Typography>
                </li>
              </ol>
            </li>
            <li>
              <Typography
                variant="subtitle1"
                style={{ display: "inline" }}
                className="heading"
                gutterBottom
              >
                {" "}
                Disclosure Requirements:
              </Typography>
              <Typography variant="body1" gutterBottom>
                StockUp must disclose permanent structural damage, any
                structural alterations, structural repairs, or replacements
                (certified or non-certified) as outlined in this policy prior to
                selling a vehicle, regardless of sale light. Disclosures are
                required for the following:
              </Typography>
              <ol>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Any/all existing permanent (non-repairable aka kinked or
                    broken) structural damage as defined in this policy
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Improper and/or substandard prior repairs (not meeting OEM
                    repair guidelines)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    {" "}
                    Repairs not certified using OEM guidelines
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Repairs not certified to be within the UVMS Improper
                    alterations to the structure
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Lengthened or Shortened structure verified by visual
                    inspection.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Altered suspension that requires the structure to be
                    modified from its OEM form
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    After-market accessories installed or removed to the
                    structure
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Towing packages installed (or removed) where new holes are
                    drilled, OEM holes are enlarged, or if the towing package is
                    welded or brazed to the structure
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Multiple access holes (regardless of size) or singular
                    access holes greater than 5/8". Access holes between 1/4"
                    and 5/8" are subject to disclosure based upon location and
                    condition of structural component
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Corrosion of structural components determined by one or more
                    of the following: when the substrate loses its shape, the
                    original bonds near the affected area are loose or are no
                    longer in existence, the original thickness of the substrate
                    has been changed by more than 25%, the affected area no
                    longer possesses its absorption or deflection properties
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Structural tear damage (e.g., transport tie-down) if more
                    than 1" in length (measured from tear start/stop points)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Damage due to improper jacking or lifting that permanently
                    deforms structural components outlined in this policy
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Damage due to contact with parking abutments and/or road
                    debris that permanently deforms structural components
                    outlined in this policy
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    .Roof bows/braces that have been modified, have existing
                    permanent damage, or have been removed. A replaced roof skin
                    is not a required disclosure in terms of the Structural
                    Damage Policy.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    The C-pillar/quarter or Cab panel may or may not be a
                    structural component(s) as per the vehicle manufacturer.
                  </Typography>
                </li>
              </ol>
            </li>
            <li>
              <Typography
                variant="subtitle1"
                style={{ display: "inline" }}
                className="heading"
                gutterBottom
              >
                Arbitration Rules for Structural Damage, Alteration, Certified
                Repairs, or Certified Replacement
              </Typography>
              <ol>
                <li>
                  <Typography variant="body1" gutterBottom>
                    A vehicle may be arbitrated if it has undisclosed existing
                    permanent damage alteration, Certified Repairs, or Certified
                    Replacement, which should have been disclosed under this
                    policy, even though the vehicle is within the UVMS. If a
                    structural issue is properly disclosed, the vehicle may only
                    be arbitrated for improper repair of the designated area,
                    existing permanent damage or repairs to other areas of the
                    vehicle not disclosed, or for failure to be within the UVMS
                    that was verified by visual inspection.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Damaged or replaced radiator core supports or rear body
                    panels do not require a structural disclosure under this
                    policy.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Damage to the aprons, rail floor pan assembly, inner
                    wheelhouse (upper or lower), D pillar (if equipped), or
                    other ancillary structural components on a unitized
                    structure in the area where the radiator core support or
                    rear body panel attaches will require a disclosure if
                    permanent damage exists.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Brazed exhaust hangers are not a required disclosure under
                    this policy.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Facilitating Auction will, at its discretion, have a vehicle
                    measured according to the UVMS at a facility of its choice.
                    Prior to sending the vehicle for measurement, the Auction
                    reserves the right to complete a visual verification of the
                    physical condition of the vehicle to determine that it
                    should be measured. If the measuring facility determines
                    that the vehicle is within the UVMS, the buyer of the
                    vehicle will be responsible for the charges paid to the
                    facility. Likewise, if the measuring facility determines
                    that the vehicle is not within the UVMS, the seller will be
                    responsible for the charges paid to the facility.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Visual evidence supersedes any/all mechanical or electronic
                    measurements.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    For measurements according to the UVMS, the following
                    guidelines will apply:
                  </Typography>
                  <ol>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        The vehicle structure must measure to a total tolerance
                        of no more than +/- 8 millimeters (mm) of published
                        specification of length, width, and height at control
                        points that capture the front (2), center (4), and rear
                        (2) sections of the vehicle.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Symmetrically (comparative measure from side to side and
                        point to point based on point measurement), the length,
                        width, and height must measure to a difference of no
                        more than 6 mm. Upper body measurements (tram gauge) by
                        themselves will not be adequate.
                      </Typography>
                    </li>
                  </ol>
                </li>
              </ol>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                Buyer must arbitrate any/all structural misrepresentations as
                outlined in this policy within published timelines (outlined in
                the main Arbitration Policy Guidelines) from date of purchase
                (purchase day counts as Day 1).
              </Typography>
              <ol>
                <li>
                  <Typography variant="body1" gutterBottom>
                    The buyer must contact and follow the StockUp arbitration
                    process including directions for returning of the vehicle
                    and the timeframe allowed for the vehicle to be returned.
                  </Typography>
                </li>
              </ol>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                In the event of improperly disclosed structural damage by
                StockUp, the Buyer will be entitled to reimbursement in
                accordance with the main Arbitration Policy.
              </Typography>
            </li>
          </ol>
        </div>

        <div>
          <Typography variant="h5" className="heading" gutterBottom>
            Flood, Damage Policy:
          </Typography>
          <Typography variant="body1" gutterBottom>
            Vehicles are frequently exposed to moisture during their ordinary
            operation, maintenance, and reconditioning. Occasionally, such
            exposure may leave residual marks or indicators similar to those
            left by exposure or immersion of the vehicle in floodwater. In
            determining what conditions require disclosure or in arbitrating
            vehicles for flood exposure/damage it is critical that the total
            condition of the vehicle be considered including VIN data history.
          </Typography>
        </div>
        <div>
          <ol>
            <li>
              <ol>
                <Typography
                  variant="subtitle1"
                  style={{ display: "inline" }}
                  className="heading"
                  gutterBottom
                >
                  Disclosure Not Required:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  No disclosure is required nor is arbitration allowed for the
                  following types of water exposure, provided that none of the
                  components outlined below are damaged:
                </Typography>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Rain, snow, or sleet due to open windows, doors, or tops or
                    leaking seals
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Car wash or rinse water
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Carpet or upholstery shampooing or cleaning
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Stream, pond, puddle, or flood water that does not rise
                    above the rocker panel or otherwise enter the passenger
                    compartment
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Stream, pond, puddle, or flood water that enters the luggage
                    compartment, but does not damage any electrical components
                    (such as lighting or wiring harness) or does not enter the
                    passenger compartment
                  </Typography>
                </li>
              </ol>
            </li>
            <li>
              <Typography
                variant="subtitle1"
                style={{ display: "inline" }}
                className="heading"
                gutterBottom
              >
                Disclosure Required:
              </Typography>
              <Typography variant="body1" gutterBottom>
                Disclosure is required and arbitration shall be allowed under
                the following conditions:
              </Typography>
              <ol>
                <li>
                  <Typography variant="body1" gutterBottom>
                    The title has been correctly branded indicating flood
                    history of the vehicle.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    Any of the following components have been damaged due to
                    stream, pond, puddle, or flood water immersion/ingress:
                  </Typography>
                  <ol>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Front or rear internal lighting or wiring harnesses
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        {" "}
                        Engine and its major components
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Transmission and differential
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Dash instrument panel and wiring
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Passenger seat cushions
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Power seat functions or window motor
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Major sound system components
                      </Typography>
                    </li>
                  </ol>
                </li>
              </ol>
            </li>
          </ol>
        </div>
    </div>
  );
}
