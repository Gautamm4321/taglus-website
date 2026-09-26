"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

interface SafeProductImageProps {
  src: string;
  alt: string;
  label?: string; // shown in the fallback state, e.g. product name
  className?: string;
}

/**
 * Drop-in replacement for next/image when the file behind `src` might
 * not exist yet (client hasn't handed over final product photography).
 * On load error it shows a clean placeholder instead of a broken icon
 * or a blank box, so the layout never looks "broken" to a client demo.
 */
export default function SafeProductImage({ src, alt, label, className }: SafeProductImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#E8DCC8]/40 bg-white/[0.02] rounded-xl">
        <ImageOff size={28} strokeWidth={1.5} />
        <span className="text-[10px] font-mono uppercase tracking-widest text-center px-3">
          {label ?? alt} — photo pending
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}