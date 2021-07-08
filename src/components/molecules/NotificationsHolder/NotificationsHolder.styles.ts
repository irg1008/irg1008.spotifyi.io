import tw from "twin.macro";
import styled from "styled-components";
import { TNotificationType } from "hooks/useNotifications";
import { XIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";

const NotificationsHolder = tw.div`
	fixed
  bottom-0
  right-0
  z-40
  space-y-4
  space-x-4
  px-8
  py-8
`;

const getTypeStyle = (type: TNotificationType) => {
  switch (type) {
    case "error":
      return tw`
        bg-red-400!
      `;
    case "warning":
      return tw`
        bg-yellow-400!
      `;
    case "success":
      return tw`
        bg-green-400!
      `;
    default:
      return tw`
        light:bg-light-500
        dark:bg-dark-400
      `;
  }
};

const Notification = styled(motion.div)(
  ({ type }: { type: TNotificationType }) => [
    getTypeStyle(type),
    tw`
      rounded-2xl
      shadow-lg
      border
      border-gray-100
      text-gray-100
      relative
      cursor-move
    `,
  ]
);

const Wrapper = tw.div`
  py-7
  px-4
  break-words
  overflow-auto
  min-height[6rem]
  min-width[20rem]
  max-w-sm
`;

const CloseIcon = tw(XIcon)`
  cursor-pointer
  right-2
  top-2
  h-5
  w-5
  transition-opacity
  duration-200
  ease-in-out
  opacity-80
  hover:opacity-100
  absolute
`;

const Styled = { NotificationsHolder, Notification, CloseIcon, Wrapper };
export default Styled;
