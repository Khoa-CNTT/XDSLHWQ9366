import React, { createContext, useContext, useState, ReactNode } from "react";
import Notification from "../components/Notification/Notification";

type NotificationType = "success" | "error" | "info";

interface NotificationState {
  type: NotificationType;
  message: string;
}

interface NotificationContextProps {
  notify: (type: NotificationType, message: string) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error("useNotification must be used within NotificationProvider");
  return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<NotificationState | null>(
    null
  );

  const notify = (type: NotificationType, message: string) => {
    setNotification({ type, message });
  };

  const closeNotification = () => setNotification(null);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
        />
      )}
    </NotificationContext.Provider>
  );
};
