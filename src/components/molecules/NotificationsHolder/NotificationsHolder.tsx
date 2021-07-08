import useNotifications from "hooks/useNotifications";
import { entries } from "lodash";
import { useEffect, useState } from "react";
import Styled from "./NotificationsHolder.styles";

interface INotificationsHolderProps {}

const Comp = ({ text }: { text: string }) => {
	return <p>{text}</p>;
};

const NotificationsHolder = (props: INotificationsHolderProps) => {
	const {
		notifications,
		addNotification,
		removeAllNotifications,
		removeNotification,
		mapNotifications,
	} = useNotifications();

	useEffect(() => {
		console.log(notifications);
	}, [notifications]);

	const [value, setValue] = useState("");

	return (
		<Styled.NotificationsHolder>
			<button
				onClick={() => {
					addNotification("1", {
						component: <Comp text={"holi"} />,
						type: "error",
					});
				}}
			>
				Añade 1
			</button>
			<button
				onClick={() => {
					addNotification("2", {
						component: <Comp text={value} />,
						type: "success",
					});
				}}
			>
				Añade 2
			</button>
			<button
				onClick={() => {
					removeNotification("1");
				}}
			>
				Quita 1
			</button>
			<button
				onClick={() => {
					removeNotification("2");
				}}
			>
				Quita 2
			</button>
			<button
				onClick={() => {
					removeAllNotifications();
				}}
			>
				Quita todos
			</button>
			<input type="text" onChange={(e) => setValue(e.target.value)}></input>
			{mapNotifications().map(({ id, notification }) => (
				<div key={id}>{notification.component}</div>
			))}
		</Styled.NotificationsHolder>
	);
};

export default NotificationsHolder;
