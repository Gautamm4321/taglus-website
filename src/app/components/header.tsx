"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 w-full bg-[#020612]/80 backdrop-blur-2xl border-b border-[#E8DCC8]/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">

        {/* Left: Taglus Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo-tuglas.png"
            alt="Taglus Logo"
            width={130}
            height={34}
            priority
            style={{ width: "auto" }}
            className="h-7 sm:h-8 object-contain"
          />
        </Link>

        {/* Center: Main Nav Items */}
        <ul className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wide">

          {/* 1. Products (Mega-Menu Trigger) */}
          <li
            className="relative py-2 cursor-pointer"
            onMouseEnter={() => setActiveMenu("products")}
          >
            <button className="flex items-center gap-1.5 text-[#E8DCC8] hover:text-white transition-colors">
              <span>Products</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === "products" ? "rotate-180 text-sky-400" : "text-[#E8DCC8]/70"}`} />
            </button>
          </li>

          {/* 2. Solutions Dropdown */}
          <li
            className="relative py-2 cursor-pointer"
            onMouseEnter={() => setActiveMenu("solutions")}
          >
            <button className="flex items-center gap-1.5 text-[#E8DCC8] hover:text-white transition-colors">
              <span>Solutions</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === "solutions" ? "rotate-180 text-sky-400" : "text-[#E8DCC8]/70"}`} />
            </button>

            {activeMenu === "solutions" && (
              <div className="absolute top-full left-0 mt-3 w-80 rounded-2xl bg-[#030919]/95 backdrop-blur-2xl border border-[#E8DCC8]/20 p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="space-y-3">
                  {[
                    { title: "Aligner Manufacturers", desc: "Materials and automation that scale with your case volume" },
                    { title: "Dental Labs", desc: "Print, form, trim and pack in one workflow" },
                    { title: "Orthodontists & Clinics", desc: "In-office aligners, retainers and splints" },
                    { title: "Distributors", desc: "Partner with Taglus in your region" },
                  ].map((item) => (
                    <Link
                      key={item.title}
                      href="#solutions"
                      className="block p-2.5 rounded-xl hover:bg-white/[0.06] transition group"
                    >
                      <p className="text-xs font-semibold text-[#E8DCC8] group-hover:text-sky-300 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-[#E8DCC8]/65 font-light leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>

          {/* 3. Resources Dropdown */}
          <li
            className="relative py-2 cursor-pointer"
            onMouseEnter={() => setActiveMenu("resources")}
          >
            <button className="flex items-center gap-1.5 text-[#E8DCC8] hover:text-white transition-colors">
              <span>Resources</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === "resources" ? "rotate-180 text-sky-400" : "text-[#E8DCC8]/70"}`} />
            </button>

            {activeMenu === "resources" && (
              <div className="absolute top-full left-0 mt-3 w-84 rounded-2xl bg-[#030919]/95 backdrop-blur-2xl border border-[#E8DCC8]/20 p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="space-y-2.5">
                  {[
                    { title: "Instructions for Use (IFU)", desc: "Forming parameters by machine", href: "#resources" },
                    { title: "Safety Data Sheets (MSDS)", desc: "Download by product", href: "#resources" },
                    { title: "Product Catalogue", desc: "Full portfolio, PDF", href: "/Taglus-Product-Catalogue.pdf", isPdf: true },
                    { title: "Machine Compatibility Guide", desc: "Heating settings for common thermoformers", href: "#resources" },
                    { title: "Case Studies", desc: "Real cases, real workflows", href: "/case-studies" },
                    { title: "Blog & News", desc: "Material science, made practical", href: "#resources" },
                    { title: "Videos", desc: "How-to and product demos", href: "#resources" },
                  ].map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      target={item.isPdf ? "_blank" : undefined}
                      rel={item.isPdf ? "noopener noreferrer" : undefined}
                      className="block p-2 rounded-xl hover:bg-white/[0.06] transition group"
                    >
                      <p className="text-xs font-semibold text-[#E8DCC8] group-hover:text-sky-300 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-[#E8DCC8]/65 font-light mt-0.5">
                        {item.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>

          {/* 4. Company Dropdown */}
          <li
            className="relative py-2 cursor-pointer"
            onMouseEnter={() => setActiveMenu("company")}
          >
            <button className="flex items-center gap-1.5 text-[#E8DCC8] hover:text-white transition-colors">
              <span>Company</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === "company" ? "rotate-180 text-sky-400" : "text-[#E8DCC8]/70"}`} />
            </button>

            {activeMenu === "company" && (
              <div className="absolute top-full left-0 mt-3 w-80 rounded-2xl bg-[#030919]/95 backdrop-blur-2xl border border-[#E8DCC8]/20 p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="space-y-2.5">
                  {[
                    { title: "About Taglus", desc: "Who we are and how we manufacture", href: "/about" },
                    { title: "Quality & Certifications", desc: "ISO 13485:2016, CE, UKCA, TGA, ANVISA", href: "/certifications" },
                    { title: "Events", desc: "Meet us at IDS 2027 and other shows", href: "#events" },
                    { title: "Become a Distributor", desc: "Grow with a 70+ country network", href: "#distributor" },
                  ].map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="block p-2 rounded-xl hover:bg-white/[0.06] transition group"
                    >
                      <p className="text-xs font-semibold text-[#E8DCC8] group-hover:text-sky-300 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-[#E8DCC8]/65 font-light mt-0.5">
                        {item.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>

          {/* 5. Contact (Single Link) */}
          <li>
            <Link
              href="#contact"
              className="text-[#E8DCC8] hover:text-white transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>

        <Link
          href="#distributor"
          className="group inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] hover:from-blue-600 hover:to-cyan-400 text-white text-xs sm:text-[13px] font-semibold tracking-wide shadow-md shadow-sky-500/20 hover:scale-[1.02] transition-all duration-200"
        >
          <span>Become a Distributor</span>
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </nav>

      {/* ================= PRODUCTS MEGA-MENU OVERLAY ================= */}
      {activeMenu === "products" && (
        <div
          className="max-w-7xl mx-auto mb-4 rounded-2xl bg-[#030919]/98 backdrop-blur-3xl border border-[#E8DCC8]/15 shadow-[0_30px_70px_rgba(0,0,0,0.9)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
          onMouseEnter={() => setActiveMenu("products")}
        >
          {/* Top 7 Columns Grid — matches client's Products sheet exactly:
              Aligner Materials, Retainer & Splint, Aesthetic & Interim,
              Thermoforming, Laser Trimming (LAC), 3D Printing, Accessories & Packaging.
              NOTE: client's doc said "six columns" but listed 7 categories — confirm
              with client which they actually want; this version keeps them separate. */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 p-7 border-b border-white/[0.08]">

            {/* Column 1: Aligner Materials */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold text-sky-400 uppercase tracking-widest border-b border-white/10 pb-2">
                Aligner Materials
              </h4>
              <div className="space-y-3">
                {[
                  { name: "Taglus Ultra", desc: "Multilayer aligner material" },
                  { name: "Taglus PU Flex", desc: "Polyurethane for demanding cases" },
                  { name: "Taglus Premium", desc: "High-clarity PET-G" },
                  { name: "Taglus Standard", desc: "Value choice for high-volume labs" },
                ].map((item) => (
                  <Link key={item.name} href="#product" className="block group">
                    <p className="text-xs font-semibold text-[#E8DCC8] group-hover:text-white transition-colors">{item.name}</p>
                    <p className="text-[10px] text-[#E8DCC8]/60 font-light leading-snug">{item.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: Retainer & Splint */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold text-sky-400 uppercase tracking-widest border-b border-white/10 pb-2">
                Retainer & Splint
              </h4>
              <div className="space-y-3">
                {[
                  { name: "Taglus TUFF", desc: "Break-resistant retainer sheet" },
                  { name: "Taglus Hard & Soft", desc: "Dual-laminate splints and guards" },
                  { name: "Taglus Soft", desc: "Flexible sheets for comfort appliances" },
                ].map((item) => (
                  <Link key={item.name} href="#product" className="block group">
                    <p className="text-xs font-semibold text-[#E8DCC8] group-hover:text-white transition-colors">{item.name}</p>
                    <p className="text-[10px] text-[#E8DCC8]/60 font-light leading-snug">{item.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3: Aesthetic & Interim */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold text-sky-400 uppercase tracking-widest border-b border-white/10 pb-2">
                Aesthetic & Interim
              </h4>
              <div className="space-y-3">
                <Link href="#product" className="block group">
                  <p className="text-xs font-semibold text-[#E8DCC8] group-hover:text-white transition-colors">Taglus Smiles</p>
                  <p className="text-[10px] text-[#E8DCC8]/60 font-light leading-snug">Direct-to-patient aligner system</p>
                  <span className="inline-block mt-1 text-[9px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                    Shades: A1 & A2
                  </span>
                </Link>
              </div>
            </div>

            {/* Column 4: Thermoforming Machines */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold text-sky-400 uppercase tracking-widest border-b border-white/10 pb-2">
                Thermoforming
              </h4>
              <div className="space-y-3">
                {[
                  { name: "Taglus Duoform", desc: "Pressure former, sub-second heat-up" },
                  { name: "Taglus Autoform", desc: "Automated sheet forming" },
                  { name: "Taglus Autoform Roll", desc: "Roll-fed forming for production volume" },
                ].map((item) => (
                  <Link key={item.name} href="#product" className="block group">
                    <p className="text-xs font-semibold text-[#E8DCC8] group-hover:text-white transition-colors">{item.name}</p>
                    <p className="text-[10px] text-[#E8DCC8]/60 font-light leading-snug">{item.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 5: Laser Trimming (LAC) */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold text-sky-400 uppercase tracking-widest border-b border-white/10 pb-2">
                Laser Trimming
              </h4>
              <div className="space-y-3">
                {[
                  { name: "Laser Aligner Cutter", desc: "Automated aligner trimming" },
                  { name: "Trimline Generator", desc: "Software for trim paths" },
                  { name: "LAC Separator", desc: "Model separation" },
                  { name: "LAC Suction Unit", desc: "Fume and debris extraction" },
                ].map((item) => (
                  <Link key={item.name} href="#product" className="block group">
                    <p className="text-xs font-semibold text-[#E8DCC8] group-hover:text-white transition-colors">{item.name}</p>
                    <p className="text-[10px] text-[#E8DCC8]/60 font-light leading-snug">{item.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 6: 3D Printing */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold text-sky-400 uppercase tracking-widest border-b border-white/10 pb-2">
                3D Printing
              </h4>
              <div className="space-y-3">
                <Link href="#product" className="block group">
                  <p className="text-xs font-semibold text-[#E8DCC8] group-hover:text-white transition-colors">Model Resin</p>
                  <p className="text-[10px] text-[#E8DCC8]/60 font-light leading-snug">Accurate dental models for thermoforming</p>
                </Link>
              </div>
            </div>

            {/* Column 7: Accessories & Packaging */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold text-sky-400 uppercase tracking-widest border-b border-white/10 pb-2">
                Accessories & Packaging
              </h4>
              <div className="space-y-3">
                {[
                  { name: "Impression Tray", desc: "Trays for dental impressions" },
                  { name: "Retainer Box", desc: "Protective retainer case" },
                  { name: "Membrane Box", desc: "Smart aligner packaging" },
                  { name: "Orthodontic Accessories", desc: "Chairside and lab essentials" },
                  { name: "Titanium Blanks", desc: "Titanium blanks for milling" },
                ].map((item) => (
                  <Link key={item.name} href="#product" className="block group">
                    <p className="text-xs font-semibold text-[#E8DCC8] group-hover:text-white transition-colors">{item.name}</p>
                    <p className="text-[10px] text-[#E8DCC8]/60 font-light leading-snug">{item.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Strip: Specialist CTA */}
          <div className="px-7 py-3.5 bg-white/[0.02] flex items-center justify-between text-xs">
            <span className="text-[#E8DCC8]/80 font-light">
              Not sure which sheet fits your workflow?
            </span>
            <Link
              href="#contact"
              className="inline-flex items-center gap-1.5 font-semibold text-sky-300 hover:text-white transition-colors"
            >
              <span>Talk to a specialist</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}