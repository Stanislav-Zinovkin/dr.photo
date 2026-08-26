import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
    const t = useTranslations("Footer");
    const tNav = useTranslations("Navigation");
    const currentYear = new Date().getFullYear();

    return(
        <footer className="w-full border-t bg-background/95 py-12 text-muted-foreground">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">

                    {/*BrandInfo*/}
                    <div className="flex flex-col gsp-3 md:col-span-2">
                        <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
                        Dr.<span className="text-primary">Photo</span>
                        </Link>
                        <p className="max-w-sm text-sm leading-relaxed">
                            {t("description")}
                        </p>
                    </div>

                    {/*Quick Links*/}
                    <div className="flex flex-col gap-3">
                        <h4 className="text-sm font-semibold text-foreground">{t("quicklinks")}</h4>
                        <nav className="flex flex-col gap-2 text-sm">
                            <Link href="/portfolio" className="transition-colors hover:text-primary">
                            {tNav("portfolio")}
                            </Link>
                            <Link href="/" className="transition-colors hover:text-primary">
                            {tNav("booking")}
                            </Link>
                        </nav>
                    </div>

                    {/*Contacts Info*/}
                    <div className="flex flex-col gap-3">
                        <h4 className="text-sm fon-semibold text-foreground">{t("connect")}</h4>
                        <div className="fle flex-col gap-2 text-sm">
                            <a 
                              href="https://instagram.com"
                              target="_blank"
                              rel="noreferrer"
                              className="transition-colors hover:text-primary"
                            >
                              Instagram    
                            </a>
                            <a 
                              href="https://t.me"
                              target="_blank"
                              rel="noreferrer"
                              className="transition-colors hover:text-primary"
                            >
                            Telegram    
                            </a>  
                        </div>
                    </div>
                </div>

                {/*RODO*/}
                <div className="flex flex-col gap-3">
                    <h4 className="text-sm font-semibold text-foreground">{t("legal")}</h4>
                    <nav className="flex flex-col gap-2 text-sm">
                        <Link href="/privacy-policy" className="transition-colors hover:text-primary">
                          {t("privacyPolicy")}
                        </Link>
                        <Link href="/terms" className="transition-colors hover:text-primary">
                          {t("terms")}
                        </Link>
                    </nav>
                </div>

                {/*Bottom bar*/}
                <div className="mt-12 border-t pt-6 text-center text-xs">
                    <p>© {currentYear} Dr.Photo. {t("rights")}</p>
                </div>
            </div>
        </footer>
    );
}