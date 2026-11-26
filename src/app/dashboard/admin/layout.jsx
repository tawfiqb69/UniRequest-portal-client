import { requireRole } from "@/lib/session";
import { ROLES } from "@/lib/constants";

// Only admins may open /dashboard/admin/*
const AdminLayout = async ({ children }) => {
  await requireRole(ROLES.ADMIN);
  return children;
};

export default AdminLayout;