"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/lib/dictionary";

interface FooterProps {
  footerDict: Dictionary["Footer"];
  navDict: Dictionary["Navigation"];
}

export function Footer({ footerDict, navDict }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  //langueage from  URL ("/uk/..." -> "uk")
  const currentLocale = pathname.split("/")[1] || "en";

  const getLocalizedPath = (path: string) => `/${currentLocale}${path}`;

  return (
    <footer className="w-full border-t bg-background/95 text-muted-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Added text-center for mobile, md:text-left for desktop */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8 text-center md:text-left">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start gap-3 md:col-span-6">
            <Link href={getLocalizedPath("")} className="text-xl font-bold tracking-tight text-foreground">
              Dr.<span className="text-primary">Photo</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed">
              {footerDict.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start gap-3 md:col-span-3">
            <h4 className="text-sm font-semibold text-foreground tracking-wide">{footerDict.quickLinks}</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href={getLocalizedPath("/portfolio")} className="transition-colors hover:text-primary">
                {navDict.portfolio}
              </Link>
              <Link href={getLocalizedPath("/booking")} className="transition-colors hover:text-primary">
                {navDict.booking}
              </Link>
            </nav>
          </div>

          {/* Legal / RODO */}
          <div className="flex flex-col items-center md:items-start gap-3 md:col-span-3">
            <h4 className="text-sm font-semibold text-foreground tracking-wide">{footerDict.legal}</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href={getLocalizedPath("/privacy-policy")} className="transition-colors hover:text-primary">
                {footerDict.privacyPolicy}
              </Link>
              <Link href={getLocalizedPath("/terms")} className="transition-colors hover:text-primary">
                {footerDict.terms}
              </Link>
            </nav>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs sm:flex-row text-center sm:text-left">
          <p>© {currentYear} Dr.Photo. {footerDict.rights}</p>
          <div className="flex gap-4">
            <Link href={getLocalizedPath("/privacy-policy")} className="hover:underline">
              {footerDict.privacyPolicy}
            </Link>
            <Link href={getLocalizedPath("/terms")} className="hover:underline">
              {footerDict.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}