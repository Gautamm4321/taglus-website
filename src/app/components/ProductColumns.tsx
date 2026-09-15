"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductItem {
  name: string;
  type: string;
  description: string;
  image: string;
}

const PRODUCTS: ProductItem[] = [
  {
    name: "Taglus PU FLEX",
    type: "Aligner Sheets",
    description:
      "Developed by engineers and researchers with years of experience in the dental industry, this is a uniaxially oriented amorphous material with polymer chains locked together in a non-specific structure.",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Taglus Premium",
    type: "Aligner Sheets",
    description:
      "The most advanced and unique aligner material. Its perfect blend of elasticity, clarity, and rigidity makes it the undisputed winner in its class. Custom engineered to satisfy the complex needs of orthodontists and patients.",
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Taglus Standard",
    type: "Aligner Sheets",
    description:
      "High-performing co-polyester with excellent chemical resistance and superior processability. Engineered with superior mechanical properties and has a high optical clarity with stain resistance.",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Taglus Tuff",
    type: "Retainer Sheets",
    description:
      "Developed by engineers and researchers with years of experience in the dental industry, this is a uniaxially oriented amorphous material with polymer chains locked together in a non-specific structure.",
    image:
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Model Resin",
    type: "3D Printing Resins",
    description:
      "Material based on methacrylate resin for DLP with 385nm/ 405nm LED and LCD systems. High form, brake stability, abrasion, moisture, and light resistance along with a smooth matte surface finish, makes it perfect for dental model making.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function ProductColumns() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section className="w-full py-12">
      {/* Clean Section Title */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Engineered Materials Collection
        </h2>
      </div>

      {/* 5 Edge-to-Edge Columns in 4:5 Ratio Height */}
      <div className="w-full h-[440px] md:h-[500px] lg:h-[520px] flex flex-col lg:flex-row overflow-hidden border-y border-slate-900/15">
        {PRODUCTS.map((prod, idx) => {
          const isHovered = activeIdx === idx;

          return (
            <div
              key={prod.name}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
              className={`group relative flex-1 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden border-b lg:border-b-0 lg:border-r border-white/20 last:border-none ${
                isHovered ? "lg:flex-[1.6]" : "lg:flex-1"
              }`}
            >
              {/* Background Image with Zoom */}
              <div className="absolute inset-0">
                <Image
                  src={prod.image}
                  alt={prod.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/90 group-hover:from-black/50 group-hover:to-black/95 transition-colors duration-500" />
              </div>

              {/* Column Content */}
              <div className="relative z-10 h-full p-6 md:p-7 flex flex-col justify-between select-none">
                {/* Top: Category Type Tag Only */}
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white/90 border border-white/20 inline-block">
                    {prod.type}
                  </span>
                </div>

                {/* Bottom: Name & Expandable Description */}
                <div className="flex flex-col justify-end">
                  <div
                    className={`h-[2px] bg-gradient-to-r from-blue-400 to-teal-300 mb-3 transition-all duration-500 origin-left ${
                      isHovered ? "w-16" : "w-6 opacity-60"
                    }`}
                  />

                  <h3 className="text-xl md:text-2xl lg:text-[1.75rem] font-light text-white leading-tight tracking-tight drop-shadow-md">
                    {prod.name}
                  </h3>

                  {/* Immediate Reveal on Hover */}
                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      isHovered
                        ? "grid-rows-[1fr] opacity-100 mt-3"
                        : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs md:text-sm text-slate-200/95 leading-relaxed max-w-md font-light drop-shadow">
                        {prod.description}
                      </p>

                      <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-300 hover:text-white transition-colors">
                        <span>View Technical Specs</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}