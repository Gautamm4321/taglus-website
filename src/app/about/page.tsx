import Header from "../components/header";
import AboutHero from "../components/AboutHero";
import AboutWhyChoose from "../components/AboutWhyChoose";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Reusable Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        <AboutHero />
        <AboutWhyChoose />
      </main>

      {/* Reusable Footer */}
      <Footer />
    </div>
  );
}