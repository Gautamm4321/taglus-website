"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";

type Accessory = {
  label: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  /** Dark products (e.g. the black articulator) get a thin light outline that follows the product's shape, so they stay visible on the dark card */
  glow?: boolean;
  /** Cropped images (tight, no empty space) sit with a bit more padding so all 5 products look the same size */
  cropped?: boolean;
  /** Small real-life products (e.g. the articulator) are drawn smaller so sizes look true to life */
  small?: boolean;
};

const ACCESSORIES: Accessory[] = [
  {
    label: "Chairside Delivery",
    title: "Ortho Chewies",
    description:
      "Medical-grade cylindrical chewies that remove air gaps and help every aligner seat fully and evenly across the arch.",
    image: "/accessories/ortho-chewies.png",
    alt: "Taglus Ortho Chewies",
    cropped: true,
  },
  {
    label: "Patient Comfort",
    title: "Removal Tool",
    description:
      "Ergonomic, hygienic tool for painless aligner removal, avoiding fingernail pressure and protecting attachments from damage.",
    image: "/accessories/removal-tool.png",
    alt: "Aligner Removal Tool",
    cropped: true,
  },
  {
    label: "Smart Storage",
    title: "Aligner Case",
    description:
      "Impact-resistant slim case with a secure snap lid, designed for clean everyday aligner storage at home and on the go.",
    image: "/accessories/aligner-case.png",
    alt: "Clear Aligner Storage Case",
    cropped: true,
  },
  {
    label: "Daily Protection",
    title: "Retainer Box",
    description:
      "Compact round case with a built-in mirror and ventilated tray, keeping retainers clean, protected and easy to carry.",
    image: "/retainer_box-removebg-preview.png",
    alt: "Taglus Retainer Box with Mirror",
  },
  {
    label: "Lab Essentials",
    title: "Articulator",
    description:
      "Lightweight articulator that holds upper and lower models in a stable bite for accurate trimming and case checks.",
    image: "/articulator-removebg-preview.png",
    alt: "Dental Model Articulator",
    glow: true,
    small: true,
  },
];

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
        <p className="mt-5 text-lg sm:text-xl text-[#E8DCC8] font-light leading-relaxed max-w-2xl mx-auto">
          Comprehensive patient care kits, aligner seating essentials, and durable clinical delivery instruments.
        </p>
      </div>

      {/* 5 cards: 1 per row on mobile → 2 → 3 → all 5 in one line on desktop (xl) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch">
        {ACCESSORIES.map((item) => (
          <div
            key={item.title}
            className="glass-box rounded-[2rem] p-3 sm:p-4 border border-[#E8DCC8]/20 bg-[#030919]/90 backdrop-blur-2xl flex flex-col h-full hover:border-sky-400/40 transition-all duration-300"
          >
            <div className="relative w-full h-[260px] xl:h-[220px] 2xl:h-[250px] rounded-[1.5rem] overflow-hidden shrink-0">
              <div className={`absolute ${item.small ? "inset-10" : item.cropped ? "inset-6" : "inset-4"}`}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain"
                  style={item.glow ? { filter: "drop-shadow(0 0 1px rgba(232,220,200,0.6)) drop-shadow(0 0 6px rgba(232,220,200,0.25))" } : undefined}
                />
              </div>
            </div>

            <div className="p-3 sm:p-4 flex flex-col flex-1 justify-start">
              <p className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold text-left">
                {item.label}
              </p>
              <h3 className="mt-1.5 text-2xl xl:text-[1.35rem] 2xl:text-[1.6rem] font-black uppercase tracking-tight text-[#E8DCC8] leading-[1.1]">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] xl:text-sm 2xl:text-[15px] text-[#E8DCC8] font-normal leading-relaxed text-left hyphens-none [text-wrap:pretty]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
