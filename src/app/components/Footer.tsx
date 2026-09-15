"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight, Globe, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full pt-12 pb-8 px-4 sm:px-8 max-w-7xl mx-auto select-none">
      {/* Main Glass Shell */}
      <div className="relative rounded-[3rem] bg-gradient-to-b from-white/70 via-white/50 to-white/30 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_-15px_rgba(0,102,204,0.08)] p-8 sm:p-12 lg:p-16 overflow-hidden">
        
        {/* Soft Background Accent Glows */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-sky-200/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-blue-300/30 blur-3xl pointer-events-none" />

        {/* Top Tier: Brand Statement & Newsletter */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-900/10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-tuglas.png"
                alt="Taglus"
                width={150}
                height={40}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-600 text-sm sm:text-base max-w-md leading-relaxed">
              Global pioneer in precision orthodontic sheets, bio-compatible polymers, and clinical 3D dental manufacturing solutions.
            </p>
          </div>

          {/* Quick Newsletter / Inquiries */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row lg:justify-end gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="email"
                placeholder="Enter work email for updates"
                className="w-full pl-5 pr-12 py-3.5 rounded-full bg-white/90 border border-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 shadow-sm"
              />
              <button
                type="button"
                aria-label="Submit email"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#5b52e0] hover:bg-blue-600 text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Middle Tier: Navigation Links */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-sm">
          
          {/* Col 1: Products */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-950 text-xs uppercase tracking-widest">
              Engineered Sheets
            </h4>
            <ul className="space-y-2.5 text-slate-600 font-medium">
              <li><Link href="#product" className="hover:text-blue-600 transition">Taglus PU FLEX</Link></li>
              <li><Link href="#product" className="hover:text-blue-600 transition">Taglus Premium</Link></li>
              <li><Link href="#product" className="hover:text-blue-600 transition">Taglus Standard</Link></li>
              <li><Link href="#product" className="hover:text-blue-600 transition">Taglus Tuff Retainer</Link></li>
              <li><Link href="#product" className="hover:text-blue-600 transition">3D Model Resins</Link></li>
            </ul>
          </div>

          {/* Col 2: Innovation & Equipment */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-950 text-xs uppercase tracking-widest">
              Equipment
            </h4>
            <ul className="space-y-2.5 text-slate-600 font-medium">
              <li><Link href="#tech" className="hover:text-blue-600 transition">Thermoforming Machines</Link></li>
              <li><Link href="#tech" className="hover:text-blue-600 transition">Laser Aligner Cutter</Link></li>
              <li><Link href="#tech" className="hover:text-blue-600 transition">5X Trimming Systems</Link></li>
              <li><Link href="#tech" className="hover:text-blue-600 transition">Polishing Accessories</Link></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-950 text-xs uppercase tracking-widest">
              Company
            </h4>
            <ul className="space-y-2.5 text-slate-600 font-medium">
              <li><Link href="#about" className="hover:text-blue-600 transition">About Taglus</Link></li>
              <li><Link href="#certifications" className="hover:text-blue-600 transition">Quality & Certifications</Link></li>
              <li><Link href="#resources" className="hover:text-blue-600 transition">Clinical Research</Link></li>
              <li><Link href="#contact" className="hover:text-blue-600 transition">Global Network</Link></li>
            </ul>
          </div>

          {/* Col 4: Trust & Support */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-950 text-xs uppercase tracking-widest">
              Clinical Trust
            </h4>
            <div className="flex items-start gap-2.5 text-slate-600 text-xs leading-relaxed">
              <ShieldCheck size={18} className="text-blue-600 shrink-0 mt-0.5" />
              <span>Certified under ISO 13485:2016, CE, and global medical device safety regulations.</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-xs">
              <Globe size={15} className="text-slate-500" />
              <span>Exporting across 50+ countries</span>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Policies */}
        <div className="relative z-10 pt-8 border-t border-slate-900/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Taglus. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#privacy" className="hover:text-slate-800 transition">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-slate-800 transition">Terms of Service</Link>
            <Link href="#compliance" className="hover:text-slate-800 transition">Compliance</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}