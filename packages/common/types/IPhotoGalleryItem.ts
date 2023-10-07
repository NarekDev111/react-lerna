export interface IPhotoGalleryItem {
  url: string;
  description?: string;
  name?: string;
}

export type PhotoGroups = {
  ALL: IPhotoGalleryItem[];
  EXT: IPhotoGalleryItem[];
  INT: IPhotoGalleryItem[];
};
