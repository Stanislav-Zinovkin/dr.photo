"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import { GalleryCategory } from "@prisma/client";

export async function createGallery(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as GalleryCategory;
    const clientEmail = formData.get("clientEmail") as string;
    const isPrivate = formData.get("isPrivate") === 'on';
    const pinCode = formData.get("pinCode") as string;

    if (!title) {
        throw new Error("Gallery name is required");
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g,"")
      .replace(/[\s_-]+/g, "-") + "-" + Date.now().toString().slice(-4);

    try {
        const gallery = await prisma.gallery.create({
            data: {
                title,
                description,
                slug,
                category,
                clientEmail: clientEmail || null,
                pinCode: pinCode || null,
            }
        });
        //redirect admin to new gallery-page

        return { success: true, galleryId: gallery.id, slug: gallery.slug};
    } catch ( error ) {
        console.error("Failed creating gallery:", error);
        return { success: false, error:"Failed creating gallery"};
    }
}