import type { Metadata } from "next";
import Header from "../components/header";
import AboutHero from "../components/AboutHero";
import AboutScrollStory from "../components/AboutScrollStory";
import HomeStory from "../components/HomeStory";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "About Us: Digital Orthodontic Materials & Equipment",
  description:
    "Taglus makes aligner and retainer sheets, thermoforming machines, 3D printing resins and orthodontic accessories: one partner for the full digital workflow.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <AboutHero />
        <HomeStory />
        <AboutScrollStory />
      </main>
      <Footer />
    </div>
  );
}
