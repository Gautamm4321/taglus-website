"use client";

import type { ReactNode } from "react";

/** Opens the "Join the Taglus Network" pop-up from anywhere on the site. */
export default function JoinNetworkButton({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("open-taglus-network"))} className={className}>
      {children}
    </button>
  );
}
