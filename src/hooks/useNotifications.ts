import create from "zustand";

type TNotificationId = string;

interface INotification {
  type: "error" | "warning" | "success";
  component: React.ReactNode;
}

interface INotifications {
  [id: TNotificationId]: INotification;
}

interface INotificationStore {
  notifications: INotifications;
  addNotification: (id: TNotificationId, notification: INotification) => void;
  removeNotification: (id: TNotificationId) => void;
  removeAllNotifications: () => void;
}

const useNotificationsStore = create<INotificationStore>((set, get) => {
  const notifications: INotifications = {};

  const updateNotifications = (newNots: INotifications) =>
    set(({ notifications: old }) => ({
      notifications: { ...old, ...newNots },
    }));

  const addNotification = (
    id: TNotificationId,
    notification: INotification
  ) => {
    const { notifications } = get();
    notifications[id] = notification;
    updateNotifications(notifications);
  };

  const removeNotification = (id: TNotificationId) => {
    const { notifications } = get();
    delete notifications[id];
    updateNotifications(notifications);
  };

  const removeAllNotifications = () => {
    set(() => ({ notifications: {} }));
  };

  return {
    notifications,
    addNotification,
    removeAllNotifications,
    removeNotification,
  };
});

const useNotifications = () => {
  const { notifications, ...store } = useNotificationsStore();

  const mapNotifications = () =>
    Object.entries(notifications).map(([id, notification]) => ({
      id,
      notification,
    }));

  return { notifications, ...store, mapNotifications };
};

export default useNotifications;
