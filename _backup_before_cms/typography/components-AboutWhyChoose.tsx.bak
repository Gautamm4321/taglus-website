"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

const HIGHLIGHTS = [
  "Unmatched combination of flexibility, strength, and optical clarity",
  "Engineered exclusively for clinical aligners and post-treatment retainers",
  "Streamlined lab workflow efficiency and competitive global affordability",
];

export default function AboutWhyChoose() {
  return (
    <section className="w-full py-20 lg:py-28 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* ================= LEFT: TEXT REVEAL ================= */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Badge */}
<div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-[#E8DCC8]/25 text-sky-300 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-5 backdrop-blur-md w-fit">
  <Sparkles size={15} className="text-sky-400" />
  <span>Why Choose Us</span>
</div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#E8DCC8] leading-[1.15] mb-6">
            Engineered For Precision,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-300">
              Trusted Worldwide
            </span>
          </h2>

          {/* Body Text */}
          <p className="text-[#E8DCC8]/80 text-base sm:text-lg leading-relaxed font-normal mb-8">
            Taglus is one of the recognized digital consumable manufacturer and has established itself as a distinguished brand as the most preferred thermoplastic aligner and retainer sheet manufacturer. Taglus clear aligner materials are engineered specifically for aligners and retainers to provide a best-in-class combination of flexibility, strength and clarity. Our material advantages, ease-of-use and affordability make Taglus the superior choice for clear aligners and retainers worldwide.
          </p>

          {/* Value Points */}
          <div className="space-y-3.5 pt-2 border-t border-white/10">
            {HIGHLIGHTS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 }}
                className="flex items-start gap-3 text-[#E8DCC8]/90 text-sm sm:text-base font-medium"
              >
                <CheckCircle2 size={20} className="text-sky-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ================= RIGHT: IMAGE BOX ================= */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/keyhole-bg.webp"
              alt="Why Choose Taglus Orthodontics"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}