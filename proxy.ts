import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLang, getLangFromHeader } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const first = pathname.split("/")[1];
  if (isLang(first)) return NextResponse.next();

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const lang = getLangFromHeader(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
