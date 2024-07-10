import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  /**
   * Redirects the user to the authenticated page if they are already authenticated.
   */
  const PROTECTED_ROUTES = ["/login", "/signup"];
  if (PROTECTED_ROUTES.includes(pathname) && req.cookies.get("auth_session")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}