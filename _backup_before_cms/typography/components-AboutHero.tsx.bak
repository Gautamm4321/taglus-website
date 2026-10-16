"use client";

import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Printer, 
  Package 
} from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative w-full pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[800px] h-[450px] bg-sky-500/10 blur-[150px] pointer-events-none -z-10" />

      {/* ================= TOP SECTION: LEFT-ALIGNED ================= */}
      <div className="max-w-4xl text-left space-y-5 mb-14">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#E8DCC8]/25 text-sky-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md">
          <span>About Taglus</span>
        </div>

        {/* 1-Line Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#E8DCC8] whitespace-nowrap">
          Your Complete Digital Orthodontic Partner
        </h1>

        {/* 2-Line Subheading */}
        <p className="text-base sm:text-lg text-sky-300/90 font-mono font-medium leading-relaxed max-w-2xl">
          One partner for the full digital aligner and retainer workflow: <br className="hidden sm:inline" />
          materials, machines, resins and accessories.
        </p>

        {/* Body Text */}
        <div className="space-y-4 pt-1 text-base sm:text-lg text-[#E8DCC8] font-normal leading-relaxed max-w-3xl">
          <p>
            Taglus is an ISO 13485:2016 certified manufacturer of digital orthodontic consumables and equipment, trusted by clinics, labs and distributors in 70+ countries. We began by making advanced thermoplastic aligner and retainer sheets. Today our range covers every step of the digital workflow, from printing the model to delivering the finished appliance.
          </p>
          <p>
            Every product is engineered to work together, so our partners get consistent results, a simpler supply chain and one team to call for support.
          </p>
        </div>
      </div>

      {/* ================= HORIZONTAL TOP LINE ================= */}
      <div className="w-full h-px bg-[#E8DCC8]/20" />

      {/* ================= 2-COLUMN SPLIT WITH FLUSH VERTICAL T-LINE ================= */}
      <div className="relative pt-10">
        {/* Vertical center divider line touching the horizontal line above */}
        <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-[#E8DCC8]/20" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left Column: What We Make */}
          <div className="space-y-6 lg:pr-8">
            <div className="flex items-center gap-3">
              <Layers size={24} className="text-sky-400" />
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#E8DCC8]">
                What We Make
              </h2>
            </div>

            <div className="space-y-6">
              {/* Item 1 */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <ShieldCheck size={18} className="text-sky-400 shrink-0" />
                  <h3 className="text-base font-bold uppercase tracking-wider text-sky-300">
                    Aligner &amp; Retainer Materials
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[#E8DCC8]/80 font-light leading-relaxed pl-6">
                  Our high-performance thermoplastic sheets include Ultra multilayer aligner material and TUFF retainer material. They are engineered for flexibility, strength and clarity.
                </p>
              </div>

              {/* Item 2 */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Cpu size={18} className="text-sky-400 shrink-0" />
                  <h3 className="text-base font-bold uppercase tracking-wider text-sky-300">
                    Thermoforming Machines
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[#E8DCC8]/80 font-light leading-relaxed pl-6">
                  Duoform delivers fast, precise pressure forming with a sub-one-second heat-up and intuitive touchscreen control.
                </p>
              </div>

              {/* Item 3 */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Printer size={18} className="text-sky-400 shrink-0" />
                  <h3 className="text-base font-bold uppercase tracking-wider text-sky-300">
                    3D Printing Resins
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[#E8DCC8]/80 font-light leading-relaxed pl-6">
                  High-accuracy model resins for printing dental models ready for thermoforming.
                </p>
              </div>

              {/* Item 4 */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Package size={18} className="text-sky-400 shrink-0" />
                  <h3 className="text-base font-bold uppercase tracking-wider text-sky-300">
                    Orthodontic Accessories
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[#E8DCC8]/80 font-light leading-relaxed pl-6">
                  Retainer Boxes, Chewies, Removal Tool, Membrane Boxes and more, to finish and deliver every case professionally.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Why Choose Taglus */}
          <div className="space-y-6 lg:pl-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={24} className="text-sky-400" />
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#E8DCC8]">
                Why Choose Taglus
              </h2>
            </div>

            <div className="space-y-5">
              {[
                {
                  label: "Complete Workflow",
                  detail: "Print, form, finish and package with one trusted supplier.",
                },
                {
                  label: "Engineered Materials",
                  detail: "Science-led materials built for consistent clinical performance and patient comfort.",
                },
                {
                  label: "Certified Quality",
                  detail: "ISO 13485:2016 manufacturing, with CE, UKCA, TGA and ANVISA approvals.",
                },
                {
                  label: "Global Reach",
                  detail: "Available in 70+ countries through a growing distributor network.",
                },
                {
                  label: "Easy to Use",
                  detail: "Products designed to save chairside and lab time.",
                },
                {
                  label: "Great Value",
                  detail: "Premium quality at a price that grows with your practice or lab.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5 text-sm sm:text-base">
                  <CheckCircle2 size={19} className="text-sky-400 shrink-0 mt-1" />
                  <p className="text-[#E8DCC8]/85 font-light leading-relaxed">
                    <strong className="text-sky-300 font-bold">{item.label}:</strong> {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= CENTERED BUTTONS (NO TOP BORDER LINE) ================= */}
      <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/#products"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-full border border-[#E8DCC8]/30 hover:border-sky-400 bg-white/[0.03] hover:bg-gradient-to-r hover:from-[#0052cc] hover:to-[#00d4ff] text-[#E8DCC8] hover:text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-md"
        >
          <span>Explore Our Products</span>
          <ArrowRight size={14} />
        </Link>

        <Link
          href="/contact"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-full bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] hover:opacity-95 text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-sky-500/20"
        >
          <span>Become a Distributor</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}