import "./App.scss";
import React, { useState, useMemo, useEffect, Suspense } from "react";
import { ThemeContext } from "./contexts/ThemeContext.js";
import { AlertContext } from "./contexts/AlertContext.js";
import { UserContext } from "./contexts/UserContext.js";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import useUserVerification from "./hooks/useUserVerification";
import useLogout from "./hooks/useLogout";
import useSpotlightModal from "./hooks/useSpotlightModal";
import useNavigateWithKeyboard from "./hooks/useNavigateWithKeyboard";
import useFullScreen from "./hooks/useFullScreen.js";
import useModuleAssignedAlert from "./hooks/useModuleAssignedAlert.js";
import useToggleSidebar from "./hooks/useToggleSidebar.js";
import useBroadcastApi from "./hooks/useBroadcastApi.js";
import { ThemeProvider } from "@mui/material/styles";
import useTheme from "./hooks/useTheme.js";
import useMuiTheme from "./hooks/useMuiTheme.js";
const HomePage = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const SpotlightModal = React.lazy(() => import("./modals/SpotlightModal"));
const BroadcastModal = React.lazy(() => import("./modals/BroadcastModal"));

function App() {
  const [user, setUser] = useState();
  const { theme, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme(theme);
  const [alert, setAlert] = React.useState({
    open: false,
    message: "",
    severity: "",
  });
  const handleLogout = useLogout(setUser);
  const [showSidebar, setShowSidebar] = useState(true);
  const [broadcastModal, setBroadcastModal] = useState(false);
  const channel = useMemo(() => new BroadcastChannel("app-tabs"), []);
  const { open, handleOpen, handleClose } = useSpotlightModal(user);
  const loading = useUserVerification(setUser);
  useModuleAssignedAlert(user, setUser, setAlert);
  useNavigateWithKeyboard();
  useFullScreen();
  useToggleSidebar(setShowSidebar);
  const handleUseInThisTab = useBroadcastApi(channel, setBroadcastModal);

  useEffect(() => {
    if (alert.open) {
      const timer = setTimeout(() => {
        setAlert({ ...alert, open: false });
      }, 2000);

      return () => clearTimeout(timer); // Cleanup on component unmount
    }
  }, [alert]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={muiTheme}>
        <UserContext.Provider value={{ user, setUser, handleLogout }}>
          <AlertContext.Provider value={{ alert, setAlert }}>
            <div className="App" id={theme}>
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                  }}
                >
                  <CircularProgress />
                </div>
              ) : user ? (
                <Suspense fallback={<CircularProgress />}>
                  <HomePage
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                  />
                </Suspense>
              ) : (
                <Suspense fallback={<CircularProgress />}>
                  <LoginPage />
                </Suspense>
              )}
            </div>

            <Suspense fallback={<CircularProgress />}>
              <SpotlightModal
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
              />
            </Suspense>

            <Suspense fallback={<CircularProgress />}>
              <BroadcastModal
                open={broadcastModal}
                handleUseInThisTab={handleUseInThisTab}
                handleClose={(event, reason) => {
                  if (reason !== "backdropClick") {
                    setBroadcastModal(false);
                  }
                }}
              />
            </Suspense>

            {alert.open && (
              <Alert severity={alert.severity}>{alert.message}</Alert>
            )}
          </AlertContext.Provider>
        </UserContext.Provider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default React.memo(App);
