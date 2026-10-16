"use client";

import Image from "next/image";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function ResinProductTemplate({ product }: { product: any }) {
    // 5 Key Clinical Points - All in 1 Line
    const clinicalPoints = [
        {
            title: "Zero Thermoforming Warp",
            desc: "High heat deflection temperature withstands intense pressure without tooth arch deformation.",
        },
        {
            title: "Micro-Detail Margins",
            desc: "Captures sharp gingival margins and interproximal undercuts for snug aligner seating.",
        },
        {
            title: "Non-Brittle Tough Core",
            desc: "Stays tough under heavy handling, laboratory transport, and rapid tool trimming.",
        },
        {
            title: "Glare-Free Matte Finish",
            desc: "Reduces visual technician eye strain and enables smooth intraoral scan verification.",
        },
        {
            title: "Universal 385–405nm Light",
            desc: "Seamless compatibility across standard DLP, LCD, and SLA printers with rapid layer reset.",
        },
    ];

    // 1:1 Teeth Arches for Marquee Train Slider
    const teethSlides = [
        {
            src: "/risen-teeth-2.webp",
            title: "Orthodontic Working Model",
            desc: "Glare-free matte texture providing sharp optical contrast under operatory inspection.",
        },
        {
            src: "/risen-teeth-3.webp",
            title: "Full Arch Study Model",
            desc: "Exceptional marginal fidelity and accurate interproximal tooth reproduction.",
        },
        {
            src: "/risen-teeth-4.png",
            title: "Quadrant Section Model",
            desc: "Crisp margin retention with non-brittle edge stability during aligner trimming.",
        },
        {
            src: "/risen-teeth-5.png",
            title: "Diagnostic Study Cast",
            desc: "Zero moisture distortion ensuring consistent arch width across clinical checkups.",
        },
        {
            src: "/risen-teeth-6.png",
            title: "Thermoforming Working Arch",
            desc: "High heat resistance preventing deformation during high-pressure aligner forming.",
        },
        {
            src: "/risen-teeth-7.png",
            title: "High-Precision Dental Arch",
            desc: "Minimal shrinkage under 405nm UV exposure for tight clinical tray seating.",
        },
        {
            src: "/risen-teeth-8.png",
            title: "Aligner Master Model",
            desc: "Durable surface hardness withstanding repeated aligner insertion and detachments.",
        },
        {
            src: "/risen-teeth-9.png",
            title: "Digital Aligner Sequence",
            desc: "Homogeneous particle suspension preventing layer-line visibility on fine contours.",
        },
    ];

    // Doubled array for seamless 60s infinite loop
    const marqueeItems = [...teethSlides, ...teethSlides];

    return (
        <div className="w-full bg-[#020612] text-[#E8DCC8] overflow-hidden selection:bg-sky-400 selection:text-slate-950 font-sans">

            {/* ========================================================
          1. HERO FRAME (Clean Left Text + Full Natural Image on Right)
      ======================================================== */}
            <section className="relative w-full min-h-[85vh] flex items-center px-6 sm:px-12 lg:px-20 py-20 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

                    {/* Left Side: Typography */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-[#E8DCC8]/25 text-sky-300 text-xs sm:text-sm font-semibold tracking-widest uppercase backdrop-blur-md">
                            <Sparkles size={16} className="text-sky-400" />
                            <span>Next-Gen 3D Photopolymer Resin</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[1.08]">
                            <span className="block text-[#E8DCC8] whitespace-nowrap">
                                TAGLUS 3D PRINT
                            </span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-300 whitespace-nowrap">
                                MODEL RESIN
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-[#E8DCC8]/85 font-normal leading-relaxed max-w-xl">
                            Engineered exclusively for high-accuracy dental aligner model manufacturing.
                            Delivers extreme dimensional stability, high heat endurance during thermoforming,
                            and a glare-free matte surface for effortless optical inspection.
                        </p>
                    </div>

                    {/* Right Side: Full Unboxed Banner Image */}
                    <div className="relative flex justify-center items-center w-full">
                        <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[560px]">
                            <Image
                                src="/model resin.jpg"
                                alt="Taglus 3D Print Model Resin"
                                fill
                                priority
                                className="object-contain"
                            />
                        </div>
                    </div>

                </div>
            </section>


            {/* ========================================================
          2. ALL 5 CLINICAL POINTS IN ONE SINGLE LINE
      ======================================================== */}
      <section className="w-full py-16 px-4 sm:px-8 lg:px-12 bg-transparent">
                <div className="max-w-[1400px] mx-auto">

                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold mb-2">
                            Clinical Precision Standards
                        </p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#E8DCC8]">
                            Why Orthodontic Labs Rely On Taglus Resin
                        </h2>
                    </div>

                    {/* 5 in One Line Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
                        {clinicalPoints.map((item, idx) => (
                            <div
                                key={idx}
                                className="rounded-[2rem] p-5 sm:p-6 border border-[#E8DCC8]/20 bg-[#030919]/90 backdrop-blur-2xl flex flex-col justify-start hover:border-sky-400/40 transition-all duration-300"
                            >
                                <div className="w-10 h-10 rounded-full bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-4 shrink-0">
                                    <CheckCircle2 size={20} />
                                </div>
                                <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#E8DCC8] leading-snug mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-sm sm:text-base text-[#E8DCC8]/85 font-normal leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>


            {/* ========================================================
          3. LARGE TILTED BOTTLES FRAME (/ \ Tilt, Bigger Size, No BG Boxes)
      ======================================================== */}
      <section className="w-full py-12 md:py-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                    {/* Left Bottle: / Tilt (Rightward Tilt), Increased Size */}
                    <div className="lg:col-span-4 flex flex-col items-center justify-center">
                        <div className="relative w-72 sm:w-80 h-[520px] sm:h-[580px] transition-transform duration-500 hover:rotate-0 rotate-12">
                            <Image
                                src="/taglus-model-risen-btl.png"
                                alt="Taglus Standard Model Resin"
                                fill
                                className="object-contain drop-shadow-[0_20px_35px_rgba(56,189,248,0.15)]"
                            />
                        </div>
                        <p className="mt-4 text-sm sm:text-base font-mono uppercase tracking-widest text-[#E8DCC8] font-bold">
                            TAGLUS STANDARD MODEL RESIN
                        </p>
                    </div>

                    {/* Center Content: 3-3 Lines Cleanly Formatted */}
                    <div className="lg:col-span-4 text-center space-y-10 px-4">

                        {/* Top 3 Lines */}
                        <div className="space-y-2.5">
                            <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold">
                                Formulation 01
                            </p>
                            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#E8DCC8]">
                                TAGLUS ODOURLESS RESIN
                            </h3>
                            <p className="text-base sm:text-lg text-[#E8DCC8]/85 leading-snug font-normal">
                                Engineered with high tensile yield strength and break resilience.
                            </p>
                            <p className="text-base sm:text-lg text-[#E8DCC8]/85 leading-snug font-normal">
                                Virtually odourless photopolymer minimizing irritating laboratory fumes.
                            </p>
                            <p className="text-sm sm:text-base text-sky-300 font-medium">
                                Optimized for heavy orthodontic thermoforming & aligner models.
                            </p>
                        </div>

                        <div className="w-20 h-px bg-[#E8DCC8]/20 mx-auto" />

                        {/* Bottom 3 Lines */}
                        <div className="space-y-2.5">
                            <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold">
                                Formulation 02
                            </p>
                            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#E8DCC8]">
                                TAGLUS WATER WASHABLE RESIN
                            </h3>
                            <p className="text-base sm:text-lg text-[#E8DCC8]/85 leading-snug font-normal">
                                Cleans completely with tap water, eliminating expensive IPA alcohol baths.
                            </p>
                            <p className="text-base sm:text-lg text-[#E8DCC8]/85 leading-snug font-normal">
                                Retains razor-sharp tooth contour accuracy with ultra-low surface shrinkage.
                            </p>
                            <p className="text-sm sm:text-base text-sky-300 font-medium">
                                Eco-conscious, user-friendly formulation for rapid chairside workflows.
                            </p>
                        </div>

                    </div>

                    {/* Right Bottle: \ Tilt (Leftward Tilt), Increased Size */}
                    <div className="lg:col-span-4 flex flex-col items-center justify-center">
                        <div className="relative w-72 sm:w-80 h-[520px] sm:h-[580px] transition-transform duration-500 hover:rotate-0 -rotate-12">
                            <Image
                                src="/taglus-washable-bottle.png"
                                alt="Taglus Water Washable Resin"
                                fill
                                className="object-contain drop-shadow-[0_20px_35px_rgba(56,189,248,0.15)]"
                            />
                        </div>
                        <p className="mt-4 text-sm sm:text-base font-mono uppercase tracking-widest text-[#E8DCC8] font-bold">
                            TAGLUS WATER WASHABLE RESIN
                        </p>
                    </div>

                </div>
            </section>


            {/* ========================================================
          4. INFINITE 60s MARQUEE TRAIN SLIDER (1:1 Aspect, Blur + Hover)
      ======================================================== */}
      <section className="w-full py-20 bg-transparent">
                <div className="max-w-6xl mx-auto px-4 mb-14 text-center">
                    <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold mb-2">
                        Real Lab Output
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#E8DCC8] whitespace-nowrap">
                        Precision 3D Printed Teeth Arches
                    </h2>
                    <p className="mt-3 text-base sm:text-lg text-[#E8DCC8]/85 font-normal">
                        Hover over any model to inspect clinical print details
                    </p>
                </div>

                {/* Marquee Train Track */}
                <div className="relative w-full overflow-hidden">
                    {/* Edge Gradient Fades */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#020612] to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#020612] to-transparent z-10 pointer-events-none" />

                    <div className="animate-marquee-slow flex gap-6">
                        {marqueeItems.map((item, idx) => (
                            <div
                                key={idx}
                                className="group relative w-72 h-72 sm:w-80 sm:h-80 aspect-square rounded-[2rem] overflow-hidden shrink-0 cursor-pointer"
                            >
                                {/* Full 1:1 Edge-to-Edge Image */}
                                <Image
                                    src={item.src}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:blur-md"
                                />

                                {/* Hover Content Overlay */}
                                <div className="absolute inset-0 bg-[#020612]/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-6 space-y-3">
                                    <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold">
                                        Clinical Spec
                                    </span>
                                    <h4 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#E8DCC8] leading-tight">
                                        {item.title}
                                    </h4>
                                    <p className="text-sm sm:text-base text-[#E8DCC8]/85 leading-relaxed font-normal">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}