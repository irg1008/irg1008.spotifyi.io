import { useRef } from "react";

const useRefHeight = <T extends HTMLElement>() => {
  const ref = useRef<T>();
  const height = ref.current?.clientHeight;

  return [ref, height] as const;
};

export default useRefHeight;
