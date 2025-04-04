export const getGeolocation = async (setAlert) => {
  try {
    if (!navigator.geolocation) {
      return null;
    }

    // Get geolocation
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
        {
          timeout: 30000, // 30 seconds
          maximumAge: 0, // Don't use cached location
        }
      );
    });

    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  } catch (error) {
    let errorMessage;
    if (error.code === 1) {
      errorMessage =
        "Location permission is denied. Please enable location access.";
    } else if (error.message === "User denied Geolocation") {
      errorMessage =
        "Location permission denied. Please enable location permission to log in.";
    } else if (error.message) {
      errorMessage = error.message;
    } else {
      errorMessage = "An unknown error occurred.";
    }

    setAlert({
      open: true,
      message: errorMessage,
      severity: "error",
    });
    console.error("Error fetching geolocation:", error);
    return null; // Return null on error
  }
};
