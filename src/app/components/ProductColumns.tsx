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
    // TODO: replace with real Taglus Premium sheet/box photo from client's shared folder
    imagePath: "/products/taglus-premium.jpg",
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
    // TODO: replace with real Taglus Ultra sheet disc photo (was duplicated with TUFF before)
    imagePath: "/products/taglus-ultra.jpg",
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
    // TODO: replace with real Taglus PU Flex photo (was duplicated with Premium before)
    imagePath: "/products/taglus-pu-flex.jpg",
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
    // TODO: replace with real Taglus TUFF retainer sheet photo (was duplicated with Ultra before)
    imagePath: "/products/taglus-tuff.jpg",
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
    imagePath: "/products/taglus-model-resin.jpg",
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
    // TODO: replace with real Duoform machine photo — was showing an unrelated glove image before
    imagePath: "/products/taglus-duoform.jpg",
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
    // TODO: this file was missing/broken before (blank card w/ green dot) — add real LAC machine photo here
    imagePath: "/products/taglus-lac-5x.jpg",
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

  const filteredProducts = selectedCategory === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="products" className="relative w-full py-28 sm:py-36 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Background Subtle Radial Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-sky-500/10 blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-[#E8DCC8]/25 text-sky-300 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-5 backdrop-blur-md">
          <Sparkles size={16} className="text-sky-400" />
          <span>Core Materials & Biomedical Systems</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#E8DCC8]">
          Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-300">Portfolio</span>
        </h2>
        <p className="mt-5 text-base sm:text-lg text-[#E8DCC8]/80 font-light leading-relaxed">
          High-performance thermoplastic sheets, dimensionally stable photopolymer resins, and robotic automation engineered for modern orthodontic practices[cite: 3, 8].
        </p>
      </div>

      {/* Category Tabs */}
      <div className="w-full flex items-center justify-center mb-16 overflow-x-auto pb-2 scrollbar-none">
        <div className="inline-flex items-center gap-2.5 p-2 rounded-2xl bg-[#030919]/90 border border-[#E8DCC8]/20 backdrop-blur-2xl">
          {CATEGORIES.map((tab) => {
            const isSelected = selectedCategory === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedCategory(tab.key as ProductCategory)}
                className={`px-6 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
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

      {/* 3-Column Balanced Wide Grid (3, 3, 2 layout) */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
      >
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="glass-box rounded-[2.5rem] p-7 sm:p-9 border border-[#E8DCC8]/20 bg-[#030919]/85 backdrop-blur-3xl flex flex-col justify-between group hover:border-sky-400/50 transition-all duration-300 shadow-2xl"
            >
              <div>
                {/* Top Badge & Certification */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <span className="text-xs font-mono uppercase tracking-widest px-3 py-1.5 rounded bg-sky-400/10 text-sky-300 border border-sky-400/35 font-semibold">
                    {product.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#E8DCC8]/75 font-medium">
                    <ShieldCheck size={16} className="text-sky-400" />
                    <span>MDR Class IIa</span>
                  </div>
                </div>

                {/* Pointed Corners Image Frame (Wide & Spacious) */}
                <div className="w-full h-[250px] rounded-none bg-black/60 border border-[#E8DCC8]/25 relative overflow-hidden mb-7 flex items-center justify-center p-5 group-hover:border-sky-400/60 transition-all shadow-inner">
                  <SafeProductImage
                    src={product.imagePath}
                    alt={product.name}
                    label={product.name}
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300 select-none"
                  />
                </div>

                {/* Title & Tagline (Larger Text) */}
                <h3 className="text-2xl sm:text-[1.65rem] font-black text-[#E8DCC8] tracking-tight uppercase group-hover:text-white transition-colors leading-tight">
                  {product.name}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#E8DCC8]/75 font-light leading-relaxed">
                  {product.tagline}
                </p>

                {/* Technical Specs Matrix (Bigger Typography) */}
                <div className="mt-8 pt-6 border-t border-white/[0.1] space-y-3.5">
                  {product.specs.map((sp, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm sm:text-[0.95rem]">
                      <span className="text-[#E8DCC8]/70 font-light">{sp.label}</span>
                      <span className="font-semibold text-sky-300">{sp.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions & Live Highlight */}
              <div className="mt-9 pt-6 border-t border-white/[0.1]">
                <p className="text-xs sm:text-sm text-sky-400/90 font-mono mb-5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shrink-0" />
                  <span className="leading-snug">{product.highlight}</span>
                </p>
                
                <Link
                  href="#sample-kit"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-5 rounded-2xl bg-white/[0.04] hover:bg-gradient-to-r hover:from-[#0052cc] hover:to-[#00d4ff] text-[#E8DCC8] hover:text-white text-xs sm:text-sm font-bold tracking-wide border border-[#E8DCC8]/25 hover:border-transparent transition-all duration-300 shadow-md"
                >
                  <span>Request Sample / Specs</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Catalog Download Banner */}
      <div className="mt-20 glass-box rounded-3xl p-8 sm:p-10 border border-white/[0.12] bg-[#020612]/75 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-300 shrink-0">
            <Download size={26} />
          </div>
          <div>
            <h4 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#E8DCC8]">
              Comprehensive Technical Data Sheets (TDS)
            </h4>
            <p className="text-sm text-[#E8DCC8]/70 font-light mt-1">
              Download complete stress retention curves, biocompatibility compliance, and thermoforming parameters[cite: 3, 8].
            </p>
          </div>
        </div>
        <Link
          href="#sample-kit"
          className="shrink-0 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-300 text-sm font-bold tracking-wide transition-all shadow-lg"
        >
          <span>Download 2026 Material Catalog</span>
          <ArrowRight size={16} />
        </Link>
      </div>

    </section>
  );
}