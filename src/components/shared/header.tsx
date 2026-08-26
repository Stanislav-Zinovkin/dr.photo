import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
const t = useTranslations("Navigation");

    return(
        <header className="sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur-md">
            <div className="container flex h-16 items-center justify-between px-4 mx-auto">
                <Link href="/" className="font-bold text-xl tracking-tight">
                Dr.<span className="text-primary">Photo</span>
                </Link>

                <nav className="hidden items-center gap-6 md:flex">
                    <Link href="/portfolio" className="text-sm font-medium transition-colors hover:text-primary">
                     {t("portfolio")}
                    </Link>
                    <Link href="/booking" className="text-sm font-medium transition-colors hover:text-primary">
                     {t("booking")}
                    </Link>
                </nav>
                <div className="flex items-center gap-3">
                    <LocaleSwitcher />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}