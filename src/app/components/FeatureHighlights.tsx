"use client";

import { Layers, FlaskConical, Award } from "lucide-react";

export default function FeatureHighlights() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 items-center">
        
        {/* ================= COLUMN 1: ICON TOP -> TEXT BOTTOM ================= */}
        <div className="flex flex-col items-center text-center">
          {/* Big Black Icon - No Background */}
          <div className="mb-6 text-black transition-transform duration-300 hover:scale-110">
            <Layers size={58} strokeWidth={1.4} />
          </div>

          {/* Content */}
          <div className="space-y-3 max-w-xs">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-950">
              Innovative Sheets
            </h3>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
              Global industry leader in engineering advanced dental aligner and post-treatment retainer thermoplastic sheets.
            </p>
          </div>
        </div>

        {/* ================= COLUMN 2: TEXT TOP -> ICON BOTTOM ================= */}
        <div className="flex flex-col items-center text-center md:translate-y-2">
          {/* Content */}
          <div className="space-y-3 max-w-xs mb-6">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-950">
              Cutting-Edge Tech
            </h3>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
              Manufactured using precision engineering along with ultra-pure, high-performance liquid resins for 3D printing.
            </p>
          </div>

          {/* Big Black Icon - No Background */}
          <div className="text-black transition-transform duration-300 hover:scale-110">
            <FlaskConical size={58} strokeWidth={1.4} />
          </div>
        </div>

        {/* ================= COLUMN 3: ICON TOP -> TEXT BOTTOM ================= */}
        <div className="flex flex-col items-center text-center">
          {/* Big Black Icon - No Background */}
          <div className="mb-6 text-black transition-transform duration-300 hover:scale-110">
            <Award size={58} strokeWidth={1.4} />
          </div>

          {/* Content */}
          <div className="space-y-3 max-w-xs">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-950">
              Certified Quality
            </h3>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
              Backed by international quality assurance certifications confirming compliance with rigorous medical and orthodontic standards.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}