import useNotifications, { INotification } from "hooks/useNotifications";
import { useEffect, useState } from "react";
import Styled from "./NotificationsHolder.styles";
import { AnimatePresence } from "framer-motion";

interface INotificationsHolderProps {}

interface INotificationProps {
	notification: INotification;
	onClose: () => void;
}

const Notification = ({
	notification: { type, component },
	onClose,
}: INotificationProps) => {
	const [closed, setClosed] = useState<boolean>();

	useEffect(() => {
		setClosed(false);
	}, []);

	return (
		<AnimatePresence onExitComplete={onClose}>
			{!closed && (
				<Styled.Notification
					{...{ type }}
					initial={{ x: "100%", opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: "100%", opacity: 0 }}
					transition={{
						type: "spring",
					}}
				>
					<Styled.Wrapper>{component}</Styled.Wrapper>
					<Styled.CloseIcon onClick={() => setClosed(true)} />
				</Styled.Notification>
			)}
		</AnimatePresence>
	);
};

const NotificationsHolder = (props: INotificationsHolderProps) => {
	const {
		notifications,
		addNotification,
		removeAllNotifications,
		removeNotification,
		updateNotification,
	} = useNotifications();

	useEffect(() => {
		addNotification({
			id: "1",
			component: (
				<p>
					1dfsddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
					1dfsddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
					1dfsddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
					1dfsddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
				</p>
			),
			type: "success",
		});
		addNotification({ id: "2", component: <p>2</p>, type: "error" });
		addNotification({ id: "3", component: <h1>3</h1>, type: "warning" });
		addNotification({ id: "4", component: "4" });
	}, [addNotification]);

	useEffect(() => {
		console.log(notifications);
	}, [notifications]);

	return (
		<Styled.NotificationsHolder>
			{notifications.map((not) => (
				<Notification
					key={not.id}
					notification={not}
					onClose={() => removeNotification(not.id)}
				/>
			))}
		</Styled.NotificationsHolder>
	);
};

export default NotificationsHolder;
