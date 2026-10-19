"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Replace these file names with the exact names of your saved transparent logos in public/
const CERT_LOGOS = [
  { name: "ISO 13485:2016", src: "/bl-1.png" },
  { name: "CE Europe", src: "/bl-2.png" },
  { name: "UKCA England", src: "/bl-3.png" },
  { name: "TGA Australia & NZ", src: "/bl-4.png" },
  { name: "ANVISA Brazil", src: "/bl-5.png" },
  { name: "RUS Compliance", src: "/bl-6.png" },
];

// Duplicate the array to create a seamless infinite loop
const MARQUEE_ITEMS = [...CERT_LOGOS, ...CERT_LOGOS, ...CERT_LOGOS];

export default function CertMarquee() {
  return (
    <section className="w-full py-16 overflow-hidden relative select-none">
      {/* Subtle Title */}
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <span className="text-xs font-semibold tracking-widest uppercase text-blue-900/80">
          Global Compliance & Accreditations
        </span>
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 mt-1">
          Internationally Certified Quality Assurance
        </h3>
      </div>

      {/* Marquee Track Container with Edge Vignette Blurs */}
      <div className="relative w-full overflow-hidden flex items-center">
        

        {/* 60s Linear Continuous Loop */}
        <motion.div
          className="flex items-center gap-16 md:gap-24 shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 60,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {MARQUEE_ITEMS.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex items-center justify-center shrink-0 h-16 md:h-20 w-40 md:w-52 transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={item.src}
                alt={item.name}
                width={200}
                height={80}
                className="max-h-full max-w-full object-contain filter drop-shadow-sm opacity-85 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}