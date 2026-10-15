import { notFound } from "next/navigation";
import { prisma } from "../../../../lib/prisma";
import { requireAdminPage } from "../../../../lib/auth";
import { toBlogInput } from "../../../../lib/blog";
import { PageHeader } from "../../../components/ui";
import BlogForm from "../../BlogForm";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminPage();
  const { id } = await params;
  const postId = Number(id);
  if (!Number.isInteger(postId)) notFound();

  const post = await prisma.blog.findUnique({ where: { id: postId } });
  if (!post) notFound();

  return (
    <div className="space-y-8">
      <PageHeader title={`Edit: ${post.title}`} />
      <BlogForm postId={post.id} initialData={toBlogInput(post)} />
    </div>
  );
}
