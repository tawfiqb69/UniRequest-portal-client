import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { getDashboardPath } from "./constants";

// Get the logged-in session on the server (null if not logged in)
export const getSession = async () => {
  return auth.api.getSession({ headers: await headers() });
};

// Page needs a logged-in user. If not, go to the sign-in page.
export const requireSession = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/sign-in");
  }
  return session;
};

// Page needs one exact role. If the role is different, go to the user's own dashboard.
export const requireRole = async (role) => {
  const session = await requireSession();
  if (session.user.role !== role) {
    redirect(getDashboardPath(session.user.role));
  }
  return session;
};