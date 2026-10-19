"use client";

import { useEffect } from "react";
import Link from "next/link";

// Shown if a page fails to render (for example the database is briefly unreachable)
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center px-4 py-24 bg-[#020612] text-[#E8DCC8]">
      <div className="max-w-xl text-center space-y-5">
        <p className="text-xs sm:text-sm uppercase tracking-widest text-sky-400 font-semibold">Something went wrong</p>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">We couldn&apos;t load this page</h1>
        <p className="text-base text-center">Please try again in a moment. If the problem continues, contact us at info@taglus.com.</p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] text-white text-sm font-semibold"
          >
            Try again
          </button>
          <Link href="/" className="px-6 py-3 rounded-full border border-[#E8DCC8]/30 text-sm font-semibold hover:border-sky-400">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
