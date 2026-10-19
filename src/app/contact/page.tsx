import type { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us: Product Enquiries & Distributor Partnerships",
  description:
    "Contact Taglus in Mumbai about aligner sheets, resins and thermoforming machines, distributor partnerships or clinical support. Call or WhatsApp +91 99309 05047.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full bg-[#020612] text-[#E8DCC8] flex flex-col justify-between relative overflow-hidden">
      {/* Background Ambience Glow */}
      <div aria-hidden="true" className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(900px,100vw)] h-[500px] bg-sky-500/10 blur-[150px] pointer-events-none -z-10" />

      <Header />

      <main id="main-content" className="flex-1 w-full pt-28 sm:pt-36 pb-20">
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
