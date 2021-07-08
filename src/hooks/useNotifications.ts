import create from "zustand";
import _ from "lodash";

type TNotificationId = string;
type TNotificationType = "error" | "warning" | "success";

interface INotification {
  id: TNotificationId;
  type?: TNotificationType;
  component: React.ReactNode;
  timeout?: number;
}

type INotifications = INotification[];

interface INotificationStore {
  notifications: INotifications;
  addNotification: (notification: INotification) => void;
  updateNotification: (
    id: TNotificationId,
    notification: INotification
  ) => void;
  removeNotification: (id: TNotificationId) => void;
  removeAllNotifications: () => void;
}

const useNotificationsStore = create<INotificationStore>((set, get) => {
  const notifications: INotifications = [];

  const updateNotifications = (newNots: INotifications) =>
    set(() => ({
      notifications: [...newNots],
    }));

  const searchNotificationById = (
    id: TNotificationId,
    notifications: INotifications
  ) => _.find(notifications, (not) => not.id === id);

  const addNotification = (notification: INotification) => {
    const { notifications } = get();

    const isIncluded = !!searchNotificationById(notification.id, notifications);

    // If not already included.
    if (!isIncluded) {
      notifications.push(notification);
      updateNotifications(notifications);
    }
  };

  const updateNotification = (
    id: TNotificationId,
    notification: INotification
  ) => {
    const { notifications } = get();

    const notificationToUpdate = searchNotificationById(id, notifications);

    if (!!notificationToUpdate) {
      const areEqual = _.isEqual(notification, notificationToUpdate);

      if (!areEqual) {
        const indexToUpdate = _.indexOf(notifications, notificationToUpdate);
        notifications[indexToUpdate] = notification;
        updateNotifications(notifications);
      }
    }
  };

  const removeNotification = (id: TNotificationId) => {
    const { notifications } = get();

    const prevLength = notifications.length;
    const newNots = _.filter(notifications, (not) => not.id !== id);
    const newLength = newNots.length;

    // If removed object.
    if (newLength < prevLength) {
      updateNotifications(newNots);
    }
  };

  const removeAllNotifications = () => {
    const { notifications } = get();
    if (notifications.length !== 0) {
      updateNotifications([]);
    }
  };

  return {
    notifications,
    addNotification,
    removeAllNotifications,
    removeNotification,
    updateNotification,
  };
});

const useNotifications = () => {
  const store = useNotificationsStore();
  return store;
};

export type { TNotificationType, INotification };
export default useNotifications;
