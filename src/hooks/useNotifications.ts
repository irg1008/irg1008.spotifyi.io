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
    const isIncluded = oldMap.some((not) => not.id === notification.id);
    !isIncluded && oldMap.push(notification);
    console.log(oldMap);
    set(() => ({ notificationMap: oldMap }));
  },
  removeNotificationWithId: (id: TNotificationId) => {
    const { notificationMap: oldMap } = get();
    oldMap.filter((not) => not.id !== id);
    set(() => ({ notificationMap: oldMap }));
  },
  removeAllNotifications: () => {
    set(() => ({ notificationMap: [] }));
  },
}));

const useNotifications = () => {
  return useNotificationsStore();
};

export default useNotifications;
