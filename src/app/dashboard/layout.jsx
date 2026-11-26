import TempDashboardHeader from "@/components/temp-dashboard-header";

// TEMPORARY dashboard layout (replaced in step M5.4)
const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <TempDashboardHeader />
      <main className="p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;