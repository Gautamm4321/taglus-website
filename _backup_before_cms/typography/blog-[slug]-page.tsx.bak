import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import { formatPostDate, getPostBySlug, getPublishedPostSlugs } from "../../lib/blog";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    return (await getPublishedPostSlugs()).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found | Taglus" };
  const title = post.metaTitle || `${post.title} | Taglus`;
  const description = post.metaDescription || post.excerpt || undefined;
  return { title, description, openGraph: { title, description, images: post.imagePath ? [post.imagePath] : [] } };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen flex flex-col bg-[#020612] text-[#E8DCC8]">
      <Header />
      <article className="flex-1 max-w-3xl w-full mx-auto px-6 py-24 space-y-8">
        <header className="space-y-3">
          <p className="text-sm text-gray-500">{formatPostDate(post.publishedAt)}</p>
          <h1 className="text-4xl font-bold text-white">{post.title}</h1>
        </header>
        {post.imagePath && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.imagePath} alt="" className="w-full rounded-xl" />
        )}
        {/* react-markdown does not render raw HTML by default → safe from script injection */}
        <div className="space-y-4 leading-relaxed text-gray-300 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:pt-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_a]:text-[#D4AF37] [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:border-l-2 [&_blockquote]:border-[#D4AF37] [&_blockquote]:pl-4 [&_img]:rounded-lg">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
      <Footer />
    </main>
  );
}
