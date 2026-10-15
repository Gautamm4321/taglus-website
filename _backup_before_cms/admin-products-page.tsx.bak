import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { deleteProduct } from "../../actions/productActions";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#050B17] text-white p-8 sm:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#E8DCC8]">Taglus CMS Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">Manage database records directly for live display.</p>
          </div>
          <Link
            href="/admin/products/new"
            className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#c29f2f] text-black font-semibold rounded-lg transition-colors text-sm shadow-md"
          >
            + Add New Product
          </Link>
        </div>

        {/* Product Table */}
        <div className="bg-[#0b1329] border border-white/10 rounded-xl overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Products ({products.length})</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-[#101b38] text-xs uppercase tracking-wider text-gray-400 border-b border-white/10">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Slug</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-mono text-gray-400">{p.id}</td>
                    <td className="px-6 py-4 font-medium text-white">{p.name}</td>
                    <td className="px-6 py-4 font-mono text-gray-400">/products/{p.slug}</td>
                    <td className="px-6 py-4">{p.category}</td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <Link
                        href={`/products/${p.slug}`}
                        target="_blank"
                        className="text-xs text-blue-400 hover:underline"
                      >
                        View Live
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deleteProduct(p.id);
                        }}
                        className="inline-block"
                      >
                        <button
                          type="submit"
                          className="text-xs text-red-400 hover:underline"
                        >
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">
                      No products found. Click "+ Add New Product" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}