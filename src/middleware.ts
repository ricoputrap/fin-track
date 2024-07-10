import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import EnumRoutes from "./enums/EnumRoutes";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  /**
   * Redirects the user to the authenticated page if they are already authenticated.
   */
  const PROTECTED_ROUTES = [EnumRoutes.LOGIN, EnumRoutes.SIGNUP, "/"];
  if (PROTECTED_ROUTES.includes(pathname as EnumRoutes) && req.cookies.get("auth_session")) {
    return NextResponse.redirect(new URL(EnumRoutes.DASHBOARD, req.url));
  }

  return NextResponse.next();
}