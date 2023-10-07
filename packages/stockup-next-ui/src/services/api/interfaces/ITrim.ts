import IMake from "./IMake";
import IModel from "./IModel";

export default interface ITrim {
  value: string;
  make: string | IMake;
  model: string | IModel;
}
