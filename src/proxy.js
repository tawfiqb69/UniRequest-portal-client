import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Quick check only: is there a session cookie?
// This is NOT real security. The real role check happens in the dashboard layouts.
export function proxy(request) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    // Send the user to sign-in and remember the page they wanted
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect", request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

// Run only on dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
};