// NotificationContext.tsx
import React, { createContext, useState, ReactNode, useRef } from 'react';

export const NotificationContext = createContext(undefined);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const notificationIdCounter = useRef(0);

  const addNotification = (message, buttonText, action) => {
    const id = notificationIdCounter.current.toString();
    notificationIdCounter.current += 1;

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id, message, action, buttonText },
    ]);
  };

  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider
      value={{ addNotification, removeNotification, notifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
