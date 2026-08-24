import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(uk|en|pl)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};