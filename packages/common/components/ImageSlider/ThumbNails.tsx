import React, { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { getRefValue } from "./lib/hooks";
import { IImageSliderProps, getTouchEventData } from "./lib/types";

interface IThumbNailsProps extends IImageSliderProps {
  currentIndex: number;
  offsetX: number;
  isfullScreen: boolean;
  offsetXRef: React.RefObject<number>;
  setOffsetX: (value: number) => void;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  onThumbNailClick: (index: number) => void;
}

export default function ThumbNails({
  images,
  currentIndex,
  offsetX,
  offsetXRef,
  isfullScreen,
  setOffsetX,
  setCurrentIndex,
  onThumbNailClick,
}: IThumbNailsProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  const thumbImageRef = useRef<HTMLLIElement>(null);
  const containerWidthRef = useRef(0);
  const minOffsetXRef = useRef(0);
  const currentOffsetXRef = useRef(0);
  const startRef = useRef(0);

  const [isSwiping, setIsSwiping] = useState(false);

  const isBeginning = useRef<boolean>(true);
  const isEnd = useRef<boolean>(false);

  const style = {
    transform: `translate3d(${offsetX}px, 0, 0)`,
  };

  useEffect(() => {
    const container = getRefValue(containerRef);

    if (
      container.scrollWidth - 100 * currentIndex <
      container.offsetWidth / 2 + 50
    ) {
      isEnd.current = true;

      return setOffsetX((container.scrollWidth - container.offsetWidth) * -1);
    }

    containerWidthRef.current = currentIndex * 100;
    isEnd.current = false;

    if (currentIndex * 100 > container.offsetWidth / 2 - 50) {
      setOffsetX(100 * currentIndex * -1 + container.offsetWidth / 2 - 50);
      isBeginning.current = false;
    } else {
      isBeginning.current = true;
      setOffsetX(0);
    }
  }, [currentIndex, isfullScreen]);

  const onTouchMove = (e: TouchEvent | MouseEvent) => {
    const currentX = getTouchEventData(e).clientX;
    const diff = getRefValue(startRef) - currentX;

    if (Math.abs(diff) > 15) {
      setIsSwiping(true);
    }

    let newOffsetX = getRefValue(currentOffsetXRef) - diff;

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
  };

  const onTouchStart = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    setIsSwiping(false);

    currentOffsetXRef.current = getRefValue(offsetXRef);
    startRef.current = getTouchEventData(e).clientX;

    const containerEl = getRefValue(containerRef);

    minOffsetXRef.current = containerEl.offsetWidth - containerEl.scrollWidth;

    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("mousemove", onTouchMove);
    window.addEventListener("mouseup", onTouchEnd);
  };

  function prevThumb() {
    // let container = getRefValue(containerRef);
    // containerWidthRef.current =
    //   containerWidthRef.current - container.offsetWidth;
    // let move = containerWidthRef.current * -1;
    // if (containerWidthRef.current < container.offsetWidth) {
    //   move = 0;
    //   containerWidthRef.current = 0;
    // }
    // setOffsetX(move);

    setCurrentIndex((prev) => (prev <= 0 ? 0 : prev - 1));
  }

  function nextThumb() {
    // let container = getRefValue(containerRef);
    // if (
    //   Math.abs(containerWidthRef.current) ===
    //   Math.abs(container.scrollWidth - container.offsetWidth)
    // )
    //   return;
    // containerWidthRef.current =
    //   containerWidthRef.current + container.offsetWidth;
    // let move = containerWidthRef.current * -1;
    // if (
    //   container.scrollWidth - containerWidthRef.current <
    //   container.offsetWidth
    // ) {
    //   move = (container.scrollWidth - container.offsetWidth) * -1;
    //   containerWidthRef.current = container.scrollWidth - container.offsetWidth;
    // }
    // setOffsetX(move);
    setCurrentIndex((prev) =>
      prev >= images.length - 1 ? images.length - 1 : prev + 1
    );
  }

  return (
    <div className="relative z-50">
      <button
        onClick={prevThumb}
        className="prev absolute bg-blue-500 text-white rounded-full p-1 top-1/2 -translate-y-1/2 left-2 z-20">
        <ChevronLeftIcon className="w-3 h-3 m-auto" />
      </button>

      <button
        onClick={nextThumb}
        className="next absolute bg-blue-500 text-white rounded-full p-1 top-1/2 -translate-y-1/2 right-2 z-20">
        <ChevronRightIcon className="w-3 h-3 m-auto" />
      </button>

      <div
        onTouchStart={onTouchStart}
        onMouseDown={onTouchStart}
        className="thumbnails h-[80px] touch-pan-y">
        <ul
          ref={containerRef}
          className="flex bg-[#EDEDED] h-full transition-transform duration-300 ease-out"
          style={style}>
          {images.map((item, index) => (
            <li
              onClick={() => {
                if (isSwiping) return;
                onThumbNailClick(index);
              }}
              key={item.url + index}
              ref={thumbImageRef}
              className={`h-full w-[100px] list-none  flex-shrink-0 border-[4px]  ${
                index === currentIndex
                  ? "border-blue-600"
                  : "border-transparent"
              } rounded-xl overflow-hidden`}>
              <img
                className="h-full w-full object-cover thumb-img"
                src={item.url}
                draggable={false}
                alt="thumb"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
