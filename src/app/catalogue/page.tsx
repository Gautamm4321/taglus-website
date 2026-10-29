import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "../components/header";
import SheetFlipbook, { type BookSheet } from "../components/SheetFlipbook";
import { prisma } from "../lib/prisma";
import { toProductView } from "../lib/products";
import { BOOK_SLUGS } from "../lib/catalogue";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Sheet Catalogue: Aligner & Retainer Sheets",
  description:
    "Flip through the Taglus sheet catalogue: PU Flex, Premium, Ultra, TUFF, Hard & Soft, Soft and Smiles, with features and technical details.",
  alternates: { canonical: "/catalogue" },
  openGraph: { url: "/catalogue" },
};


async function loadSheets(): Promise<BookSheet[]> {
  try {
    const rows = await prisma.product.findMany({ where: { slug: { in: BOOK_SLUGS }, published: true } });
    return BOOK_SLUGS.flatMap((slug) => {
      const row = rows.find((r) => r.slug === slug);
      if (!row) return [];
      const p = toProductView(row);
      return [
        {
          slug: p.slug,
          name: p.name,
          category: p.category,
          tagline: p.tagline,
          overview: p.overview,
          imagePath: p.imagePath,
          features: p.features,
          properties: p.propertiesList,
          thicknesses: p.sizes?.thicknesses ?? [],
          dimensions: [...(p.sizes?.roundDimensions ?? []), ...(p.sizes?.squareDimensions ?? [])],
          audience: p.audience,
        },
      ];
    });
  } catch (e) {
    console.error("catalogue: could not load sheets", e);
    return [];
  }
}

export default async function CataloguePage() {
  const sheets = await loadSheets();

  return (
    // One screen, no scrolling: the header is fixed (80px), the book fills the rest
    <div data-lenis-prevent className="h-[100dvh] overflow-hidden overscroll-none flex flex-col bg-[#020612] text-[#E8DCC8]">
      <Header />
      <main id="main-content" className="flex min-h-0 flex-1 flex-col pt-20">
        <h1 className="sr-only">Taglus Sheet Catalogue</h1>
        <section data-no-reveal className="flex min-h-0 w-full max-w-[1100px] flex-1 flex-col mx-auto px-3 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6">
          {sheets.length === 0 ? (
            <p className="m-auto text-center text-[#E8DCC8]">The catalogue is being updated. Please check back soon.</p>
          ) : (
            <Suspense fallback={null}>
              <SheetFlipbook sheets={sheets} />
            </Suspense>
          )}
        </section>
      </main>
    </div>
  );
}
