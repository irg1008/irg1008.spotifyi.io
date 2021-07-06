import { useCallback, useEffect, useRef } from "react";

interface ICreateIntervalProps {
  mills: number;
  cb: () => void;
  startOnCall?: boolean;
}

const useInterval = ({ mills, cb, startOnCall }: ICreateIntervalProps) => {
  const savedCallback = useRef<typeof cb>();
  let id = useRef<NodeJS.Timeout>();

  const start = useCallback(() => {
    const tick = () => savedCallback.current();
    id.current = setInterval(tick, mills);
  }, [mills]);

  const stop = useCallback(() => clearInterval(id.current), []);

  useEffect(() => {
    savedCallback.current = cb;
  }, [cb]);

  useEffect(() => {
    startOnCall && start();
    return () => stop();
  }, [start, stop, startOnCall]);

  return { start, stop };
};

export default useInterval;
