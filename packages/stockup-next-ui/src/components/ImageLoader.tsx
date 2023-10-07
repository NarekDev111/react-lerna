import { useEffect, useState } from "react";
import comingSoonImage from "../assets/img/coming-soon.png";

interface IImageLoaderProps {
  src?: string;
  loading?: boolean;
  className?: string;
}

export default function ImageLoader({
  src,
  loading,
  className,
}: IImageLoaderProps) {
  const [isLoading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    if (src == null) {
      setLoading(false);
      setImageUrl(comingSoonImage);
      return;
    }

    setLoading(true);

    if (src) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageUrl(src);
        setLoading(false);
      };
    }
  }, [src]);

  return (
    <div
      className={`${className} bg-cover bg-center bg-no-repeat transition-all duration-500 ${
        isLoading && src ? "animate-pulse bg-gray-400" : "bg-gray-200"
      }`}
      style={{
        backgroundImage:
          isLoading || (loading && !src) ? undefined : `url('${imageUrl}')`,
      }}
     />
  );
}
