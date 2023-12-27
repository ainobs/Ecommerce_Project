import React, { useEffect } from 'react';
import { AiFillBell, AiOutlineClose } from 'react-icons/ai';
import useNotification from '../hooks/useNotification';

const Notification = () => {
  const { notifications, removeNotification } = useNotification();

  useEffect(() => {
    const notificationTimeouts = {};

    notifications.forEach((notification) => {
      if (!notification.action) {
        const timeoutId = setTimeout(() => {
          removeNotification(notification.id);
        }, 5000); // Adjust the duration as needed
        notificationTimeouts[notification.id] = timeoutId;
      }
    });

    return () => {
      // Clear timeouts on unmount
      Object.values(notificationTimeouts).forEach((timeoutId) =>
        clearTimeout(timeoutId)
      );
    };
  }, [notifications, removeNotification]);

  const notificationsWithAction = notifications.filter(
    (notification) => notification.action
  );
  const notificationsWithoutAction = notifications.filter(
    (notification) => !notification.action
  );

  return (
    <>
      <div className="fixed top-4 right-4 z-[100]">
        <div className="flex flex-col gap-2">
          {/* Notifications with actions */}
          {notificationsWithAction.map((notification) => (
            <div
              key={notification.id}
              className="bg-orange-500 text-white rounded-lg p-4 my-2 shadow-md flex gap-4 items-center justify-between"
            >
              <AiFillBell className="text-lg" />
              <div className="space-y-4">
                <div>{notification.message}</div>
                <button
                  onClick={() => {
                    notification.action && notification.action();
                    removeNotification(notification.id);
                  }}
                  className="px-2 py-1 bg-white text-primary text-sm rounded"
                >
                  {notification.buttonText}
                </button>
              </div>

              <AiOutlineClose
                onClick={() => removeNotification(notification.id)}
                className="text-lg"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100]">
        <div className="flex flex-col gap-2">
          {/* Notifications without actions */}
          {notificationsWithoutAction.map((notification) => (
            <div
              key={notification.id}
              className="bg-orange-500 text-white rounded-lg py-2 px-4 my-2 shadow-md"
            >
              {notification.message}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Notification;
