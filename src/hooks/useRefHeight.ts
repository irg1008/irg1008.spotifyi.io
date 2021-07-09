import { useEffect, useRef, useState } from "react";

const useRefHeight = <T extends HTMLElement>() => {
  const [height, setHight] = useState<number>();
  
  const ref = useRef<T>();
  const refHeight = ref.current?.clientHeight;

  useEffect(() => {
    setHight(refHeight);
  }, [refHeight]);

  return [ref, height] as const;
};

export default useRefHeight;
