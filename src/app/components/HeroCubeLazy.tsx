"use client";

import dynamic from "next/dynamic";

// three.js is large: load the 3D cube in its own chunk after the page is interactive,
// so it never blocks the first paint or the hero text (LCP).
const HeroCube = dynamic(() => import("./HeroCube"), { ssr: false });

export default function HeroCubeLazy({ className }: { className?: string }) {
  return <HeroCube className={className} />;
}
