"use client";

import { useActionState, useEffect } from 'react';
import { useState } from 'react';
import { serviceConfig } from '@/data/services';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useParams } from 'next/navigation';
import { submitBooking } from '@/app/actions/booking';
import { toast } from 'sonner'; // <--- Імпортуємо тоаст

interface BookingFormProps {
    dict: any;
    locale: string;
}

export function BookingForm({ dict }: BookingFormProps) {
    const params = useParams();
    const locale = params.locale as string;   
    const [selectedService, setSelectedService] = useState(serviceConfig[0].id);
    
    const [state, formAction, isPending] = useActionState(submitBooking, null);
    console.log("SERVER STATE RESPONSE:", state);
    useEffect(() => {
        if (state?.success) {
            toast.success(dict.Booking?.successTitle || "Booking Confirmed!", {
                description: dict.Booking?.successMessage || "Thank you for your request. We will contact you shortly :)",
                duration: 5000,
            });
        } else if (state?.error) {
            toast.error("Błąd / Error", {
                description: state.error,
                duration: 4000,
            });
        }
    }, [state, dict]);

    // success (опціонально можна залишити або прибрати, якщо тоаст повністю покриває сповіщення)
    if (state?.success) {
        return (
            <div className='max-w-md mx-auto p-8 rounded-2xl bg-zinc-900 border border-white/10 text-center shadow-2xl'>
                <div className='w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold'>
                    ✓
                </div>
                <h3 className='text-xl font-bold text-white'>{dict.Booking?.successTitle || "Booking Confirmed!"}</h3>
                <p className="text-white/60 text-sm mt-2">
                    {dict.Booking?.successMessage || "Thank you for your request. We will contact you shortly :)"}
                </p>
                <Button 
                  onClick={() => window.location.reload()}
                  className='mt-6 w-full bg-white text-black hover:bg-white/90 cursor-pointer'
                >
                    {dict.Booking?.bookAnother || "Book Another"}
                </Button>
            </div>
        );
    }

    return (
        <form action={formAction} noValidate className="max-w-xl mx-auto p-8 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl space-y-6">
          
          <input type="hidden" name="serviceId" value={selectedService} />

          {/* List of services */}
          <div>
            <Label className="block text-sm font-medium text-white/80 mb-3">
              {dict.Booking?.selectService || "Select Service Type"}
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {serviceConfig.map((service) => (
                <button
                  type="button"
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    selectedService === service.id
                      ? "border-white bg-white/10 text-white"
                      : "border-white/10 bg-zinc-800/50 text-white/60 hover:border-white/30"
                  }`}
                >
                  <div className="font-medium text-sm text-white">
                    {dict.Services?.[service.translationKey] || service.id}
                  </div>
                  <div className="text-xs mt-1 text-white/50">{service.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* data & time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-white/80 mb-2">
                {dict.Booking?.date || "Preferred Date"}
              </Label>
              <Input
                type="date"
                name="date"
                required
                min={new Date().toISOString().split("T")[0]}
                className="bg-zinc-800 border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-white/80 mb-2">
                {dict.Booking?.time || "Preferred Time"}
              </Label>
              <Input
                type="time"
                name="time"
                required
                min="09:00"
                max="20:00"
                className="bg-zinc-800 border-white/10 text-white"
              />
            </div>
          </div>

          {/* contact data */}
          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium text-white/80 mb-2">
                {dict.Booking?.name || "Your Name"}
              </Label>
              <Input
                type="text"
                name="name"
                placeholder="Stanislav"
                required
                minLength={2}
                maxLength={30}
                className="bg-zinc-800 border-white/10 text-white placeholder:text-white/30"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-white/80 mb-2">
                {dict.Booking?.contact || "Email or Phone"}
              </Label>
              <Input
                type="text"
                name="contact"
                placeholder="contact@example.com"
                required
                className="bg-zinc-800 border-white/10 text-white placeholder:text-white/30"
              />
            </div>

            <div className="hidden" aria-hidden="true">
               <input type="text" name="website_trap" tabIndex={-1} autoComplete="off" />
            </div>
          </div>

          {/* RODO / GDPR Consent */}
          <div className="space-y-4 pt-2">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="rodo-booking"
                name="rodoBooking"
                required
                className="mt-1 h-4 w-4 rounded border-white/20 bg-zinc-800 text-white focus:ring-white/20 cursor-pointer"
              />
              <label htmlFor="rodo-booking" className="text-xs text-white/60 leading-relaxed cursor-pointer">
                {dict.Booking?.rodoConsent || "Wyrażam zgodę na przetwarzanie moich danych osobowych w celu realizacji rezerwacji."} {" "}
                <a href={`/${locale}/privacy-policy`} target="_blank" className="underline hover:text-white">
                  {dict.Footer?.privacyPolicy || "Polityka prywatności"}
                </a>. *
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="rodo-marketing"
                name="rodoMarketing"
                className="mt-1 h-4 w-4 rounded border-white/20 bg-zinc-800 text-white focus:ring-white/20 cursor-pointer"
              />
              <label htmlFor="rodo-marketing" className="text-xs text-white/50 leading-relaxed cursor-pointer">
                {dict.Booking?.marketingConsent || "Chcę otrzymywać informacje o rabatach, ofertach specjalnych oraz życzenia świąteczne."}
              </label>
            </div>
          </div>

          {/* Backend error box (можна залишити додатково для надійності) */}
          {state?.error && (
            <div className="p-3 bg-red-950/50 border border-red-500/30 text-red-400 text-xs rounded-lg">
              {state.error}
            </div>
          )}

          {/* Send button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 bg-white text-black font-semibold hover:bg-white/90 disabled:opacity-50 cursor-pointer"
          >
            {isPending ? "Wysyłanie..." : (dict.Booking?.submit || "Confirm Booking Request")}
          </Button>
        </form>
    );
}