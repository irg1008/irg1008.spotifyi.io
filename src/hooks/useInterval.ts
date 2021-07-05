import { useCallback, useEffect, useRef } from "react";

interface ICreateIntervalProps {
	mills: number;
	cb: () => void;
}

const useInterval = ({ mills, cb }: ICreateIntervalProps) => {
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
		start();
		return () => stop();
	}, [start, stop]);

	return { start, stop };
};

export default useInterval;
