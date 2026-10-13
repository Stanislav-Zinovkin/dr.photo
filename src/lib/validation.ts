import { z } from "zod";
import { GalleryCategory } from "@prisma/client";
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
    .refine((val) => !/[<>]/.test(val), "Invalid characters detected")
    .refine((val) => /^[\p{L}\s'-]+$/u.test(val), "Only letters, spaces, hyphens and apostrophes are allowed"),
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

export const createGallerySchema = z.object({
  title: z
    .string()
    .min(2, "Name is too short")
    .max(100, "Name is too long")
    .trim()
    .refine((val) => !/[<>]/.test(val), "Invalid characters detected"),
  description: z.string().max(500, "Description is too long").optional(),
  category: z.nativeEnum(GalleryCategory, {
     message: "Invalid category selected" }),
  clientEmail: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
  isPrivate: z.boolean(),
  pinCode: z
    .string()
    .min(4, "PIN must be at least 4 characters")
    .max(10, "PIN is too long")
    .optional()
    .or(z.literal("")),
});

export type CreateGalleryFormData = z.infer<typeof createGallerySchema>;

export function parseGalleryFormData(formData: FormData) {
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),

    clientEmail: formData.get("clientEmail") || undefined,
    isPrivate: formData.get("isPrivate") === "on",
    pinCode: formData.get("pinCode") || undefined,
  };
  return createGallerySchema.safeParse(rawData);
}