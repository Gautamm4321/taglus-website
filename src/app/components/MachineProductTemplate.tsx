"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Sparkles, 
  Flame, 
  Gauge, 
  Monitor, 
  Volume2, 
  ShieldCheck, 
  ArrowRight,
  Download
} from "lucide-react";

export default function MachineProductTemplate({ product }: { product: any }) {
  const specs = product.propertiesList || [];
  const features = product.features || [];

  return (
    <div className="w-full bg-[#020612] text-[#E8DCC8] font-sans selection:bg-sky-400 selection:text-slate-950">
      
      {/* ========================================================
          1. HERO FRAME (Equipment Intro + Image)
      ======================================================== */}
      <section className="relative w-full pt-28 sm:pt-36 pb-20 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Details: 7 Cols */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#E8DCC8]/25 text-sky-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md">
              <Sparkles size={14} className="text-sky-400" />
              <span>Precision In-Office &amp; Lab Thermoforming</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#E8DCC8] leading-[1.08]">
              {product.name}
            </h1>

            <p className="text-base sm:text-lg text-sky-300/90 font-mono font-medium leading-relaxed max-w-2xl">
              {product.tagline}
            </p>

            <p className="text-base sm:text-lg text-[#E8DCC8] font-normal leading-relaxed max-w-2xl">
              {product.overview}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] hover:opacity-95 text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-sky-500/20"
              >
                <span>Request Quotation</span>
                <ArrowRight size={14} />
              </Link>

              <a
                href="/Taglus-Product-Catalogue.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full border border-[#E8DCC8]/30 hover:border-sky-400 bg-white/[0.03] text-[#E8DCC8] hover:text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300"
              >
                <Download size={14} />
                <span>Technical Catalog</span>
              </a>
            </div>
          </div>

          {/* Right Visual: 5 Cols */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[480px]">
              <Image
                src={product.imagePath || "/taglusduoform.product.png"}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain drop-shadow-[0_20px_50px_rgba(56,189,248,0.2)]"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ================= DIVIDER LINE ================= */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="w-full h-px bg-[#E8DCC8]/20" />
      </div>

      {/* ========================================================
          2. CORE CAPABILITIES (Feature Blocks)
      ======================================================== */}
      <section className="relative w-full py-20 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold mb-2">
            Engineering Superiority
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#E8DCC8]">
            Key Performance Attributes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          <div className="rounded-[2.5rem] p-7 border border-[#E8DCC8]/20 bg-[#030919]/90 backdrop-blur-2xl flex flex-col justify-start hover:border-sky-400/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-5 shrink-0">
              <Flame size={24} />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-[#E8DCC8] mb-2">
              Sub-Second Heating
            </h3>
            <p className="text-sm text-[#E8DCC8] font-light leading-relaxed">
              Equipped with shortwave infrared heaters reaching optimal forming temperature within 1 second.
            </p>
          </div>

          <div className="rounded-[2.5rem] p-7 border border-[#E8DCC8]/20 bg-[#030919]/90 backdrop-blur-2xl flex flex-col justify-start hover:border-sky-400/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-5 shrink-0">
              <Gauge size={24} />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-[#E8DCC8] mb-2">
              4 BAR Positive Pressure
            </h3>
            <p className="text-sm text-[#E8DCC8] font-light leading-relaxed">
              Provides constant 60 PSI forming pressure for precision adaptation into interproximal dental areas.
            </p>
          </div>

          <div className="rounded-[2.5rem] p-7 border border-[#E8DCC8]/20 bg-[#030919]/90 backdrop-blur-2xl flex flex-col justify-start hover:border-sky-400/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-5 shrink-0">
              <Monitor size={24} />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-[#E8DCC8] mb-2">
              4.3″ Touchscreen UI
            </h3>
            <p className="text-sm text-[#E8DCC8] font-light leading-relaxed">
              Clearly structured display with real-time feedback for temperature, time, and pneumatic controls.
            </p>
          </div>

          <div className="rounded-[2.5rem] p-7 border border-[#E8DCC8]/20 bg-[#030919]/90 backdrop-blur-2xl flex flex-col justify-start hover:border-sky-400/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-5 shrink-0">
              <Volume2 size={24} />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-[#E8DCC8] mb-2">
              Whisper-Quiet Operation
            </h3>
            <p className="text-sm text-[#E8DCC8] font-light leading-relaxed">
              Engineered with sound-dampened mechanics for non-disruptive chairside and office dental usage.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. UNIFIED TECHNICAL & WORKFLOW SPECIFICATIONS
      ======================================================== */}
      <section className="relative w-full py-20 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto border-t border-[#E8DCC8]/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Card: Operational Features */}
          <div className="lg:col-span-6 rounded-3xl p-8 sm:p-10 border border-[#E8DCC8]/15 bg-[#030919]/60 backdrop-blur-xl flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold mb-2">
                  Operational Features
                </p>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#E8DCC8]">
                  Built For Clinic &amp; Lab Workflows
                </h2>
              </div>

              <div className="divide-y divide-[#E8DCC8]/10 pt-2">
                {features.map((feature: { title: string; description: string }, idx: number) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
                    <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0 mt-2 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-[#E8DCC8] tracking-wide uppercase">
                        {feature.title}
                      </p>
                      <p className="text-xs sm:text-[13px] text-[#E8DCC8] font-light leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Card: Machine Specifications */}
          <div className="lg:col-span-6 rounded-3xl p-8 sm:p-10 border border-[#E8DCC8]/15 bg-[#030919]/60 backdrop-blur-xl flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold mb-2">
                  Verified Parameters
                </p>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#E8DCC8]">
                  Machine Specifications
                </h2>
              </div>

              <div className="divide-y divide-[#E8DCC8]/10 pt-2">
                {specs.map((spec: { label: string; value: string }, i: number) => (
                  <div key={i} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4 text-xs sm:text-sm">
                    <span className="font-medium text-[#E8DCC8]">
                      {spec.label}
                    </span>
                    <span className="font-mono font-semibold text-sky-300 text-right">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}