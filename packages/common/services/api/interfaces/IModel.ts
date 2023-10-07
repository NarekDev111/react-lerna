import IMake from "./IMake";

export default interface IModel {
  value: string;
  make: string | IMake;
}
