import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import SheetProductTemplate from "../../components/SheetProductTemplate";
import { SHEETS_DATA } from "../../data/sheetsData";

export async function generateStaticParams() {
  return Object.keys(SHEETS_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = SHEETS_DATA[slug];

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
  const product = SHEETS_DATA[slug];

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#020612] text-[#E8DCC8] relative overflow-x-hidden">
      <Header />
      <SheetProductTemplate product={product} />
      <Footer />
    </main>
  );
}