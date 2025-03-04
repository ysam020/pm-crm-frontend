import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import apiClient from "../config/axiosConfig";

const socket = io(process.env.REACT_APP_SERVER_URL, {
  transports: ["websocket", "polling"],
});

function useNotifications(user) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const res = await apiClient(`/get-notifications`);
        setNotifications(res.data);
      } catch (err) {
        console.error(err);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    }

    getData();

    socket.on("notification", (data) => {
      if (data.department === user.department && data.rank <= user.rank) {
        setNotifications([data, ...notifications]);
      }
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  return { notifications, setNotifications, loading, setLoading };
}

export default useNotifications;
