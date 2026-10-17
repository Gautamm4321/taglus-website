import Header from "../components/header";
import AboutHero from "../components/AboutHero";
import AboutScrollStory from "../components/AboutScrollStory";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Reusable Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        <AboutHero />
        <AboutScrollStory />
      </main>

      {/* Reusable Footer */}
      <Footer />
    </div>
  );
}