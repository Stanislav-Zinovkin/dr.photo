import { getDictionary } from "@/lib/dictionary";
import { PortfolioGrid } from "@/components/portfolio-grid";

interface PortfolioPageProps {
    params: Promise<{locale: "en" | "pl" | "uk" }>;
}

export default async function PortfoliPage({params}: PortfolioPageProps) {
    const {locale} = await params;
    const dict = await getDictionary(locale);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-white">
                    {dict.Navigation.portfolio}
                </h1>
                <p className="text-white/60 mt-3 max-w-xl mx-auto text-sm sm:text-base">
                Visual stories captured throught the lens. Explore the collection of works.
                </p>
            </div>

            <PortfolioGrid />
        </div>
    )
}