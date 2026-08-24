import { Link } from "@/i18n/routing";
import { LocaleSwitcher } from "./locale-switcher";

export function Header() {
    return(
        <header className="sticky top-0 z-50 bg-bacground/85 backdrop-blur-md">
            <div className="container flex h-16 items-center justify-content-between px-4 mx-auto">
                <Link href="/" className="font-bold text-xl tracking-tight">
                Dr.<span className="text-primary">Photo</span>
                </Link>

                <nav className="flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                    Portfolio
                    </Link>
                    <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                    Booking
                    </Link>
                </nav>
                <div className="flex items-center gasp-3">
                    <LocaleSwitcher />
                </div>
            </div>
        </header>
    )
}