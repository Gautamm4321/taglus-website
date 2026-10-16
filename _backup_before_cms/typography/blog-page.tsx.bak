import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/Footer";
import { formatPostDate, getPublishedPosts } from "../lib/blog";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog | Taglus",
  description: "News, research and clinical insights from Taglus.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="min-h-screen flex flex-col bg-[#020612] text-[#E8DCC8]">
      <Header />
      <div className="flex-1 max-w-6xl w-full mx-auto px-6 py-24 space-y-10">
        <h1 className="text-4xl font-bold">Blog</h1>
        {posts.length === 0 ? (
          <p className="text-gray-400">No posts yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="group rounded-xl border border-white/10 bg-[#0b1329] overflow-hidden hover:border-[#D4AF37]/50 transition-colors"
              >
                {p.imagePath && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.imagePath} alt="" className="h-44 w-full object-cover" />
                )}
                <div className="p-5 space-y-2">
                  <p className="text-xs text-gray-500">{formatPostDate(p.publishedAt)}</p>
                  <h2 className="text-lg font-semibold text-white group-hover:text-[#D4AF37]">{p.title}</h2>
                  {p.excerpt && <p className="text-sm text-gray-400 line-clamp-3">{p.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
