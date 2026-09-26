"use server";

import { parseBookingFormData } from "@/lib/validation";
import { headers } from "next/headers";

// (Memory Rate Limiting)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export async function submitBooking(prevState: any, formData: FormData) {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "127.0.0.1";
  const userAgent = headersList.get("user-agent") || "unknown";

  // Rate Limiting
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);
  if (userLimit && now - userLimit.timestamp < 60000) {
    if (userLimit.count >= 5) {
      return { 
        success: false, 
        error: "Za dużo próśb. Spróbuj ponownie później. / Too many requests." 
      };
    }
    userLimit.count++;
  } else {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
  }

  
  if (formData.get("website_trap")) {
    return { success: true };
  }

  //  Validatio Zod + Service Config 
  const parsed = parseBookingFormData(formData);
  if (!parsed.success) {
    return { 
      success: false, 
      error: "Nieprawidłowe dane formularza. / Invalid form data." 
    };
  }

  const validatedData = parsed.data;

  //  full packages for RODO Audit Trail (safety in UE)
  const secureBookingRecord = {
    ...validatedData,
    meta: {
      ipAddress: ip,
      userAgent: userAgent,
      createdAt: new Date().toISOString(),
      privacyPolicyVersion: "1.0", // Фіксуємо версію політики на момент згоди
      marketingConsentGiven: validatedData.rodoMarketing,
      bookingConsentGiven: validatedData.rodoBooking,
    }
  };

  // ---- ТУТ БУДЕ ЗБЕРЕЖЕННЯ В БАЗУ ДАНИХ (Prisma / PostgreSQL) ----
  // приклад: await db.booking.create({ data: secureBookingRecord })
  // -------------------------------------------------------------

  console.log("Secured Booking Recorded:", secureBookingRecord);

  return { success: true };
}