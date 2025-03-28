import apiClient from "../../config/axiosConfig";

// Save FCM token
export const saveToken = async (token, setAlert) => {
  try {
    const res = await apiClient.put(`/save-fcm-token`, { fcmToken: token });
    console.log(res);
    // Only set alert if setAlert is provided
    if (setAlert) {
      setAlert({
        open: true,
        message: res.data.message,
        severity: "success",
      });
    }
  } catch (error) {
    console.log(error);

    if (setAlert) {
      setAlert({
        open: true,
        message:
          error.message === "Network Error"
            ? "Network Error, your details will be submitted when you are back online"
            : error.response?.data?.message || "An unexpected error occurred",
        severity: "error",
      });
    }
  }
};
