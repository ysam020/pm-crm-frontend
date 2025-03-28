import React, {
  useState,
  useContext,
  Suspense,
  useEffect,
  useMemo,
} from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Route, Routes } from "react-router-dom";
import { TabValueContext } from "../contexts/TabValueContext.js";
import AppbarComponent from "../components/home/AppbarComponent.js";
import DrawerComponent from "../components/home/DrawerComponent.js";
import routesConfig from "../routes/routesConfig.js";
import { UserContext } from "../contexts/UserContext";
import { NotificationContext } from "../contexts/NotificationContext";
import useNotifications from "../hooks/useNotifications.js";
import useEvents from "../hooks/useEvents.js";
import { ThemeContext } from "../contexts/ThemeContext.js";
import { setupTokenRefresh } from "../utils/pushNotifications/refreshToken.js";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/customComponents/ErrorFallback.js";
const ProtectedRoute = React.lazy(() => import("../routes/ProtectedRoute.js"));
const UnAuthorisedRoute = React.lazy(() =>
  import("../routes/UnAuthorisedRoute.js")
);
const EventStrip = React.lazy(() => import("../components/home/EventStrip.js"));
const Tour = React.lazy(() => import("../components/home/Tour.js"));

const drawerWidth = 60;

function HomePage(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [run, setRun] = useState(false);
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const { notifications, setNotifications, loading, setLoading } =
    useNotifications(user);
  const events = useEvents();

  // Memoized values to prevent unnecessary re-renders
  const filteredRoutes = useMemo(() => routesConfig(user), [user]);

  const notificationContextValue = useMemo(
    () => ({
      notifications,
      setNotifications,
      loading,
      setLoading,
    }),
    [notifications, setNotifications, loading, setLoading]
  );

  const tabValueContextValue = useMemo(
    () => ({ tabValue, setTabValue }),
    [tabValue]
  );

  const mainBoxStyles = useMemo(
    () => ({
      flexGrow: 1,
      width: { lg: `calc(100% - ${drawerWidth}px)` },
      backgroundColor: theme === "light" ? "#F9FAFB" : "#111B21",
      height: "100vh",
      overflow: "scroll",
      padding: events.length === 0 ? "20px" : "50px 20px",
      paddingTop: 0,
    }),
    [theme, events.length]
  );

  useEffect(() => {
    setupTokenRefresh();
  }, []);

  return (
    <NotificationContext.Provider value={notificationContextValue}>
      <TabValueContext.Provider value={tabValueContextValue}>
        <Tour run={run} setRun={setRun} />
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <ErrorBoundary fallback={<ErrorFallback />}>
            <AppbarComponent
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
              showSidebar={props.showSidebar}
              setShowSidebar={props.setShowSidebar}
            />
          </ErrorBoundary>

          {props.showSidebar && (
            <ErrorBoundary fallback={<ErrorFallback />}>
              <DrawerComponent
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
                setRun={setRun}
              />
            </ErrorBoundary>
          )}

          {/* Content */}
          <Box component="main" sx={mainBoxStyles}>
            <Toolbar />

            <Routes>
              {filteredRoutes.map(
                ({ path, element, allowedModules }, index) => (
                  <Route
                    key={index}
                    path={path}
                    element={
                      allowedModules.length === 0 ? (
                        element
                      ) : (
                        <Suspense fallback={<div>Loading...</div>}>
                          <ErrorBoundary fallback={<ErrorFallback />}>
                            <ProtectedRoute allowedModules={allowedModules}>
                              {element}
                            </ProtectedRoute>
                          </ErrorBoundary>
                        </Suspense>
                      )
                    }
                  />
                )
              )}
              <Route
                path="/not-authorized"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <ErrorBoundary fallback={<ErrorFallback />}>
                      <UnAuthorisedRoute />
                    </ErrorBoundary>
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <ErrorBoundary fallback={<ErrorFallback />}>
                      <UnAuthorisedRoute />
                    </ErrorBoundary>
                  </Suspense>
                }
              />
            </Routes>

            {events.length > 0 && (
              <Suspense fallback={<div>Loading...</div>}>
                <ErrorBoundary fallback={<ErrorFallback />}>
                  <EventStrip events={events} />
                </ErrorBoundary>
              </Suspense>
            )}
          </Box>
        </Box>
      </TabValueContext.Provider>
    </NotificationContext.Provider>
  );
}

export default React.memo(HomePage);
