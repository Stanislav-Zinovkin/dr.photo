import { defineRouting } from "next-intl/routing";


export const routing = defineRouting({
  locales: ["en", "uk", "pl"],
  defaultLocale: "en",
  localePrefix: "always",
});
