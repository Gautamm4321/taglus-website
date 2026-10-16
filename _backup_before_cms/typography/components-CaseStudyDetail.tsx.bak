"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, CheckCircle2, Quote, ArrowRight, Globe, ShieldCheck } from "lucide-react";

export default function CaseStudyDetail() {
  return (
    <article className="w-full select-none">
      
      {/* ================= FULL BLEED LANDSCAPE HERO (EDGE-TO-EDGE) ================= */}
      <div className="relative w-full h-[380px] sm:h-[480px] md:h-[580px] lg:h-[640px] overflow-hidden">
        <Image
          src="/case-studies1.png"
          alt="Elevating Orthodontic Excellence in South America"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Ambient Gradient Overlays for readable transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020612] via-[#020612]/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020612]/80 via-transparent to-[#020612]/80" />

        {/* Header Overlay Text */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-10 flex flex-col justify-end pb-12 sm:pb-16 z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-[#E8DCC8]/25 text-sky-300 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4 backdrop-blur-md w-fit">
            <Sparkles size={14} className="text-sky-400" />
            <span>Case Study</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#E8DCC8] max-w-4xl leading-[1.15]">
            Elevating Orthodontic Excellence In South America{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-300">
              With Taglus
            </span>
          </h1>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4 text-xs sm:text-sm font-mono text-[#E8DCC8]/80">
            <span className="flex items-center gap-1.5 text-sky-400">
              <Globe size={15} />
              Client: Dental Distributor | South America (Peru)
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="flex items-center gap-1.5 text-[#E8DCC8]/70">
              <ShieldCheck size={15} className="text-sky-400" />
              ISO 13485:2016 Certified Partner
            </span>
          </div>
        </div>
      </div>

      {/* ================= CONTENT BODY SECTION ================= */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Deep-Dive Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Section 1: About the Client */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#E8DCC8] border-b border-[#E8DCC8]/15 pb-3">
                About the Client & Partnership
              </h2>
              <p className="text-sm sm:text-base text-[#E8DCC8]/80 font-light leading-relaxed">
                Founded in 2011, this certified dental distributor has grown into one of the most reliable names in South America’s dental industry. Built on the philosophy of “leadership by results,” the company serves a broad professional network that includes orthodontists, research laboratories, and regional dental practices spanning private clinics, universities, and commercial dental centers across the region.
              </p>
              <p className="text-sm sm:text-base text-[#E8DCC8]/80 font-light leading-relaxed">
                With a strong reputation for clinical credibility, the distributor consistently evaluates only suppliers who meet and exceed stringent world-class medical device regulatory and quality standards.
              </p>
              <p className="text-sm sm:text-base text-[#E8DCC8]/80 font-light leading-relaxed">
                Together, they support dental professionals with materials and technologies designed for both premier in-office workflows and high-volume commercial production environments.
              </p>
            </section>

            {/* Section 2: The Challenge */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#E8DCC8] border-b border-[#E8DCC8]/15 pb-3">
                The Challenge: Meeting Rising Aligner Expectations
              </h2>
              <p className="text-sm sm:text-base text-[#E8DCC8]/80 font-light leading-relaxed">
                As aligner adoption expanded in the South American market, the distributor began observing key challenges with conventional aligner sheets and thermoforming products, particularly in meeting growing expectations around:
              </p>
              <ul className="space-y-2.5 pt-1">
                {[
                  "Optical clarity and aesthetic retention",
                  "Crack resistance and tear durability",
                  "Consistency in thermoforming adaptation",
                  "Scalability for higher production volumes without margin slippage",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-[#E8DCC8]/90 font-medium">
                    <CheckCircle2 size={16} className="text-sky-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Quote Block */}
              <div className="glass-box p-6 rounded-none border border-[#E8DCC8]/20 bg-[#030919]/90 backdrop-blur-md relative mt-4">
                <Quote size={28} className="text-sky-400/40 mb-2" />
                <p className="text-sm sm:text-base italic text-[#E8DCC8] font-light leading-relaxed">
                  “Our customer base was facing challenges for sheets with optimal clarity, crack resistance, and thermoforming consistency. There was a clear need for premiere quality materials in our portfolio.”
                </p>
                <span className="block mt-3 text-xs font-mono uppercase text-sky-400">
                  — The Founder and CEO
                </span>
              </div>
            </section>

            {/* Section 3: The Solution */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#E8DCC8] border-b border-[#E8DCC8]/15 pb-3">
                The Solution: Partnering with Taglus
              </h2>
              <p className="text-sm sm:text-base text-[#E8DCC8]/80 font-light leading-relaxed">
                In 2023, the distributor transitioned to Taglus, introducing engineering-focused thermoforming sheets into their commercial offerings. The impact was immediate across clinical and orthodontic labs.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  {
                    title: "Taglus Premium & PU Flex Adoption",
                    desc: "Immediate clinical preference driven by high stress retention curves and outstanding multi-axial flexibility.",
                  },
                  {
                    title: "Transparent Commercial Positioning",
                    desc: "Competitive pricing allowed rapid penetration into high-volume aligner and retainer lab operations.",
                  },
                  {
                    title: "Active Technical & Brand Enablement",
                    desc: "Comprehensive TDS documentation, heating guidelines, and localized marketing support helped educate laboratories rapidly.",
                  },
                ].map((sol, idx) => (
                  <div key={idx} className="p-4 bg-white/[0.02] border border-white/[0.08]">
                    <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-sky-300">
                      {sol.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#E8DCC8]/75 font-light mt-1">
                      {sol.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: Customer Response & Looking Ahead */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#E8DCC8] border-b border-[#E8DCC8]/15 pb-3">
                Customer Response & Market Expansion
              </h2>
              <p className="text-sm sm:text-base text-[#E8DCC8]/80 font-light leading-relaxed">
                Feedback from regional labs was overwhelmingly positive. Practices reported lower aligner failure rates, reduced retreatment cycles, and higher intraoral comfort scores from patients.
              </p>
              <p className="text-sm sm:text-base text-[#E8DCC8]/80 font-light leading-relaxed">
                Looking ahead, the partnership continues to expand into photopolymer 3D printing resins, custom finishing systems, and laser automation ecosystems across Latin America.
              </p>
            </section>

          </div>

          {/* RIGHT COLUMN: 9:16 Portrait Image Frame & Highlights (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 sticky top-28">
            
            {/* 9:16 Portrait Aspect Frame */}
            <div className="relative aspect-[9/16] w-full max-w-[450px] mx-auto overflow-hidden border border-[#E8DCC8]/25 bg-black/60 shadow-2xl">
              <Image
                src="/case-studies2.png"
                alt="Taglus Clinical Application"
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020612]/90 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#030919]/95 border border-[#E8DCC8]/20 backdrop-blur-xl">
                <span className="text-xs sm:text-sm font-mono uppercase text-sky-400 font-semibold block mb-1.5 tracking-wider">
                  Validated Clinical Workflow
                </span>
                <p className="text-sm sm:text-base text-[#E8DCC8]/90 font-light leading-relaxed">
                  Continuous multi-axis stress retention &amp; crystal-clear intraoral aesthetics across Latin America.
                </p>
              </div>
            </div>

            {/* Key Metrics Quick Box */}
            <div className="glass-box p-7 sm:p-8 border border-white/[0.1] bg-[#030919]/90 max-w-[450px] mx-auto space-y-6">
              <h3 className="text-sm font-mono uppercase tracking-widest text-sky-300 font-bold">
                Key Partnership Highlights
              </h3>
              
              <div className="divide-y divide-white/[0.1] space-y-1">
                <div className="py-3.5 flex items-center justify-between text-sm sm:text-base">
                  <span className="text-[#E8DCC8]/70">Region</span>
                  <span className="text-[#E8DCC8] font-bold text-base">South America (Peru)</span>
                </div>
                <div className="py-3.5 flex items-center justify-between text-sm sm:text-base">
                  <span className="text-[#E8DCC8]/70">Key Materials</span>
                  <span className="text-[#E8DCC8] font-bold text-base">Premium™ &amp; PU Flex™</span>
                </div>
                <div className="py-3.5 flex items-center justify-between text-sm sm:text-base">
                  <span className="text-[#E8DCC8]/70">Impact</span>
                  <span className="text-sky-300 font-bold text-base sm:text-lg">&gt; 40% Growth in Aligner Labs</span>
                </div>
              </div>

              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-white/[0.05] hover:bg-gradient-to-r hover:from-[#0052cc] hover:to-[#00d4ff] text-[#E8DCC8] hover:text-white text-xs sm:text-sm font-bold uppercase tracking-widest border border-[#E8DCC8]/25 hover:border-transparent transition-all duration-300 shadow-md mt-2"
              >
                <span>Inquire About Partnership</span>
                <ArrowRight size={15} />
              </Link>
            </div>

          </div>

        </div>

      </div>

    </article>
  );
}