"use client";

import { useEffect, useState } from "react";

/** Live days / hours / minutes / seconds until a date (shows nothing once it has started). */
export default function Countdown({ to, className = "" }: { to: string; className?: string }) {
  const target = new Date(to).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const first = setTimeout(() => setNow(Date.now()), 0);
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      clearTimeout(first);
      clearInterval(t);
    };
  }, []);

  // Before hydration render a stable placeholder (avoids server/client time mismatch)
  const diff = now === null ? null : Math.max(0, target - now);
  if (diff === 0) return null;

  const parts = [
    { label: "Days", value: diff === null ? "--" : Math.floor(diff / 864e5) },
    { label: "Hours", value: diff === null ? "--" : Math.floor((diff / 36e5) % 24) },
    { label: "Min", value: diff === null ? "--" : Math.floor((diff / 6e4) % 60) },
    { label: "Sec", value: diff === null ? "--" : Math.floor((diff / 1e3) % 60) },
  ];

  return (
    <div className={`flex gap-2.5 sm:gap-3 ${className}`} role="timer" aria-label="Time until the event starts">
      {parts.map((p) => (
        <div key={p.label} className="min-w-[64px] sm:min-w-[74px] rounded-2xl border border-[#E8DCC8]/15 bg-[#030919]/80 px-3 py-3 text-center">
          <p className="text-2xl sm:text-3xl font-black tabular-nums text-[#E8DCC8]">
            {typeof p.value === "number" ? String(p.value).padStart(2, "0") : p.value}
          </p>
          <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-sky-400">{p.label}</p>
        </div>
      ))}
    </div>
  );
}
