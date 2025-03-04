import React, { useContext } from "react";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUpdateFavicon from "../../hooks/useUpdateFavicon";
import { NotificationContext } from "../../contexts/NotificationContext";

function Notifications() {
  const { notifications, loading } = useContext(NotificationContext);
  const navigate = useNavigate();
  useUpdateFavicon(notifications);

  const renderSkeleton = (key) => (
    <div
      key={key}
      className="notification-container"
      style={{ display: "block" }}
    >
      <Skeleton width="20%" />
      <Skeleton />
      <Skeleton width="60%" />
    </div>
  );

  const renderNotificationContent = (item) => (
    <div style={{ flex: 1 }}>
      <span>{item.title}</span>
      <p>{item.message}</p>
    </div>
  );

  const handleNotificationClick = async (itemTitle) => {
    const { handleNotificationClick } = await import(
      "../../utils/notifications/handleNotificationClick"
    );
    handleNotificationClick(itemTitle, navigate);
  };

  return (
    <div className="dashboard-container notifications">
      <h2>
        <strong>Notifications</strong>
      </h2>
      {loading ? (
        Array(3)
          .fill(null)
          .map((_, index) => renderSkeleton(index))
      ) : notifications.length > 0 ? (
        notifications.map((item, id) => (
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
