import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = routing.locales.some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  );

  if (hasLocale) return NextResponse.next();

  const acceptLang = request.headers.get("accept-language") ?? "";
  const preferred = acceptLang.split(",")[0].split("-")[0].toLowerCase();
  const locale = routing.locales.includes(preferred as (typeof routing.locales)[number])
    ? preferred
    : routing.defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
