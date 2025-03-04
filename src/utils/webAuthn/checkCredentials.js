import apiClient from "../../config/axiosConfig";

// Step 1: Check if WebAuthn credentials exist
export async function checkCredentials(username) {
  try {
    const response = await apiClient.post(`/webauthn-credential-check`, {
      username,
    });

    return response.data;
  } catch (error) {
    console.error("Credential check error:", error);
    return false;
  }
}
