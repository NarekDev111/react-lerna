import { useEffect, useRef } from "react";

import { getRefValue } from "./lib/hooks";
import { ISingleImage } from "./lib/types";

export default function SingleImage({
  url,
  pos,
  className,
  allImagesRef,
  allImageContainersRef,
  isAnimateZooming,
  onScroll,
}: ISingleImage) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (imageRef.current) {
      allImagesRef?.current?.push(imageRef.current);
    }

    if (allImageContainersRef.current) {
      allImageContainersRef?.current?.push(imageContainerRef.current);
    }
  }, [allImageContainersRef, allImagesRef]);

  return (
    <li
      className={`swiper-item w-full flex-shrink-0 rounded-2xl over flex items-center justify-center ${className}`}
    >
      <div
        ref={imageContainerRef}
        className="h-full inline-block overflow-hidden "
      >
        <img
          src={url}
          ref={imageRef}
          onWheelCapture={onScroll}
          className={`swiper-img w-full h-full select-none object-contain ${
            getRefValue(isAnimateZooming) && "transition-all"
          }  ${pos?.scale ? (pos.scale > 1 ? "cursor-grab" : "") : ""} `}
          alt="swiper-img"
          style={{
            transformOrigin: `${pos?.x} ${pos?.y}`,
            transform: `translate3d(${pos?.x}px, ${pos?.y}px, 0px) scale(${pos?.scale})`,
          }}
          draggable={false}
        />
      </div>
    </li>
  );
}
