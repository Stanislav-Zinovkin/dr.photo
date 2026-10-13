"use server";

import { prisma } from "@/lib/prisma";
import { GalleryCategory } from "@prisma/client";
import crypto from "crypto";
import { createGallerySchema } from "@/lib/validation";

export async function createGallery(input: unknown) {
  try {
    const parsed = createGallerySchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, error: "Invalid form data provided" };
    }

    const { title, description, category, clientEmail, isPrivate } = parsed.data;

    const slug =
      title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-") +
      "-" +
      Date.now().toString().slice(-4);

    const pinCode = isPrivate ? crypto.randomInt(1000, 9999).toString() : null;

    const gallery = await prisma.gallery.create({
      data: {
        title,
        description: description || null,
        slug,
        category,
        clientEmail: clientEmail || null,
        isPrivate,
        pinCode,
      },
    });

    return { success: true, galleryId: gallery.id, slug: gallery.slug };
  } catch (error) {
    console.error("Failed creating gallery on server:", error);
    return { success: false, error: "Database error while creating gallery" };
  }
}