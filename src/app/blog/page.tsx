import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import Header from "../components/header";
import Footer from "../components/Footer";
import BlogPostCard from "../components/BlogPostCard";
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
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen flex flex-col bg-[#020612] text-[#E8DCC8]">
      <Header />
      <main id="main-content" className="flex-1 w-full">
        {/* Intro */}
        <section className="relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[120px]" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-10 sm:pb-14 space-y-4">
            <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold">Blog &amp; News</p>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#E8DCC8]">Insights from Taglus</h1>
            <p className="text-base sm:text-lg text-[#E8DCC8]/80 max-w-2xl text-left">
              Material science, thermoforming know-how and practical guidance for orthodontic labs and clinics.
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28 space-y-14 sm:space-y-20">
          {!featured ? (
            <p className="text-[#E8DCC8] text-left">New articles are coming soon.</p>
          ) : (
            <>
              {/* Featured (latest) article */}
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid overflow-hidden rounded-3xl border border-[#E8DCC8]/10 bg-[#0b1329]/80 transition-colors hover:border-sky-400/40 lg:grid-cols-12"
              >
                <div className="relative aspect-[16/9] lg:aspect-auto lg:col-span-7 overflow-hidden bg-[#050B17]">
                  {featured.imagePath && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={featured.imagePath}
                      alt=""
                      fetchPriority="high"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] lg:absolute lg:inset-0"
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center gap-4 p-6 sm:p-10 lg:col-span-5">
                  <span className="inline-flex w-fit items-center rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-sky-300">
                    Latest article
                  </span>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-wider text-sky-400">
                    {featured.publishedAt && (
                      <time dateTime={featured.publishedAt.toISOString()}>{formatPostDate(featured.publishedAt)}</time>
                    )}
                    <span aria-hidden className="h-1 w-1 rounded-full bg-sky-400/60" />
                    <span className="inline-flex items-center gap-1 text-[#E8DCC8]/70">
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      {featured.minutes} min read
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight text-[#E8DCC8] transition-colors group-hover:text-sky-300">
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p className="text-sm sm:text-base leading-relaxed text-[#E8DCC8]/75 text-left line-clamp-4">{featured.excerpt}</p>
                  )}
                  <span className="inline-flex items-center gap-2 pt-2 text-sm font-semibold text-sky-400">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </Link>

              {rest.length > 0 && (
                <section aria-labelledby="more-articles" className="space-y-8">
                  <div className="flex items-end justify-between gap-4 border-b border-[#E8DCC8]/10 pb-4">
                    <h2 id="more-articles" className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#E8DCC8]">
                      More articles
                    </h2>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#E8DCC8]/60">
                      {posts.length} articles
                    </span>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {rest.map((p) => (
                      <BlogPostCard key={p.id} post={p} headingLevel="h3" />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {/* CTA */}
          <section className="rounded-3xl border border-sky-400/20 bg-gradient-to-br from-sky-500/10 via-[#0b1329] to-[#0b1329] p-8 sm:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#E8DCC8]">Have a material question?</h2>
              <p className="text-[#E8DCC8]/80 text-left">
                Our team helps labs choose the right sheets, resins and equipment for their workflow.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sky-500/20 transition-all duration-200 hover:scale-[1.02]"
            >
              Talk to our team
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
