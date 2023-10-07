import { useRef, useState, RefObject } from "react";

export function getRefValue<T>(ref: RefObject<T>) {
  return ref.current as T;
}

export function useStateRef<T>(defaulValue: T) : [T, (value: T) => void, RefObject<T>] {
  const ref = useRef(defaulValue);
  const [state, _setState] = useState(defaulValue);
  const setState = (value: T) => {
    _setState(value);
    ref.current = value;
  };

  return [state, setState, ref];
}
