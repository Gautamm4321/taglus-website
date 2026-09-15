"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FeatureCard {
  title: string;
  desc: string;
  iconSrc: string;
  isFeatured?: boolean;
}

const CARDS: FeatureCard[] = [
  {
    title: "How is Taglus different?",
    desc: "For several years, Taglus has been a trusted brand for its reliability and cutting edge technologies. We offer a wide variety of products that are user-friendly and highly durable, giving it the stamp of approval on the global market.",
    iconSrc: "/about-icon1.png",
    isFeatured: false,
  },
  {
    title: "Why you want to switch Taglus ?",
    desc: "Taglus products are designed to meet your expectations while maintaining high standards of quality. You can be assured of the best results with efficient, fast workflows that can shorten your production time.",
    iconSrc: "/about-icon2.png",
    isFeatured: true,
  },
  {
    title: "The right material for Teens and Adults",
    desc: "At Taglus, we have spent considerable time engineering optically clear sheets with superior properties can be used to offer customised clear aligner treatments across different age groups.",
    iconSrc: "/about-icon3.png",
    isFeatured: false,
  },
];

export default function AboutHero() {
  return (
    <section className="w-full relative pb-20 select-none">

      {/* ================= FULL BLEED TOP HERO (Behind Header) ================= */}
      <div className="relative w-full h-[580px] sm:h-[640px] lg:h-[680px] overflow-hidden rounded-none">
        {/* Background Image: keyhole-bg.webp */}
        <Image
          src="/keyhole-bg.webp"
          alt="Taglus Clinical Environment"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Soft Vignette Overlay for Crisp Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 via-slate-950/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-8 pt-10 sm:pt-14 flex items-center">
  <div className="w-full max-w-[480px] p-5 sm:p-6 rounded-none bg-slate-950/50 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
    <span className="inline-block text-[11px] uppercase tracking-widest text-cyan-300 font-semibold mb-1">
      About Taglus Global
    </span>

    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-2">
      Pioneering Tomorrow's Orthodontic Solutions
    </h1>

    <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-4 font-light">
      Engineering world-class thermoplastic aligner sheets and clinical dental materials that empower practitioners across 50+ countries.
    </p>

            {/* Ocean Gradient Contact Button */}
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] text-white font-semibold text-xs tracking-wider uppercase shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
            >
              <span>CONTACT US</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-10 -mt-16 sm:-mt-20 relative z-20">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {CARDS.map((card) => {
            const isBlue = card.isFeatured;

            return (
              <div
                key={card.title}
                className={`rounded-none p-7 sm:p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 shadow-xl ${
                  isBlue
                    ? "bg-gradient-to-b from-[#1053d4] via-[#0c40a8] to-[#082a74] text-white border border-blue-300/30 shadow-blue-900/20"
                    : "bg-white/95 backdrop-blur-md text-slate-900 border border-white/80 shadow-[0_15px_35px_-10px_rgba(0,102,204,0.1)]"
                }`}
              >
                <div className="flex flex-col items-center">
                  {/* Top Icon — centered, no background badge */}
                  <div className="w-14 h-14 mb-6 flex items-center justify-center mx-auto">
                    <Image
                      src={card.iconSrc}
                      alt={card.title}
                      width={44}
                      height={44}
                      className="object-contain max-h-10 w-auto"
                    />
                  </div>

                  {/* Card Title */}
                  <h3
                    className={`text-xl font-bold tracking-tight mb-3 ${
                      isBlue ? "text-white" : "text-slate-950"
                    }`}
                  >
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-xs sm:text-sm leading-relaxed font-normal ${
                      isBlue ? "text-blue-100/90" : "text-slate-600"
                    }`}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}