import Link from "next/link";
import { Sparkles, Award, Layers, Gauge, TrendingDown, CheckCircle2, ArrowRight, Download, ShieldCheck, Zap, type LucideIcon } from "lucide-react";
import CmsImage from "./CmsImage";
import { commaList, lines, type RollContent } from "../lib/templateContent";

// Icons are assigned in order to the advantage cards.
const ADVANTAGE_ICONS: LucideIcon[] = [Award, Layers, Gauge, TrendingDown, ShieldCheck, Zap];

// All text and images come from CMS → Products → (this product) → "Page content".
export default function RollProductTemplate({ content }: { content: RollContent }) {
    const c = content;
    const subtitle = lines(c.heroSubtitle);
    const external = /^https?:\/\//i.test(c.primaryCtaUrl) || c.primaryCtaUrl.toLowerCase().endsWith(".pdf");

    return (
        <div className="w-full bg-[#020612] text-[#E8DCC8] overflow-hidden selection:bg-sky-400 selection:text-slate-950 font-sans">

            {/* ========================================================
          1. HERO FRAME (About Page Typography + Natural Imagery)
      ======================================================== */}
            <section className="relative w-full pt-28 sm:pt-36 pb-20 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* Left Column: 7 Cols */}
                    <div className="lg:col-span-7 space-y-6">
                        {c.heroBadge && (
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-[#E8DCC8]/25 text-sky-300 text-xs sm:text-sm font-semibold tracking-widest uppercase backdrop-blur-md">
                            <Sparkles size={16} className="text-sky-400" />
                            <span>{c.heroBadge}</span>
                        </div>
                        )}

                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#E8DCC8] leading-[1.08]">
                            {c.heroTitle} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-300">
                                {c.heroHighlight}
                            </span>
                        </h1>

                        {subtitle.length > 0 && (
                        <p className="text-base sm:text-lg text-sky-300/90 font-semibold leading-snug max-w-2xl">
                            {subtitle.map((line, i) => (
                                <span key={i}>
                                    {i > 0 && <br className="hidden sm:inline" />}
                                    {line}{" "}
                                </span>
                            ))}
                        </p>
                        )}

                        {c.heroText && (
                        <p className="text-base sm:text-lg text-[#E8DCC8] font-normal leading-relaxed max-w-2xl">
                            {c.heroText}
                        </p>
                        )}

                        {/* CTAs */}
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            {c.primaryCtaLabel && c.primaryCtaUrl && (
                            <a
                                href={c.primaryCtaUrl}
                                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] hover:opacity-95 text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-sky-500/20"
                            >
                                <Download size={15} />
                                <span>{c.primaryCtaLabel}</span>
                            </a>
                            )}

                            {c.secondaryCtaLabel && (
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full border border-[#E8DCC8]/30 hover:border-sky-400 bg-white/[0.03] text-[#E8DCC8] hover:text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300"
                            >
                                <span>{c.secondaryCtaLabel}</span>
                                <ArrowRight size={14} />
                            </Link>
                            )}
                        </div>
                    </div>

                    {/* Right Column: 5 Cols (trim-1.png Image) */}
                    {c.heroImage && (
                    <div className="lg:col-span-5 relative flex justify-center items-center">
                        <div className="relative w-full h-[460px] sm:h-[560px] lg:h-[620px]">
                            <CmsImage
                                src={c.heroImage}
                                alt={`${c.heroTitle} ${c.heroHighlight}`.trim()}
                                fill
                                sizes="(min-width: 1024px) 45vw, 100vw"
                                priority
                                className="object-contain drop-shadow-[0_20px_40px_rgba(56,189,248,0.15)]"
                            />
                        </div>
                    </div>
                    )}

                </div>
            </section>

            {/* ================= DIVIDER LINE ================= */}
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
                <div className="w-full h-px bg-[#E8DCC8]/20" />
            </div>

            {/* ========================================================
          2. ADVANTAGES SECTION (Matching About Page 2-Col / Clean Layout)
      ======================================================== */}
            {c.advantages.length > 0 && (
            <section className="relative w-full py-20 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold mb-2">
                        {c.advantagesEyebrow}
                    </p>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#E8DCC8]">
                        {c.advantagesTitle}
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                    {c.advantages.map((item, idx) => {
                        const Icon = ADVANTAGE_ICONS[idx % ADVANTAGE_ICONS.length];
                        return (
                            <div
                                key={idx}
                                className="rounded-[2.5rem] p-6 sm:p-7 border border-[#E8DCC8]/20 bg-[#030919]/90 backdrop-blur-2xl flex flex-col justify-start hover:border-sky-400/40 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-5 shrink-0">
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight leading-snug text-[#E8DCC8] mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm sm:text-[15px] font-normal leading-relaxed text-left hyphens-none text-[#E8DCC8]">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>
            )}

            {/* ========================================================
          3. AVAILABLE VARIANTS & SPECIFICATIONS (With trim-2.png)
      ======================================================== */}
            {c.variants.length > 0 && (
            <section className="relative w-full py-20 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto border-t border-[#E8DCC8]/20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Machine Integration Visual (trim-2.png): 5 Cols */}
                    {c.variantsImage && (
                    <div className="lg:col-span-5 relative flex justify-center items-center">
                        <div className="relative w-full h-[440px] sm:h-[520px] lg:h-[580px]">
                            <CmsImage
                                src={c.variantsImage}
                                alt={c.variantsTitle || "Thermoforming machine roll"}
                                fill
                                sizes="(min-width: 1024px) 45vw, 100vw"
                                className="object-contain drop-shadow-[0_20px_40px_rgba(56,189,248,0.12)]"
                            />
                        </div>
                    </div>
                    )}

                    {/* Variants List: 7 Cols */}
                    <div className={`${c.variantsImage ? "lg:col-span-7" : "lg:col-span-12"} space-y-8`}>
                        <div>
                            <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold mb-2">
                                {c.variantsEyebrow}
                            </p>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#E8DCC8]">
                                {c.variantsTitle}
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {c.variants.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="p-5 sm:p-6 rounded-2xl border border-[#E8DCC8]/15 bg-white/[0.02] hover:border-sky-400/30 transition-all duration-300"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                                        <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight leading-snug text-sky-300">
                                            {item.name}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {commaList(item.thicknesses).map((th, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-sky-400/10 border border-sky-400/30 text-sky-300"
                                                >
                                                    {th}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm sm:text-[15px] font-normal leading-relaxed text-left hyphens-none text-[#E8DCC8]">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {c.variantsNote && (
                        <div className="pt-2 flex items-center gap-3 text-sm text-[#E8DCC8]">
                            <CheckCircle2 size={18} className="text-sky-400 shrink-0" />
                            <span>{c.variantsNote}</span>
                        </div>
                        )}
                    </div>

                </div>
            </section>
            )}

        </div>
    );
}