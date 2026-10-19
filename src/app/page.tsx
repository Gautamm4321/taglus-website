"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, animate, useInView } from "framer-motion";
import { useEffect } from "react";
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";
import Header from "./components/header";
import FeatureHighlights from "./components/FeatureHighlights";
import AccessoriesSection from "./components/AccessoriesSection";
import Testimonials from "./components/Testimonials";
import ProductColumns from "./components/ProductColumns";
import Footer from "./components/Footer";
import HeroCube from "./components/HeroCube";

function CounterNumber({
  value,
  suffix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = `${Math.floor(latest)}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [isInView, value, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}

export default function Home() {
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
            <p className="mt-6 text-base sm:text-lg text-[#E8DCC8] font-light leading-relaxed max-w-xl">
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
            <div className="mt-12 pt-6 border-t border-[#E8DCC8]/15 flex items-center gap-6 text-xs text-[#E8DCC8] font-light">
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
            className="lg:col-span-6 w-full relative flex flex-col items-center justify-center pb-16 sm:pb-20 select-none"
          >
            {/* Stage: glow + rings sized to the cube, cube on top */}
            <div className="relative z-10 w-full max-w-[440px] sm:max-w-[500px] lg:max-w-[580px] xl:max-w-[640px] aspect-square">
              {/* soft colour glows behind the cube */}
              <div className="absolute inset-[18%] rounded-full bg-blue-600/30 blur-[90px] pointer-events-none" />
              <div className="absolute inset-[30%] translate-x-[18%] -translate-y-[10%] rounded-full bg-sky-400/20 blur-[70px] pointer-events-none" />
              <div className="absolute inset-[32%] -translate-x-[16%] translate-y-[12%] rounded-full bg-indigo-500/25 blur-[70px] pointer-events-none" />
              {/* orbit rings hugging the cube */}
              <div className="absolute inset-[9%] rounded-full border border-sky-400/20 pointer-events-none animate-[spin_50s_linear_infinite]">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-sky-300 shadow-[0_0_12px_4px_rgba(56,189,248,0.7)]" />
              </div>
              <div className="absolute inset-[17%] rounded-full border border-dashed border-[#E8DCC8]/15 pointer-events-none animate-[spin_35s_linear_infinite_reverse]">
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-300 shadow-[0_0_10px_3px_rgba(129,140,248,0.7)]" />
              </div>

              {/* 3D product cube: auto-rotates, drag / swipe / arrow keys to spin it */}
              <HeroCube className="absolute inset-0" />
            </div>

            {/* Floating Glass Spec Pill (Bottom) */}
            <div className="absolute bottom-2 inset-x-6 sm:inset-x-12 z-20 flex items-center justify-between px-5 py-3 rounded-2xl bg-[#030919]/90 border border-[#E8DCC8]/20 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.85)]">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#E8DCC8] font-medium">Aligner &amp; Retainer Sheets</p>
                <p className="text-xs sm:text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-300">
                  Premium · PU Flex · Ultra · Hard &amp; Soft · Smiles · TUFF
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
            <CounterNumber
              value={6}
              className="text-3xl sm:text-4xl font-black text-sky-400"
            />
            <span className="text-xs font-light text-[#E8DCC8] mt-1 uppercase tracking-wider">Continents Reached</span>
          </div>
          <div className="flex flex-col items-center">
            <CounterNumber
              value={70}
              suffix="+"
              className="text-3xl sm:text-4xl font-black text-[#E8DCC8]"
            />
            <span className="text-xs font-light text-[#E8DCC8] mt-1 uppercase tracking-wider">Global Distributors</span>
          </div>
          <div className="flex flex-col items-center">
            <CounterNumber
              value={500}
              suffix="+"
              className="text-3xl sm:text-4xl font-black text-sky-400"
            />
            <span className="text-xs font-light text-[#E8DCC8] mt-1 uppercase tracking-wider">Aligner Labs Served</span>
          </div>
          <div className="flex flex-col items-center">
            <CounterNumber
              value={100}
              suffix="%"
              className="text-3xl sm:text-4xl font-black text-[#E8DCC8]"
            />
            <span className="text-xs font-light text-[#E8DCC8] mt-1 uppercase tracking-wider">Medical Grade Quality</span>
          </div>
        </div>

      </section>

      {/* Other sections */}
      <FeatureHighlights />
      <AccessoriesSection />
      <Testimonials />
      <ProductColumns />
      <Footer />
    </div>
  );
}