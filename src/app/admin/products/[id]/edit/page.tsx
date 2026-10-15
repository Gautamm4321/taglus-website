import { notFound } from "next/navigation";
import { prisma } from "../../../../lib/prisma";
import { requireAdminPage } from "../../../../lib/auth";
import { getCategories, toProductInput } from "../../../../lib/products";
import { PageHeader } from "../../../components/ui";
import ProductForm from "../../ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminPage();
  const { id } = await params;
  const productId = Number(id);
  if (!Number.isInteger(productId)) notFound();

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id: productId } }),
    getCategories(),
  ]);
  if (!product) notFound();

  return (
    <div className="space-y-8">
      <PageHeader title={`Edit: ${product.name}`} description={`/products/${product.slug}`} />
      <ProductForm productId={product.id} initialData={toProductInput(product)} categories={categories} />
    </div>
  );
}
