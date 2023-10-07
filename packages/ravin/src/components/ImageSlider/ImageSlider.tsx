import { useEffect, useRef, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "@heroicons/react/outline";
import { getRefValue, useStateRef } from "./lib/hooks";

import { IPhotoGalleryItem } from "@sellgauge/common";
import SingleImage from "./SingleImage";
import ThumbNails from "./ThumbNails";
import { IImageSliderProps, getTouchEventData } from "./lib/types";

const MIN_SWIPE_REQUIRED = 40;
const initZoomPosition: { x: number; y: number; scale: number } = {
  x: 0,
  y: 0,
  scale: 1,
};
const ZOOM_STEP = 0.6;
const ZOOM_MAX = 3;

export default function ImageSlider({
  photoGroups,
  isfullScreen,
  setIsFullScreen,
}: IImageSliderProps) {
  const selectedImages: IPhotoGalleryItem[] = photoGroups["ALL"];

  //! Uncomment when group image back
  // const [selectedImage, setSelectedImage] = useState<ISingleImage>();

  const containerRef = useRef<HTMLUListElement>(null);
  const containerWidthRef = useRef(0);
  const minOffsetXRef = useRef(0);
  const currentOffsetXRef = useRef(0);
  const startRefX = useRef(0);
  const startRefY = useRef(0);

  const [isSwiping, setIsSwiping] = useState(false);
  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  //* Zoom-in and Zoom-out

  const [zoomMode, setZoomMode] = useState(false);
  const [offsetPos, setOffsetPos, offsetPosRef] = useStateRef(initZoomPosition);
  const currentOffsetXRefZoom = useRef(initZoomPosition);

  const imageRef = useRef<HTMLImageElement | null>(null);
  const allImagesRef = useRef<HTMLImageElement[]>([]);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const allImageContainersRef = useRef<HTMLDivElement[]>([]);

  const isAnimateZooming = useRef(false);

  const percentage = 100 + ((offsetPos.scale - 1) / (ZOOM_MAX - 1)) * 100;

  //* Thumbnail state:
  const [offsetXThumb, setOffsetXThumb, offsetXRefThumb] = useStateRef(0);

  useEffect(() => {
    function escFunction(event: any) {
      if (event.key === "Escape" && isfullScreen) {
        if (setIsFullScreen) {
          setIsFullScreen(false);
        }
      }
    }

    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [isfullScreen, setIsFullScreen]);

  useEffect(() => {
    const onWindowResize = () => {
      setIsSwiping(true);
      const w = getRefValue(containerRef).offsetWidth;
      setOffsetX(w * currentIndex * -1);
      setOffsetPos(initZoomPosition);
      isAnimateZooming.current = true;
    };

    window.addEventListener("resize", onWindowResize);

    return () => window.removeEventListener("resize", onWindowResize);
  }, [currentIndex, setOffsetX, setOffsetPos]);

  useEffect(() => {
    setIsSwiping(true);
    const w = getRefValue(containerRef).offsetWidth;
    setOffsetX(w * currentIndex * -1);

    //* reset to initial zoom:
    setOffsetPos(initZoomPosition);
  }, [isfullScreen, currentIndex, setOffsetPos, setOffsetX]);

  useEffect(() => {
    const containerEl = getRefValue(containerRef);
    const containerWidth = containerEl.offsetWidth;

    setOffsetX(containerWidth * currentIndex * -1);

    //* Reseting image zoom positions
    setOffsetPos(initZoomPosition);

    imageRef.current = allImagesRef.current[currentIndex];
    imageContainerRef.current = allImageContainersRef.current[currentIndex];
  }, [currentIndex, setOffsetPos, setOffsetX]);

  const onTouchMove = (e: TouchEvent | MouseEvent) => {
    const currentX = getTouchEventData(e).clientX;
    const diffX = getRefValue(startRefX) - currentX;
    let newOffsetX = getRefValue(currentOffsetXRef) - diffX;

    //* Zoom positions
    const currentY = getTouchEventData(e).clientY;
    const diffY = getRefValue(startRefY) - currentY;

    //! Dimenstion:
    const containerWidth = getRefValue(imageRef).offsetWidth;
    const containerHeight = getRefValue(imageRef).offsetHeight;

    const imageWidth = getRefValue(imageRef).offsetWidth * offsetPos.scale;
    const imageHeight = getRefValue(imageRef).offsetHeight * offsetPos.scale;

    if (zoomMode) {
      isAnimateZooming.current = false;
      let newOffsetX = getRefValue(currentOffsetXRefZoom).x - diffX;
      let newOffsetY = getRefValue(currentOffsetXRefZoom).y - diffY;

      if (newOffsetX > 0) {
        newOffsetX = 0;
      } else if (newOffsetX + imageWidth < containerWidth) {
        newOffsetX = containerWidth - imageWidth;
      }

      if (newOffsetY > 0) {
        newOffsetY = 0;
      } else if (newOffsetY + imageHeight < containerHeight) {
        newOffsetY = containerHeight - imageHeight;
      }

      setOffsetPos({ ...offsetPos, x: newOffsetX, y: newOffsetY });
      return;
    }

    const maxOffsetX = 0;
    const minOffsetX = getRefValue(minOffsetXRef);

    if (newOffsetX > maxOffsetX) {
      newOffsetX = 0;
    }

    if (newOffsetX < minOffsetX) {
      newOffsetX = minOffsetX;
    }

    setOffsetX(newOffsetX);
  };

  const onTouchEnd = () => {
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
    window.removeEventListener("mousemove", onTouchMove);
    window.removeEventListener("mouseup", onTouchEnd);

    if (zoomMode) return;

    const containerWidth = getRefValue(containerWidthRef);
    const currentOffsetX = getRefValue(currentOffsetXRef);
    let newOffsetX = getRefValue(offsetXRef);

    const diff = currentOffsetX - newOffsetX;

    if (Math.abs(diff) > MIN_SWIPE_REQUIRED) {
      if (diff > 0) {
        newOffsetX = Math.floor(newOffsetX / containerWidth) * containerWidth;
      } else {
        newOffsetX = Math.ceil(newOffsetX / containerWidth) * containerWidth;
      }
    } else {
      newOffsetX = Math.round(newOffsetX / containerWidth) * containerWidth;
    }

    setIsSwiping(false);
    setOffsetX(newOffsetX);
    setCurrentIndex(Math.abs(newOffsetX / containerWidth));
  };

  const onTouchStart = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    setIsSwiping(true);

    //* Zooming
    currentOffsetXRefZoom.current = getRefValue(offsetPosRef);

    currentOffsetXRef.current = getRefValue(offsetXRef);
    startRefX.current = getTouchEventData(e).clientX;
    startRefY.current = getTouchEventData(e).clientY;

    const containerEl = getRefValue(containerRef);
    const containerWidth = containerEl.offsetWidth;
    containerWidthRef.current = containerWidth;

    minOffsetXRef.current = containerWidth - containerEl.scrollWidth;

    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("mousemove", onTouchMove);
    window.addEventListener("mouseup", onTouchEnd);
  };

  const onThumbNailClick = (index: number) => {
    const containerEl = getRefValue(containerRef);
    const containerWidth = containerEl.offsetWidth;

    setCurrentIndex(index);
    setOffsetX(containerWidth * index * -1);
  };

  const onPrevClick = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? selectedImages.length - 1 : prev - 1
    );
  };
  const onNextClick = () => {
    setCurrentIndex((prev) =>
      prev + 1 < selectedImages.length ? prev + 1 : 0
    );
  };

  //! Group
  // const onGroupSelect = (group: string) => {
  //   setSelectedImages((photoGroups as any)[group]);
  //   setOffsetXThumb(0);
  //   setCurrentIndex(0);
  //   groupName.current = group;
  // };

  //* Zoom in and zoom out
  const onScroll = (e: React.WheelEvent) => {
    if (!isfullScreen) return;
    isAnimateZooming.current = false;

    const imgContainer = getRefValue(imageContainerRef).getBoundingClientRect();
    const fullContainer = getRefValue(containerRef).getBoundingClientRect();

    const formula = (fullContainer.width - imgContainer.width) / 2;

    const delta = e.deltaY * -0.005;
    const newScale = limitScale(offsetPos.scale + delta);

    const containerWidth = getRefValue(imageRef).offsetWidth;

    const containerHeight = getRefValue(imageRef).offsetHeight;

    const imageWidth = getRefValue(imageRef).offsetWidth * newScale;
    const imageHeight = getRefValue(imageRef).offsetHeight * newScale;

    const ratio = newScale / offsetPos.scale;

    let x = e.clientX - formula - (e.clientX - formula - offsetPos.x) * ratio;
    let y = e.clientY - (e.clientY - offsetPos.y) * ratio;

    if (x > 0) {
      x = 0;
    } else if (x + imageWidth < containerWidth) {
      x = containerWidth - imageWidth;
    }

    if (y > 0) {
      y = 0;
    } else if (y + imageHeight < containerHeight) {
      y = containerHeight - imageHeight;
    }

    setOffsetPos({
      scale: newScale,
      x,
      y,
    });
  };

  const limitScale = (scale: number) => Math.min(Math.max(scale, 1), 3);

  useEffect(() => {
    if (offsetPos.scale === 1) {
      setOffsetPos(initZoomPosition);
      setZoomMode(false);
    } else {
      setZoomMode(true);
    }
  }, [offsetPos.scale, setOffsetPos]);

  const onZoomIn = () => {
    if (offsetPos.scale >= ZOOM_MAX) return;
    isAnimateZooming.current = true;

    const imageWidth = getRefValue(imageRef).offsetWidth;
    const imageHeight = getRefValue(imageRef).offsetHeight;

    setOffsetPos({
      ...offsetPos,
      scale: offsetPos.scale + ZOOM_STEP,
      x: (imageWidth - imageWidth * (offsetPos.scale + ZOOM_STEP)) / 2,
      y: (imageHeight - imageHeight * (offsetPos.scale + ZOOM_STEP)) / 2,
    });
  };
  const onZoomOut = () => {
    isAnimateZooming.current = true;
    if (offsetPos.scale - ZOOM_STEP < 1) {
      setOffsetPos(initZoomPosition);
      return;
    }
    const imageWidth = getRefValue(imageRef).offsetWidth;
    const imageHeight = getRefValue(imageRef).offsetHeight;

    setOffsetPos({
      ...offsetPos,
      scale: offsetPos.scale - ZOOM_STEP,
      x: (imageWidth - imageWidth * (offsetPos.scale - ZOOM_STEP)) / 2,
      y: (imageHeight - imageHeight * (offsetPos.scale - ZOOM_STEP)) / 2,
    });
  };

  const onZoomReset = () => {
    isAnimateZooming.current = true;
    setOffsetPos(initZoomPosition);
  };

  const style = {
    transform: `translate3d(${offsetX}px, 0, 0)`,
  };

  return (
    <div
      className={`w-full  h-full flex-auto
       ${!isfullScreen && ""}  bg-[#EDEDED] ${
        !isfullScreen && "rounded-lg"
      } overflow-hidden`}>
      <div
        className={`h-full flex flex-col ${isfullScreen && "flex flex-col"}`}>
        <div
          className={`relative group flex-auto ${isfullScreen && "flex-grow"}`}>
          <button
            onClick={onPrevClick}
            className="prev cursor-pointer absolute left-2  h-10 w-10 rounded-full  z-10 top-1/2 bg-white/50 group-hover:bg-white transition-all border shadow-lg">
            <ChevronLeftIcon className="w-5 h-5 m-auto" />
          </button>
          <button
            onClick={onNextClick}
            className="next cursor-pointer absolute right-2  h-10 w-10 rounded-full  z-10 top-1/2 bg-white/50 group-hover:bg-white transition-all  border shadow-lg">
            <ChevronRightIcon className="w-5 h-5 m-auto" />
          </button>
          {/* Vehicle name */}
          {/* <div className="name absolute bottom-2 left-2  bg-white/60 px-2 py-1 rounded-lg text-sm text-black z-10">
            {selectedImages[currentIndex].name
              ? selectedImages[currentIndex].name
              : "Vehicle"}
          </div> */}
          <div className="quantity shadow absolute bottom-2 right-2 px-2 py-1 text-sm rounded-lg bg-white/60  z-10 flex items-center gap-2">
            <span>
              {currentIndex + 1} of {selectedImages.length}
            </span>

            {isfullScreen && (
              <span className=" ">{percentage.toFixed(0)}%</span>
            )}

            {offsetPos.scale > 1.5 && (
              <button onClick={onZoomReset} className="text-xs cursor-pointer">
                Reset Zoom
              </button>
            )}

            {isfullScreen && (
              <div className="flex gap-2">
                <span onClick={onZoomIn} className="cursor-pointer">
                  <ZoomInIcon className="w-4 h-4 m-auto" />
                </span>
                <span onClick={onZoomOut} className="cursor-pointer">
                  <ZoomOutIcon className="w-4 h-4 m-auto" />
                </span>
              </div>
            )}

            <span
              onClick={() => {
                // setSelectedImage(selectedImages[currentIndex]);
                if (setIsFullScreen) {
                  setIsFullScreen((prev) => !prev);
                }
              }}
              className="cursor-pointer">
              {!isfullScreen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
                  />
                </svg>
              )}
            </span>
          </div>
          <div
            onTouchStart={onTouchStart}
            onMouseDown={onTouchStart}
            className={`swiper-container flex flex-col w-full max-w-full overflow-hidden relative touch-pan-y h-full ${
              isfullScreen && "flex flex-col"
            }`}>
            <ul
              ref={containerRef}
              className={`swiper-list flex flex-auto max-w-full flex-row list-none  m-0 h-[280px] sm:h-[400px] ${
                isfullScreen && "flex-grow "
              }${!isSwiping && "transition-transform duration-300 ease-out"}`}
              style={style}>
              {selectedImages.map((item, i) => (
                <SingleImage
                  key={item.url + i}
                  isAnimateZooming={isAnimateZooming}
                  allImagesRef={allImagesRef}
                  allImageContainersRef={allImageContainersRef}
                  {...item}
                  className={`${
                    currentIndex === i &&
                    "relative z-50 bg-[#EDEDED] rounded-none"
                  }`}
                  onScroll={(e) => {
                    if (currentIndex === i) {
                      onScroll(e);
                    }
                  }}
                  pos={offsetPos}
                />
              ))}
            </ul>

            {isfullScreen && (
              <button
                onClick={() => {
                  if (setIsFullScreen) {
                    setIsFullScreen(false);
                  }
                }}
                className="quantity hidden md:block text-sm absolute top-2 right-2 px-2 py-1 shadow  rounded-lg bg-white/60  z-10 ">
                Exit Fullscreen [esc]
              </button>
            )}
          </div>
        </div>
        <div className="p-2 ">
          <ThumbNails
            images={selectedImages}
            offsetX={offsetXThumb}
            isfullScreen={isfullScreen}
            setOffsetX={setOffsetXThumb}
            offsetXRef={offsetXRefThumb}
            photoGroups={photoGroups}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            onThumbNailClick={onThumbNailClick}
          />
          {/* Groups Section */}
          {/* <div className="groups h-10 px-2 w-full mt-1 gap-2 text-xs bg-[#D9D9D9] rounded-lg flex items-center">
            {Object.keys(photoGroups).map((group) => (
              <button onClick={() => onGroupSelect(group)} key={group}>
                <SUChip
                  dynamicColor={
                    group === groupName.current ? "#3FBAFF" : "#8F9BB3"
                  }
                  className="text-xs"
                >
                  {group} - {(photoGroups as any)[group].length}
                </SUChip>
              </button>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}
