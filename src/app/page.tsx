"use client";

import Image from "next/image";
import Header from "./components/header";
import FeatureHighlights from "./components/FeatureHighlights";
import ProductColumns from "./components/ProductColumns";
import CertMarquee from "./components/CertMarquee";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

<main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 pt-32 sm:pt-36 pb-12 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* ================= LEFT BOX (Headline Only) ================= */}
          <div className="lg:col-span-7 glass-box rounded-[2.5rem] p-8 md:p-14 flex flex-col justify-center relative overflow-hidden">
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/70 text-blue-900 border border-white mb-6">
                Premium Biomedical Solutions
              </span>

              {/* Taglus Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black uppercase tracking-tight text-slate-950 leading-[1.1]">
                ONE STOP SOLUTION FOR ALL YOUR{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-600 to-indigo-600">
                  ORTHODONTIC NEEDS
                </span>
              </h1>
            </div>
          </div>

          {/* ================= RIGHT BOX (Image Only) ================= */}
          <div className="lg:col-span-5 glass-box rounded-[2.5rem] p-8 flex items-center justify-center relative min-h-[440px] overflow-hidden">
            {/* Soft Backlight */}
            <div className="absolute w-64 h-64 rounded-full bg-white/60 blur-3xl -z-0 pointer-events-none" />

            {/* Clean Aligner Image */}
            <div className="relative z-10 w-full max-w-[470px] aspect-square flex items-center justify-center">
              <Image
                src="/Screenshot_2026-09-15_102027-removebg-preview.png"
                alt="Taglus Orthodontic Solution"
                width={460}
                height={460}
                priority
                className="object-contain drop-shadow-md"
              />
            </div>
          </div>

        </div>
      </main>
      <FeatureHighlights />
      <ProductColumns />
      <CertMarquee />
      <Testimonials />
      <Footer />
    </div>
  );
}