// All roles used in the project. Never type these words by hand elsewhere.
export const ROLES = {
  STUDENT: "student",
  REVIEWER: "reviewer",
  ADMIN: "admin",
};

// Roles a person is allowed to choose when signing up (admin is never allowed)
export const SIGNUP_ROLES = [ROLES.STUDENT, ROLES.REVIEWER];

// Each role has its own dashboard route
export const getDashboardPath = (role) => `/dashboard/${role}`;

// The one database name for the client (must match the server's DB_NAME)
export const DB_NAME = "unirequest-portal";