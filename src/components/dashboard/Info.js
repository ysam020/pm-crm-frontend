import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";

function Info({ user }) {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  // Memoizing styles to prevent unnecessary recalculations on re-renders
  const containerStyle = useMemo(
    () => ({
      background: "url(/assets/images/personal.webp)",
      backgroundColor: theme === "light" ? "#1abc9c" : "#212e35",
    }),
    [theme]
  );

  const textStyle = useMemo(
    () => ({
      color: theme === "light" ? "#EFEFEF" : "#BDBDBD",
      fontWeight: 700,
    }),
    [theme]
  );

  return (
    <div
      onClick={() => navigate("/profile")}
      className="dashboard-container info"
      style={containerStyle}
    >
      <p style={textStyle}>Welcome back,</p>
      <br />
      <h1>{user.full_name}</h1>
    </div>
  );
}

export default React.memo(Info);
