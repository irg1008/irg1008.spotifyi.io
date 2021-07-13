import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface ICreateTimeProps {
  mills: number;
  cb: () => void;
  startOnCall?: boolean;
}

const useInterval = ({ mills, cb, startOnCall = true }: ICreateTimeProps) => {
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

const useTimeout = ({ mills, cb, startOnCall = true }: ICreateTimeProps) => {
  const [remaningTime, setRemainginTime] = useState<number>(mills);
  const [paused, setPaused] = useState<boolean>();

  const percentage = useMemo(() => (remaningTime / mills) * 100, [
    mills,
    remaningTime,
  ]);

  const intervalStep = 10;
  const onIntervalStep = () =>
    !paused && setRemainginTime((current) => current - intervalStep);

  useInterval({
    mills: intervalStep,
    cb: onIntervalStep,
  });

  const start = useCallback(() => setPaused(false), []);
  const stop = useCallback(() => setPaused(true), []);

  useEffect(() => {
    remaningTime === 0 && cb();
  }, [remaningTime, cb]);

  useEffect(() => {
    startOnCall && start();
    return () => stop();
  }, [startOnCall, start, stop]);

  return { start, stop, percentage };
};

export { useInterval, useTimeout };
