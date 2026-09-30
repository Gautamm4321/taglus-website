"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, FileText, CheckCircle2, ArrowRight } from "lucide-react";

interface CertificateItem {
  id: string;
  name: string;
  badge: string;
  territory: string;
  shortDesc: string;
  complianceDetail: string;
  logoSrc: string;
}

const CERTIFICATES: CertificateItem[] = [
  {
    id: "iso-13485",
    name: "ISO 13485:2016",
    badge: "Global Standard",
    territory: "Worldwide",
    shortDesc: "Quality management system for medical devices",
    complianceDetail: "Certified quality manufacturing processes governed by internationally recognized medical standards.",
    logoSrc: "/bl-1.png",
  },
  {
    id: "ce-mdr",
    name: "CE (EC REP)",
    badge: "Class IIa Device",
    territory: "Europe",
    shortDesc: "Compliance with applicable European medical-device requirements",
    complianceDetail: "Authorized European Representative (Wellkang Ltd) meeting strict medical safety directives.",
    logoSrc: "/bl-2.png",
  },
  {
    id: "ukca",
    name: "UKCA",
    badge: "UK Conformity",
    territory: "United Kingdom",
    shortDesc: "Compliance for applicable products in the UK",
    complianceDetail: "Validated UK Responsible Person and conformity assessment for UK healthcare distribution.",
    logoSrc: "/bl-3.png",
  },
  {
    id: "tga",
    name: "TGA",
    badge: "Health Safety",
    territory: "Australia & NZ",
    shortDesc: "Australian regulatory registration/recognition, where applicable",
    complianceDetail: "Therapeutic goods regulation compliance for dental aligner polymers and materials.",
    logoSrc: "/bl-4.png",
  },
  {
    id: "anvisa",
    name: "ANVISA",
    badge: "Regulatory Agency",
    territory: "Brazil & South America",
    shortDesc: "Brazilian regulatory registration/approval, where applicable",
    complianceDetail: "Certified sanitary surveillance regulation for imported orthodontic thermoforming sheets.",
    logoSrc: "/bl-5.png",
  },
  {
    id: "rus",
    name: "RUS",
    badge: "Customs Union",
    territory: "Eurasian Region",
    shortDesc: "Sanitary-epidemiological and medical regulatory compliance",
    complianceDetail: "Conformity registration for orthodontic appliances and dental consumables.",
    logoSrc: "/bl-6.png",
  },
];

export default function CertificationsSection() {
  return (
    <section className="relative w-full pt-32 sm:pt-40 pb-28 px-4 sm:px-8 max-w-7xl mx-auto select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-sky-500/10 blur-[170px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-[#E8DCC8]/25 text-sky-300 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-5 backdrop-blur-md">
          <ShieldCheck size={16} className="text-sky-400" />
          <span>Quality You Can Verify</span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#E8DCC8]">
          Certifications &amp;{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-300">
            Regulatory Compliance
          </span>
        </h1>
        <p className="mt-5 text-base sm:text-lg text-[#E8DCC8]/85 font-light leading-relaxed max-w-2xl mx-auto">
          Our manufacturing processes are governed by internationally recognized quality standards and supported by market-specific regulatory requirements.
        </p>
      </div>

      {/* 6-Card Certification Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {CERTIFICATES.map((cert) => (
          <div
            key={cert.id}
            className="group relative flex flex-col justify-between rounded-3xl overflow-hidden bg-[#030919]/90 border border-[#E8DCC8]/20 hover:border-sky-400/50 transition-all duration-300 shadow-xl"
          >
            {/* Taller White Logo Container */}
            <div className="relative w-full h-[220px] sm:h-[240px] bg-white p-6 sm:p-8 flex items-center justify-center border-b border-[#E8DCC8]/15 overflow-hidden">
              <div className="relative w-full h-full max-h-[170px]">
                <Image
                  src={cert.logoSrc}
                  alt={cert.name}
                  fill
                  className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            </div>

            {/* Content Body with Increased Typography */}
            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-5">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                    {cert.badge}
                  </span>
                  <span className="text-xs sm:text-sm text-[#E8DCC8]/70 font-medium">
                    {cert.territory}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#E8DCC8] tracking-tight">
                  {cert.name}
                </h3>

                <p className="mt-3 text-sm sm:text-base text-[#E8DCC8]/90 font-normal leading-relaxed">
                  {cert.shortDesc}
                </p>

                <p className="mt-2 text-xs sm:text-sm text-[#E8DCC8]/70 font-light leading-relaxed">
                  {cert.complianceDetail}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs sm:text-sm text-sky-300 font-semibold">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-sky-400" />
                  <span>Audited &amp; Active</span>
                </span>
                <span className="text-[11px] font-mono text-[#E8DCC8]/50 uppercase tracking-wider">
                  Classified
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Dossier Banner */}
      <div className="mt-16 sm:mt-20 glass-box p-8 sm:p-10 border border-[#E8DCC8]/20 bg-[#030919]/80 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 shrink-0">
            <FileText size={22} />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold uppercase text-[#E8DCC8] tracking-wider">
              Request Full Regulatory Dossier
            </h4>
            <p className="text-xs sm:text-sm text-[#E8DCC8]/70 font-light mt-1">
              Download CE declarations of conformity, biocompatibility reports, and authorized supplier audit packets.
            </p>
          </div>
        </div>

        <Link
          href="/contact"
          className="shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] hover:opacity-95 text-white text-xs sm:text-sm font-bold tracking-wide transition shadow-lg shadow-sky-500/25"
        >
          <span>Contact Regulatory Affairs</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}