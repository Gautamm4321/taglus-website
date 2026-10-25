"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";

/**
 * Home page story: the section pins while you scroll, and the 4 chapters
 * (Print → Form → Trim → Finish) change one after another.
 * Desktop: image 80% left, text 20% right. Mobile: image 80% top, text 20% bottom.
 * To change a chapter, edit the CHAPTERS list below (image path, title, text, link).
 */
const CHAPTERS = [
  {
    label: "Print",
    title: "It starts with a perfect model.",
    text: "Taglus model resins print accurate, smooth dental models for digital orthodontic workflows.",
    image: "/model%20resin.jpg",
    alt: "Taglus model resin bottles",
    fit: "cover" as const,
    href: "/products/taglus-model-resin",
  },
  {
    label: "Form",
    title: "Then the sheet takes shape.",
    text: "Clear aligner sheets thermoform tightly over every detail of the model.",
    image: "/plan.jpeg",
    alt: "Clear aligner formed from a Taglus sheet",
    fit: "cover" as const,
    href: "/products/taglus-premium",
  },
  {
    label: "Trim",
    title: "Every edge, refined.",
    text: "Laser cutting and multi-axis trimming support a digital approach to aligner finishing.",
    image: "/lac-removebg-preview.png",
    alt: "Taglus LAC laser cutter",
    fit: "cutout" as const,
    href: "/contact",
  },
  {
    label: "Finish",
    title: "Ready for the patient.",
    text: "Retainer boxes and accessories that make every hand-off feel premium.",
    image: "/acesories-B.jpg",
    alt: "Taglus retainer box",
    fit: "whole" as const,
    href: "/products/taglus-orthodontic-accessories",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HomeStory() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [fill, setFill] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const pos = Math.min(Math.max(p, 0), 0.9999) * CHAPTERS.length;
    const i = Math.floor(pos);
    if (i !== active) setActive(i);
    setFill(pos - i);
  });

  const c = CHAPTERS[active];

  return (
    <section
      ref={ref}
      data-no-reveal
      aria-label="From print to finish: the Taglus workflow"
      className="relative"
      style={{ height: `${CHAPTERS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-[100svh] bg-[#020612]">
        <div className="grid h-full grid-rows-[minmax(0,4fr)_minmax(0,1fr)] lg:grid-rows-1 lg:grid-cols-[minmax(0,2fr)_minmax(340px,1fr)]">
          {/* Images: 80% */}
          <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_50%_60%,#e9eef5_0%,#c9d3e0_70%)]">
            {CHAPTERS.map((ch, i) => (
              <motion.div
                key={ch.image}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.06 }}
                transition={{ opacity: { duration: 0.9, ease: EASE }, scale: { duration: 1.6, ease: EASE } }}
                aria-hidden={i !== active}
              >
                {/* Mobile: blurred copy fills the frame so the whole photo can be shown without cutting */}
                {/* "whole" photos: a clean backdrop in the photo's own colours, so the product is never cut */}
                {ch.fit === "whole" && (
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#c3dcef] via-[#dfe8f1] to-[#f4f5f8]" />
                )}
                {ch.fit === "cover" && (
                  <Image
                    src={ch.image}
                    alt=""
                    aria-hidden
                    fill
                    sizes="100vw"
                    className="object-cover scale-110 blur-2xl opacity-60 lg:hidden"
                  />
                )}
                {ch.fit === "whole" ? (
                  // Whole square photo, centred; its edges fade into the backdrop so nothing is cut
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative aspect-square w-full lg:w-auto lg:h-full [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)] lg:[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                      <Image src={ch.image} alt={ch.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
                    </div>
                  </div>
                ) : (
                  <Image
                  src={ch.image}
                  alt={ch.alt}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1024px) 67vw, 100vw"
                  className={
                    ch.fit === "cutout"
                      ? // the LAC photo has a lot of empty space around the machine, so it is scaled up
                        "object-contain scale-[1.22] lg:scale-[1.5]"
                      : "object-contain lg:object-cover"
                  }
                />
                )}
              </motion.div>
            ))}
            {/* soft fade into the text panel */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#020612]/60 to-transparent lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-24 lg:bg-gradient-to-l" />
          </div>

          {/* Text: 20% */}
          <div className="relative flex flex-col justify-center overflow-hidden bg-[radial-gradient(ellipse_at_80%_100%,#0d2a55_0%,#061229_55%,#020612_100%)] px-5 py-4 lg:px-10 lg:pt-36 lg:pb-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial="hidden"
                animate="show"
                exit="exit"
                className="max-w-sm"
              >
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="text-[10px] lg:text-xs font-semibold uppercase tracking-[0.3em] text-[#E8DCC8]"
                >
                  0{active + 1} · {c.label}
                </motion.p>
                <div className="overflow-hidden mt-1.5 lg:mt-4">
                  <motion.h2
                    variants={{ hidden: { y: "110%" }, show: { y: "0%" }, exit: { y: "-110%" } }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="text-[1.35rem] leading-tight lg:text-[2.3rem] lg:leading-[1.1] font-semibold tracking-[-0.01em] text-[#E8DCC8] !text-left"
                  >
                    {c.title}
                  </motion.h2>
                </div>
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
                  className="mt-1.5 lg:mt-5 text-[13px] lg:text-[15px] leading-snug lg:leading-relaxed text-[#E8DCC8] !text-left line-clamp-2 lg:line-clamp-none"
                >
                  {c.text}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* Progress: one bar per chapter */}
            <div className="absolute left-5 right-5 bottom-3 lg:left-10 lg:right-10 lg:bottom-10 flex gap-2" aria-hidden>
              {CHAPTERS.map((ch, i) => (
                <span key={ch.label} className="h-[2px] flex-1 overflow-hidden rounded-full bg-[#E8DCC8]/15">
                  <span
                    className="block h-full origin-left bg-[#E8DCC8]"
                    style={{ transform: `scaleX(${i < active ? 1 : i === active ? Math.max(fill, 0.04) : 0})` }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
