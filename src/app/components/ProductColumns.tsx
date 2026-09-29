"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Download } from "lucide-react";
import SafeProductImage from "./SafeProductImage";

type ProductCategory = "all" | "sheets" | "retainers" | "resins" | "machines";

interface ProductItem {
  id: string;
  name: string;
  category: ProductCategory;
  badge: string;
  tagline: string;
  imagePath: string;
  specs: { label: string; value: string }[];
  highlight: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: "taglus-premium",
    name: "Taglus Premium™",
    category: "sheets",
    badge: "Flagship Aligner",
    tagline: "Multilayer engineering engineered for continuous orthodontic tooth moving force.",
    imagePath: "/taglus premium.jpeg",
    specs: [
      { label: "Material Class", value: "PET-G / PU Hybrid" },
      { label: "Clarity Index", value: "92% Transmission" },
      { label: "Stress Retention", value: "> 48 Hours Peak" }
    ],
    highlight: "Optimal balance of elastic recovery and patient comfort"
  },
  {
    id: "taglus-ultra",
    name: "Taglus Ultra™",
    category: "sheets",
    badge: "Maximum Clarity",
    tagline: "Ultra-clear single-layer thermoplastic sheets with exceptional crack resistance.",
    imagePath: "/taglus-ultra.jpeg",
    specs: [
      { label: "Material Class", value: "High-Purity Copolymer" },
      { label: "Transparency", value: "Ultra Crystal Clear" },
      { label: "Impact Strength", value: "High Fracture Toughness" }
    ],
    highlight: "Virtually invisible intraoral aesthetic standard"
  },
  {
    id: "taglus-puflex",
    name: "Taglus PU Flex™",
    category: "sheets",
    badge: "Severe Cases",
    tagline: "High-flex elastomeric polyurethane for extreme rotations and complex anchorage cases.",
    imagePath: "/taglus-pulfex.jpeg",
    specs: [
      { label: "Material Class", value: "Thermoplastic Polyurethane" },
      { label: "Elastic Range", value: "Ultra-Wide Vector Recovery" },
      { label: "Abrasion Index", value: "Medical Grade" }
    ],
    highlight: "Sustained kinetic forces for difficult movements"
  },
  {
    id: "taglus-tuff",
    name: "Taglus TUFF™",
    category: "retainers",
    badge: "Long-Term Retention",
    tagline: "Rigid retention thermoforming material engineered to withstand nocturnal bruxism and wear.",
    imagePath: "/taglus-puff.jpeg",
    specs: [
      { label: "Material Class", value: "Modified Polycarbonate" },
      { label: "Durability", value: "Extreme Wear Resistance" },
      { label: "Form Retention", value: "12+ Months Stable" }
    ],
    highlight: "Break-resistant appliance lifetime for post-treatment"
  },
  {
    id: "taglus-model-resin",
    name: "Taglus 3D Model Resin",
    category: "resins",
    badge: "Additive Chemistry",
    tagline: "High heat-deflection resin for thermoforming models with sub-micron detail.",
    imagePath: "/print-1-img.jpeg",
    specs: [
      { label: "Wavelength", value: "385nm & 405nm" },
      { label: "Heat Deflection (HDT)", value: "> 85°C Stable" },
      { label: "Surface Finish", value: "Crisp Matte Margin" }
    ],
    highlight: "No distortion under vacuum/pressure thermoforming"
  },
  {
    id: "taglus-waterwash-resin",
    name: "Water-Washable Resin",
    category: "resins",
    badge: "Eco Lab Workflow",
    tagline: "Simplified cleaning protocol rinsed directly with water, eliminating toxic solvent baths.",
    imagePath: "/products/taglus-water-washable-resin.jpg",
    specs: [
      { label: "Solvent Needed", value: "100% Water Washable" },
      { label: "Viscosity", value: "Low Pour Resistance" },
      { label: "Odor Level", value: "Minimal Lab Odor" }
    ],
    highlight: "Rapid laboratory processing without IPA disposal costs"
  },
  {
    id: "taglus-duoform",
    name: "Taglus Duoform Former",
    category: "machines",
    badge: "Hardware Precision",
    tagline: "Automated sub-second rapid heat-up pressure thermoforming unit with digital sensor controls.",
    imagePath: "/trim-1.png",
    specs: [
      { label: "Heating Cycle", value: "Sub-Second Quartz Lamp" },
      { label: "Pressure Range", value: "Up to 6.0 Bar Positive" },
      { label: "Interface", value: "Touchscreen Programmed" }
    ],
    highlight: "Adapts sheets into tight interproximal undercut regions"
  },
  {
    id: "taglus-lac",
    name: "LAC Laser Cutter & 5X",
    category: "machines",
    badge: "Robotic Automation",
    tagline: "Contactless automated CO2 laser trimming and multi-axis milling for high-throughput labs.",
    imagePath: "/trim-2.png",
    specs: [
      { label: "Trimming Speed", value: "< 25 Sec / Aligner" },
      { label: "Edge Consistency", value: "Gingival Scallop Laser" },
      { label: "Batch Capacity", value: "Continuous Automated" }
    ],
    highlight: "Eliminates manual lab labor and edge burrs completely"
  }
];

const CATEGORIES = [
  { key: "all", label: "All Products" },
  { key: "sheets", label: "Aligner Sheets" },
  { key: "retainers", label: "Retainers" },
  { key: "resins", label: "3D Resins" },
  { key: "machines", label: "Machinery" }
];

export default function ProductColumns() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("all");

  const filteredProducts =
    selectedCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="products" className="relative w-full py-28 sm:py-36 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-sky-500/10 blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/[0.04] border border-[#E8DCC8]/25 text-sky-300 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-5 backdrop-blur-md rounded-full">
          <Sparkles size={16} className="text-sky-400" />
          <span>Core Materials & Biomedical Systems</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#E8DCC8]">
          Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-300">Portfolio</span>
        </h2>
        <p className="mt-5 text-base sm:text-lg text-[#E8DCC8]/80 font-light leading-relaxed">
          High-performance thermoplastic sheets, dimensionally stable photopolymer resins, and robotic automation engineered for modern orthodontic practices.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="w-full flex items-center justify-center mb-16 overflow-x-auto pb-2 scrollbar-none">
        <div className="inline-flex items-center gap-2 p-1.5 bg-[#030919]/90 border border-[#E8DCC8]/20 backdrop-blur-2xl rounded-2xl">
  {CATEGORIES.map((tab) => {
    const isSelected = selectedCategory === tab.key;
    return (
      <button
        key={tab.key}
        onClick={() => setSelectedCategory(tab.key as ProductCategory)}
        className={`px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer rounded-xl ${
                  isSelected
                    ? "bg-gradient-to-r from-sky-500/25 to-blue-600/35 border border-sky-400/60 text-white shadow-[0_0_20px_rgba(0,180,255,0.25)]"
                    : "text-[#E8DCC8]/65 hover:text-[#E8DCC8] hover:bg-white/[0.04]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-Column Grid with Pointed Corners (Artisun Spec) */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
      >
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="group relative flex flex-col justify-between bg-[#030919]/90 border border-[#E8DCC8]/20 hover:border-sky-400/60 transition-all duration-300 shadow-xl overflow-hidden rounded-none"
            >
              <div>
                {/* 50% Top Frame: Edge-to-Edge Image (No Padding, Full Cover) */}
<div className="relative w-full h-[280px] sm:h-[320px] md:h-[360px] border-b border-[#E8DCC8]/15 overflow-hidden">
  <SafeProductImage
    src={product.imagePath}
    alt={product.name}
    label={product.name}
    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out select-none"
  />
</div>

                {/* 50% Bottom Frame: Content Body */}
                <div className="p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#E8DCC8] group-hover:text-white transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] text-[#E8DCC8]/70 shrink-0">
                        <ShieldCheck size={14} className="text-sky-400" />
                        <span>MDR IIa</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#E8DCC8]/75 font-light leading-relaxed line-clamp-2">
                      {product.tagline}
                    </p>

                    {/* Specs Table */}
                    <div className="mt-5 pt-4 border-t border-white/[0.08] space-y-2.5">
                      {product.specs.map((sp, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-[#E8DCC8]/60 font-light">{sp.label}</span>
                          <span className="font-mono text-sky-300 font-medium">{sp.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Sticky Action Bar */}
              <div className="p-6 pt-0">
                <div className="pb-4">
                  <p className="text-[11px] text-sky-400/90 font-mono flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse shrink-0" />
                    <span className="truncate">{product.highlight}</span>
                  </p>
                </div>

                <Link
                  href="#sample-kit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-white/[0.05] hover:bg-gradient-to-r hover:from-[#0052cc] hover:to-[#00d4ff] text-[#E8DCC8] hover:text-white text-xs font-bold uppercase tracking-wider border border-[#E8DCC8]/25 hover:border-transparent transition-all duration-300 rounded-none shadow-sm"
                >
                  <span>Request Sample / Specs</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Catalog Download Banner */}
      <div className="mt-20 glass-box p-8 sm:p-10 border border-white/[0.12] bg-[#020612]/75 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-300 shrink-0 rounded-2xl">
            <Download size={22} />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#E8DCC8]">
              Comprehensive Technical Data Sheets (TDS)
            </h4>
            <p className="text-xs sm:text-sm text-[#E8DCC8]/70 font-light mt-1">
              Download complete stress retention curves, biocompatibility compliance, and thermoforming parameters.
            </p>
          </div>
        </div>
        <Link
          href="#sample-kit"
          className="shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-300 text-xs sm:text-sm font-bold tracking-wide transition-all rounded-full shadow-lg"
        >
          <span>Download 2026 Material Catalog</span>
          <ArrowRight size={15} />
        </Link>
      </div>

    </section>
  );
}