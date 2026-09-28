"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Globe, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full pt-16 pb-12 px-4 sm:px-8 max-w-7xl mx-auto select-none">

      {/* Luxury Dark Glass Shell */}
      <div className="relative rounded-[2.5rem] bg-[#030919]/85 backdrop-blur-3xl border border-[#E8DCC8]/20 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)] p-8 sm:p-12 lg:p-16 overflow-hidden">

        {/* Soft Background Accent Ambient Glows */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-600/15 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-sky-500/10 blur-[120px] pointer-events-none" />

        {/* Top Tier: Brand Statement & Sample Kit Request Strip */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-[#E8DCC8]/15 items-center">

          <div className="lg:col-span-6 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-tuglas.png"
                alt="Taglus"
                width={160}
                height={42}
                className="h-9 w-auto object-contain brightness-110"
              />
            </Link>
            <p className="text-[#E8DCC8]/75 text-sm sm:text-base max-w-lg font-light leading-relaxed">
              Global pioneer in precision orthodontic sheets, bio-compatible photopolymer resins, and automated digital aligner fabrication ecosystems.
            </p>
          </div>

          {/* Quick Consultation / Sample Kit Request Input */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row lg:justify-end gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="email"
                placeholder="Enter clinical work email..."
                className="w-full pl-5 pr-36 py-4 rounded-2xl bg-white/[0.04] border border-[#E8DCC8]/25 text-[#E8DCC8] text-sm placeholder:text-[#E8DCC8]/40 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40 backdrop-blur-md transition shadow-inner"
              />
              <button
                type="button"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] hover:from-blue-600 hover:to-cyan-400 text-white text-xs font-bold tracking-wide flex items-center gap-1.5 transition-all duration-200 shadow-[0_0_15px_rgba(0,180,255,0.3)] hover:scale-[1.02]"
              >
                <span>Become a Distributor</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Middle Tier: Enterprise Architecture Navigation */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 py-14 text-sm">

          {/* Col 1: Materials */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#E8DCC8] text-xs uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Aligner Materials</span>
            </h4>
            <ul className="space-y-3 text-[#E8DCC8]/70 font-light text-xs sm:text-sm">
              <li><Link href="#products" className="hover:text-sky-300 transition">Taglus Premium™ Sheet</Link></li>
              <li><Link href="#products" className="hover:text-sky-300 transition">Taglus Ultra™ High Clarity</Link></li>
              <li><Link href="#products" className="hover:text-sky-300 transition">Taglus PU Flex™ Elastomeric</Link></li>
              <li><Link href="#products" className="hover:text-sky-300 transition">Taglus TUFF™ Retainer Sheet</Link></li>
              <li><Link href="#products" className="hover:text-sky-300 transition">Taglus Standard Series</Link></li>
            </ul>
          </div>

          {/* Col 2: Equipment & Resins */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#E8DCC8] text-xs uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Digital Hardware & 3D</span>
            </h4>
            <ul className="space-y-3 text-[#E8DCC8]/70 font-light text-xs sm:text-sm">
              <li><Link href="#workflow" className="hover:text-sky-300 transition">Taglus 3D Model Resin</Link></li>
              <li><Link href="#workflow" className="hover:text-sky-300 transition">Water-Washable Lab Resin</Link></li>
              <li><Link href="#workflow" className="hover:text-sky-300 transition">Duoform Pressure Former</Link></li>
              <li><Link href="#workflow" className="hover:text-sky-300 transition">LAC Laser Aligner Cutter</Link></li>
              <li><Link href="#workflow" className="hover:text-sky-300 transition">5X Robotic Trimmer</Link></li>
            </ul>
          </div>

          {/* Col 3: Workflow Pipeline */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#E8DCC8] text-xs uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>6-Step Workflow</span>
            </h4>
            <ul className="space-y-3 text-[#E8DCC8]/70 font-light text-xs sm:text-sm">
              <li><Link href="#workflow" className="hover:text-sky-300 transition">01. Digital Arch Scan</Link></li>
              <li><Link href="#workflow" className="hover:text-sky-300 transition">02. CAD Trimline Planning</Link></li>
              <li><Link href="#workflow" className="hover:text-sky-300 transition">03. 3D Model Printing</Link></li>
              <li><Link href="#workflow" className="hover:text-sky-300 transition">04. Sheet Thermoforming</Link></li>
              <li><Link href="#workflow" className="hover:text-sky-300 transition">05. Automated Laser Trim</Link></li>
              <li><Link href="#workflow" className="hover:text-sky-300 transition">06. Ortho Finish & Chewies</Link></li>
            </ul>
          </div>

          {/* Col 4: Clinical Headquarters & Direct Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#E8DCC8] text-xs uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Global Support</span>
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#E8DCC8]/75 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-sky-400 shrink-0 mt-1" />
                <span className="leading-relaxed">Vedia Solutions / Taglus Facility, Mumbai, India.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-sky-400 shrink-0" />
                <a href="tel:+919930905047" className="hover:text-sky-300 transition font-mono">+91 99309 05047</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-sky-400 shrink-0" />
                <a href="mailto:info@taglus.com" className="hover:text-sky-300 transition font-mono">info@taglus.com</a>
              </div>
              <div className="flex items-start gap-2.5 pt-2 border-t border-white/[0.08] text-[11px] text-[#E8DCC8]/60">
                <ShieldCheck size={16} className="text-sky-400 shrink-0 mt-0.5" />
                <span>ISO 13485:2016 & CE MDR Class IIa Certified.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Tier: Regulatory Compliance & Copyright */}
        <div className="relative z-10 pt-8 border-t border-[#E8DCC8]/15 flex flex-col sm:flex-row items-center justify-between gap-5 text-xs text-[#E8DCC8]/60 font-light">
          <p>© 2026 Taglus / Vedia Solutions. All clinical rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#privacy" className="hover:text-[#E8DCC8] transition">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-[#E8DCC8] transition">Terms of Clinical Supply</Link>
            <Link href="#compliance" className="hover:text-[#E8DCC8] transition">Regulatory Declarations</Link>
            <Link href="#sds" className="hover:text-[#E8DCC8] transition">Material SDS</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}