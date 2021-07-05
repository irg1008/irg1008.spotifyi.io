import { ChangeEvent } from "react";
import Styled from "./Range.styles";

interface IRangeProps {
	onChangeEvent: (value: number) => void;
	onReleaseEvent?: () => void;
	min: number;
	max: number;
	step: number;
	value?: number;
}

const Range = ({
	onChangeEvent,
	onReleaseEvent,
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
			{...{ min, max, value, step, onChange }}
			onMouseUp={onRelease}
			onTouchEnd={onRelease}
		/>
	);
};

export default Range;
