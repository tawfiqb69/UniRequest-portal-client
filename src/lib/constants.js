// All roles used in the project. Never type these words by hand elsewhere.
export const ROLES = {
  STUDENT: "student",
  REVIEWER: "reviewer",
  ADMIN: "admin",
};

// Roles a person is allowed to choose when signing up (admin is never allowed)
export const SIGNUP_ROLES = [ROLES.STUDENT, ROLES.REVIEWER];