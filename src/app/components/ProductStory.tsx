"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";

/**
 * Home page story (2nd section). The stage pins while you scroll; each product sits in a
 * product in the middle. On scroll the current product slides out to the top-left corner
 * and the next one slides in from the bottom-right (a diagonal "staircase"), and the text
 * below changes with it. Edit the chapters in the STORY list.
 */
const STORY = [
  {
    label: "Align",
    title: "Many layers. One precise move.",
    text: "Taglus Ultra multilayer aligner sheets deliver steady force, clarity and comfort through every treatment stage.",
    image: "/story/align-ultra.webp",
    alt: "Taglus Ultra aligner sheet box",
  },
  {
    label: "Retain",
    title: "Built tough to hold the result.",
    text: "Taglus TUFF retainer material forms strong, clear retainers that keep finished smiles exactly in place.",
    image: "/story/retain-tuff.webp",
    alt: "Taglus TUFF retainer material box",
  },
  {
    label: "Protect",
    title: "A safe home for every smile.",
    text: "Taglus retainer boxes keep aligners and retainers clean, protected and easy to carry every day.",
    image: "/story/protect-retainer-box.webp",
    alt: "Taglus retainer box",
  },
  {
    label: "Capture",
    title: "A clean impression, first time.",
    text: "Taglus impression trays fit comfortably and hold material securely for accurate, reliable impressions.",
    image: "/story/capture-impression-tray.webp",
    alt: "Taglus dental impression tray",
  },
];

const N = STORY.length;
const EASE = [0.22, 1, 0.36, 1] as const;

/** Scroll progress → chapter position, holding still on each chapter for a moment */
function toPosition(progress: number) {
  const raw = Math.min(Math.max(progress, 0), 1) * (N - 1);
  const i = Math.floor(raw);
  const f = raw - i;
  const t = Math.min(Math.max((f - 0.2) / 0.6, 0), 1); // still for the first/last 20% of each step
  const eased = t * t * (3 - 2 * t);
  return Math.min(i + eased, N - 1);
}

export default function ProductStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const pos = useTransform(scrollYProgress, toPosition);
  const [active, setActive] = useState(0);
  useMotionValueEvent(pos, "change", (p) => {
    const i = Math.round(p);
    if (i !== active) setActive(i);
  });
  const c = STORY[active];

  return (
    <section data-no-reveal aria-label="The Taglus story" className="relative bg-[#182f4b]">
      {/* Pinned stage */}
      <div ref={ref} className="relative" style={{ height: `${N * 100}vh` }}>
        <div className="sticky top-0 h-[100svh] overflow-hidden pt-20">
          {/* Heading, inside the same frame */}
          <div className="relative z-10 mx-auto max-w-4xl px-6 pt-4 sm:pt-6 text-center">
            <p className="text-[11px] sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold">The Taglus Story</p>
            <h2 className="mt-1.5 sm:mt-2 text-2xl sm:text-4xl font-black uppercase text-[#E8DCC8]">
              From treatment{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-300">to every smile</span>
            </h2>
          </div>
          {/* big chapter word behind the card */}
          <div className="absolute inset-x-0 top-[24%] sm:top-[24%] flex justify-center pointer-events-none select-none" aria-hidden>
            <AnimatePresence mode="wait">
              <motion.span
                key={c.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="block text-[16vw] sm:text-[15vw] lg:text-[13vw] leading-none font-black uppercase text-transparent [-webkit-text-stroke:1.5px_rgba(232,220,200,0.18)]"
              >
                {c.label}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* the product cards, moving diagonally */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[26%] sm:top-[26%] h-[34svh] sm:h-[42svh] w-[74vw] sm:w-[60vw] max-w-[620px]">
            {STORY.map((s, i) => (
              <Card key={s.label} index={i} pos={pos} image={s.image} alt={s.alt} />
            ))}
          </div>

          {/* text under the card */}
          <div className="absolute inset-x-0 bottom-[4%] sm:bottom-[5%] px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="mx-auto max-w-xl text-center"
              >
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
                  0{active + 1} · {c.label}
                </p>
                <h3 className="mt-2 text-xl sm:text-3xl font-black uppercase text-[#E8DCC8]">{c.title}</h3>
                <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-[#E8DCC8] !text-center">{c.text}</p>
              </motion.div>
            </AnimatePresence>

            {/* progress */}
            <div className="mt-5 flex justify-center gap-2" aria-hidden>
              {STORY.map((s, i) => (
                <span
                  key={s.label}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-sky-400" : "w-1.5 bg-[#E8DCC8]/30"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** One product (no frame). offset 0 = centre, +1 = off the bottom-right, -1 = off the top-left */
function Card({ index, pos, image, alt }: { index: number; pos: MotionValue<number>; image: string; alt: string }) {
  const offset = useTransform(pos, (p) => index - p);
  const x = useTransform(offset, (o) => `${o * 75}vw`);
  const y = useTransform(offset, (o) => `${o * 70}vh`);
  const rotate = useTransform(offset, (o) => o * -10);
  const scale = useTransform(offset, (o) => 1 - Math.min(Math.abs(o), 1) * 0.15);
  const opacity = useTransform(offset, (o) => (Math.abs(o) > 1.2 ? 0 : 1));

  return (
    <motion.div style={{ x, y, rotate, scale, opacity }} className="absolute inset-0 will-change-transform">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(min-width: 640px) 50vw, 90vw"
        className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)]"
      />
    </motion.div>
  );
}
