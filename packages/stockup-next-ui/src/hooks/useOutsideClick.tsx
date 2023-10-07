import React, { useEffect } from "react";

export function useOutsideClick(
  ref: React.RefObject<HTMLInputElement>,
  callback: () => void,
  dependency: any[] = []
) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, ...dependency]);
}
