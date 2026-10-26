import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "../components/header";
import Footer from "../components/Footer";
import BlogStack from "../components/BlogStack";
import JoinNetworkButton from "../components/JoinNetworkButton";
import { formatPostDate, getPublishedPosts } from "../lib/blog";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog & News: Orthodontic Materials, Made Practical",
  description:
    "News, product updates and practical insights from Taglus on aligner and retainer materials, thermoforming and digital orthodontic workflows.",
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog" },
};

async function loadPosts() {
  try {
    return await getPublishedPosts();
  } catch (e) {
    console.error("blog page: could not load posts", e);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await loadPosts();

  return (
    <div className="min-h-screen flex flex-col bg-[#020612] text-[#E8DCC8]">
      <Header />
      <main id="main-content" className="flex-1 w-full">
        {/* Intro: heading in the middle of the page */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-12 sm:pb-16 text-center animate-fade-up">
          <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold">Blog &amp; News</p>
          <h1 className="mt-4 text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.02] text-[#E8DCC8]">
            Insights from{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-300">Taglus</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#E8DCC8] max-w-xl mx-auto !text-center">
            Material science, thermoforming know-how and practical guidance for orthodontic labs and clinics.
          </p>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28 space-y-20 sm:space-y-28">
          {/* Articles: newest first, stacking as you scroll */}
          {posts.length === 0 ? (
            <p className="text-[#E8DCC8] text-center">New articles are coming soon.</p>
          ) : (
            <section aria-label="Articles" data-no-reveal>
              <BlogStack
                posts={posts.map((p) => ({
                  id: p.id,
                  slug: p.slug,
                  title: p.title,
                  excerpt: p.excerpt,
                  imagePath: p.imagePath,
                  date: formatPostDate(p.publishedAt),
                  isoDate: p.publishedAt ? p.publishedAt.toISOString() : null,
                  minutes: p.minutes,
                }))}
              />
            </section>
          )}

          {/* CTA */}
          <section className="rounded-3xl border border-sky-400/20 bg-gradient-to-br from-sky-500/10 via-[#0b1329] to-[#0b1329] p-8 sm:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">Join the Taglus Network</p>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#E8DCC8]">Never miss an insight</h2>
              <p className="text-[#E8DCC8]/80 text-left">
                Get new articles, product updates and exclusive offers for your orthodontic workflow.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <JoinNetworkButton className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sky-500/20 transition-all duration-200 hover:scale-[1.02]">
                Join the network
                <ArrowRight className="h-4 w-4" aria-hidden />
              </JoinNetworkButton>
              <Link
                href="/contact"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-[#E8DCC8]/25 px-6 py-3 text-sm font-semibold text-[#E8DCC8] transition-colors hover:border-sky-400 hover:text-sky-300"
              >
                Ask our team
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
