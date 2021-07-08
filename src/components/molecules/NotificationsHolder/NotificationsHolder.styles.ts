import tw, { TwStyle } from "twin.macro";
import styled from "styled-components";
import { TNotificationType } from "hooks/useNotifications";
import { XIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";

const NotificationsHolder = tw.div`
	fixed
  bottom-0
  right-0
  z-40
  px-8
  py-8
`;

const typeStyles: Record<TNotificationType, TwStyle> = {
  success: tw`
      bg-red-400!
      text-red-50
    `,
  warning: tw`
      bg-yellow-400!
      text-yellow-50
    `,
  error: tw`
      bg-green-400!
      text-green-50
    `,
};

// Type styles if type is not undefined else default values.
const getTypeStyle = (type: TNotificationType) =>
  !!type
    ? typeStyles[type]
    : tw`
        light:bg-light-500
        dark:bg-dark-400
        text-gray-100
      `;

const Notification = styled(motion.div)(
  ({ type }: { type: TNotificationType }) => [
    getTypeStyle(type),
    tw`
      rounded-2xl
      shadow-lg
      border
      border-gray-100
      relative
      cursor-move
      mt-6
      ml-6
    `,
  ]
);

const Wrapper = tw.div`
  py-7
  px-4
  break-all
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
  text-2xl
`;

const Styled = {
  NotificationsHolder,
  Notification,
  CloseIcon,
  Wrapper,
  Icon,
};
export default Styled;
