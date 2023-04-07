import { useEffect } from "react";

const useDebounce = <T = any>(
  func: (value: T) => void,
  value: T,
  wait: number = 0
) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      func(value);
    }, wait);

    return () => {
      clearTimeout(handler);
    };
  }, [value, wait]);
};

export default useDebounce;
