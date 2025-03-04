import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";

function Info(props) {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  return (
    <div
      onClick={() => navigate("/profile")}
      className="dashboard-container info"
      style={{
        background: "url(/assets/images/personal.webp)",
        backgroundColor: theme === "light" ? "#1abc9c" : "#212e35",
      }}
    >
      <p>Welcome back,</p>
      <br />
      <h1>{props.user.full_name}</h1>
    </div>
  );
}

export default React.memo(Info);
