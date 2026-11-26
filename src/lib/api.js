import { authClient } from "./auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Call our Express server from the browser.
// It gets a fresh JWT every time and sends it in the Authorization header.
export const apiFetch = async (path, options = {}) => {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("You are not signed in");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      // JSON bodies need this header. File uploads (FormData) must not set it by hand.
      ...(typeof options.body === "string" ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
      Authorization: `Bearer ${data.token}`,
    },
  });

  const result = await response.json().catch(() => null);

  // Our server always sends { success, message, data }. Turn errors into a normal JS error.
  if (!response.ok) {
    const apiError = new Error(result?.message || "Request failed");
    apiError.status = response.status;
    throw apiError;
  }

  return result;
};