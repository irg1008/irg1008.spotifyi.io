import { useEffect, useState } from "react";
import { useIntersectionObserver } from "react-intersection-observer-hook";

const useOnScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, { entry }] = useIntersectionObserver();

  useEffect(() => {
    setIsVisible(entry?.isIntersecting);
  }, [entry]);

  return { ref, isVisible };
};

export default useOnScreen;
