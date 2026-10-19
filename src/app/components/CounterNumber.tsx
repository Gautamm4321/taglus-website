"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

/**
 * Counts up when scrolled into view. The server-rendered HTML already contains the final
 * number, so search engines and no-JS visitors see the real value (not "0").
 */
export default function CounterNumber({
  value,
  suffix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = `${Math.floor(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [isInView, value, suffix]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
