import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import CmsImage from "./CmsImage";
import { slugify } from "../lib/validation";
import { lines, type AccessoriesContent } from "../lib/templateContent";

// All text and images come from CMS → Products → (this product) → "Page content".
export default function AccessoriesShowcaseTemplate({ content }: { content: AccessoriesContent }) {
  const c = content;
  return (
    <div className="w-full bg-[#020612] text-[#E8DCC8] font-sans selection:bg-sky-400 selection:text-slate-950">
      
      {/* ========================================================
          TOP HEADER FRAME (Strict 2-Lines)
      ======================================================== */}
      <section className="relative w-full pt-28 sm:pt-36 pb-14 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto border-b border-[#E8DCC8]/15 text-center">
        <div className="max-w-5xl mx-auto flex flex-col items-center space-y-4">
          {c.heroBadge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#E8DCC8]/25 text-sky-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md">
            <Sparkles size={14} className="text-sky-400" />
            <span>{c.heroBadge}</span>
          </div>
          )}

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#E8DCC8] leading-[1.2]">
            {c.heroTitle} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-300 whitespace-normal sm:whitespace-nowrap">
              {c.heroHighlight}
            </span>
          </h1>

          {c.heroText && (
          <p className="text-sm sm:text-base text-sky-300/90 font-semibold leading-snug max-w-2xl">
            {c.heroText}
          </p>
          )}
        </div>
      </section>

      {/* ========================================================
          ALTERNATING 1:1 SHOWCASE GRID (Reference Style)
      ======================================================== */}
      <section className="w-full">
        {c.items.map((item, index) => {
          const isEven = index % 2 === 0;
          const anchor = slugify(item.title) || `item-${index + 1}`;

          return (
            <div
              key={`${anchor}-${index}`}
              id={anchor}
              className="w-full border-b border-[#E8DCC8]/15"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                
                {/* 1:1 Image Panel */}
                <div
                  className={`relative w-full aspect-square bg-[#030919] overflow-hidden ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  {/* Every photo fills its square panel edge to edge (cut-out PNGs sit on a light studio background) */}
                  <CmsImage
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={`transition-transform duration-700 hover:scale-105 ${
                      /\.png($|\?)/i.test(item.image) ? "object-contain p-[12%] bg-[radial-gradient(circle_at_50%_40%,#ffffff_0%,#e9eef5_70%)]" : "object-cover"
                    }`}
                    priority={index < 2}
                  />
                </div>

                {/* Content Panel */}
                <div
                  className={`flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-16 ${
                    isEven
                      ? "lg:order-2 bg-[#020612]"
                      : "lg:order-1 bg-[#020612] lg:border-r border-[#E8DCC8]/15"
                  }`}
                >
                  <div className="max-w-xl space-y-6">
                    {/* Category Label */}
                    {item.category && (
                    <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold">
                      {item.category}
                    </p>
                    )}

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#E8DCC8] leading-tight">
                      {item.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-[#E8DCC8] font-normal leading-relaxed">
                      {item.description}
                    </p>

                    {/* Bullet Points */}
                    <ul className="space-y-3 pt-2">
                      {lines(item.bullets).map((bullet, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-xs sm:text-sm text-[#E8DCC8] font-normal"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-2" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Button */}
                    {item.buttonText && (
                    <div className="pt-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 py-3 px-6 rounded-full border border-[#E8DCC8]/30 hover:border-sky-400 bg-white/[0.03] hover:bg-gradient-to-r hover:from-[#0052cc] hover:to-[#00d4ff] text-[#E8DCC8] hover:text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300"
                      >
                        <span>{item.buttonText}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </section>

      {/* ========================================================
          BOTTOM WORKFLOW CALL TO ACTION
      ======================================================== */}
      {c.ctaTitle && (
      <section className="relative py-16 px-6 sm:px-12 max-w-6xl mx-auto text-center space-y-4">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-normal [word-spacing:0.12em] leading-tight text-[#E8DCC8] [text-wrap:balance]">
          {c.ctaTitle}
        </h3>
        {c.ctaText && (
        <p className="text-sm sm:text-base text-[#E8DCC8] font-normal max-w-2xl mx-auto">
          {c.ctaText}
        </p>
        )}
        {c.ctaButton && (
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] hover:opacity-95 text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-sky-500/20"
          >
            <span>{c.ctaButton}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
        )}
      </section>
      )}

    </div>
  );
}