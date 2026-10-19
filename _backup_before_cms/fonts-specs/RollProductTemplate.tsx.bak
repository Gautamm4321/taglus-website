"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Sparkles,
    Award,
    Layers,
    Gauge,
    TrendingDown,
    CheckCircle2,
    ArrowRight,
    Download
} from "lucide-react";

export default function RollProductTemplate({ product }: { product: any }) {
    const rollVariants = [
        {
            name: "Taglus PU Flex",
            desc: "Smartest polyurethane formulation for complex aligner staging and maximum patient comfort.",
            thicknesses: ["0.76 mm", "1.02 mm"],
        },
        {
            name: "Taglus Premium",
            desc: "Ultra-transparent PET-G material offering best-in-class mechanical balance and clarity.",
            thicknesses: ["0.76 mm", "1.02 mm"],
        },
        {
            name: "Taglus Standard",
            desc: "High-value, cost-effective workhorse material optimized for high-volume commercial labs.",
            thicknesses: ["0.76 mm", "1.02 mm"],
        },
        {
            name: "Taglus TUFF",
            desc: "Uniaxially oriented amorphous retainer polymer engineered for extreme fracture resistance.",
            thicknesses: ["0.80 mm"],
        },
    ];

    return (
        <div className="w-full bg-[#020612] text-[#E8DCC8] overflow-hidden selection:bg-sky-400 selection:text-slate-950 font-sans">

            {/* ========================================================
          1. HERO FRAME (About Page Typography + Natural Imagery)
      ======================================================== */}
            <section className="relative w-full pt-28 sm:pt-36 pb-20 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* Left Column: 7 Cols */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-[#E8DCC8]/25 text-sky-300 text-xs sm:text-sm font-semibold tracking-widest uppercase backdrop-blur-md">
                            <Sparkles size={16} className="text-sky-400" />
                            <span>Automated Production Solutions</span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#E8DCC8] leading-[1.08]">
                            Automated Thermoforming <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-300">
                                Machine Rolls
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg text-sky-300/90 font-mono font-medium leading-relaxed max-w-2xl">
                            Validated by HAMER &amp; ALVY Systems. <br className="hidden sm:inline" />
                            Designed to scale volume while reducing material costs up to 73%.
                        </p>

                        <p className="text-base sm:text-lg text-[#E8DCC8] font-normal leading-relaxed max-w-2xl">
                            Taglus aligner and retainer rolls are the optimal high-speed choice for industrial thermoforming equipment. Available in an extensive range of thicknesses, dimensions, and proprietary polymer alloys tailored specifically to commercial clear aligner manufacturing facilities.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <a
                                href="/Taglus-Product-Catalogue.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] hover:opacity-95 text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-sky-500/20"
                            >
                                <Download size={15} />
                                <span>Download Sizes &amp; Weights</span>
                            </a>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full border border-[#E8DCC8]/30 hover:border-sky-400 bg-white/[0.03] text-[#E8DCC8] hover:text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300"
                            >
                                <span>Request Quotation</span>
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: 5 Cols (trim-1.png Image) */}
                    <div className="lg:col-span-5 relative flex justify-center items-center">
                        <div className="relative w-full h-[460px] sm:h-[560px] lg:h-[620px]">
                            <Image
                                src="/trim-2.png"
                                alt="Taglus Automated Thermoforming Machine Roll"
                                fill
                                priority
                                className="object-contain drop-shadow-[0_20px_40px_rgba(56,189,248,0.15)]"
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
          2. ADVANTAGES SECTION (Matching About Page 2-Col / Clean Layout)
      ======================================================== */}
            <section className="relative w-full py-20 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold mb-2">
                        Engineering Superiority
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#E8DCC8]">
                        Advantages of Taglus ATM Rolls
                    </h2>
                </div>

                {/* 4 Feature Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">

                    <div className="rounded-[2.5rem] p-6 sm:p-7 border border-[#E8DCC8]/20 bg-[#030919]/90 backdrop-blur-2xl flex flex-col justify-start hover:border-sky-400/40 transition-all duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-5 shrink-0">
                            <Award size={24} />
                        </div>
                        <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#E8DCC8] leading-snug mb-2">
                            Internationally Certified
                        </h3>
                        <p className="text-sm sm:text-base text-[#E8DCC8] font-light leading-relaxed">
                            Certified under ISO 13485:2016 and compliant with stringent global regulatory medical standards.
                        </p>
                    </div>

                    <div className="rounded-[2.5rem] p-6 sm:p-7 border border-[#E8DCC8]/20 bg-[#030919]/90 backdrop-blur-2xl flex flex-col justify-start hover:border-sky-400/40 transition-all duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-5 shrink-0">
                            <Layers size={24} />
                        </div>
                        <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#E8DCC8] leading-snug mb-2">
                            PU &amp; PETG Materials
                        </h3>
                        <p className="text-sm sm:text-base text-[#E8DCC8] font-light leading-relaxed">
                            Available in both high-elasticity polyurethane and crystal-clear glycol-modified polyethylene options.
                        </p>
                    </div>

                    <div className="rounded-[2.5rem] p-6 sm:p-7 border border-[#E8DCC8]/20 bg-[#030919]/90 backdrop-blur-2xl flex flex-col justify-start hover:border-sky-400/40 transition-all duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-5 shrink-0">
                            <Gauge size={24} />
                        </div>
                        <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#E8DCC8] leading-snug mb-2">
                            High-Pressure Precision
                        </h3>
                        <p className="text-sm sm:text-base text-[#E8DCC8] font-light leading-relaxed">
                            Engineered to produce exact, defect-free adaptations under high pneumatic pressure chambers.
                        </p>
                    </div>

                    <div className="rounded-[2.5rem] p-6 sm:p-7 border border-[#E8DCC8]/20 bg-[#030919]/90 backdrop-blur-2xl flex flex-col justify-start hover:border-sky-400/40 transition-all duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-5 shrink-0">
                            <TrendingDown size={24} />
                        </div>
                        <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#E8DCC8] leading-snug mb-2">
                            Up to 73% Cost Savings
                        </h3>
                        <p className="text-sm sm:text-base text-[#E8DCC8] font-light leading-relaxed">
                            Continuous-feed rolls significantly decrease per-tray material scrap and optimize automation speeds.
                        </p>
                    </div>

                </div>
            </section>

            {/* ========================================================
          3. AVAILABLE VARIANTS & SPECIFICATIONS (With trim-2.png)
      ======================================================== */}
            <section className="relative w-full py-20 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto border-t border-[#E8DCC8]/20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Machine Integration Visual (trim-2.png): 5 Cols */}
                    <div className="lg:col-span-5 relative flex justify-center items-center">
                        <div className="relative w-full h-[440px] sm:h-[520px] lg:h-[580px]">
                            <Image
                                src="/trim-1.png"
                                alt="Automated Thermoforming Machine Integration"
                                fill
                                className="object-contain drop-shadow-[0_20px_40px_rgba(56,189,248,0.12)]"
                            />
                        </div>
                    </div>

                    {/* Variants List: 7 Cols */}
                    <div className="lg:col-span-7 space-y-8">
                        <div>
                            <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold mb-2">
                                Available Portfolio Variants
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#E8DCC8]">
                                Material &amp; Thickness Specifications
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {rollVariants.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="p-5 sm:p-6 rounded-2xl border border-[#E8DCC8]/15 bg-white/[0.02] hover:border-sky-400/30 transition-all duration-300"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                                        <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-sky-300">
                                            {item.name}
                                        </h3>
                                        <div className="flex gap-2">
                                            {item.thicknesses.map((th, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-sky-400/10 border border-sky-400/30 text-sky-300"
                                                >
                                                    {th}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm sm:text-base text-[#E8DCC8] font-light leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-2 flex items-center gap-3 text-sm text-[#E8DCC8]">
                            <CheckCircle2 size={18} className="text-sky-400 shrink-0" />
                            <span>Full machine validation documentation and heating parameters provided upon request.</span>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
}