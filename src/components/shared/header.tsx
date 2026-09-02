"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X } from "lucide-react";

export function Header() {
  const t = useTranslations("Navigation");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        {/* Brand Logo */}
        <Link href="/" className="font-bold text-xl tracking-tight shrink-0">
          Dr.<span className="text-primary">Photo</span>
        </Link>

        {/* Desktop Navigation (Hidden on mobile, flex on md+) */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/portfolio" className="text-sm font-medium hover:text-primary transition-colors">
            {t("portfolio")}
          </Link>
          <Link href="/booking" className="text-sm font-medium hover:text-primary transition-colors">
            {t("booking")}
          </Link>
        </nav>

        {/* Desktop Right Controls (Hidden on mobile, flex on md+) */}
        <div className="hidden md:flex items-center gap-3">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>

        {/* Mobile Right Controls & Hamburger Toggle (Visible only on mobile, hidden on md+) */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground focus:outline-none rounded-md hover:bg-accent transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Strictly hidden on md+) */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full border-b bg-background/95 backdrop-blur-md p-6 shadow-xl md:hidden flex flex-col gap-6 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-4">
            <Link
              href="/portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium hover:text-primary transition-colors"
            >
              {t("portfolio")}
            </Link>
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium hover:text-primary transition-colors"
            >
              {t("booking")}
            </Link>
          </nav>
          
            <div className="pt-4 border-t flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t("language")}</span>
              <LocaleSwitcher />
            </div>
        </div>
      )}
    </header>
  );
}