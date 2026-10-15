"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { savePost } from "../../actions/blogActions";
import { slugify, type BlogInput } from "../../lib/validation";
import { buttonPrimary, buttonSecondary, ErrorBanner, Field, inputClass, Section } from "../components/ui";
import ImageUpload from "../components/ImageUpload";

const EMPTY_POST: BlogInput = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  imagePath: "",
  metaTitle: "",
  metaDescription: "",
  published: false,
};

export default function BlogForm({ postId, initialData }: { postId?: number; initialData?: BlogInput }) {
  const router = useRouter();
  const isEdit = postId !== undefined;
  const [data, setData] = useState<BlogInput>(initialData ?? EMPTY_POST);
  const [slugEdited, setSlugEdited] = useState(isEdit);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fe, setFe] = useState<Record<string, string>>({});

  const set = <K extends keyof BlogInput>(key: K, value: BlogInput[K]) => setData((d) => ({ ...d, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setFe({});
    try {
      const res = await savePost(postId ?? null, data);
      if (res.ok) {
        router.push("/admin/blog");
        router.refresh();
        return;
      }
      setError(res.error);
      setFe(res.fieldErrors ?? {});
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Could not save. Your login may have expired — log in again and retry.");
    } finally {
      setSaving(false);
    }
  }

  const tabBtn = (t: "write" | "preview", label: string) => (
    <button
      type="button"
      onClick={() => setTab(t)}
      className={`px-3 py-1.5 text-sm rounded-md ${tab === t ? "bg-[#D4AF37]/15 text-[#D4AF37]" : "text-gray-400 hover:bg-white/5"}`}
    >
      {label}
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ErrorBanner message={error} />

      <Section title="Post">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Title" required error={fe.title}>
            <input
              type="text"
              value={data.title}
              onChange={(e) =>
                setData((d) => ({ ...d, title: e.target.value, slug: slugEdited ? d.slug : slugify(e.target.value) }))
              }
              className={inputClass}
            />
          </Field>
          <Field label="URL slug" required error={fe.slug} hint={`/blog/${data.slug || "…"}`}>
            <input
              type="text"
              value={data.slug}
              onChange={(e) => {
                setSlugEdited(true);
                set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
              }}
              className={`${inputClass} font-mono`}
            />
          </Field>
        </div>

        <Field label="Cover image" error={fe.imagePath}>
          <ImageUpload value={data.imagePath ?? ""} onChange={(url) => set("imagePath", url)} folder="blog" />
        </Field>

        <Field label="Short summary" error={fe.excerpt} hint="Shown on the blog listing page.">
          <textarea rows={2} value={data.excerpt ?? ""} onChange={(e) => set("excerpt", e.target.value)} className={inputClass} />
        </Field>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">
              Content <span className="text-[#D4AF37]">*</span>
            </span>
            <div className="flex gap-1">
              {tabBtn("write", "Write")}
              {tabBtn("preview", "Preview")}
            </div>
          </div>
          {tab === "write" ? (
            <textarea
              rows={18}
              value={data.content}
              onChange={(e) => set("content", e.target.value)}
              className={`${inputClass} font-mono text-sm`}
              placeholder={"## Heading\n\nNormal paragraph with **bold** and a [link](https://taglus.com).\n\n- bullet one\n- bullet two"}
            />
          ) : (
            <div className="min-h-[300px] rounded-lg border border-white/10 bg-[#101b38] p-5 text-gray-200 space-y-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:font-semibold [&_a]:text-[#D4AF37] [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5">
              <ReactMarkdown>{data.content || "_Nothing to preview yet._"}</ReactMarkdown>
            </div>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Formatting: <code>## Heading</code>, <code>**bold**</code>, <code>- list item</code>, <code>[text](https://link)</code>
          </p>
          {fe.content && <p className="mt-1 text-xs text-red-400">{fe.content}</p>}
        </div>
      </Section>

      <Section title="SEO & visibility">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="SEO title" error={fe.metaTitle} hint="Optional">
            <input type="text" value={data.metaTitle ?? ""} onChange={(e) => set("metaTitle", e.target.value)} className={inputClass} />
          </Field>
          <Field label="SEO description" error={fe.metaDescription} hint="Optional">
            <input
              type="text"
              value={data.metaDescription ?? ""}
              onChange={(e) => set("metaDescription", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={data.published}
            onChange={(e) => set("published", e.target.checked)}
            className="h-4 w-4 accent-[#D4AF37]"
          />
          Published (visible on the website)
        </label>
      </Section>

      <div className="flex justify-end gap-3">
        <Link href="/admin/blog" className={buttonSecondary}>
          Cancel
        </Link>
        <button type="submit" disabled={saving} className={buttonPrimary}>
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create post"}
        </button>
      </div>
    </form>
  );
}
