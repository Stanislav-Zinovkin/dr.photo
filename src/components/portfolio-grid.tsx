"use client";

import Image from "next/image";

const placeholderImages = [
  { id: 1, title: "Cinematic Portrait", height: "h-[450px]", url: "https://picsum.photos/seed/photo1/600/800" },
  { id: 2, title: "Atmospheric Street", height: "h-[300px]", url: "https://picsum.photos/seed/photo2/600/400" },
  { id: 3, title: "Studio Light", height: "h-[550px]", url: "https://picsum.photos/seed/photo3/600/900" },
  { id: 4, title: "Deep Shadows", height: "h-[350px]", url: "https://picsum.photos/seed/photo4/600/500" },
  { id: 5, title: "Golden Hour", height: "h-[500px]", url: "https://picsum.photos/seed/photo5/600/750" },
  { id: 6, title: "Minimalist", height: "h-[400px]", url: "https://picsum.photos/seed/photo6/600/600" },
];

export function PortfolioGrid() {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      {placeholderImages.map((item) => (
        <div 
          key={item.id} 
          className="break-inside-avoid relative group overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 shadow-xl transition-all duration-300 hover:border-white/30"
        >
          <div className={`relative w-full ${item.height} bg-zinc-800`}>
            <Image
              src={item.url}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <h3 className="text-white font-semibold text-lg">{item.title}</h3>
            <p className="text-white/70 text-xs mt-1">Dr. Photo Studio</p>
          </div>
        </div>
      ))}
    </div>
  );
}