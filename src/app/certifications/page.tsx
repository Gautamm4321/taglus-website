import type { Metadata } from "next";
import Header from "../components/header";
import CertificationsSection from "../components/CertificationsSection";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Quality & Certifications: ISO 13485:2016, CE, UKCA, TGA",
  description:
    "Taglus quality management and regulatory compliance: ISO 13485:2016 certified manufacturing with CE, UKCA, TGA, ANVISA and RUS marks for applicable products.",
  alternates: { canonical: "/certifications" },
  openGraph: { url: "/certifications" },
};

export default function CertificationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#020612] text-[#E8DCC8] relative overflow-x-hidden">
      <Header />
      <main id="main-content" className="flex-1">
        <CertificationsSection />
      </main>
      <Footer />
    </div>
  );
}
