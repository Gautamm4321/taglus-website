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
import { SITE_NAME, SITE_URL } from "../../lib/site";
import { resolveExtra } from "../../lib/templateContent";

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

/** "TAGLUS® PU FLEX" → "Taglus® PU Flex" for titles (short all-caps words like PU stay as they are) */
function niceName(name: string) {
  return name
    .split(/\s+/)
    .map((w) => (w.replace(/[^A-Za-z]/g, "").length <= 2 ? w : w.charAt(0) + w.slice(1).toLowerCase()))
    .join(" ");
}

function cleanDescription(text: string) {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length <= 158 ? t : `${t.slice(0, 155).replace(/\s+\S*$/, "")}…`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found", robots: { index: false } };

  // Titles are kept to ~60 characters (incl. " | Taglus") so search results show them in full.
  const name = niceName(product.name);
  const category = product.category ? niceName(product.category) : "";
  const generated =
    [product.tagline ? `${name}: ${product.tagline}` : "", category ? `${name} | ${category}` : "", name].find(
      (t) => t && t.length <= 52
    ) ?? name;
  // A CMS SEO title wins when it is a real title (not just "Product | Taglus")
  const cmsTitle = product.metaTitle?.trim();
  const title: Metadata["title"] =
    cmsTitle && cmsTitle.replace(/\s*\|\s*taglus\s*$/i, "").length > 25
      ? /taglus\s*$/i.test(cmsTitle)
        ? { absolute: cmsTitle }
        : cmsTitle
      : generated;
  const description = cleanDescription(product.metaDescription || product.overview);
  const ogTitle = typeof title === "string" ? `${title} | Taglus` : (title as { absolute: string }).absolute;
  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      url: `/products/${product.slug}`,
      title: ogTitle,
      description,
      images: product.imagePath ? [{ url: product.imagePath, alt: niceName(product.name) }] : undefined,
    },
  };
}

function ProductTemplate({ product }: { product: ProductView }) {
  switch (product.template) {
    case "RESIN":
      return <ResinProductTemplate content={resolveExtra("RESIN", product.extra)} />;
    case "ROLL":
      return <RollProductTemplate content={resolveExtra("ROLL", product.extra)} />;
    case "MACHINE":
      return <MachineProductTemplate product={product} />;
    case "ACCESSORIES":
      return <AccessoriesShowcaseTemplate content={resolveExtra("ACCESSORIES", product.extra)} />;
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

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: niceName(product.name),
    description: cleanDescription(product.metaDescription || product.overview),
    image: product.imagePath ? new URL(product.imagePath, SITE_URL).toString() : undefined,
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    category: product.category,
    url: `${SITE_URL}/products/${product.slug}`,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020612] text-[#E8DCC8] relative overflow-x-hidden">
      <Header />
      <main id="main-content" className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c") }}
        />
        <ProductTemplate product={product} />
      </main>
      <Footer />
    </div>
  );
}
