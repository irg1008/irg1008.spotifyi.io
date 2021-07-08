import {
	useNotificationsValue,
	useNotifications,
	INotification,
	TNotificationType,
} from "hooks/useNotifications";
import { useEffect } from "react";
import Styled from "./NotificationsHolder.styles";
import { AnimatePresence, PanInfo, Variant } from "framer-motion";
import {
	ExclamationIcon as WarningIcon,
	ExclamationCircleIcon as ErrorIcon,
	CheckCircleIcon as SuccessIcon,
} from "@heroicons/react/outline";

interface INotificationProps {
	notification: INotification;
	onClose: () => void;
}

type Variants = {
	[key: string]: Variant;
};

interface INotificationIconProps {
	type: TNotificationType;
}

const NotificationIcon = ({ type }: INotificationIconProps) => {
	const typeIcon: Record<TNotificationType, JSX.Element> = {
		success: <SuccessIcon />,
		warning: <WarningIcon />,
		error: <ErrorIcon />,
	};

	return <Styled.Icon>{typeIcon[type]}</Styled.Icon>;
};

const Notification = ({
	notification: { type, component, timeout },
	onClose,
}: INotificationProps) => {
	const variants: Variants = {
		initial: { opacity: 0, scale: 0.8, x: 300 },
		animate: { opacity: 1, scale: 1, x: 0 },
		exit: { opacity: 0, scale: 0.8, x: 300 },
	};

	// Remove after given time if setted.
	useEffect(() => {
		if (!!timeout) {
			setTimeout(() => {
				onClose();
			}, timeout);
		}
	}, [timeout, onClose]);

	const dragGoesOutPoint = 100;

	const onDragClose = (info: PanInfo) => {
		const {
			offset: { x },
		} = info;

		if (x > dragGoesOutPoint) {
			onClose();
		}
	};

	return (
		<Styled.Notification
			{...{ type }}
			variants={variants}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{
				type: "spring",
				stiffness: 500,
				damping: 40,
			}}
			layout="position"
			drag="x"
			dragConstraints={{ left: 0, right: 0 }}
			dragElastic={{ left: 0.1, right: 0.5 }}
			dragMomentum={false}
			onDragEnd={(_, info) => onDragClose(info)}
		>
			<Styled.Wrapper>
				<NotificationIcon {...{ type }} />
				{component}
			</Styled.Wrapper>
			<Styled.CloseIcon onClick={onClose} />
		</Styled.Notification>
	);
};

const NotificationsHolder = () => {
	const notifications = useNotificationsValue();
	const { removeNotification } = useNotifications();

	return (
		<Styled.NotificationsHolder>
			<AnimatePresence>
				{notifications.map((not) => (
					<Notification
						key={not.id}
						notification={not}
						onClose={() => removeNotification(not.id)}
					/>
				))}
			</AnimatePresence>
		</Styled.NotificationsHolder>
	);
};

export default NotificationsHolder;
