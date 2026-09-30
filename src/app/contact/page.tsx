import type { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us | Taglus Orthodontics",
  description: "Get in touch with Taglus for dental materials, distributor inquiries, and global clinical support.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full bg-[#020612] text-[#E8DCC8] flex flex-col justify-between relative overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-sky-500/10 blur-[150px] pointer-events-none -z-10" />

      {/* Navigation Header */}
      <Header />

      {/* Main Contact Content */}
      <main className="flex-1 w-full pt-28 sm:pt-36 pb-20">
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}