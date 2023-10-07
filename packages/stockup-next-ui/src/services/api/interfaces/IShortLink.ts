export default interface IShortLink {
  short_id: string;
  type: string;
  data: object;
  expires: Date;
  created_at: Date;
  updated_at: Date;
}
