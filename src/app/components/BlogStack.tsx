"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

export type StackPost = {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string | null;
  imagePath: string | null;
  date: string; // already formatted, e.g. "15 October 2026"
  isoDate: string | null;
  minutes: number;
};

/**
 * Blog list as stacking cards: each card pins near the top, the next one
 * slides up over it, and the cards underneath tilt back and shrink a little.
 * Posts arrive newest first.
 */
export default function BlogStack({ posts }: { posts: StackPost[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(posts.length - 1, Math.max(0, Math.round(p * (posts.length - 1))));
    if (i !== active) setActive(i);
  });

  // Click a date: scroll so that article's card is the one on top
  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    const y = top + (posts.length > 1 ? (range * i) / (posts.length - 1) : 0);
    if (window.taglusLenis) window.taglusLenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
      {/* Date timeline (desktop): follows the scroll, the current article's date lights up */}
      <nav aria-label="Articles by date" className="hidden lg:block">
        <ol className="sticky top-32 space-y-2">
          {posts.map((post, i) => {
            const on = i === active;
            return (
              <li key={post.id}>
                <button type="button" onClick={() => goTo(i)} className="group flex w-full items-center gap-3 py-2.5 text-left">
                  <span
                    aria-hidden
                    className={`h-[2px] shrink-0 rounded-full transition-all duration-500 ${on ? "w-10 bg-sky-400" : "w-4 bg-[#E8DCC8]/30 group-hover:w-6"}`}
                  />
                  <span className="min-w-0">
                    <span className={`block text-sm font-semibold uppercase tracking-widest transition-colors duration-300 ${on ? "text-[#E8DCC8]" : "text-[#E8DCC8]/45"}`}>
                      {post.date}
                    </span>
                    <span className={`mt-0.5 flex items-center gap-1 text-xs transition-colors duration-300 ${on ? "text-sky-400" : "text-[#E8DCC8]/35"}`}>
                      <Clock className="h-3 w-3" aria-hidden />
                      {post.minutes} min read
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div ref={ref} className="relative min-w-0">
        {posts.map((post, i) => (
          <StackCard key={post.id} post={post} index={i} total={posts.length} progress={scrollYProgress} />
        ))}
      </div>
    </div>
  );
}

function StackCard({
  post,
  index,
  total,
  progress,
}: {
  post: StackPost;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // When later cards slide over this one, it shrinks and tilts back (the last card never moves)
  const start = index / total;
  const depth = total - 1 - index;
  const scale = useTransform(progress, [start, 1], [1, 1 - depth * 0.05]);
  const rotateX = useTransform(progress, [start, 1], [0, depth > 0 ? 10 : 0]);
  const dim = useTransform(progress, [start, 1], [0, depth > 0 ? 0.45 : 0]);
  const isLast = index === total - 1;

  return (
    <div
      className={`sticky top-24 sm:top-28 [perspective:1400px] ${isLast ? "" : "mb-[22vh]"}`}
      style={{ zIndex: index + 1 }}
    >
      <motion.div style={{ scale, rotateX, transformOrigin: "50% 0%" }} className="relative">
        <Link
          href={`/blog/${post.slug}`}
          className="group relative flex flex-col lg:grid lg:grid-cols-[150px_minmax(0,1fr)_50%] overflow-hidden rounded-[1.75rem] border border-[#E8DCC8]/15 bg-gradient-to-br from-[#182f4b] via-[#182f4b] to-[#182f4b] shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.8)]"
        >
          {/* Cover image */}
          <div className="shrink-0 lg:order-3 lg:flex lg:items-center lg:py-14 lg:pr-6">
            {/* 16:9 frame (same shape as the blog covers): the whole image is shown, nothing cut */}
            <div className="relative aspect-video w-full overflow-hidden lg:rounded-2xl bg-[#182f4b]">
            {post.imagePath && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.imagePath}
                alt=""
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 h-full w-full object-contain"
              />
            )}
            </div>
          </div>

          {/* Date strip: the article's date and read time, attached to the card */}
          <div className="flex items-center gap-4 border-b border-[#E8DCC8]/10 px-6 py-4 sm:px-8 lg:order-1 lg:flex-col lg:items-center lg:justify-center lg:gap-0 lg:border-b-0 lg:border-r lg:px-4 lg:py-14 lg:text-center">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sky-400 lg:mb-3">({String(index + 1).padStart(2, "0")})</span>
            {post.isoDate ? (
              <time dateTime={post.isoDate} className="flex items-baseline gap-2 lg:flex-col lg:items-center lg:gap-1">
                <span className="text-3xl lg:text-6xl font-black leading-none text-[#E8DCC8]">{dayOf(post.date)}</span>
                <span className="text-xs lg:text-sm font-semibold uppercase tracking-widest text-[#E8DCC8]">{monthYearOf(post.date)}</span>
              </time>
            ) : (
              <span className="text-xs font-semibold uppercase tracking-widest text-[#E8DCC8]">{post.date}</span>
            )}
            <span aria-hidden className="hidden lg:block my-5 h-px w-10 bg-sky-400/60" />
            <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-sky-300 lg:ml-0">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {post.minutes} min read
            </span>
          </div>

          {/* Text */}
          <div className="flex min-h-[200px] flex-1 flex-col p-6 sm:p-8 lg:px-10 lg:py-14 lg:order-2">
            <h2 className="text-xl sm:text-3xl lg:text-[1.7rem] font-black leading-[1.08] tracking-tight text-[#E8DCC8] !text-left line-clamp-3">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="mt-3 lg:mt-5 text-sm sm:text-base leading-relaxed text-[#E8DCC8] !text-left line-clamp-2 sm:line-clamp-3 lg:line-clamp-4">
                {post.excerpt}
              </p>
            )}

            <div className="mt-auto pt-5">
              <span className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E8DCC8]/25 px-6 py-3 text-xs sm:text-sm font-semibold uppercase leading-none tracking-widest text-[#E8DCC8]">
                Read article
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </div>
          </div>

          {/* darkens as newer cards cover it */}
          <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-[#182f4b]" />
        </Link>
      </motion.div>
    </div>
  );
}

/** "15 October 2026" → "15" and "Oct 2026" */
function dayOf(date: string) {
  return (date.split(" ")[0] ?? date).padStart(2, "0");
}
function monthYearOf(date: string) {
  const [, month = "", year = ""] = date.split(" ");
  return `${month.slice(0, 3)} ${year}`.trim();
}
