import TempDashboardHeader from "@/components/temp-dashboard-header";
import { requireSession } from "@/lib/session";

// TEMPORARY dashboard layout (replaced in step M5.4).
// Every page inside /dashboard needs a logged-in user.
const DashboardLayout = async ({ children }) => {
  await requireSession();

  return (
    <div className="min-h-screen">
      <TempDashboardHeader />
      <main className="p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;