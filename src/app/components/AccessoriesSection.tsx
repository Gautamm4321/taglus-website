"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function AccessoriesSection() {
  return (
    <section id="accessories" className="relative w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-12">
      
      {/* Section Header */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-[#E8DCC8]/25 text-sky-300 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-5 backdrop-blur-md">
          <Sparkles size={16} className="text-sky-400" />
          <span>Patient Delivery & Clinical Essentials</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#E8DCC8]">
          Orthodontic <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-300">Accessories</span>
        </h2>
        <p className="mt-5 text-lg sm:text-xl text-[#E8DCC8]/85 font-light leading-relaxed max-w-2xl mx-auto">
          Comprehensive patient care kits, aligner seating essentials, and durable clinical delivery instruments.
        </p>
      </div>

      {/* 4-Column Layout: Paired Top/Bottom */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        
        {/* ================= COLUMN 1: TOP IMAGE -> BOTTOM CONTENT ================= */}
        <div className="flex flex-col gap-6">
          {/* Top: Image (Ortho Chewies) */}
          <div className="relative min-h-[300px] h-[340px] rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10">
            <Image
              src="/finish-4.jpeg"
              alt="Taglus Ortho Chewies"
              fill
              className="object-cover"
            />
          </div>

          {/* Bottom: Content (Ortho Chewies) */}
          <div className="glass-box rounded-[2.5rem] p-8 sm:p-10 border border-[#E8DCC8]/20 bg-[#030919]/90 backdrop-blur-2xl flex flex-col justify-center flex-1 hover:border-sky-400/40 transition-all duration-300">
            <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold mb-3">
              Chairside Delivery
            </p>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#E8DCC8] leading-snug">
              Ortho Chewies
            </h3>
            <p className="mt-4 text-base sm:text-lg text-[#E8DCC8]/85 font-normal leading-relaxed">
              Medical-grade cylindrical chewies engineered to eliminate microscopic air gaps and ensure proper aligner tray seating across dental arches.
            </p>
          </div>
        </div>

        {/* ================= COLUMN 2: TOP CONTENT -> BOTTOM IMAGE ================= */}
        <div className="flex flex-col gap-6">
          {/* Top: Content (Impression Tray) */}
          <div className="glass-box rounded-[2.5rem] p-8 sm:p-10 border border-[#E8DCC8]/20 bg-[#030919]/90 backdrop-blur-2xl flex flex-col justify-center flex-1 hover:border-sky-400/40 transition-all duration-300">
            <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold mb-3">
              Clinical Arch Capture
            </p>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#E8DCC8] leading-snug">
              Impression Tray
            </h3>
            <p className="mt-4 text-base sm:text-lg text-[#E8DCC8]/85 font-normal leading-relaxed">
              Rigid anatomical trays engineered for distortion-free alginate and silicone impression holding, ensuring accurate master model replication.
            </p>
          </div>

          {/* Bottom: Image (Impression Tray) */}
          <div className="relative min-h-[300px] h-[340px] rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10">
            <Image
              src="/finish-1.jpeg"
              alt="Orthodontic Impression Tray"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* ================= COLUMN 3: TOP IMAGE -> BOTTOM CONTENT ================= */}
        <div className="flex flex-col gap-6">
          {/* Top: Image (Removal Tool) */}
          <div className="relative min-h-[300px] h-[340px] rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10">
            <Image
              src="/finish4img.jpeg"
              alt="Aligner Removal Tool"
              fill
              className="object-cover"
            />
          </div>

          {/* Bottom: Content (Removal Tool) */}
          <div className="glass-box rounded-[2.5rem] p-8 sm:p-10 border border-[#E8DCC8]/20 bg-[#030919]/90 backdrop-blur-2xl flex flex-col justify-center flex-1 hover:border-sky-400/40 transition-all duration-300">
            <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold mb-3">
              Patient Comfort
            </p>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#E8DCC8] leading-snug">
              Removal Tool
            </h3>
            <p className="mt-4 text-base sm:text-lg text-[#E8DCC8]/85 font-normal leading-relaxed">
              Ergonomic hygienic instruments crafted for painless aligner disengagement, preventing direct fingernail pressure and attachment fractures.
            </p>
          </div>
        </div>

        {/* ================= COLUMN 4: TOP CONTENT -> BOTTOM IMAGE ================= */}
        <div className="flex flex-col gap-6">
          {/* Top: Content (Retainer Box) */}
          <div className="glass-box rounded-[2.5rem] p-8 sm:p-10 border border-[#E8DCC8]/20 bg-[#030919]/90 backdrop-blur-2xl flex flex-col justify-center flex-1 hover:border-sky-400/40 transition-all duration-300">
            <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold mb-3">
              Smart Storage
            </p>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#E8DCC8] leading-snug">
              Retainer Box
            </h3>
            <p className="mt-4 text-base sm:text-lg text-[#E8DCC8]/85 font-normal leading-relaxed">
              Impact-resistant slim protective cases with magnetic enclosure and anti-microbial lining designed for clean everyday aligner preservation.
            </p>
          </div>

          {/* Bottom: Image (Retainer Box) */}
          <div className="relative min-h-[300px] h-[340px] rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10">
            <Image
              src="/finish-2.jpeg"
              alt="Retainer Storage Box"
              fill
              className="object-cover"
            />
          </div>
        </div>

      </div>

    </section>
  );
}