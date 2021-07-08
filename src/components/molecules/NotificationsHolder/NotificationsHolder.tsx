import useNotifications from "hooks/useNotifications";
import { useEffect, useState } from "react";
import Styled from "./NotificationsHolder.styles";

interface INotificationsHolderProps {}

const NotificationsHolder = (props: INotificationsHolderProps) => {
	const { notificationMap, addNotification } = useNotifications();

	useEffect(() => {
		console.log(notificationMap);
	}, [notificationMap]);

	const Comp = ({ text }: { text: string }) => {
		return <p>{text}</p>;
	};

	const [value, setValue] = useState("");

	return (
		<Styled.NotificationsHolder>
			<button
				onClick={() => {
					addNotification({
						id: "1",
						component: <p>Holi</p>,
						type: "error",
					});
				}}
			>
				Dame aquí
			</button>
			<button
				onClick={() => {
					addNotification({
						id: "2",
						component: <Comp text={value} />,
						type: "error",
					});
				}}
			>
				Dame aquí
			</button>
			<input type="text" onChange={(e) => setValue(e.target.value)}></input>
		</Styled.NotificationsHolder>
	);
};

export default NotificationsHolder;
