import {
	useNotificationsValue,
	useNotifications,
	INotification,
	TNotificationType,
} from "hooks/useNotifications";
import { useCallback, useEffect, useState } from "react";
import Styled from "./NotificationsHolder.styles";
import { AnimatePresence, PanInfo, Variant } from "framer-motion";
import {
	ExclamationIcon as WarningIcon,
	ExclamationCircleIcon as ErrorIcon,
	CheckCircleIcon as SuccessIcon,
} from "@heroicons/react/outline";

interface INotificationProps {
	notification: INotification;
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

	return !!type && <Styled.Icon>{typeIcon[type]}</Styled.Icon>;
};

const Notification = ({
	notification: { id, type, component, timeout },
}: INotificationProps) => {
	const { removeNotification } = useNotifications();

	const onClose = useCallback(
		() => removeNotification(id),
		[id, removeNotification],
	);

	// Remove after given time if setted.
	useEffect(() => {
		if (!!timeout) {
			setTimeout(() => {
				onClose();
			}, timeout);
		}
	}, [timeout, onClose]);

	const variants: Variants = {
		initial: { opacity: 0, scale: 0.8, x: 300 },
		animate: { opacity: 1, scale: 1, x: 0 },
		exit: { opacity: 0, scale: 0.8, x: 300 },
	};

	const swipeVelocityThreshold = 15;
	const swipeOffsetThreshold = 200;
	const offsetThreshold = 350;

	const canCloseWithOffset = (offset: number) => offset > offsetThreshold;
	const canCloseWithVelocity = (offset: number, velocity: number) =>
		velocity > swipeVelocityThreshold && offset > swipeOffsetThreshold;

	const onDragClose = (info: PanInfo) => {
		const { velocity, offset } = info;
		const closeWithVelocity = canCloseWithVelocity(offset.x, velocity.x);
		const closeWithOffset = canCloseWithOffset(offset.x);

		if (closeWithVelocity || closeWithOffset) {
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
				stiffness: offsetThreshold,
				damping: 30,
			}}
			layout="position"
			drag="x"
			dragConstraints={{ left: 0, right: 0 }}
			dragElastic={{ left: 0.02, right: 0.2 }}
			dragMomentum={false}
			onDragEnd={(_, info) => onDragClose(info)}
			title="Click the x icon or drag right to close"
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

	const [exitComplete, setExitComplete] = useState<boolean>();

	useEffect(() => {
		if (notifications.length > 0) {
			setExitComplete(false);
		}
	}, [notifications]);

	return (
		<AnimatePresence>
			{(notifications.length > 0 || !exitComplete) && (
				<Styled.NotificationsHolder>
					<AnimatePresence onExitComplete={() => setExitComplete(true)}>
						{notifications.map((not) => (
							<Notification key={not.id} notification={not} />
						))}
					</AnimatePresence>
				</Styled.NotificationsHolder>
			)}
		</AnimatePresence>
	);
};

export default NotificationsHolder;
