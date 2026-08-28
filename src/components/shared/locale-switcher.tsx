"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const handleLanguageChange = (nextLocale: "en" | "uk" | "pl") => {
    if (nextLocale === locale) return;

    startTransition(() => {
      // Use replace next-intl without hard reload
      router.replace(pathname, { locale: nextLocale, scroll: false }); //Added scroll: false to prevent layout jump
    });
  };

  return (
    <div className="flex items-center gap-1">
      {(["en", "uk", "pl"] as const).map((lang) => (
        <Button
          key={lang}
          variant={locale === lang ? "default" : "ghost"}
          size="sm"
          className="h-8 px-2 text-xs font-semibold uppercase"
          onClick={() => handleLanguageChange(lang)}
        >
          {lang}
        </Button>
      ))}
    </div>
  );
}