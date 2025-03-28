import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../../config/firebase";
import { saveToken } from "./saveToken";

// Function to refresh the FCM token
export const setupTokenRefresh = async (setAlert) => {
  try {
    // Get current FCM token
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    });

    if (token) {
      await saveToken(token, setAlert); // Send token to backend
    }

    // Listen for new tokens (Firebase auto-refreshes tokens)
    onMessage(messaging, async (payload) => {
      const refreshedToken = await getToken(messaging);
      if (refreshedToken) {
        await saveToken(refreshedToken, setAlert); // Update backend
      }
    });
  } catch (error) {
    console.error("Error setting up token refresh:", error);
  }
};
