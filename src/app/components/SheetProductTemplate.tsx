"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  ChevronDown, 
  Plus, 
  Minus 
} from "lucide-react";
import { SheetProduct } from "../data/sheetsData";

export default function SheetProductTemplate({ product }: { product: SheetProduct }) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <article className="w-full select-none pt-28 sm:pt-36 pb-28">
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative px-4 sm:px-8 max-w-7xl mx-auto mb-20 sm:mb-28">
        <div className="absolute top-1/4 left-1/3 w-[850px] h-[500px] bg-sky-500/10 blur-[160px] pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Text Body */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#E8DCC8]/25 text-sky-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md">
              <Sparkles size={14} className="text-sky-400" />
              <span>{product.category}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#E8DCC8]">
              {product.name}
            </h1>

            <p className="text-lg sm:text-xl font-semibold text-sky-300/90 leading-snug">
              {product.tagline}
            </p>

            <p className="text-sm sm:text-base text-[#E8DCC8]/85 font-light leading-relaxed">
              {product.overview}
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] hover:opacity-95 text-white font-bold text-xs uppercase tracking-widest transition shadow-lg shadow-sky-500/25"
              >
                <span>Request Sample Kit</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="#specs"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#E8DCC8]/30 hover:border-sky-400 bg-white/[0.03] text-[#E8DCC8] hover:text-white font-semibold text-xs uppercase tracking-widest transition"
              >
                <span>Technical Properties</span>
                <ChevronDown size={14} className="text-sky-400" />
              </Link>
            </div>
          </div>

          {/* Right Product Image (Expanded Size, Hover Blocked) */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-[580px] lg:max-w-[640px] aspect-square flex items-center justify-center">
              <Image
                src={product.imagePath}
                alt={product.name}
                fill
                priority
                className="object-contain pointer-events-none select-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. KEY FEATURES (4 TILES) ================= */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto mb-20 sm:mb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {product.features.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#030919]/80 border border-[#E8DCC8]/20 flex flex-col justify-between hover:border-sky-400/50 transition-all duration-300"
            >
              <div>
                <span className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 font-mono text-xs font-bold mb-4">
                  0{idx + 1}
                </span>
                <h3 className="text-base sm:text-lg font-bold uppercase text-[#E8DCC8] tracking-tight mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#E8DCC8]/75 font-light leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 3. MECHANICAL PROPERTIES (NO BOX, CLEAN LAYOUT) ================= */}
      <section id="specs" className="px-4 sm:px-8 max-w-7xl mx-auto mb-24 sm:mb-32">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Description Column */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold block">
              Standardized Evaluation
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#E8DCC8]">
              Mechanical &amp; Optical Properties
            </h2>
            <p className="text-sm sm:text-base text-[#E8DCC8]/85 font-light leading-relaxed pt-1">
              {product.propertiesIntro}
            </p>
            <div className="pt-2 flex items-center gap-2.5 text-xs text-sky-300 font-medium">
              <ShieldCheck size={18} className="text-sky-400 shrink-0" />
              <span>{product.testingNote}</span>
            </div>
          </div>

          {/* Right Specs List (No Cards, Sleek Dividers) */}
          <div className="lg:col-span-6 divide-y divide-[#E8DCC8]/15 border-y border-[#E8DCC8]/15">
            {product.propertiesList.map((prop, idx) => (
              <div
                key={idx}
                className="py-4 sm:py-5 flex items-center justify-between gap-4"
              >
                <span className="text-sm sm:text-base font-semibold text-[#E8DCC8]">
                  {prop.label}
                </span>
                <span className="text-sm sm:text-base font-mono text-sky-300 font-medium text-right">
                  {prop.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3.5 SIZES COMPACT BOX ================= */}
      {product.sizes && (
        <section className="px-4 sm:px-8 max-w-2xl mx-auto mb-20 sm:mb-24">
          <div className="rounded-2xl border border-[#E8DCC8]/20 bg-[#030919]/90 overflow-hidden shadow-2xl">
            {/* Header Strip */}
            <div className="py-3.5 px-6 bg-white/[0.03] border-b border-[#E8DCC8]/15 flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E8DCC8] font-bold">
                Sizes &amp; Thickness Specifications
              </span>
              <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider">
                Medical Standard
              </span>
            </div>

            {/* Compact 2-Column Split */}
            <div className="p-6 sm:p-8 grid grid-cols-2 gap-8 items-start">
              {/* Left: Dimensions */}
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-[#E8DCC8]/60 mb-4 pb-2 border-b border-[#E8DCC8]/10">
                  Dimensions
                </p>
                <div className="space-y-3 font-mono text-sm sm:text-base text-[#E8DCC8]">
                  {product.sizes.roundDimensions.map((dim, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <span className="text-sky-400 text-base">⌀</span>
                      <span>{dim}</span>
                    </div>
                  ))}
                  {product.sizes.squareDimensions.map((dim, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 pt-1">
                        <span className="w-2.5 h-2.5 rounded-xs bg-sky-400 inline-block" />
                      <span>{dim}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Thickness */}
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-[#E8DCC8]/60 mb-4 pb-2 border-b border-[#E8DCC8]/10">
                  Thickness (mm)
                </p>
                <div className="space-y-2.5 font-mono text-sm sm:text-base text-sky-300 font-semibold">
                  {product.sizes.thicknesses.map((th, idx) => (
                    <div key={idx} className="pb-1 border-b border-white/[0.04] last:border-none">
                      {th}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= 4. FAQ SECTION (ARTISUN STYLE HORIZONTAL DIVIDERS) ================= */}
      <section className="px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold block mb-2">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#E8DCC8]">
            Have Any Question?
          </h2>
        </div>

        {/* Accordion Container with Clean Lines */}
        <div className="w-full divide-y divide-[#E8DCC8]/20 border-y border-[#E8DCC8]/20">
          {product.faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="transition-colors">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full py-5 sm:py-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-medium text-[#E8DCC8]">
                    {faq.question}
                  </span>
                  <div className="text-[#E8DCC8]/70 shrink-0 ml-2">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="pb-6 sm:pb-7 pr-8 text-base sm:text-lg text-[#E8DCC8]/90 font-light leading-relaxed animate-in fade-in duration-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
}