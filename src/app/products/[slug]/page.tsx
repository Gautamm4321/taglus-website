import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import SheetProductTemplate from "../../components/SheetProductTemplate";
import ResinProductTemplate from "../../components/ResinProductTemplate";
import RollProductTemplate from "../../components/RollProductTemplate";
import AccessoriesShowcaseTemplate from "../../components/AccessoriesShowcaseTemplate";
import MachineProductTemplate from "../../components/MachineProductTemplate";
import { getProductBySlug, getPublishedSlugs, type ProductView } from "../../lib/products";

// Pages are cached (fast) and refreshed instantly whenever the CMS saves (revalidatePath).
// The hourly revalidate is just a safety net.
export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    return (await getPublishedSlugs()).map((slug) => ({ slug }));
  } catch {
    return []; // DB unreachable at build time → pages are rendered on first visit instead
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found | Taglus" };

  const title = product.metaTitle || `${product.name} | Taglus`;
  const description = product.metaDescription || product.overview.slice(0, 160);
  return {
    title,
    description,
    openGraph: { title, description, images: product.imagePath ? [product.imagePath] : [] },
  };
}

function ProductTemplate({ product }: { product: ProductView }) {
  switch (product.template) {
    case "RESIN":
      return <ResinProductTemplate product={product} />;
    case "ROLL":
      return <RollProductTemplate product={product} />;
    case "MACHINE":
      return <MachineProductTemplate product={product} />;
    case "ACCESSORIES":
      // TODO: make AccessoriesShowcaseTemplate accept `product` and render its
      // fields — right now it is hardcoded, so CMS edits don't show up there.
      return <AccessoriesShowcaseTemplate />;
    case "SHEET":
    default:
      // SheetProductTemplate expects `sizes` to be undefined (not null) when missing
      return <SheetProductTemplate product={{ ...product, sizes: product.sizes ?? undefined }} />;
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug); // same cached call as generateMetadata → 1 DB query
  if (!product) notFound(); // also hides Draft products

  return (
    <main className="min-h-screen flex flex-col bg-[#020612] text-[#E8DCC8] relative overflow-x-hidden">
      <Header />
      <ProductTemplate product={product} />
      <Footer />
    </main>
  );
}
