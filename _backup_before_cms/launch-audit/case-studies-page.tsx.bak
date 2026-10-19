import type { Metadata } from "next";
import Header from "@/app/components/header";
import Footer from "@/app/components/Footer";
import CaseStudyDetail from "@/app/components/CaseStudyDetail";

export const metadata: Metadata = {
  title: "Case Studies | Taglus Orthodontics",
  description: "Elevating orthodontic excellence in South America with Taglus thermoplastic aligner materials.",
};

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen w-full bg-[#020612] text-[#E8DCC8] relative overflow-hidden flex flex-col justify-between">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-sky-500/10 blur-[160px] pointer-events-none -z-10" />

      {/* Global Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pt-20">
        <CaseStudyDetail />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}