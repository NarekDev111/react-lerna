import IOpportunity from "./IOpportunity";
import IMongoDocument from "./IMongoDocument";

export default interface IInventoryItem {
  opportunity: IOpportunity & IMongoDocument;
  cr: number;
  main_image_url: string;
}
