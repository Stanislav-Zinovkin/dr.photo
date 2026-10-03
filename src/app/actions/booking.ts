"use server";

import { prisma } from "@/lib/prisma";
import { bookingRateLimit } from "@/lib/rateLimit";
import { parseBookingFormData } from "@/lib/validation";
import { headers } from "next/headers";

export type BookingState = {
  success?: boolean;
  error?: string;
} | null;
export async function submitBooking(prevState: BookingState, formData: FormData) {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "127.0.0.1";
  const userAgent = headersList.get("user-agent") || "unknown";

  // Rate Limiting
  const { success } = await bookingRateLimit.limit(ip);

  if(!success) {
    return {
      success: false,
      error: "Too many requests. Try a bit later."
    }
  }

  if (formData.get("website_trap")) {
    return { success: true };
  }

  //  Validatio Zod + Service Config 
  const parsed = parseBookingFormData(formData);
  if (!parsed.success) {
    console.error("Zod Validation Errors:", parsed.error.flatten().fieldErrors);
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
      privacyPolicyVersion: "1.0", 
      marketingConsentGiven: validatedData.rodoMarketing,
      bookingConsentGiven: validatedData.rodoBooking,
    }
  };
   
  try {
    const bookingDate = new Date(`${validatedData.date}T${validatedData.time}:00Z`);

await prisma.booking.create({
  data: {
    serviceId: validatedData.serviceId,
    date: bookingDate,
    clientName: validatedData.name,
    clientEmail: validatedData.contact, 
    rodoBooking: validatedData.rodoBooking,
    rodoMarketing: validatedData.rodoMarketing,
    ipAddress: ip,
    userAgent: userAgent,
    policyVersion: "1.0",
    status: "PENDING",
  },
});



console.log("Booking successfully saved to DB for:", validatedData.name);
  } catch (error) {
    console.error("Database error during booking creation:", error);
    return { 
      success: false, 
      error: "Server error." 
    };
  }

  return { success: true };
}
