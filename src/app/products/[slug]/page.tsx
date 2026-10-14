import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import SheetProductTemplate from "../../components/SheetProductTemplate";
import ResinProductTemplate from "../../components/ResinProductTemplate";
import RollProductTemplate from "../../components/RollProductTemplate";
import AccessoriesShowcaseTemplate from "../../components/AccessoriesShowcaseTemplate";
import { prisma } from "../../lib/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    select: { name: true, overview: true },
  });

  if (!product) {
    return {
      title: "Product Not Found | Taglus",
    };
  }

  return {
    title: `${product.name} — Superior Aligner & Retainer Polymers | Taglus`,
    description: product.overview,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 1. Fetch live product from MySQL database
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  // 2. Return 404 if product does not exist
  if (!product) {
    notFound();
  }

  // 3. Format JSON columns to match component prop expectations
  const formattedProduct = {
    ...product,
    features: (product.features as Array<{ title: string; description: string }>) || [],
    propertiesList: (product.propertiesList as Array<{ label: string; value: string }>) || [],
    sizes: (product.sizes as {
      roundDimensions: string[];
      squareDimensions: string[];
      thicknesses: string[];
    }) || null,
    faqs: (product.faqs as Array<{ question: string; answer: string }>) || [],
  };

  // 4. Routing condition: Resin vs Roll vs Accessories vs Sheet products
  const isResinProduct =
    formattedProduct.slug.includes("resin") ||
    formattedProduct.category?.toLowerCase().includes("resin");

  const isRollProduct =
    formattedProduct.slug.includes("roll");

  const isAccessories =
    formattedProduct.slug.includes("accessories");

  return (
    <main className="min-h-screen flex flex-col bg-[#020612] text-[#E8DCC8] relative overflow-x-hidden">
      <Header />
      {isResinProduct ? (
        <ResinProductTemplate product={formattedProduct} />
      ) : isRollProduct ? (
        <RollProductTemplate product={formattedProduct} />
      ) : isAccessories ? (
        <AccessoriesShowcaseTemplate />
      ) : (
        <SheetProductTemplate product={formattedProduct} />
      )}
      <Footer />
    </main>
  );
}