import { requireAdminPage } from "../../../lib/auth";
import { PageHeader } from "../../components/ui";
import BlogForm from "../BlogForm";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  await requireAdminPage();
  return (
    <div className="space-y-8">
      <PageHeader title="New Blog Post" />
      <BlogForm />
    </div>
  );
}
