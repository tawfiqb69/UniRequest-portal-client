import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { db } from "./db";
import { ROLES, SIGNUP_ROLES } from "./constants";

export const auth = betterAuth({
  // Save Better Auth data in our MongoDB
  database: mongodbAdapter(db),

  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  // Only this website may call the auth endpoints
  trustedOrigins: [process.env.BETTER_AUTH_URL],

  emailAndPassword: { enabled: true },

  user: {
    // Our collection name is "users"
    modelName: "users",
    additionalFields: {
      role: { type: "string", required: false, defaultValue: ROLES.STUDENT },
      universityId: { type: "string", required: false },
      department: { type: "string", required: false },
      phone: { type: "string", required: false },
    },
  },

  databaseHooks: {
    user: {
      create: {
        // Runs before a new user is saved (sign up).
        // Only "student" or "reviewer" is accepted. Anything else (like "admin") becomes "student".
        before: async (user) => {
          const role = SIGNUP_ROLES.includes(user.role) ? user.role : ROLES.STUDENT;
          return { data: { ...user, role } };
        },
      },
    },
  },

  hooks: {
    // Runs before every auth endpoint. One function, so we check the path inside.
    before: createAuthMiddleware(async (ctx) => {
      // A user must never change their own role from the profile update.
      // Role changes are done only by the admin through our Express server.
      if (ctx.path === "/update-user" && ctx.body && "role" in ctx.body) {
        throw new APIError("BAD_REQUEST", {
          message: "Role cannot be changed here",
        });
      }
    }),
  },

  // Gives /api/auth/token and /api/auth/jwks (for Express to verify tokens)
  plugins: [jwt()],
});