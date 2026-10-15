import { requireAdminPage } from "../../../lib/auth";
import { getCategories } from "../../../lib/products";
import { PageHeader } from "../../components/ui";
import ProductForm from "../ProductForm";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  await requireAdminPage();
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <PageHeader title="Add New Product" description="Fields marked * are required." />
      <ProductForm categories={categories} />
    </div>
  );
}
