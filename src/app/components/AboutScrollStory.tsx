"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, CheckCircle2, Cpu, Layers, Package, Printer, ShieldCheck } from "lucide-react";

/* =====================================================================
   About page scroll story (frames 2 and 3).

   DESKTOP (lg+): each panel is pinned (sticky) while you scroll.
     1. The landscape image starts full width.
     2. On scroll it shrinks to one side (right for panel 1, left for panel 2).
     3. The text fades up into the free side in steps: heading → items one by one.
   Everything is tied to scroll position, so scrolling back up reverses it.

   MOBILE / TABLET (< lg): simple top-to-bottom layout — image on top,
   text below, fading up as it comes into view. No pinning, so long text
   never gets cut off on small screens.
   ===================================================================== */

type StoryItem = { icon?: ReactNode; title: string; text: string };

type Panel = {
  id: string;
  eyebrow: string;
  title: string;
  icon: ReactNode;
  image: string;
  alt: string;
  /** Which part of the photo stays visible when it is cropped (keeps faces / logo in frame) */
  focus: string;
  imageSide: "left" | "right";
  items: StoryItem[];
  /** "list" = title + text on separate lines, "inline" = bold label: text */
  style: "list" | "inline";
};

const PANELS: Panel[] = [
  {
    id: "what-we-make",
    eyebrow: "Our Range",
    title: "What We Make",
    icon: <Layers size={26} className="text-sky-400" />,
    image: "/case-studies1.png",
    alt: "Taglus clinicians inspecting a clear aligner in the lab",
    focus: "44% center",
    imageSide: "right",
    style: "list",
    items: [
      {
        icon: <ShieldCheck size={18} className="text-sky-400 shrink-0" />,
        title: "Aligner & Retainer Materials",
        text: "High-performance thermoplastic sheets, including Ultra multilayer aligner material and TUFF retainer material, engineered for flexibility, strength and clarity.",
      },
      {
        icon: <Cpu size={18} className="text-sky-400 shrink-0" />,
        title: "Thermoforming Machines",
        text: "Duoform delivers fast, precise pressure forming with a sub-one-second heat-up and intuitive touchscreen control.",
      },
      {
        icon: <Printer size={18} className="text-sky-400 shrink-0" />,
        title: "3D Printing Resins",
        text: "High-accuracy model resins for printing dental models ready for thermoforming.",
      },
      {
        icon: <Package size={18} className="text-sky-400 shrink-0" />,
        title: "Orthodontic Accessories",
        text: "Retainer boxes, chewies, removal tools, membrane boxes and more, to finish and deliver every case professionally.",
      },
    ],
  },
  {
    id: "why-taglus",
    eyebrow: "Why Taglus",
    title: "Why Choose Taglus",
    icon: <CheckCircle2 size={26} className="text-sky-400" />,
    image: "/factory.jpg",
    alt: "Taglus manufacturing facility",
    focus: "38% center",
    imageSide: "left",
    style: "inline",
    items: [
      { title: "Complete Workflow", text: "Print, form, finish and package with one trusted supplier." },
      { title: "Engineered Materials", text: "Science-led materials built for consistent clinical performance and patient comfort." },
      { title: "Certified Quality", text: "ISO 13485:2016 manufacturing, with CE, UKCA, TGA and ANVISA approvals." },
      { title: "Global Reach", text: "Available in 70+ countries through a growing distributor network." },
      { title: "Easy to Use", text: "Products designed to save chairside and lab time." },
      { title: "Great Value", text: "Premium quality at a price that grows with your practice or lab." },
    ],
  },
];

/* ---------- shared text pieces ---------- */

function PanelHeading({ panel }: { panel: Panel }) {
  return (
    <div>
      <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold">{panel.eyebrow}</p>
      <div className="mt-2 flex items-center gap-3">
        {panel.icon}
        <h2 className="text-2xl sm:text-3xl xl:text-4xl font-black uppercase tracking-tight text-[#E8DCC8]">
          {panel.title}
        </h2>
      </div>
    </div>
  );
}

function ItemBody({ item, style }: { item: StoryItem; style: Panel["style"] }) {
  if (style === "inline") {
    return (
      <div className="flex items-start gap-3">
        <CheckCircle2 size={18} className="text-sky-400 shrink-0 mt-[3px]" />
        <p className="text-sm xl:text-[15px] text-[#E8DCC8] font-light leading-relaxed text-left hyphens-none">
          <strong className="text-sky-300 font-bold">{item.title}:</strong> {item.text}
        </p>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center gap-2">
        {item.icon}
        <h3 className="text-sm xl:text-[15px] font-bold uppercase tracking-wider text-sky-300">{item.title}</h3>
      </div>
      <p className="mt-1 pl-[26px] text-sm xl:text-[15px] text-[#E8DCC8] font-light leading-relaxed text-left hyphens-none">
        {item.text}
      </p>
    </div>
  );
}

/* ---------- desktop: scroll-linked reveal ---------- */

/** 0 → 1 as v moves from start to end (clamped) */
function ramp(v: number, start: number, end: number) {
  return Math.min(1, Math.max(0, (v - start) / (end - start)));
}

/** Fades + lifts one block in while scroll progress moves from `start` to `end` */
function Reveal({ progress, start, end, children }: { progress: MotionValue<number>; start: number; end: number; children: ReactNode }) {
  // Function-based transforms (computed on the main thread) give smooth, reliable
  // results in both scroll directions.
  const opacity = useTransform(progress, (v) => ramp(v, start, end));
  const y = useTransform(progress, (v) => 24 * (1 - ramp(v, start, end)));
  const blur = useTransform(progress, (v) => `blur(${6 * (1 - ramp(v, start, end))}px)`);
  return <motion.div style={{ opacity, y, filter: blur }}>{children}</motion.div>;
}

function DesktopPanel({ panel }: { panel: Panel }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Image: full width → 44% (shrinks toward its side)
  const imageWidth = useTransform(scrollYProgress, (v) => `${100 - 56 * ramp(v, 0.08, 0.38)}%`);

  // Text timeline: heading first, then each item one after another, done by ~88%
  const headingRange: [number, number] = [0.34, 0.46];
  const itemsStart = 0.44;
  const itemsEnd = 0.88;
  const step = (itemsEnd - itemsStart) / panel.items.length;

  const imageRight = panel.imageSide === "right";

  return (
    <section ref={ref} id={panel.id} className="relative h-[320vh]">
      <div className="sticky top-0 h-screen pt-20 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-12">
        <div className="relative w-full h-[min(68vh,620px)]">
          {/* Text column (opposite side of the image) */}
          <div
            className={`absolute top-0 h-full w-[50%] flex flex-col justify-center gap-5 xl:gap-6 ${
              imageRight ? "left-0" : "right-0"
            }`}
          >
            <Reveal progress={scrollYProgress} start={headingRange[0]} end={headingRange[1]}>
              <PanelHeading panel={panel} />
            </Reveal>
            <div className={panel.style === "inline" ? "space-y-3 xl:space-y-4" : "space-y-4 xl:space-y-5"}>
              {panel.items.map((item, i) => {
                const start = itemsStart + i * step;
                return (
                  <Reveal key={item.title} progress={scrollYProgress} start={start} end={start + step * 1.4}>
                    <ItemBody item={item} style={panel.style} />
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Image (shrinks toward its side) */}
          <motion.div
            style={{ width: imageWidth }}
            className={`absolute top-0 h-full overflow-hidden rounded-3xl border border-[#E8DCC8]/15 shadow-2xl shadow-black/50 ${
              imageRight ? "right-0" : "left-0"
            }`}
          >
            <Image
              src={panel.image}
              alt={panel.alt}
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              quality={90}
              className="object-cover contrast-[1.06] saturate-[1.12] sepia-[0.06]"
              style={{ objectPosition: panel.focus }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- mobile / tablet: stacked, fade-up on view ---------- */

/** Each text block animates on its own when IT reaches the screen (not all at once),
 *  with a soft blur → sharp fade-up. Scrolling back up hides it again. */
function MobileReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.6, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function MobilePanel({ panel }: { panel: Panel }) {
  return (
    <section id={`${panel.id}-mobile`} className="px-5 sm:px-8 py-12 sm:py-16 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden border border-[#E8DCC8]/15"
      >
        <Image src={panel.image} alt={panel.alt} fill sizes="100vw" quality={90} className="object-cover contrast-[1.06] saturate-[1.12] sepia-[0.06]" style={{ objectPosition: panel.focus }} />
      </motion.div>

      <div className="mt-8 space-y-5">
        <MobileReveal>
          <PanelHeading panel={panel} />
        </MobileReveal>
        {panel.items.map((item) => (
          <MobileReveal key={item.title} delay={0.05}>
            <ItemBody item={item} style={panel.style} />
          </MobileReveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- export ---------- */

export default function AboutScrollStory() {
  return (
    <div className="relative w-full">
      {/* Desktop */}
      <div className="hidden lg:block">
        {PANELS.map((p) => (
          <DesktopPanel key={p.id} panel={p} />
        ))}
      </div>

      {/* Mobile / tablet */}
      <div className="lg:hidden">
        {PANELS.map((p) => (
          <MobilePanel key={p.id} panel={p} />
        ))}
      </div>

      {/* Buttons */}
      <div className="px-6 pt-8 pb-24 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/#products"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-full border border-[#E8DCC8]/30 hover:border-sky-400 bg-white/[0.03] hover:bg-gradient-to-r hover:from-[#0052cc] hover:to-[#00d4ff] text-[#E8DCC8] hover:text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-md"
        >
          <span>Explore Our Products</span>
          <ArrowRight size={14} />
        </Link>
        <Link
          href="/contact"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-full bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] hover:opacity-95 text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-sky-500/20"
        >
          <span>Become a Distributor</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
