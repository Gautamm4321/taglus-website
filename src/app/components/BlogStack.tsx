"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
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

  return (
    <div ref={ref} className="relative">
      {posts.map((post, i) => (
        <StackCard key={post.id} post={post} index={i} total={posts.length} progress={scrollYProgress} />
      ))}
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
          className="group relative flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_58%] overflow-hidden rounded-[1.75rem] border border-[#E8DCC8]/15 bg-gradient-to-br from-[#0d1d3f] via-[#0a1630] to-[#050b1d] shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.8)]"
        >
          {/* Cover image */}
          <div className="shrink-0 lg:order-2 lg:flex lg:items-center lg:py-14 lg:pr-6">
            {/* 16:9 frame (same shape as the blog covers): the whole image is shown, nothing cut */}
            <div className="relative aspect-video w-full overflow-hidden lg:rounded-2xl bg-[#050B17]">
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

          {/* Text */}
          <div className="flex min-h-[230px] flex-1 flex-col p-6 sm:p-8 lg:px-10 lg:py-14 lg:order-1">
            <div className="flex items-center justify-between gap-3 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#E8DCC8]">
              <span className="text-sky-400">({String(index + 1).padStart(2, "0")})</span>
              <span className="inline-flex items-center gap-2">
                {post.isoDate ? <time dateTime={post.isoDate}>{post.date}</time> : <span>{post.date}</span>}
                <span aria-hidden className="h-1 w-1 rounded-full bg-sky-400/70" />
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  {post.minutes} min
                </span>
              </span>
            </div>

            <h2 className="mt-4 lg:mt-5 text-xl sm:text-3xl lg:text-[2rem] font-black leading-[1.08] tracking-tight text-[#E8DCC8] !text-left line-clamp-3">
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
          <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-[#020612]" />
        </Link>
      </motion.div>
    </div>
  );
}
