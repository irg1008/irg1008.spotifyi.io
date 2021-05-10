import { useEffect, useRef, useState } from "react";
import useScroll from "./useScroll";

const useReachingBottom = <T extends HTMLElement>(onReach?: () => void) => {
  const [isReaching, setIsReaching] = useState(false);

  const ref = useRef<T>();

  const bottomTolerance = 1000;

  const checkBottom = () => {
    const targetHeight =
      ref?.current?.offsetHeight || document.body.scrollHeight;

    const isReachingBottom =
      window.innerHeight + window.scrollY >= targetHeight - bottomTolerance;
    setIsReaching(isReachingBottom);
  };

  useEffect(() => {
    isReaching && onReach();
  }, [isReaching]);

  useScroll(checkBottom);

  return { isReaching, ref };
};

export default useReachingBottom;
