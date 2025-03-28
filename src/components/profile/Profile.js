import * as React from "react";
import "../../styles/profile.scss";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import useTabs from "../../hooks/useTabs";
import { getSessionData } from "../../utils/auth/getSessionData";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../contexts/AlertContext";
import ErrorFallback from "../customComponents/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

const BasicInfo = React.lazy(() => import("./BasicInfo"));
const LoggedInDevices = React.lazy(() => import("./LoggedInDevices"));
const ResetPassword = React.lazy(() => import("./ResetPassword"));
const BackupCodes = React.lazy(() => import("./BackupCodes"));
const TwoFactorAuthentication = React.lazy(() =>
  import("./TwoFactorAuthentication")
);
const PushNotifications = React.lazy(() => import("./PushNotifications"));

function Profile() {
  const [value, setValue] = React.useState(
    () => Number(localStorage.getItem("profile_tab_value")) || 0
  );
  const [geolocation, setGeolocation] = React.useState([]);
  const { setUser, user } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(false);
  const { setAlert } = React.useContext(AlertContext);
  const navigate = useNavigate();
  const { a11yProps, CustomTabPanel } = useTabs();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("profile_tab_value", newValue);
  };

  React.useEffect(() => {
    getSessionData(setGeolocation, setLoading);
  }, []);

  const logOutAllDevices = React.useCallback(async () => {
    const { logOutFromAllSessions } = await import(
      "../../utils/auth/logOutFromAllSessions"
    );
    logOutFromAllSessions(setUser, navigate, setAlert);
  }, [setUser, navigate, setAlert]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="profile tabs">
          {[
            "Basic Info",
            "Logged in Devices",
            "2FA and Notifications",
            "Reset Password",
            "Backup Codes",
          ].map((label, index) => (
            <Tab key={index} label={label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>

      <Box>
        <CustomTabPanel value={value} index={0}>
          <React.Suspense fallback={"Loading..."}>
            <ErrorBoundary fallback={<ErrorFallback />}>
              <BasicInfo user={user} />
            </ErrorBoundary>
          </React.Suspense>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <React.Suspense fallback={"Loading..."}>
            <ErrorBoundary fallback={<ErrorFallback />}>
              <LoggedInDevices
                geolocation={geolocation}
                setGeolocation={setGeolocation}
                loading={loading}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "20px",
                }}
              >
                <button className="btn" onClick={logOutAllDevices}>
                  Log out from all devices
                </button>
              </div>
            </ErrorBoundary>
          </React.Suspense>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <div className="profile-container">
            <React.Suspense fallback={"Loading..."}>
              <ErrorBoundary fallback={<ErrorFallback />}>
                <TwoFactorAuthentication />
              </ErrorBoundary>
              <ErrorBoundary fallback={<ErrorFallback />}>
                <PushNotifications />
              </ErrorBoundary>
            </React.Suspense>
          </div>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={3}>
          <React.Suspense fallback={"Loading..."}>
            <ErrorBoundary fallback={<ErrorFallback />}>
              <ResetPassword />
            </ErrorBoundary>
          </React.Suspense>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={4}>
          <React.Suspense fallback={"Loading..."}>
            <ErrorBoundary fallback={<ErrorFallback />}>
              <BackupCodes />
            </ErrorBoundary>
          </React.Suspense>
        </CustomTabPanel>
      </Box>
    </Box>
  );
}

export default React.memo(Profile);
