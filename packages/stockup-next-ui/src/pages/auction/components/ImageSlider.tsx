import { useState } from "react";

export interface IPhotoGalleryItem {
  url: string;
  name?: string;
}

interface IPhotoGalleryProps {
  photos: IPhotoGalleryItem[];
}

function ImageSlider({ photos: images }: IPhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const onThumbnailSelect = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-1/2 h-[400]  flex-nowrap overflow-x-hidden relative">
        <img
          src={images[currentIndex].url}
          alt="images"
          className="h-full w-full object-contain"
        />

        <button
          className="absolute z-10 text-white/70 hover:text-white top-1/2 -translate-y-1/2 cursor-pointer left-2  bg-blue-700/50 hover:bg-blue-700 transition-all p-2 rounded-lg"
          onClick={handlePrevClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
        </button>
        <button
          className="absolute z-10 text-white/70 hover:text-white top-1/2 -translate-y-1/2 right-2 cursor-pointer  bg-blue-700/50 hover:bg-blue-700 transition-all  p-2 rounded-lg"
          onClick={handleNextClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </button>

        <p className="info absolute right-0 bottom-0 w-full  h-6 bg-blue-500/60 text-xs flex justify-end items-center text-white font-bold pr-2">
          {currentIndex + 1} of {images.length}
        </p>
      </div>

      <div className="w-1/2 grid grid-cols-5 h-full auto-rows-[70px]">
        {images &&
          images.map((image, index) => {
            return (
              <div
                key={index}
                onClick={() => onThumbnailSelect(index)}
                className={` h-full w-full relative ${
                  currentIndex === index &&
                  "active-img outline-4  outline-rose-500"
                }`}>
                <img
                  src={image.url}
                  className={`h-full w-full object-cover ${
                    currentIndex === index ? "brightness-100 " : "brightness-50"
                  }`}
                  alt="images"
                />

                {/* {currentIndex === index && (
                  <span className="bottom-0 w-full h-3 absolute bg-blue-700/80"></span>
                )} */}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ImageSlider;
