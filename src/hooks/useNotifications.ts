import create from "zustand";

type TNotificationId = string;

interface INotification {
  id: TNotificationId;
  type: "error" | "warning" | "success";
  component: React.ReactNode;
}

interface INotificationStore {
  notificationMap: INotification[];
  addNotification: (notification: INotification) => void;
  removeNotificationWithId: (id: TNotificationId) => void;
  removeAllNotifications: () => void;
}

const useNotificationsStore = create<INotificationStore>((set, get) => ({
  notificationMap: [],
  addNotification: (notification) => {
    const { notificationMap: oldMap } = get();
    set(({ notificationMap: oldMap }) => ({
      notificationMap: [...oldMap, notification],
    }));
  },
  removeNotificationWithId: (id: TNotificationId) => {
    set(({ notificationMap: oldMap }) => ({
      notificationMap: oldMap.filter((not) => not.id !== id),
    }));
  },
  removeAllNotifications: () => {
    set({ notificationMap: [] });
  },
}));

const useNotifications = () => {
  return useNotificationsStore();
};

export default useNotifications;
