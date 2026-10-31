import type { Metadata } from "next";
import Header from "../components/header";
import CatalogueFlipbook from "../components/CatalogueFlipbook";

export const metadata: Metadata = {
  title: "Product Catalogue",
  description:
    "Flip through the Taglus product catalogue: aligner and retainer sheets, 3D printing resins, thermoforming machines, trimming systems and orthodontic accessories.",
  alternates: { canonical: "/catalogue" },
  openGraph: { url: "/catalogue" },
};

/** The pages of /Taglus-Product-Catalogue.pdf, saved as images in public/catalogue (page-01 … page-20). */
const PAGE_COUNT = 20;
const PAGES = Array.from({ length: PAGE_COUNT }, (_, i) => `/catalogue/page-${String(i + 1).padStart(2, "0")}.webp`);

export default function CataloguePage() {
  return (
    // One screen, no scrolling: the header is fixed (80px), the book fills the rest
    <div data-lenis-prevent className="h-[100dvh] overflow-hidden overscroll-none flex flex-col bg-[#020612] text-[#E8DCC8]">
      <Header />
      <main id="main-content" className="flex min-h-0 flex-1 flex-col pt-20">
        <h1 className="sr-only">Taglus Product Catalogue</h1>
        <section data-no-reveal className="flex min-h-0 w-full max-w-[1100px] flex-1 flex-col mx-auto px-3 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6">
          <CatalogueFlipbook pages={PAGES} />
        </section>
      </main>
    </div>
  );
}
