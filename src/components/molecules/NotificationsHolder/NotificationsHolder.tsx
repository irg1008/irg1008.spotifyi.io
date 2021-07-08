import useNotifications from "hooks/useNotifications";
import { useEffect } from "react";
import Styled from "./NotificationsHolder.styles";

interface INotificationsHolderProps {}

const NotificationsHolder = (props: INotificationsHolderProps) => {
	const { notificationMap, addNotification } = useNotifications();

	useEffect(() => {
		console.log(notificationMap);
	}, [notificationMap]);

	return (
		<Styled.NotificationsHolder>
			<button
				onClick={() => {
					addNotification({
						id: "holiwis",
						component: <p>Holi</p>,
						type: "error",
					});
				}}
			>
				Dame aquí
			</button>
		</Styled.NotificationsHolder>
	);
};

export default NotificationsHolder;
