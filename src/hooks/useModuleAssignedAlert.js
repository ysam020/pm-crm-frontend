import { useEffect } from "react";
import { io } from "socket.io-client";

function useModuleAssignedAlert(user, setUser, setAlert) {
  useEffect(() => {
    const socket = io(process.env.REACT_APP_SERVER_URL, {
      transports: ["websocket", "polling"],
      auth: {
        username: user?.username,
      },
    });

    if (user?.username) {
      socket.on("modulesAssigned", (data) => {
        setUser({
          ...user,
          modules: data.modules,
        });

        setAlert({
          open: true,
          message: `New module(s) assigned: ${data.modules.join(", ")}`,
          severity: "info",
        });
      });

      socket.on("modulesUnassigned", (data) => {
        setUser({
          ...user,
          modules: data.modules,
        });
      });
    }

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, [user?.username]);
}

export default useModuleAssignedAlert;
