"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";
import Header from "./components/header";
import FeatureHighlights from "./components/FeatureHighlights";
import ProductColumns from "./components/ProductColumns";
import Footer from "./components/Footer";
import SafeProductImage from "./components/SafeProductImage";

export default function Home() {
  // 3D Mouse Movement Physics
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth Springs for fluid physics
  const springX = useSpring(mouseX, { stiffness: 180, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 25 });

  // 3D Angles
  const rotateX = useTransform(springY, [-0.5, 0.5], [16, -16]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020612] text-[#E8DCC8] selection:bg-sky-500/30 selection:text-white relative overflow-x-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[750px] bg-gradient-to-b from-[#0c1e33]/50 via-[#0a1628]/25 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* 1. Header */}
      <Header />

      {/* 2. Full-Bleed Luxury Hero */}
      <section className="relative w-full pt-32 lg:pt-40 pb-20 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* ================= LEFT CONTENT ================= */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center text-left z-20"
          >
            {/* Clinical Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#E8DCC8]/20 text-sky-300 text-[11px] font-semibold tracking-[0.2em] uppercase w-fit mb-6 shadow-sm backdrop-blur-md">
              <Sparkles size={13} className="text-sky-400" />
              <span>Engineered For Clinical Precision</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black uppercase tracking-tight text-[#E8DCC8] leading-[1.08]">
              One Stop Solution For All Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-400">
                Orthodontic Needs
              </span>
            </h1>

            {/* Sub-text */}
            <p className="mt-6 text-base sm:text-lg text-[#E8DCC8]/75 font-light leading-relaxed max-w-xl">
              From advanced multilayer thermoplastic sheets and precision 3D printing resins to automated laser trimming ecosystems. Purpose-built for orthodontic laboratories and clinical practices worldwide.
            </p>

            {/* Dual CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="#sample-kit"
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] hover:from-blue-600 hover:to-cyan-400 text-white text-sm font-semibold tracking-wide shadow-[0_0_30px_rgba(0,180,255,0.35)] hover:scale-[1.03] transition-all duration-300"
              >
                <span>Become a Distributor</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#workflow"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-[#E8DCC8]/25 text-[#E8DCC8] text-sm font-medium tracking-wide transition-all backdrop-blur-md"
              >
                <span>Explore Workflow</span>
                <span className="text-xs text-sky-400">↓</span>
              </Link>
            </div>

            {/* Clinical Certifications */}
            <div className="mt-12 pt-6 border-t border-[#E8DCC8]/15 flex items-center gap-6 text-xs text-[#E8DCC8]/70 font-light">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-sky-400" />
                <span>ISO 13485:2016</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-sky-400" />
                <span>MDR / CE Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-sky-400" />
                <span>FDA Cleared</span>
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT 3D INTERACTIVE SHOWCASE ================= */}
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-6 relative flex items-center justify-center min-h-[490px] lg:min-h-[580px] [perspective:1400px] select-none"
          >
            {/* Cinematic Center Glows */}
            <div className="absolute w-88 h-88 rounded-full bg-blue-600/25 blur-[110px] pointer-events-none -z-10" />
            <div className="absolute w-[460px] h-[460px] rounded-full border border-sky-400/10 pointer-events-none animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-[#E8DCC8]/10 pointer-events-none animate-[spin_40s_linear_infinite_reverse]" />

            {/* 3D Motion Stage */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative z-10 w-full max-w-[420px] aspect-square flex items-center justify-center"
            >
              {/* Natural Float & Levitation Loop */}
              <motion.div
                animate={{
                  y: [-14, 12, -14],
                  rotateZ: [-1, 2, -1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* Main 3D Box Render */}
                {/* TODO: this is currently a generic mockup box (tuglas-hero-img.png), not
                    real Taglus product photography or a real 3D model. Replace src below
                    with an actual product photo from the client's shared folder, or swap
                    this whole block for a real <canvas>/WebGL render if true interactive
                    3D is required. */}
                <div 
                  style={{ transform: "translateZ(60px)" }}
                  className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px]"
                >
                  <SafeProductImage
                    src="/tuglas-hero-img.png"
                    alt="Taglus Premium Packaging"
                    label="Taglus Premium Packaging"
                    className="object-contain drop-shadow-[0_35px_65px_rgba(0,140,255,0.4)] pointer-events-none transition-transform duration-300"
                  />
                </div>

                {/* Ground Shadow Depth */}
                <div 
                  style={{ transform: "translateZ(-40px) translateY(180px) rotateX(85deg)" }}
                  className="absolute w-72 h-14 bg-sky-950/70 rounded-full blur-2xl pointer-events-none"
                />
              </motion.div>
            </motion.div>

            {/* Floating Glass Spec Pill (Bottom) */}
            <div className="absolute bottom-2 inset-x-6 sm:inset-x-12 z-20 flex items-center justify-between px-5 py-3 rounded-2xl bg-[#030919]/90 border border-[#E8DCC8]/20 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.85)]">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#E8DCC8]/60 font-medium">Flagship Material</p>
                <p className="text-xs sm:text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-300">
                  Taglus Premium™ Aligner Sheet
                </p>
              </div>
              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300">
                Medical Grade
              </span>
            </div>
          </div>

        </div>

        {/* ================= GLOBAL REACH METRICS STRIP ================= */}
        <div className="w-full mt-20 pt-10 border-t border-[#E8DCC8]/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-black text-sky-400">6</span>
            <span className="text-xs font-light text-[#E8DCC8]/70 mt-1 uppercase tracking-wider">Continents Reached</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-black text-[#E8DCC8]">70+</span>
            <span className="text-xs font-light text-[#E8DCC8]/70 mt-1 uppercase tracking-wider">Global Distributors</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-black text-sky-400">500+</span>
            <span className="text-xs font-light text-[#E8DCC8]/70 mt-1 uppercase tracking-wider">Aligner Labs Served</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-black text-[#E8DCC8]">100%</span>
            <span className="text-xs font-light text-[#E8DCC8]/70 mt-1 uppercase tracking-wider">Medical Grade Quality</span>
          </div>
        </div>

      </section>

      {/* Other sections */}
      <FeatureHighlights />
      <ProductColumns />
      <Footer />
    </div>
  );
}