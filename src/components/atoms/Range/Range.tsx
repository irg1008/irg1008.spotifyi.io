import { ChangeEvent } from "react";
import Styled from "./Range.styles";

interface IRangeProps {
	onChangeEvent: (value: number) => void;
	onReleaseEvent?: () => void;
	onDrag?: () => void;
	min: number;
	max: number;
	step: number;
	value?: number;
}

const Range = ({
	onChangeEvent,
	onReleaseEvent,
	onDrag,
	min,
	max,
	step,
	value,
}: IRangeProps) => {
	const onChange = ({
		currentTarget: { value },
	}: ChangeEvent<HTMLInputElement>) => onChangeEvent(Number(value));

	const onRelease = () => !!onReleaseEvent && onReleaseEvent();

	return (
		<Styled.Range
			type="range"
			{...{ min, max, step, onChange }}
			value={!!value ? value : 0}
			onMouseUp={onRelease}
			onTouchEnd={onRelease}
			onMouseDown={onDrag}
			onTouchStart={onDrag}
		/>
	);
};

export default Range;
