import { useEffect, useRef, useState } from "react";

interface IData {
  height: number;
  width: number;
  x: number;
  y: number;
}

const initialData: IData = {
  height: 0,
  width: 0,
  x: 0,
  y: 0,
};

const useRefData = <T extends HTMLElement>() => {
  const [data, setData] = useState<IData>(initialData);

  const ref = useRef<T>();

  useEffect(() => {
    const { clientHeight, clientWidth, offsetTop, offsetLeft } = ref.current;
    setData({
      height: clientHeight,
      width: clientWidth,
      x: offsetLeft,
      y: offsetTop,
    });
  }, [
    ref.current?.clientHeight,
    ref.current?.clientWidth,
    ref.current?.offsetTop,
    ref.current?.offsetLeft,
  ]);

  return [ref, data] as const;
};

export default useRefData;
