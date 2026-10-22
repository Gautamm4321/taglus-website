"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  country: string;
  product: string;
  quote: string;
  /** Background-removed portrait (public/testimonials/cutouts) */
  photo: string;
  /** ISO country code → flag in public/flags */
  flag: "es" | "br" | "eg" | "np" | "et";
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Dr. Manuel Fernández Cano",
    role: "Orthodontist",
    country: "Spain",
    product: "Aligners made from Taglus Premium",
    quote:
      "After three years of using Taglus Premium for my aligners and experiencing consistently excellent results, I can confidently attest to the remarkable mechanical properties of this product that effectively achieve the intended outcomes.",
    photo: "/testimonials/cutouts/manuel-fernandez-cano-v2.webp",
    flag: "es",
  },
  {
    name: "Dr. Marcos Eugenio",
    role: "Professor & Orthodontic Specialist",
    country: "Brazil",
    product: "Taglus Duoform",
    quote:
      "If you want to produce aligners faster and more efficiently, the Taglus Duoform is the machine for you. It uses pressure technology, making it very simple and intuitive to use. You just place the sheet, select the pre-programmed settings, and the Duoform does the rest. Once the plate is heated, the machine signals with a few beeps, so there's no risk of under- or over-heating. This ensures there are no bubbles or imperfections, and the result is always a highly professional product. Truly top-notch and perfect!",
    photo: "/testimonials/cutouts/marcos-eugenio.webp",
    flag: "br",
  },
  {
    name: "Dr. Abdullah Ali",
    role: "Orthodontist",
    country: "Egypt",
    product: "Taglus Premium · 0.8 mm",
    quote:
      "We are thrilled to share a remarkable case study: a simple crowding case with a highly buccally displaced upper left canine, midline shift and lower right canine in crossbite tendency. Using the proper staging technique, the right sheet material and thickness, mild to moderate crowding cases can be treated efficiently using in-house aligners. Taglus sheets did the job perfectly, as wanted.",
    photo: "/testimonials/cutouts/abdullah-ali.webp",
    flag: "eg",
  },
  {
    name: "Dr. Dashrath Kafle",
    role: "BDS, MDS · Professor and Head",
    country: "Nepal",
    product: "Taglus Premium · 0.8 mm",
    quote:
      "The case study performed by Dr. Dashrath Kafle in Nepal demonstrates the successful application. The patient's satisfaction with the treatment outcome underscores the efficacy and reliability of this orthodontic approach. After 11 months of treatment, the patient achieved significant improvement in both dental alignment and occlusion. Taglus Premium 0.8 mm aligner material facilitated precise and effective orthodontic correction.",
    photo: "/testimonials/cutouts/dashrath-kafle-v2.webp",
    flag: "np",
  },
  {
    name: "Yenkuwel Bekele",
    role: "General Manager Assistant, Gados – Global Advanced Dental Services LTD",
    country: "Ethiopia",
    product: "Aligners, attachments & branded boxes",
    quote:
      "We especially appreciate the attitude, service, and support we received from the sales team. Your responsiveness and prompt support are truly commendable. As a company, Taglus demonstrates attention to detail and a high level of professionalism toward its clients and products. We are satisfied with the products we purchased: aligners, attachments, and branded boxes for aligners and transparent boxes for zirconia. We believe we will continue strengthening our cooperation toward mutual success.",
    photo: "/testi-d.png",
    flag: "et",
  },
  {
    name: "Dr. Adriana Porto",
    role: "Dentist",
    country: "Brazil",
    product: "Taglus aligner sheets",
    quote:
      "Taglus produces some of the best aligner sheets I've ever used. The quality, consistency, and performance make them my preferred choice for fabricating aligners. Their commitment to excellence and innovation truly sets them apart.",
    photo: "/testimonials/cutouts/adriana-porto.webp",
    flag: "br",
  },
  {
    name: "Dr. Rafael Ribeiro",
    role: "Orthodontist & Postgraduate Educator",
    country: "Brazil",
    product: "Taglus thermoforming sheets",
    quote:
      "Our aligners are made using Taglus thermoforming sheets, the finest we've worked with. From my very first experience with the brand, I was genuinely impressed by the quality. Every week, I teach postgraduate students from across Latin America, and I'm proud to introduce them to Taglus and showcase its exceptional performance.",
    photo: "/testimonials/cutouts/rafael-ribeiro-v2.webp",
    flag: "br",
  },
];

const AUTOPLAY_MS = 9000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setIndex((next + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);
  const next = useCallback(() => go(index + 1, 1), [go, index]);
  const prev = useCallback(() => go(index - 1, -1), [go, index]);

  // Gentle autoplay, paused while the visitor hovers / touches the card
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, next]);

  const t = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="relative w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-12 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70vw] max-w-[900px] h-[420px] bg-sky-500/10 blur-[160px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-[#E8DCC8]/25 text-sky-300 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-5 backdrop-blur-md">
          <Quote size={15} className="text-sky-400" />
          <span>Testimonials</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#E8DCC8]">
          Trusted by{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-300">Clinicians</span>
        </h2>
        <p className="mt-5 text-base sm:text-lg text-[#E8DCC8] font-light leading-relaxed text-center">
          Orthodontists, educators and labs around the world share their experience with Taglus.
        </p>
      </div>

      {/* Card */}
      <div
        className="max-w-6xl mx-auto"
        data-no-reveal
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
      >
        <div className="relative rounded-[2rem] p-[1px] bg-gradient-to-br from-sky-400/40 via-[#E8DCC8]/15 to-indigo-400/30 shadow-2xl shadow-black/40">
          <div className="relative rounded-[2rem] bg-[#030919]/95 backdrop-blur-2xl overflow-hidden">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-12 md:min-h-[460px]"
              >
                {/* Portrait: cut-out of the person on a glowing stage, with their country's flag */}
                <div className="relative md:col-span-5 h-[340px] sm:h-[400px] md:h-auto overflow-hidden border-b md:border-b-0 md:border-r border-[#E8DCC8]/15 bg-[radial-gradient(ellipse_at_50%_100%,#123a66_0%,#071530_45%,#030919_80%)]">
                  {/* soft grid + halo behind the person */}
                  <div aria-hidden className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(232,220,200,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(232,220,200,.35)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
                  <div aria-hidden className="absolute left-1/2 bottom-[-18%] -translate-x-1/2 w-[115%] aspect-square rounded-full bg-gradient-to-t from-sky-500/35 via-sky-400/10 to-transparent blur-2xl" />
                  {/* big faded flag watermark */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/flags/${t.flag}.svg`} alt="" aria-hidden className="absolute -right-10 top-8 w-48 sm:w-56 rotate-[-8deg] rounded-xl opacity-[0.18] blur-[1px]" />
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-6 top-8 bottom-0"
                  >
                    <Image
                      src={t.photo}
                      alt={t.name}
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]"
                    />
                  </motion.div>
                  <span className="absolute left-5 top-5 md:left-6 md:top-6 inline-flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 rounded-full bg-[#030919]/85 border border-[#E8DCC8]/20 backdrop-blur-md text-xs font-semibold tracking-wide text-[#E8DCC8] shadow-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/flags/${t.flag}.svg`} alt="" className="h-4 w-6 rounded-[3px] object-cover ring-1 ring-white/20" />
                    {t.country}
                  </span>
                </div>

                {/* Quote */}
                <div className="md:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-center">
                  {/* Proper typographic quotation marks (“ ”) */}
                  <span
                    aria-hidden
                    className="block font-serif text-[88px] sm:text-[110px] leading-[0.6] h-12 sm:h-14 text-transparent bg-clip-text bg-gradient-to-br from-sky-300 to-indigo-400 select-none"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="mt-4 text-base sm:text-lg lg:text-[19px] text-[#E8DCC8] font-light leading-relaxed text-left hyphens-none [text-wrap:pretty]">
                    {t.quote}
                    <span aria-hidden className="ml-1 align-[-0.35em] font-serif text-4xl leading-none text-sky-300/80">
                      &rdquo;
                    </span>
                  </blockquote>

                  <div className="mt-8 pt-6 border-t border-white/[0.08]">
                    <p className="text-lg sm:text-xl font-bold uppercase tracking-wide [word-spacing:0.2em] leading-snug text-[#E8DCC8]">{t.name}</p>
                    <p className="mt-1.5 text-sm text-[#E8DCC8] font-normal leading-relaxed text-left">{t.role}</p>
                    <span className="mt-4 inline-block px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-[11px] font-mono uppercase tracking-widest text-sky-300">
                      {t.product}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Controls: arrows + avatar strip */}
        <div className="mt-8 flex items-center justify-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="shrink-0 w-11 h-11 rounded-full border border-[#E8DCC8]/25 bg-white/[0.03] text-[#E8DCC8] hover:border-sky-400 hover:text-sky-300 flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto px-1 py-1 [scrollbar-width:none]">
            {TESTIMONIALS.map((p, i) => (
              <button
                key={p.name}
                type="button"
                onClick={() => go(i, i > index ? 1 : -1)}
                aria-label={`Show testimonial from ${p.name}`}
                aria-current={i === index}
                className={`relative shrink-0 rounded-full overflow-hidden transition-all duration-300 ${
                  i === index
                    ? "w-12 h-12 sm:w-14 sm:h-14 ring-2 ring-sky-400 ring-offset-2 ring-offset-[#020612]"
                    : "w-9 h-9 sm:w-11 sm:h-11 opacity-50 hover:opacity-100 grayscale hover:grayscale-0"
                }`}
              >
                <span aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#1b3a66] to-[#071530]" />
                <Image src={p.photo} alt="" fill sizes="56px" className="object-cover object-top scale-110 translate-y-[6%]" />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="shrink-0 w-11 h-11 rounded-full border border-[#E8DCC8]/25 bg-white/[0.03] text-[#E8DCC8] hover:border-sky-400 hover:text-sky-300 flex items-center justify-center transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Progress */}
        <p className="mt-4 text-center text-xs font-mono tracking-widest text-[#E8DCC8]">
          {String(index + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}
