import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "../../components/header";
import SheetFlipbook from "../../components/SheetFlipbook";
import { loadEquipmentBook } from "../../lib/catalogueData";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Equipment & Accessories Catalogue",
  description:
    "Flip through the Taglus equipment and accessories catalogue: Duoform, Autoform, Autoform Roll, Model Resin, retainer boxes, chewies, pillow boxes, articulators and impression trays.",
  alternates: { canonical: "/catalogue/equipment" },
  openGraph: { url: "/catalogue/equipment" },
};

export default async function EquipmentCataloguePage() {
  const items = await loadEquipmentBook();

  return (
    // One screen, no scrolling: the header is fixed (80px), the book fills the rest
    <div data-lenis-prevent className="h-[100dvh] overflow-hidden overscroll-none flex flex-col bg-[#020612] text-[#E8DCC8]">
      <Header />
      <main id="main-content" className="flex min-h-0 flex-1 flex-col pt-20">
        <h1 className="sr-only">Taglus Equipment &amp; Accessories Catalogue</h1>
        <section data-no-reveal className="flex min-h-0 w-full max-w-[1100px] flex-1 flex-col mx-auto px-3 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6">
          {items.length === 0 ? (
            <p className="m-auto text-center text-[#E8DCC8]">The catalogue is being updated. Please check back soon.</p>
          ) : (
            <Suspense fallback={null}>
              <SheetFlipbook sheets={items} />
            </Suspense>
          )}
        </section>
      </main>
    </div>
  );
}
