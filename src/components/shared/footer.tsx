import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background/95 text-muted-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Added text-center for mobile, md:text-left for desktop */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8 text-center md:text-left">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start gap-3 md:col-span-6">
            <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
              Dr.<span className="text-primary">Photo</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start gap-3 md:col-span-3">
            <h4 className="text-sm font-semibold text-foreground tracking-wide">{t("quickLinks")}</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/portfolio" className="transition-colors hover:text-primary">
                {tNav("portfolio")}
              </Link>
              <Link href="/booking" className="transition-colors hover:text-primary">
                {tNav("booking")}
              </Link>
            </nav>
          </div>

          {/* Legal / RODO */}
          <div className="flex flex-col items-center md:items-start gap-3 md:col-span-3">
            <h4 className="text-sm font-semibold text-foreground tracking-wide">{t("legal")}</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/privacy-policy" className="transition-colors hover:text-primary">
                {t("privacyPolicy")}
              </Link>
              <Link href="/terms" className="transition-colors hover:text-primary">
                {t("terms")}
              </Link>
            </nav>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs sm:flex-row text-center sm:text-left">
          <p>© {currentYear} Dr.Photo. {t("rights")}</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:underline">
              {t("privacyPolicy")}
            </Link>
            <Link href="/terms" className="hover:underline">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}