import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { requireAdminPage } from "../../lib/auth";
import { deletePost } from "../../actions/blogActions";
import { formatPostDate } from "../../lib/blog";
import { DeleteButton } from "../components/RowActions";
import { buttonPrimary, PageHeader, StatusBadge } from "../components/ui";

export const dynamic = "force-dynamic";

export default async function BlogAdminPage() {
  await requireAdminPage();
  const posts = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, slug: true, published: true, publishedAt: true },
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Blog"
        action={
          <Link href="/admin/blog/new" className={buttonPrimary}>
            + New Post
          </Link>
        }
      />

      <div className="bg-[#0b1329] border border-white/10 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#101b38] text-xs uppercase tracking-wider text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Published on</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02]">
                  <td className="px-5 py-3">
                    <Link href={`/admin/blog/${p.id}/edit`} className="font-medium text-white hover:text-[#D4AF37]">
                      {p.title}
                    </Link>
                    <div className="font-mono text-xs text-gray-500">/blog/{p.slug}</div>
                  </td>
                  <td className="px-5 py-3 text-xs">{formatPostDate(p.publishedAt) || "—"}</td>
                  <td className="px-5 py-3">
                    <StatusBadge published={p.published} />
                  </td>
                  <td className="px-5 py-3 text-right whitespace-nowrap space-x-3">
                    <Link href={`/admin/blog/${p.id}/edit`} className="text-xs text-[#D4AF37] hover:underline">
                      Edit
                    </Link>
                    {p.published && (
                      <Link href={`/blog/${p.slug}`} target="_blank" className="text-xs text-blue-400 hover:underline">
                        View
                      </Link>
                    )}
                    <DeleteButton id={p.id} itemName={p.title} action={deletePost} />
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-500">
                    No posts yet.
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
