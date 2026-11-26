import { requireRole } from "@/lib/session";
import { ROLES } from "@/lib/constants";

// Only students may open /dashboard/student/*
const StudentLayout = async ({ children }) => {
  await requireRole(ROLES.STUDENT);
  return children;
};

export default StudentLayout;