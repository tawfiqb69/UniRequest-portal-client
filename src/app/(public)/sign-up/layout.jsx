import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getDashboardPath } from "@/lib/constants";

// A logged-in user does not need the sign-up page
const SignUpLayout = async ({ children }) => {
  const session = await getSession();
  if (session) {
    redirect(getDashboardPath(session.user.role));
  }
  return children;
};

export default SignUpLayout;