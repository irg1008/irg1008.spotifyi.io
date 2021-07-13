import {
	useNotificationsValue,
	useNotifications,
	INotification,
	TNotificationType,
} from "hooks/useNotifications";
import { useCallback, useEffect, useMemo } from "react";
import Styled from "./NotificationsHolder.styles";
import { AnimatePresence, PanInfo, Variant } from "framer-motion";
import {
	HiExclamation as WarningIcon,
	HiExclamationCircle as ErrorIcon,
	HiCheckCircle as SuccessIcon,
	HiInformationCircle as InfoIcon,
} from "react-icons/hi";
import { useTimeout } from "hooks/useTime";

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
		info: <InfoIcon />,
	};

	return !!type && <Styled.Icon>{typeIcon[type]}</Styled.Icon>;
};

const Notification = ({
	notification: { id, type, component, timeout },
}: INotificationProps) => {
	const { removeNotification } = useNotifications();

	const hasTimeout = useMemo(() => !!timeout, [timeout]);

	const onClose = useCallback(
		() => removeNotification(id),
		[id, removeNotification],
	);

	const { start, stop, percentage } = useTimeout({
		mills: timeout,
		startOnCall: false,
		cb: onClose,
	});

	const stopTimeout = useCallback(
		() => hasTimeout && stop(),
		[stop, hasTimeout],
	);
	const startTimeout = useCallback(
		() => hasTimeout && start(),
		[hasTimeout, start],
	);

	// Remove after given time if setted.
	useEffect(() => {
		startTimeout();
	}, [startTimeout]);

	const variants: Variants = {
		initial: { opacity: 0, scale: 0.8, x: 300 },
		animate: { opacity: 1, scale: 1, x: 0 },
		exit: { opacity: 0, scale: 0.8, x: 300 },
	};

	const swipeVelocityThreshold = 15;
	const swipeOffsetThreshold = 150;
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
				duration: 0.4,
			}}
			layout={true}
			drag="x"
			dragConstraints={{ left: 0, right: 0 }}
			dragElastic={{ left: 0.02, right: 0.2 }}
			dragMomentum={false}
			onDragEnd={(_, info) => onDragClose(info)}
			title="Click the x icon or drag right to close"
			onMouseEnter={stopTimeout}
			onMouseLeave={startTimeout}
		>
			<Styled.Wrapper>
				<NotificationIcon {...{ type }} />
				{component}
			</Styled.Wrapper>
			{hasTimeout && <Styled.Time style={{ width: `${percentage}%` }} />}
			<Styled.CloseIcon onClick={onClose} />
		</Styled.Notification>
	);
};

const NotificationsHolder = () => {
	const notifications = useNotificationsValue();
	return (
		<Styled.NotificationsHolder>
			<AnimatePresence>
				{notifications.map((not) => (
					<Notification key={not.id} notification={not} />
				))}
			</AnimatePresence>
		</Styled.NotificationsHolder>
	);
};

export default NotificationsHolder;
