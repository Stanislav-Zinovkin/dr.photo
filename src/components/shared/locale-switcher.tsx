"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const segments = pathname.split("/");
  const currentLocale = segments[1] || "en";

  const handleLanguageChange = (nextLocale: "en" | "uk" | "pl") => {
    if (nextLocale === currentLocale) return;

    startTransition(() => {
      
      segments[1] = nextLocale;
      const newPathname = segments.join("/");
      router.replace(newPathname, { scroll: false});
    });
  };

  return (
    <div className="flex items-center gap-1">
      {(["en", "uk", "pl"] as const).map((lang) => (
        <Button
          key={lang}
          variant={currentLocale === lang ? "default" : "ghost"}
          size="sm"
          className="h-8 px-2 text-xs font-semibold uppercase"
          onClick={() => handleLanguageChange(lang)}
          disabled={isPending} //Blocking duble-click
        >
          {lang}
        </Button>
      ))}
    </div>
  );
}