"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition() //keep UI unblock while change locale

  const handleLanguageChange = (nextLocale: "en" | "uk" | "pl") => {
    startTransition(() => {router.replace(pathname, { locale: nextLocale });
    })
  };

  return (
    <div className="flex items-center gap-1">
      {(["en", "uk", "pl"] as const).map((lang) => (
        <Button
          key={lang}
          variant={locale === lang ? "default" : "ghost"}
          size="sm"
          disabled={isPending}
          className="uppercase text-xs h-8 px-2 font-semibold"
          onClick={() => handleLanguageChange(lang)}
        >
          {lang}
        </Button>
      ))}
    </div>
  );
}