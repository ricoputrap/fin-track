import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import EnumRoutes from "./enums/EnumRoutes";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isAuthenticated = !!req.cookies.get("auth_session");
  const PUBLIC_ROUTES = [EnumRoutes.LOGIN, EnumRoutes.SIGNUP];
  const PROTECTED_ROUTES = [
    EnumRoutes.DASHBOARD,
    EnumRoutes.TRANSACTIONS,
    EnumRoutes.CATEGORIES,
    EnumRoutes.BUDGETS,
    EnumRoutes.WALLETS,
    EnumRoutes.GOALS
  ];


  /**
   * Redirects the user to the authenticated page if they are already authenticated.
   */
  if (isAuthenticated && ["/", ...PUBLIC_ROUTES].includes(pathname)) {
    return NextResponse.redirect(new URL(EnumRoutes.DASHBOARD, req.url));
  }

  /**
   * Redirecs the user to the login page if they are not authenticated.
   */
  if (!isAuthenticated && ["/", ...PROTECTED_ROUTES].includes(pathname)) {
    return NextResponse.redirect(new URL(EnumRoutes.LOGIN, req.url));
  }

  return NextResponse.next();
}