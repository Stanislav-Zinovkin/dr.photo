"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGallerySchema, CreateGalleryFormData } from "@/lib/validation"; 
import { createGallery } from "@/app/actions/gallery";
import { useRouter } from "next/navigation";
import { GalleryCategory } from "@prisma/client";

export default function NewGalleryPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateGalleryFormData>({
    resolver: zodResolver(createGallerySchema),
    defaultValues: {
      isPrivate: true,
      category: GalleryCategory.EVENT,
      description: "",
      clientEmail: "",
      pinCode: "",
    },
  });

  async function onSubmit(data: CreateGalleryFormData) {
    setServerError(null);

    const result = await createGallery(data);

    if (result.success && result.galleryId) {
      router.push(`/en/admin/galleries/${result.galleryId}/upload`);
    } else {
      setServerError(result.error || "Something went wrong");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create New Gallery</h1>

      {serverError && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            type="text"
            {...register("title")}
            placeholder="Example: Max & Maga Wedding"
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            {...register("description")}
            rows={3}
            placeholder="Short shoot description..."
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              {...register("category")}
              className="w-full p-2.5 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value={GalleryCategory.EVENT}>Event / Celebration</option>
              <option value={GalleryCategory.PORTRAIT}>Portrait</option>
              <option value={GalleryCategory.WEDDING}>Wedding</option>
              <option value={GalleryCategory.COMMERCIAL}>Commercial</option>
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Client Email</label>
            <input
              type="email"
              {...register("clientEmail")}
              placeholder="client@example.com"
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.clientEmail && <p className="text-red-500 text-xs mt-1">{errors.clientEmail.message}</p>}
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register("isPrivate")}
              id="isPrivate"
              className="w-4 h-4 text-blue-600 rounded border-gray-300"
            />
            <label htmlFor="isPrivate" className="text-sm font-semibold text-gray-800">
              Private Gallery (Secure Access)
            </label>
          </div>
          <p className="text-xs text-gray-500 pl-7">
            When enabled, the server handles secure generation and protection of access keys.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">PIN-код (optional custom override)</label>
          <input
            type="text"
            {...register("pinCode")}
            placeholder="Leave empty for auto-generation"
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.pinCode && <p className="text-red-500 text-xs mt-1">{errors.pinCode.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 shadow-sm"
        >
          {isSubmitting ? "Creating..." : "Create gallery and proceed to upload"}
        </button>
      </form>
    </div>
  );
}