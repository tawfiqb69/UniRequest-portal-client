import { requireRole } from "@/lib/session";
import { ROLES } from "@/lib/constants";

// Only reviewers may open /dashboard/reviewer/*
const ReviewerLayout = async ({ children }) => {
  await requireRole(ROLES.REVIEWER);
  return children;
};

export default ReviewerLayout;