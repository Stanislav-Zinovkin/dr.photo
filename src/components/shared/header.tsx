"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X } from "lucide-react";
import type { Dictionary } from "@/lib/dictionary";

interface HeaderProps {
  navDict: Dictionary["Navigation"];
  commonDict: Dictionary["Common"];
}

export function Header({ navDict, commonDict }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const currentLocale = pathname.split("/")[1] || "en";

  const getLocalizedPath = (path: string) => `/${currentLocale}${path}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? "border-b bg-background/85 backdrop-blur-md shadow-sm" 
        : "bg-transparent border-transparent"
    }`}>
      <div className="container flex h-20 items-center justify-between px-4 mx-auto">
        <Link href={getLocalizedPath("")} className="font-bold text-xl tracking-tight text-white shrink-0">
          Dr.<span className="text-primary">Photo</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href={getLocalizedPath("/portfolio")} className="text-sm font-medium text-white/90 hover:text-white transition-colors">
            {navDict.portfolio}
          </Link>
          <Link href={getLocalizedPath("/booking")} className="text-sm font-medium text-white/90 hover:text-white transition-colors">
            {navDict.booking}
          </Link>
        </nav>

        {/* Desktop Right Controls */}
        <div className="hidden md:flex items-center gap-3">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white focus:outline-none rounded-md hover:bg-white/10 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full border-b bg-background/95 backdrop-blur-md p-6 shadow-xl md:hidden flex flex-col gap-6 animate-in slide-in-from-top-2 text-foreground">
          <nav className="flex flex-col gap-4">
            <Link
              href={getLocalizedPath("/portfolio")}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium hover:text-primary transition-colors"
            >
              {navDict.portfolio}
            </Link>
            <Link
              href={getLocalizedPath("/booking")}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium hover:text-primary transition-colors"
            >
              {navDict.booking}
            </Link>
          </nav>
          
          <div className="pt-4 border-t flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{commonDict.language}</span>
            <LocaleSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}