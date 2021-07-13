import tw, { TwStyle, styled, css } from "twin.macro";
import { TNotificationType } from "hooks/useNotifications";
import { HiX as XIcon } from "react-icons/hi";
import { motion } from "framer-motion";

const NotificationsHolder = tw(motion.div)`
	fixed
  bottom-0
  right-0
  z-40
  px-8
  py-8
  flex
  flex-col
  justify-end
  items-end
`;

const notificationStyles: Record<TNotificationType, TwStyle> = {
  error: tw`
      bg-red-400!
      text-red-50
      border-red-200
    `,
  warning: tw`
      bg-yellow-400!
      text-yellow-50
      border-yellow-200
    `,
  success: tw`
      bg-green-400!
      text-green-50
      border-green-200
    `,
  info: tw`
    bg-blue-400!
    text-blue-50
    border-blue-200
    `,
};

// Type styles if type is not undefined else default values.
const getNotificationStyle = (type: TNotificationType) =>
  !!type
    ? notificationStyles[type]
    : tw`
        bg-accent-dark
        text-gray-100
        border-gray-200
      `;

const Notification = styled(motion.div)(
  ({ type }: { type: TNotificationType }) => [
    getNotificationStyle(type),
    tw`
      rounded-2xl
      shadow-lg
      border-2
      relative
      cursor[grab]
      mt-6
      ml-6
      overflow-hidden
      leading-6
    `,
  ]
);

const Wrapper = tw.div`
  py-7
  px-7
  overflow-auto
  min-height[6rem]
  min-width[20rem]
  max-w-lg
  flex
  items-center
`;

const CloseIcon = tw(XIcon)`
  cursor-pointer
  right-2
  top-2
  h-5
  w-5
  text-gray-100
  transition-opacity
  duration-200
  ease-in-out
  opacity-80
  hover:opacity-100
  absolute
`;

const Icon = tw.div`
  mr-4
  text-3xl
`;

const Time = tw.div`
  h-1.5
  bg-white
  bg-opacity-50
`;

const Styled = {
  NotificationsHolder,
  Notification,
  CloseIcon,
  Wrapper,
  Icon,
  Time,
};
export default Styled;
