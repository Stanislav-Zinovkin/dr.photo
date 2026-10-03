import { Resend } from 'resend';
import { getDictionary } from '@/lib/dictionary';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendBookingEmailParams {
    clientName: string;
    clientEmail: string;
    serviceTitle: string;
    bookingDate: Date;
    locale: 'en' | 'pl' | 'uk';
}

export async function sendBookingConfirmation({
    clientName,
    clientEmail,
    serviceTitle,
    bookingDate,
    locale,
}: SendBookingEmailParams) {
    try {
        const dict = await getDictionary(locale);
        const emailText = dict.email || {
            subject: "Booking Confirmation",
            greeting: "Hello",
            body: "Your booking is confirmed.",
            service: "Service:",
            date: "Date:"
        };

        await resend.emails.send({
            from: 'Dr.Photo <onboarding@resend.dev>',
            to: [clientEmail],
            subject: emailText.subject,
            html: `
            <div style="font-family: Arial, sans-serif; background-color: #18181b; color: #f4f4f5; padding: 24px; border-radius: 8px;">
               <h2 style="color: #ffffff;">${emailText.greeting} ${clientName}!</h2>
               <p style="font-size: 16px; color: #d4d4d8;">${emailText.body}</p>
               <div style="background-color: #27272a; padding: 16px; border-radius: 6px; margin: 16px 0;">
                 <p><strong>${emailText.service}</strong> ${serviceTitle}</p>
                 <p><strong>${emailText.date}</strong> ${bookingDate.toLocaleString(locale)}</p>
               </div>
               <p style="font-size: 14px; color: #a1a1aa;">Dr. Photo Studio</p>
             </div>
            `,
        });
    } catch ( error ) {
        console.error('Failed to send confirmation email.')
    }
}