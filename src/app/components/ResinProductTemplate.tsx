import { Sparkles, CheckCircle2 } from "lucide-react";
import CmsImage from "./CmsImage";
import { lines, type ResinContent } from "../lib/templateContent";

// All text and images come from CMS → Products → (this product) → "Page content".
export default function ResinProductTemplate({ content }: { content: ResinContent }) {
    const c = content;
    // Doubled array for seamless infinite loop
    const marqueeItems = [...c.gallery, ...c.gallery];
    const [left, right] = c.formulations;

    return (
        <div className="w-full bg-[#020612] text-[#E8DCC8] overflow-hidden selection:bg-sky-400 selection:text-slate-950 font-sans">

            {/* ========================================================
          1. HERO FRAME (Clean Left Text + Full Natural Image on Right)
      ======================================================== */}
            <section className="relative w-full min-h-[85vh] flex items-center px-6 sm:px-12 lg:px-20 py-20 max-w-7xl mx-auto">
                <div className="animate-fade-up grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

                    {/* Left Side: Typography */}
                    <div className="space-y-6">
                        {c.heroBadge && (
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-[#E8DCC8]/25 text-sky-300 text-xs sm:text-sm font-semibold tracking-widest uppercase backdrop-blur-md">
                            <Sparkles size={16} className="text-sky-400" />
                            <span>{c.heroBadge}</span>
                        </div>
                        )}

                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.08]">
                            <span className="block text-[#E8DCC8] lg:whitespace-nowrap">
                                {c.heroTitle}
                            </span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-300 lg:whitespace-nowrap">
                                {c.heroHighlight}
                            </span>
                        </h1>

                        {c.heroText && (
                        <p className="text-lg sm:text-xl text-[#E8DCC8] font-normal leading-relaxed max-w-xl">
                            {c.heroText}
                        </p>
                        )}
                    </div>

                    {/* Right Side: Full Unboxed Banner Image */}
                    {c.heroImage && (
                    <div className="relative flex justify-center items-center w-full">
                        <div className="animate-float relative w-full h-[400px] sm:h-[500px] lg:h-[560px]">
                            <CmsImage
                                src={c.heroImage}
                                alt={`${c.heroTitle} ${c.heroHighlight}`.trim()}
                                fill
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                priority
                                className="object-contain"
                            />
                        </div>
                    </div>
                    )}

                </div>
            </section>


            {/* ========================================================
          2. ALL 5 CLINICAL POINTS IN ONE SINGLE LINE
      ======================================================== */}
      {c.points.length > 0 && (
      <section className="w-full py-16 px-4 sm:px-8 lg:px-12 bg-transparent">
                <div className="max-w-[1400px] mx-auto">

                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold mb-2">
                            {c.pointsEyebrow}
                        </p>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#E8DCC8]">
                            {c.pointsTitle}
                        </h2>
                    </div>

                    {/* 5 in One Line Grid */}
                    <div className="flex flex-wrap justify-center gap-4 items-stretch">
                        {c.points.map((item, idx) => (
                            <div
                                key={idx}
                                className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.667rem)] lg:w-[calc(20%-0.8rem)] rounded-[2rem] p-5 sm:p-6 border border-[#E8DCC8]/20 bg-[#030919]/90 backdrop-blur-2xl flex flex-col justify-start hover:border-sky-400/40 transition-all duration-300"
                            >
                                <div className="w-10 h-10 rounded-full bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-4 shrink-0">
                                    <CheckCircle2 size={20} />
                                </div>
                                <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight leading-snug text-[#E8DCC8] mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm sm:text-[15px] font-normal leading-relaxed text-left hyphens-none text-[#E8DCC8]">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
      )}


            {/* ========================================================
          3. LARGE TILTED BOTTLES FRAME (/ \ Tilt, Bigger Size, No BG Boxes)
      ======================================================== */}
      {left && (
      <section className="w-full py-12 md:py-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                    {/* Left Bottle: / Tilt */}
                    <Bottle item={left} tilt="rotate-12" />

                    {/* Center Content */}
                    <div className="lg:col-span-4 text-center space-y-10 px-4">
                        <FormulationText item={left} />
                        {right && (
                            <>
                                <div className="w-20 h-px bg-[#E8DCC8]/20 mx-auto" />
                                <FormulationText item={right} />
                            </>
                        )}
                    </div>

                    {/* Right Bottle: \ Tilt */}
                    {right && <Bottle item={right} tilt="-rotate-12" />}

                </div>
            </section>
      )}


            {/* ========================================================
          4. INFINITE 60s MARQUEE TRAIN SLIDER (1:1 Aspect, Blur + Hover)
      ======================================================== */}
      {c.gallery.length > 0 && (
      <section className="w-full py-20 bg-transparent">
                <div className="max-w-6xl mx-auto px-4 mb-14 text-center">
                    <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold mb-2">
                        {c.galleryEyebrow}
                    </p>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#E8DCC8] lg:whitespace-nowrap">
                        {c.galleryTitle}
                    </h2>
                    {c.gallerySubtitle && (
                    <p className="mt-3 text-base sm:text-lg text-[#E8DCC8] font-normal">
                        {c.gallerySubtitle}
                    </p>
                    )}
                </div>

                {/* Marquee Train Track */}
                <div className="relative w-full overflow-hidden">
                    {/* Edge Gradient Fades */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#020612] to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#020612] to-transparent z-10 pointer-events-none" />

                    <div className="animate-marquee-slow flex gap-6">
                        {marqueeItems.map((item, idx) => (
                            <div
                                key={idx}
                                className="group relative w-72 h-72 sm:w-80 sm:h-80 aspect-square rounded-[2rem] overflow-hidden shrink-0 cursor-pointer"
                            >
                                {/* Full 1:1 Edge-to-Edge Image */}
                                <CmsImage
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    sizes="(min-width: 1024px) 25vw, 50vw"
                                    className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:blur-md"
                                />

                                {/* Hover Content Overlay */}
                                <div className="absolute inset-0 bg-[#020612]/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-6 space-y-3">
                                    <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold">
                                        Clinical Spec
                                    </span>
                                    <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight leading-snug text-[#E8DCC8]">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm sm:text-[15px] font-normal leading-relaxed text-left hyphens-none text-[#E8DCC8]">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
      )}

        </div>
    );
}

type Formulation = ResinContent["formulations"][number];

function Bottle({ item, tilt }: { item: Formulation; tilt: string }) {
    return (
        <div className="lg:col-span-4 flex flex-col items-center justify-center">
            {item.image && (
                <div className={`relative w-72 sm:w-80 h-[520px] sm:h-[580px] transition-transform duration-500 hover:rotate-0 ${tilt}`}>
                    <CmsImage
                        src={item.image}
                        alt={item.caption || item.title}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-contain drop-shadow-[0_20px_35px_rgba(56,189,248,0.15)]"
                    />
                </div>
            )}
            {item.caption && (
                <p className="mt-4 text-sm sm:text-base font-mono uppercase tracking-widest text-[#E8DCC8] font-bold text-center">
                    {item.caption}
                </p>
            )}
        </div>
    );
}

function FormulationText({ item }: { item: Formulation }) {
    return (
        <div className="space-y-2.5">
            {item.label && (
                <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold">{item.label}</p>
            )}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#E8DCC8]">{item.title}</h3>
            {lines(item.lines).map((line, i) => (
                <p key={i} className="text-base sm:text-lg text-[#E8DCC8] leading-snug font-normal">
                    {line}
                </p>
            ))}
            {item.highlight && <p className="text-sm sm:text-base text-sky-300 font-medium">{item.highlight}</p>}
        </div>
    );
}
