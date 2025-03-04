import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/sidebar.scss";
import { Avatar, IconButton, ListItemButton, Tooltip } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { UserContext } from "../../contexts/UserContext";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ContrastIcon from "@mui/icons-material/Contrast";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { ThemeContext } from "../../contexts/ThemeContext";

function Sidebar(props) {
  const navigate = useNavigate();
  const { user, handleLogout } = useContext(UserContext);
  const { toggleTheme } = useContext(ThemeContext);
  const handleNavigation = (path) => {
    navigate(path);
  };

  const navItems = [
    { title: "Dashboard", icon: <SpaceDashboardIcon />, path: "/" },
    { title: "Calendar", icon: <CalendarMonthIcon />, path: "/calendar" },
    { title: "Modules", icon: <ViewModuleIcon />, path: "/modules" },
    // Conditionally render "Assign Module" based on user.rank
    ...(user.rank <= 2
      ? [
          {
            title: "Assign Module",
            icon: <AssignmentIndIcon />,
            path: "/assign",
          },
        ]
      : []),
    { title: "Analytics", icon: <EqualizerIcon />, path: "/analytics" },
    { title: "Help", icon: <LiveHelpIcon />, path: "/help" },
  ];

  return (
    <div className="sidebar">
      <Tooltip
        title={`Welcome ${user.first_name}`}
        enterDelay={0}
        placement="right"
      >
        <IconButton
          onClick={() => handleNavigation("/profile")}
          className="avatar-button"
        >
          <Avatar src={user.employee_photo} alt="Employee Photo" />
        </IconButton>
      </Tooltip>

      {navItems.map((item, index) => (
        <Tooltip title={item.title} placement="right" key={index}>
          <ListItemButton
            className={`appbar-links ${item.title}`}
            aria-label="list-item"
            onClick={() => handleNavigation(item.path)}
          >
            <IconButton aria-label="icon">{item.icon}</IconButton>
          </ListItemButton>
        </Tooltip>
      ))}

      <Tooltip title="Toggle Theme" enterDelay={0} placement="right">
        <ListItemButton
          sx={{ textAlign: "left" }}
          className="appbar-links theme-btn"
          aria-label="list-item"
          onClick={toggleTheme}
        >
          <IconButton aria-label="icon">
            <ContrastIcon />
          </IconButton>
        </ListItemButton>
      </Tooltip>

      <Tooltip title="Run Tour" enterDelay={0} placement="right">
        <ListItemButton
          sx={{ textAlign: "left" }}
          className="appbar-links tour-btn"
          aria-label="list-item"
          onClick={() => props.setRun(true)}
        >
          <IconButton aria-label="icon">
            <PlayCircleIcon />
          </IconButton>
        </ListItemButton>
      </Tooltip>

      <Tooltip title="Logout" enterDelay={0} placement="right">
        <ListItemButton
          sx={{ textAlign: "left" }}
          className="appbar-links logout-btn"
          aria-label="list-item"
          onClick={handleLogout}
        >
          <IconButton aria-label="icon">
            <LogoutRoundedIcon />
          </IconButton>
        </ListItemButton>
      </Tooltip>
    </div>
  );
}

export default React.memo(Sidebar);
