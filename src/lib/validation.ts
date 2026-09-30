import { z } from "zod";
import { serviceConfig } from "@/data/services";


const validServiceIds = serviceConfig.map((s) => s.id) as [string, ...string[]];


export const bookingSchema = z.object({
  serviceId: z.string().refine((val) => serviceConfig.some((s) => s.id === val), {
    message: "Invalid service selected",
  }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),
  name: z
    .string()
    .min(2, "Name is too short")
    .max(30, "Name is too long")
    .trim()
    .refine((val) => !/[<>script]/i.test(val), "Invalid characters detected"),
  contact: z
    .string()
    .min(5, "Contact too short")
    .max(100, "Contact too long")
    .trim(),
  rodoBooking: z.boolean().refine((val) => val === true, {
    message: "Mandatory RODO consent is required",
  }),
  rodoMarketing: z.boolean().default(false),    
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export function parseBookingFormData(formData: FormData) {
     const rawData = {
        serviceId: formData.get("serviceId"),
        date: formData.get("date"),
        time: formData.get("time"),
        name: formData.get("name"),
        contact: formData.get("contact"),
        rodoBooking: formData.get("rodoBooking") === "on",
        rodoMarketing: formData.get("rodoMarketing") === "on",
    };
    return bookingSchema.safeParse(rawData);
}