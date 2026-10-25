"use client";

import { Fragment, useRef, type ElementType } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

/**
 * Text that "fills in" word by word as you scroll: words start faint and
 * become full colour while the block moves up the screen.
 */
export default function ScrollFillText({
  text,
  as: Tag = "p",
  className = "",
}: {
  text: string;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        // the space is a plain text node between words, so it is never collapsed
        <Fragment key={i}>
          <Word progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span aria-hidden style={{ opacity }}>
      {children}
    </motion.span>
  );
}
