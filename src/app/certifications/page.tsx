import type { Metadata } from "next";
import Header from "../components/header";
import CertificationsSection from "../components/CertificationsSection";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Quality & Certifications — ISO 13485:2016, CE MDR, UKCA | Taglus",
  description:
    "Taglus quality management and global certifications. Discover our ISO 13485:2016, CE MDR, UKCA, TGA, and ANVISA compliant manufacturing infrastructure.",
};

export default function CertificationsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#020612] text-[#E8DCC8] relative overflow-x-hidden">
      <Header />
      <CertificationsSection />
      <Footer />
    </main>
  );
}