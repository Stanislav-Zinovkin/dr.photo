import { getDictionary } from "@/lib/dictionary";
import { BookingForm } from "@/components/booking-form";

interface BookingPageProps {
    params: Promise<{ locale: "en" | "uk" | "pl" }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-white">
                    {dict.Navigation?.booking || "Book Session"}
                </h1>
                <p className="text-white/60 mt-3 max-w-xl mx-auto text-sm sm:text-base">
                {dict.Booking?.subtitle || "Book your photoshoot session. Choose a service and pick a convenient time."}
                </p>
            </div>
            <BookingForm dict={dict} locale="{locale}" />
        </div>
    )
}