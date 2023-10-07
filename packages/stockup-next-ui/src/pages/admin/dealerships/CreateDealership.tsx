import { ReactNode, useEffect, useState } from "react";
import SUButton from "../../../components/SUButton";
import SUInput from "../../../components/SUInput";
import SUSelect from "../../../components/SUSelect";
import { put } from "../../../services/api/endpoints/clientLocation";
import * as gaugeLocationApi from "../../../services/api/endpoints/gaugeLocation";
import * as pendingClientLocationApi from "../../../services/api/endpoints/pendingClientLocation";
import * as userApi from "../../../services/api/endpoints/user";
import IGaugeLocation from "../../../services/api/interfaces/IGaugeLocation";
import IMongoDocument from "../../../services/api/interfaces/IMongoDocument";
import IPendingClientLocation from "../../../services/api/interfaces/IPendingClientLocation";
import IUser from "../../../services/api/interfaces/IUser";
import { get } from "../../../services/axios";
import isNotEmpty from "../../../services/validators/isNotEmpty";
import isZipCode from "../../../services/validators/isZipCode";
import usStates from "../../../us-codes.json";
import { statusColor } from "../components/StatusChip";

interface ICreateDealershipProps {
  pendingClientLocationId: string;
  onCreated: (id: string) => void;
}

function FormElementWrap(props: { children: ReactNode }) {
  return <div className="pt-2 pb-2">{props.children}</div>;
}

export default function CreateDealership({
  pendingClientLocationId,
  onCreated,
}: ICreateDealershipProps) {
  const pendingClientLocation = useState<
    IPendingClientLocation & IMongoDocument
  >();
  const setPendingClientLocation = pendingClientLocation[1];
  const [isLoading, setLoading] = useState(true);
  const [gaugeLocations, setGaugeLocations] = useState<
    (IGaugeLocation & IMongoDocument)[]
  >([]);
  const [gaugeReps, setGaugeReps] = useState<(IUser & IMongoDocument)[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);

  // Fields

  const [dealership_name, setDealershipName] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState<number>();
  const [website, setWebsite] = useState("");
  const [gauge_location_id, setGaugeLocationId] = useState("");
  const [gauge_rep_id, setGaugeRepId] = useState("");
  const [status_cd, setStatusCd] = useState("prospect");
  const [m2m_transportation, setM2mTransportation] = useState("");

  async function create() {
    setLoading(true);

    try {
      const newClientLocation = await put({
        dealership_name,
        address: {
          city,
          street,
          street2: "",
          state,
          zip: zip,
        },
        website,
        gauge_location_id,
        gauge_rep_id,
        status_cd,
        m2m_transportation: m2m_transportation === "yes",
      });

      onCreated(newClientLocation._id);
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    pendingClientLocationApi.one(pendingClientLocationId).then((cl) => {
      setPendingClientLocation(cl);
      setLoading(false);

      setDealershipName(cl.name);
      setCity(cl.address.city);
      setStreet(cl.address.street);
      setState(cl.address.state);
      setZip(cl.address.zip);
      setWebsite(cl.website);
    });
  }, [pendingClientLocationId]);

  useEffect(() => {
    gaugeLocationApi.list().then(({ list }) => {
      setGaugeLocations(list);
    });

    userApi
      .list({ params: { _type: "GaugeRep", status_cd: "active" } })
      .then(({ list }) => {
        setGaugeReps(list);
      });

    get<string[]>("/clientLocation/status").then((response) => {
      setStatuses(response.data);
    });
  }, []);

  const canCreate =
    isNotEmpty(dealership_name) &&
    isNotEmpty(city) &&
    isNotEmpty(street) &&
    isZipCode(`${zip}`) &&
    isNotEmpty(gauge_location_id) &&
    isNotEmpty(gauge_rep_id);

  return (
    <>
      <FormElementWrap>
        <SUInput
          label="Dealership Name"
          value={dealership_name}
          onChange={(val) => setDealershipName(val)}
          disabled={isLoading}
        />
      </FormElementWrap>

      <FormElementWrap>
        <SUInput
          label="City"
          value={city}
          onChange={(val) => setCity(val)}
          disabled={isLoading}
        />
      </FormElementWrap>

      <FormElementWrap>
        <SUInput
          label="Street Address"
          value={street}
          onChange={(val) => setStreet(val)}
          disabled={isLoading}
        />
      </FormElementWrap>

      <FormElementWrap>
        <SUSelect
          label="State"
          value={state}
          onChange={(val) => setState(`${val}`)}
          disabled={isLoading}>
          {usStates.map((state) => {
            return (
              <option value={state.Code} key={state.Code}>
                {state.Name}
              </option>
            );
          })}
        </SUSelect>
      </FormElementWrap>

      <FormElementWrap>
        <SUInput
          label="Zip"
          value={`${zip}`}
          onChange={(val) => setZip(parseInt(val))}
          validator={isZipCode}
          disabled={isLoading}
        />
      </FormElementWrap>

      <FormElementWrap>
        <SUInput
          label="Website"
          value={website}
          onChange={(val) => setWebsite(val)}
          disabled={isLoading}
        />
      </FormElementWrap>

      <FormElementWrap>
        <SUSelect
          label="Gauge Location"
          value={gauge_location_id}
          onChange={(val) => setGaugeLocationId(`${val}`)}
          disabled={isLoading}>
          <option value="">- select -</option>
          {gaugeLocations.map((gl) => (
            <option value={gl._id} key={gl._id}>
              {gl.name}
            </option>
          ))}
        </SUSelect>
      </FormElementWrap>

      <FormElementWrap>
        <SUSelect
          label="Gauge Representative"
          value={gauge_rep_id}
          onChange={(val) => setGaugeRepId(`${val}`)}
          disabled={isLoading}>
          <option value="">- select -</option>
          {gaugeReps.map((rep) => (
            <option value={rep._id} key={rep._id}>
              {rep.name} ({rep.email})
            </option>
          ))}
        </SUSelect>
      </FormElementWrap>

      <FormElementWrap>
        <SUSelect
          label="Status"
          value={status_cd}
          onChange={(val) => setStatusCd(`${val}`)}
          disabled={isLoading}>
          {statuses.map((status) => (
            <option
              key={status}
              value={status}
              className={`bg-${statusColor(status)}`}>
              {status.toUpperCase()}
            </option>
          ))}
        </SUSelect>
      </FormElementWrap>

      <FormElementWrap>
        <SUSelect
          label="Market to market transportation"
          value={m2m_transportation}
          onChange={(val) => setM2mTransportation(`${val}`)}
          disabled={isLoading}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </SUSelect>
      </FormElementWrap>

      <SUButton
        color="green"
        className="w-full mt-4"
        disabled={!canCreate}
        loading={isLoading}
        onClick={() => create()}>
        Create and assign
      </SUButton>
    </>
  );
}
