import React, { useContext, useMemo } from "react";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUpdateFavicon from "../../hooks/useUpdateFavicon";
import { NotificationContext } from "../../contexts/NotificationContext";

function Notifications() {
  const { notifications, loading } = useContext(NotificationContext);
  const navigate = useNavigate();
  useUpdateFavicon(notifications);

  // Memoize notifications list to avoid unnecessary re-renders
  const memoizedNotifications = useMemo(() => notifications, [notifications]);

  const renderSkeleton = useMemo(
    () => (key) =>
      (
        <div
          key={key}
          className="notification-container"
          style={{ display: "block" }}
        >
          <Skeleton width="20%" />
          <Skeleton />
          <Skeleton width="60%" />
        </div>
      ),
    []
  );

  const renderNotificationContent = useMemo(
    () => (item) =>
      (
        <>
          <span>{item.title}</span>
          <p>{item.message}</p>
        </>
      ),
    []
  );

  const handleNotificationClick = async (itemTitle) => {
    const { handleNotificationClick } = await import(
      "../../utils/notifications/handleNotificationClick"
    );
    handleNotificationClick(itemTitle, navigate);
  };

  return (
    <div className="notifications">
      {loading ? (
        Array(3)
          .fill(null)
          .map((_, index) => renderSkeleton(index))
      ) : memoizedNotifications.length > 0 ? (
        memoizedNotifications.map((item, id) => (
          <div
            key={id}
            className="notification-container"
            onClick={() => handleNotificationClick(item.title)}
          >
            {renderNotificationContent(item)}
          </div>
        ))
      ) : (
        <div className="notification-container">
          <p>No notifications</p>
        </div>
      )}
    </div>
  );
}

export default React.memo(Notifications);
