import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useId, useLayoutEffect, useState } from "react";

import { IPhotoGalleryItem } from "@sellgauge/common";

interface IPhotoGalleryProps {
  photos: IPhotoGalleryItem[];
}

function ArrowButton({
  dir,
  onClick,
}: {
  dir: "left" | "right";
  onClick?: () => void;
}) {
  const IconClass = dir === "left" ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <button
      className="p-2 text-black pointer-events-auto invisible md:visible bg-white/60 drop-shadow"
      onClick={onClick}>
      <div className="rounded-full bg-white/80 hover:bg-white w-14 h-14 flex drop-shadow">
        <IconClass className="w-5 h-5 m-auto" />
      </div>
    </button>
  );
}

export default function PhotoGallery({ photos }: IPhotoGalleryProps) {
  const id = useId();

  const [current, setCurrent] = useState(0);

  const [display, setDisplay] = useState<IPhotoGalleryItem | null>();

  function clampCurr(c: number): number {
    return c < 0 ? 0 : c >= photos.length ? photos.length - 1 : c;
  }

  useLayoutEffect(() => {
    document.getElementById(`photo_${id}_${current}`)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [current]);

  return (
    <>
      {display && (
        <div className="flex fixed left-0 top-0 w-full h-full bg-black/80 z-10">
          <div className="flex w-full h-full">
            <div className="m-auto">
              <img src={display.url} alt="images" />
            </div>
          </div>
          <button
            className="absolute drop-shadow right-0 hover:scale-110 bg-white rounded-full p-1 m-1"
            onClick={() => {
              setDisplay(null);
            }}>
            <XIcon className="w-10 h-10" />
          </button>
        </div>
      )}
      <div className="relative h-full">
        <div className="overflow-x-auto snap-x snap-mandatory snap-center md:overflow-x-hidden h-full">
          <div id={`scroll_${id}`} className="flex gap-1 h-full">
            {photos.map((item, index) => (
              <div
                id={`photo_${id}_${index}`}
                key={item.url}
                className={`flex-shrink-0 bg-contain bg-center bg-no-repeat snap-center transition-colors aspect-square md:aspect-[4/3] flex pb-2 cursor-pointer h-full ${
                  index === current ? " md:bg-blue-100 " : ""
                }`}
                style={{ backgroundImage: `url('${item.url}')` }}
                onPointerUp={() => {
                  setDisplay(item);
                }}>
                <div className="ml-auto mr-auto mt-auto font-bold">
                  {/* TODO: Put photo title */}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 w-full h-full flex place-content-between pointer-events-none">
          {current > 0 ? (
            <ArrowButton
              dir="left"
              onClick={() => setCurrent((c) => clampCurr(c - 1))}
            />
          ) : (
            <div />
          )}
          {current < photos.length - 1 ? (
            <ArrowButton
              dir="right"
              onClick={() => setCurrent((c) => clampCurr(c + 1))}
            />
          ) : (
            <div />
          )}
        </div>

        {/*
        <div className="absolute top-0 w-full h-full pointer-events-none hidden md:flex">
          <div className="mt-auto ml-auto mr-auto bg-white/30 rounded-tl rounded-tr flex">
            {new Array(photos.length).fill(null).map((v, index) => (
              <button
                className={
                  "m-auto inline transition-colors text-2xl p-1 md:p-2 pointer-events-auto " +
                  (current == index ? "text-blue-500 " : "text-gray-400")
                }
                onClick={() => setCurrent(index)}
                key={`btn_${index}`}
              >
                &bull;
              </button>
            ))}
          </div>
              </div> */}
      </div>
    </>
  );
}
