
import { NextRequest, NextResponse } from "next/server";

const locales = [ "en", "pl", "uk"];
const defaultLocale = "en";


export function middleware(request: NextRequest) {

  const {pathname} = request.nextUrl;
  
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = defaultLocale;
  const newUrl = new URL(
    `/${defaultLocale}${pathname === "/" ? "" : pathname}`,
     request.url    
  );

  return NextResponse.redirect(newUrl);

}

export const config = {
  matcher: [
    "/((?!api|admin|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};