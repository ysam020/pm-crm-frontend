import { getGeolocation } from "../auth/getGeolocation";
import apiClient from "../../config/axiosConfig";

// Step 7: Finalize login and update user state
export async function login(username, serializedCredential, setUser, setAlert) {
  const geolocation = await getGeolocation(setAlert);
  try {
    const response = await apiClient.post(`/webauthn-login`, {
      username,
      geolocation,
      userAgent: navigator.userAgent,
      credential: serializedCredential,
    });

    if (response.data.message === "Login successful") {
      setUser(response.data.user);
    } else {
      setAlert({
        open: true,
        message: response.data.message,
        severity: "error",
      });
    }

    await apiClient.post("/unusual-login-detection", {
      geolocation,
    });
  } catch (error) {
    setAlert({
      open: true,
      message: error.response.data.message,
      severity: "error",
    });
  }
}
