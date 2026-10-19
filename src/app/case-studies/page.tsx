import type { Metadata } from "next";
import Header from "@/app/components/header";
import Footer from "@/app/components/Footer";
import CaseStudyDetail from "@/app/components/CaseStudyDetail";

export const metadata: Metadata = {
  title: "Case Studies: Clinical Results with Taglus Aligner Sheets",
  description:
    "Clinical case studies showing how orthodontists and labs use Taglus thermoplastic aligner materials for predictable, in-house aligner treatment.",
  alternates: { canonical: "/case-studies" },
  openGraph: { url: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen w-full bg-[#020612] text-[#E8DCC8] relative overflow-hidden flex flex-col justify-between">
      {/* Ambient background glow */}
      <div aria-hidden="true" className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(1000px,100vw)] h-[600px] bg-sky-500/10 blur-[160px] pointer-events-none -z-10" />

      <Header />

      <main id="main-content" className="flex-1 pt-20">
        <CaseStudyDetail />
      </main>

      <Footer />
    </div>
  );
}
