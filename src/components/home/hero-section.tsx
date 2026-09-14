"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/lib/dictionary";

interface HeroSectionProps {
  heroDict: Dictionary["Hero"];
}

export function HeroSection({ heroDict }: HeroSectionProps) {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";
  const getLocalizedPath = (path: string) => `/${currentLocale}${path}`;

  return (
    <section className="relative min-h-screen w-full flex items-end justify-start overflow-hidden pb-20 pt-32">
      {/* Background Image with Deep Cinematic Gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Atmospheric Fine Art Photography"
          fill
          priority
          className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 backdrop-blur-[1px]" />
      </div>

      {/* Content Container */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start">
        
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-[1px] w-10 bg-white/60" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-white/80 font-light">
            {heroDict.eyebrow}
          </span>
        </div>

        {/* Minimalist Title */}
        <h1 className="max-w-3xl text-3xl sm:text-4xl lg:text-6xl font-light tracking-tight text-white leading-[1.12] mb-6 font-sans">
          {heroDict.title}
        </h1>

        {/* Bottom Row: Concise description + Editorial Action Links */}
        <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-6 border-t border-white/15">
          <p className="max-w-sm text-xs sm:text-sm text-white/70 font-light leading-relaxed tracking-wide">
            {heroDict.description}
          </p>

          <div className="flex items-center gap-6">
            <Link
              href={getLocalizedPath("/booking")}
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white font-medium pb-1 border-b border-white hover:text-white/80 hover:border-white/80 transition-all"
            >
              <span>{heroDict.bookExperience}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            
            <Link
              href={getLocalizedPath("/portfolio")}
              className="text-xs uppercase tracking-[0.2em] text-white/60 font-medium pb-1 border-b border-transparent hover:text-white hover:border-white transition-all"
            >
              {heroDict.portfolio}
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}