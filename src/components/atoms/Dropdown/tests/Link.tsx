import { useEffect, useState } from "react";

type TStatus = "hovered" | "normal";

interface IProps {
	href: string;
}

const Link: React.FC<IProps> = ({ href, children }) => {
	const [status, setStatus] = useState<TStatus>("normal");

	const onMouseEnter = () => setStatus("hovered");
	const onMouseLeave = () => setStatus("normal");

	useEffect(() => {
		console.log(status);
	}, [status]);

	return (
		<a
			{...{
				href,
				onMouseEnter,
				onMouseLeave,
			}}
			className={status}
		>
			{children}
		</a>
	);
};

export default Link;
