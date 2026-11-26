import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

// Used in the browser: sign in/up/out, session, and authClient.token()
export const authClient = createAuthClient({
  plugins: [jwtClient()],
});