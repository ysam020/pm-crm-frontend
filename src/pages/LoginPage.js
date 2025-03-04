import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import "../styles/login.scss";
const LoginForm = React.lazy(() => import("../forms/LoginForm"));
const ForgotPasswordForm = React.lazy(() =>
  import("../forms/ForgotPasswordForm.js")
);
const WebAuthnLoginForm = React.lazy(() =>
  import("../forms/WebAuthnLoginForm.js")
);

function LoginPage() {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [useWebAuthn, setUseWebAuthn] = useState(true);

  return (
    <Grid container className="login-container" style={{ height: "100vh" }}>
      <Grid
        size={6}
        className="login-left-col"
        style={{
          background: "url(/assets/images/login-bg.webp",
          backgroundSize: "cover",
        }}
      ></Grid>
      <Grid size={6} className="login-right-col">
        <div className="login-right-col-inner-container">
          <img src={"/assets/images/logo.webp"} alt="logo" width="100%" />

          {!forgotPassword ? (
            <>
              {useWebAuthn ? (
                <WebAuthnLoginForm
                  setUseWebAuthn={setUseWebAuthn}
                  username={username}
                  setUsername={setUsername}
                  setIsTwoFactorEnabled={setIsTwoFactorEnabled}
                />
              ) : (
                <LoginForm
                  username={username}
                  isTwoFactorEnabled={isTwoFactorEnabled}
                />
              )}
            </>
          ) : (
            <>
              <ForgotPasswordForm
                username={username}
                setForgotPassword={setForgotPassword}
              />
            </>
          )}
        </div>

        {/* Conditionally render "Forgot Password" and "Login Instead" */}
        {!useWebAuthn &&
          (!forgotPassword ? (
            <span className="span-text" onClick={() => setForgotPassword(true)}>
              Forgot Password
            </span>
          ) : (
            <span
              className="span-text"
              onClick={() => setForgotPassword(false)}
            >
              Login Instead
            </span>
          ))}
      </Grid>
    </Grid>
  );
}

export default React.memo(LoginPage);
