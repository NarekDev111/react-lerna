import React from "react";
import { PhotoGroups } from "@sellgauge/common";

export interface ISingleImage {
  url: string;
  description?: string;
  pos?: { x: number; y: number; scale: number };
  allImagesRef?: any;
  allImageContainersRef?: any;
  run?: () => void;
  className?: string;
  onScroll?: (e: any) => void;
  isAnimateZooming?: React.RefObject<boolean>;
}

export interface IImageSliderProps {
  images: ISingleImage[];
  photoGroups: PhotoGroups;
  isfullScreen?: boolean;
  setIsFullScreen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function getTouchEventData(
  e:
    | TouchEvent
    | MouseEvent
    | React.TouchEvent<HTMLDivElement>
    | React.MouseEvent<HTMLDivElement>
) {
  return "changedTouches" in e ? e.changedTouches[0] : e;
}
