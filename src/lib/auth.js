import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { db } from "./db";

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
      role: { type: "string", required: false, defaultValue: "student" },
      universityId: { type: "string", required: false },
      department: { type: "string", required: false },
      phone: { type: "string", required: false },
    },
  },

  // Gives /api/auth/token and /api/auth/jwks (for Express to verify tokens)
  plugins: [jwt()],
});