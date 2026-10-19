import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "./components/header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#020612] text-[#E8DCC8]">
      <Header />
      <main id="main-content" className="flex-1 flex items-center justify-center px-4 pt-28 pb-20">
        <div className="max-w-xl text-center space-y-5">
          <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold">Error 404</p>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">Page not found</h1>
          <p className="text-base sm:text-lg text-center">
            The page you are looking for doesn&apos;t exist or has moved. Explore our products or get in touch with our team.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] text-white text-sm font-semibold"
            >
              Back to home <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#E8DCC8]/30 text-sm font-semibold hover:border-sky-400"
            >
              Contact us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
