"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Icon tile that draws itself in when it scrolls into view, then gently floats. */
export default function AnimatedIcon({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay }}
      className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400"
    >
      <motion.span
        className="flex"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}
