import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { requireAdminPage } from "../../lib/auth";
import { deleteProduct, duplicateProduct } from "../../actions/productActions";
import { TEMPLATE_LABELS } from "../../lib/validation";
import { DeleteButton, DuplicateButton } from "../components/RowActions";
import { buttonPrimary, PageHeader, StatusBadge } from "../components/ui";

export const dynamic = "force-dynamic";

export default async function ProductsAdminPage() {
  await requireAdminPage();

  const products = await prisma.product.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      name: true,
      slug: true,
      category: true,
      template: true,
      imagePath: true,
      published: true,
      updatedAt: true,
    },
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Products"
        description="Add, edit or hide products. Changes appear on the website immediately."
        action={
          <Link href="/admin/products/new" className={buttonPrimary}>
            + Add New Product
          </Link>
        }
      />

      <div className="bg-[#0b1329] border border-white/10 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#101b38] text-xs uppercase tracking-wider text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Layout</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-md bg-[#101b38] overflow-hidden">
                        {p.imagePath && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.imagePath} alt="" className="h-full w-full object-contain" />
                        )}
                      </div>
                      <div>
                        <Link href={`/admin/products/${p.id}/edit`} className="font-medium text-white hover:text-[#D4AF37]">
                          {p.name}
                        </Link>
                        <div className="font-mono text-xs text-gray-500">/products/{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs">{TEMPLATE_LABELS[p.template]}</td>
                  <td className="px-5 py-3 text-xs">{p.category}</td>
                  <td className="px-5 py-3">
                    <StatusBadge published={p.published} />
                  </td>
                  <td className="px-5 py-3 text-right whitespace-nowrap space-x-3">
                    <Link href={`/admin/products/${p.id}/edit`} className="text-xs text-[#D4AF37] hover:underline">
                      Edit
                    </Link>
                    {p.published && (
                      <Link href={`/products/${p.slug}`} target="_blank" className="text-xs text-blue-400 hover:underline">
                        View
                      </Link>
                    )}
                    <DuplicateButton id={p.id} action={duplicateProduct} editBasePath="/admin/products" />
                    <DeleteButton id={p.id} itemName={p.name} action={deleteProduct} />
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-500">
                    No products yet. Click “+ Add New Product” to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
