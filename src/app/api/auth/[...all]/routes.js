import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// All /api/auth/* requests are handled by Better Auth
export const { GET, POST } = toNextJsHandler(auth);