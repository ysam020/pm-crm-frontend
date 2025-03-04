import React, { useState, useContext, Suspense } from "react";
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
import { ChatBotWidget } from "chatbot-widget-ui";
import ChatIcon from "@mui/icons-material/Chat";
import apiClient from "../config/axiosConfig.js";
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
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello, how can I assist you today!" },
  ]);

  const filteredRoutes = routesConfig(user);

  const handleChatbot = async (message) => {
    try {
      const response = await apiClient.post(
        `/chatbot`,
        {
          message,
        },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error in API call:", error);
      return "Oops! Something went wrong. Try again."; // Fallback error message
    }
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, setNotifications, loading, setLoading }}
    >
      <TabValueContext.Provider value={{ tabValue, setTabValue }}>
        <Tour run={run} setRun={setRun} />
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppbarComponent
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            showSidebar={props.showSidebar}
            setShowSidebar={props.setShowSidebar}
          />

          {props.showSidebar && (
            <DrawerComponent
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
              setRun={setRun}
            />
          )}

          {/* Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: {
                lg: `calc(100% - ${drawerWidth}px)`,
              },
              backgroundColor: theme === "light" ? "#F9FAFB" : "#111B21",
              height: "100vh",
              overflow: "scroll",
              padding: events.length === 0 ? "20px" : "50px 20px",
              paddingTop: 0,
            }}
          >
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
                          <ProtectedRoute allowedModules={allowedModules}>
                            {element}
                          </ProtectedRoute>
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
                    <UnAuthorisedRoute />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <UnAuthorisedRoute />
                  </Suspense>
                }
              />
            </Routes>

            {events.length > 0 && (
              <Suspense fallback={<div>Loading...</div>}>
                <EventStrip events={events} />
              </Suspense>
            )}
          </Box>
        </Box>

        <ChatBotWidget
          callApi={handleChatbot}
          primaryColor="#0B61AE"
          inputMsgPlaceholder="Type your message..."
          chatbotName="Chatbot"
          isTypingMessage="Typing..."
          IncommingErrMsg="Oops! Something went wrong. Try again."
          handleNewMessage={setMessages}
          chatIcon={<ChatIcon />}
          messages={messages}
        />
      </TabValueContext.Provider>
    </NotificationContext.Provider>
  );
}

export default React.memo(HomePage);
