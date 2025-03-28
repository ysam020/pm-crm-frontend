import React, { useState, useContext, useMemo } from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Popover, Box } from "@mui/material";
import Notifications from "../dashboard/Notifications";
import Badge from "@mui/material/Badge";
import { NotificationContext } from "../../contexts/NotificationContext";

const drawerWidth = 60;

function AppbarComponent({ showSidebar, setMobileOpen, mobileOpen }) {
  const navigate = useNavigate();
  const { notifications } = useContext(NotificationContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // Memoize the popover ID to avoid unnecessary recalculations
  const popoverId = useMemo(
    () => (open ? "notification-popover" : undefined),
    [open]
  );

  // Memoize the badge count to prevent unnecessary re-renders
  const notificationCount = useMemo(
    () => notifications?.length || 0,
    [notifications]
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        width: {
          lg: showSidebar ? `calc(100% - ${drawerWidth}px)` : "100%",
        },
        ml: { lg: `${drawerWidth}px` },
        backgroundColor: "transparent",
        backgroundImage: "none",
        backdropFilter: "blur(6px) !important",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={() => setMobileOpen(!mobileOpen)}
          sx={{ mr: 2, display: { lg: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {window.location.pathname !== "/" && (
          <IconButton
            aria-label="back"
            edge="start"
            onClick={() => navigate(-1)}
            sx={{ mr: 1 }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}

        <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <img
              src={"/assets/images/logo.webp"}
              alt="logo"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer", width: "120px", height: "60px" }}
            />
          </div>

          <Badge badgeContent={notificationCount} color="error">
            <NotificationsIcon
              onClick={handleNotificationClick}
              sx={{ cursor: "pointer" }}
            />
          </Badge>
        </div>
      </Toolbar>

      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        container={document.querySelector(".App")}
      >
        <Box sx={{ p: 0, minWidth: 250, maxWidth: 400 }}>
          <Notifications />
        </Box>
      </Popover>
    </AppBar>
  );
}

export default React.memo(AppbarComponent);
