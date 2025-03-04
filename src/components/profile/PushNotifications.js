import React, { useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid2";
import { AlertContext } from "../../contexts/AlertContext";

function PushNotifications() {
  const { setAlert } = useContext(AlertContext);
  return (
    <Grid container>
      <Grid size={12}>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <List
              sx={{
                width: "100%",
              }}
            >
              <ListItem alignItems="flex-start">
                <ListItemText primary="Push Notifications" />
                <ListItemText
                  secondary={
                    <>
                      <button
                        style={{ marginTop: 0 }}
                        className="btn"
                        onClick={async () => {
                          const { generateToken } = await import(
                            "../../utils/pushNotifications/generateToken"
                          );
                          generateToken(setAlert);
                        }}
                      >
                        Enable on this device
                      </button>
                      <button
                        style={{ marginTop: 0, marginLeft: "10px" }}
                        className="btn"
                        onClick={async () => {
                          const { disablePushNotifications } = await import(
                            "../../utils/pushNotifications/disablePushNotifications"
                          );
                          disablePushNotifications(setAlert);
                        }}
                      >
                        Disable
                      </button>
                    </>
                  }
                />
              </ListItem>
            </List>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default React.memo(PushNotifications);
