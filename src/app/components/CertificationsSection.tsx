import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, FileText, ArrowRight, Globe2, ClipboardCheck, Layers, MapPin } from "lucide-react";

/* Logo files in /public (transparent PNGs, black artwork → shown on a light "plaque"):
   bl-1 = CE / EC REP · bl-2 = UKCA · bl-3 = ANVISA · bl-4 = TGA · bl-5 = RUS · bl-6 = ISO 13485:2016 */

type Mark = {
  id: string;
  name: string;
  region: string;
  tag: string;
  short: string;
  detail: string;
  logo: string;
  rep?: string;
};

const ISO: Mark = {
  id: "iso-13485",
  name: "ISO 13485:2016",
  region: "Worldwide",
  tag: "Quality Management System",
  short: "Quality management system for medical devices",
  detail:
    "The international standard for medical-device quality management. It governs how our materials are designed, manufactured, inspected and documented, and it is the foundation every market-specific approval below is built on.",
  logo: "/bl-6.png",
};

const MARKS: Mark[] = [
  {
    id: "ce",
    name: "CE",
    region: "Europe",
    tag: "European Conformity",
    short: "Compliance with applicable European medical-device requirements",
    detail: "CE marking for applicable products, supported by an authorised European Representative (EC REP).",
    rep: "EC REP: Wellkang Ltd, Derry, Northern Ireland",
    logo: "/bl-1.png",
  },
  {
    id: "ukca",
    name: "UKCA",
    region: "United Kingdom",
    tag: "UK Conformity",
    short: "Compliance for applicable products in the UK",
    detail: "UK Conformity Assessed marking for applicable products placed on the Great Britain market.",
    rep: "UK Responsible Person: Wellkang Ltd, Dover, England",
    logo: "/bl-2.png",
  },
  {
    id: "tga",
    name: "TGA",
    region: "Australia & NZ",
    tag: "Health Safety Regulation",
    short: "Australian regulatory registration/recognition, where applicable",
    detail: "Recognition under the Therapeutic Goods Administration framework for applicable products in Australia and New Zealand.",
    logo: "/bl-4.png",
  },
  {
    id: "anvisa",
    name: "ANVISA",
    region: "Brazil & South America",
    tag: "Sanitary Regulation",
    short: "Brazilian regulatory registration/approval, where applicable",
    detail: "Registration with Brazil's National Health Surveillance Agency for applicable products.",
    logo: "/bl-3.png",
  },
  {
    id: "rus",
    name: "RUS",
    region: "Russia & Eurasia",
    tag: "Market Registration",
    short: "Russian regulatory registration, where applicable",
    detail: "Regulatory registration supporting distribution of applicable products in Russia and the wider Eurasian region.",
    logo: "/bl-5.png",
  },
];

const ALL = [ISO, ...MARKS];

const PILLARS = [
  {
    icon: ClipboardCheck,
    title: "Governed processes",
    text: "Manufacturing follows a documented quality management system aligned with ISO 13485:2016.",
  },
  {
    icon: Globe2,
    title: "Market-specific compliance",
    text: "Each region's regulatory requirements are met for the products we supply there.",
  },
  {
    icon: FileText,
    title: "Documentation on request",
    text: "Certificates and regulatory documents are available to distributors and clinical partners.",
  },
];

/** Light plaque that makes the black logo artwork readable on the dark site */
function LogoPlaque({
  src,
  alt,
  className = "",
  imgBox = "absolute inset-x-10 inset-y-9 sm:inset-x-12 sm:inset-y-10",
}: {
  src: string;
  alt: string;
  className?: string;
  /** Size/position of the logo inside the plaque (small source files must not be blown up too much) */
  imgBox?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-white via-[#FBF8F2] to-[#EDE4D3] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_30px_-12px_rgba(0,0,0,0.6)] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.10),transparent_60%)] pointer-events-none" />
      <div className={imgBox}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
    </div>
  );
}

export default function CertificationsSection() {
  return (
    <section className="relative w-full pt-32 sm:pt-40 pb-28 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Ambient glows */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[70vw] max-w-[900px] h-[420px] bg-sky-500/10 blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-[60%] right-0 w-[40vw] max-w-[500px] h-[400px] bg-indigo-500/10 blur-[160px] pointer-events-none -z-10" />

      {/* ================= HERO ================= */}
      <div className="text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-[#E8DCC8]/25 text-sky-300 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-6 backdrop-blur-md">
          <ShieldCheck size={16} className="text-sky-400" />
          <span>Quality You Can Verify</span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#E8DCC8] leading-[1.05]">
          Certifications &amp;{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-300">
            Regulatory Compliance
          </span>
        </h1>
        <p className="mt-6 text-base sm:text-lg text-[#E8DCC8] font-light leading-relaxed max-w-2xl mx-auto text-center">
          Our manufacturing processes are governed by internationally recognized quality standards and supported by
          market-specific regulatory requirements.
        </p>
      </div>

      {/* Stats strip */}
      <div className="mt-14 grid grid-cols-3 max-w-3xl mx-auto rounded-2xl border border-[#E8DCC8]/15 bg-[#030919]/70 backdrop-blur-xl divide-x divide-[#E8DCC8]/10">
        {[
          { value: "ISO 13485", label: "Certified QMS" },
          { value: `${ALL.length}`, label: "Certifications & marks" },
          { value: `${MARKS.length}`, label: "Regulatory regions" },
        ].map((s) => (
          <div key={s.label} className="px-3 py-5 sm:py-6 text-center">
            <p className="text-lg sm:text-2xl font-black text-[#E8DCC8] tracking-tight">{s.value}</p>
            <p className="mt-1 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-sky-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ================= ISO FEATURE ================= */}
      <div className="mt-24 sm:mt-28">
        <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold text-center">
          The Foundation
        </p>
        <h2 className="mt-3 text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#E8DCC8] text-center">
          Certified Quality Management
        </h2>

        <div className="group mt-10 grid grid-cols-1 lg:grid-cols-5 rounded-3xl overflow-hidden border border-[#E8DCC8]/20 bg-[#030919]/90 hover:border-sky-400/40 transition-colors">
          <LogoPlaque
            src={ISO.logo}
            alt={ISO.name}
            className="lg:col-span-2 h-[220px] sm:h-[260px] lg:h-full lg:min-h-[320px]"
            imgBox="absolute inset-0 m-auto w-[120px] h-[120px] sm:w-[140px] sm:h-[140px]"
          />
          <div className="lg:col-span-3 p-7 sm:p-10 flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-[11px] font-mono uppercase tracking-widest text-sky-300">
                {ISO.tag}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-[#E8DCC8]">
                <Globe2 size={14} className="text-sky-400" /> {ISO.region}
              </span>
            </div>
            <h3 className="mt-4 text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#E8DCC8]">{ISO.name}</h3>
            <p className="mt-3 text-base sm:text-lg font-semibold text-[#E8DCC8]">{ISO.short}</p>
            <p className="mt-3 text-sm sm:text-base text-[#E8DCC8] font-light leading-relaxed text-left hyphens-none">
              {ISO.detail}
            </p>
          </div>
        </div>
      </div>

      {/* ================= MARKET MARKS ================= */}
      <div className="mt-24 sm:mt-28">
        <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold text-center">
          Global Market Access
        </p>
        <h2 className="mt-3 text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#E8DCC8] text-center">
          Regional Regulatory Marks
        </h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {MARKS.map((m) => (
            <div
              key={m.id}
              className="group flex flex-col rounded-3xl overflow-hidden border border-[#E8DCC8]/20 bg-[#030919]/90 hover:border-sky-400/50 hover:-translate-y-1 transition-all duration-300 shadow-xl"
            >
              <LogoPlaque src={m.logo} alt={m.name} className="h-[170px] sm:h-[180px]" />
              <div className="p-6 sm:p-7 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-sky-400 font-semibold">{m.tag}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-[#E8DCC8] whitespace-nowrap">
                    <MapPin size={13} className="text-sky-400" /> {m.region}
                  </span>
                </div>
                <h3 className="mt-2 text-2xl sm:text-[1.7rem] font-black uppercase tracking-tight text-[#E8DCC8]">{m.name}</h3>
                <p className="mt-2 text-sm sm:text-[15px] font-semibold text-[#E8DCC8] leading-snug text-left hyphens-none">{m.short}</p>
                <p className="mt-2 text-sm text-[#E8DCC8] font-light leading-relaxed text-left hyphens-none">{m.detail}</p>
                {m.rep && (
                  <p className="mt-auto pt-4 text-xs text-[#E8DCC8] border-t border-white/[0.08] text-left">
                    <span className="text-sky-300 font-semibold">{m.rep.split(":")[0]}:</span>
                    {m.rep.slice(m.rep.indexOf(":") + 1)}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Filler tile keeps the 3-column grid balanced on desktop */}
          <div className="hidden lg:flex flex-col justify-center rounded-3xl border border-dashed border-[#E8DCC8]/25 bg-gradient-to-br from-sky-500/[0.06] to-indigo-500/[0.06] p-8">
            <Layers size={28} className="text-sky-400" />
            <h3 className="mt-4 text-xl font-black uppercase tracking-tight text-[#E8DCC8]">Need a specific document?</h3>
            <p className="mt-2 text-sm text-[#E8DCC8] font-light leading-relaxed text-left hyphens-none">
              Ask our team for the certificate or regulatory status that applies to your market and product.
            </p>
            <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-200 transition-colors">
              Contact us <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* ================= PILLARS ================= */}
      <div className="mt-24 sm:mt-28 grid grid-cols-1 md:grid-cols-3 gap-6">
        {PILLARS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-3xl border border-[#E8DCC8]/15 bg-[#030919]/70 p-7 sm:p-8 hover:border-sky-400/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <Icon size={22} />
            </div>
            <h3 className="mt-5 text-lg font-bold uppercase tracking-wide text-[#E8DCC8]">{title}</h3>
            <p className="mt-2 text-sm sm:text-[15px] text-[#E8DCC8] font-light leading-relaxed text-left hyphens-none">{text}</p>
          </div>
        ))}
      </div>

      {/* ================= CTA ================= */}
      <div className="mt-20 relative overflow-hidden rounded-3xl border border-[#E8DCC8]/20 bg-gradient-to-br from-[#06122b] via-[#030919] to-[#0b0f2e] p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-sky-500/20 blur-[100px] pointer-events-none" />
        <div className="relative flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 shrink-0">
            <ShieldCheck size={26} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#E8DCC8]">View Certificates</h2>
            <p className="mt-2 text-sm sm:text-base text-[#E8DCC8] font-light leading-relaxed max-w-xl text-left hyphens-none">
              Request copies of our certificates and regulatory documentation for your market. Our team will share the
              documents that apply to your products.
            </p>
          </div>
        </div>
        <Link
          href="/contact"
          className="relative shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] hover:opacity-95 text-white text-sm font-bold tracking-wide transition shadow-lg shadow-sky-500/25"
        >
          Request Certificates <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
