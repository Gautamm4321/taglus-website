import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown, { type Components } from "react-markdown";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import BlogPostCard from "../../components/BlogPostCard";
import ShareButtons from "../../components/ShareButtons";
import { formatPostDate, getPostBySlug, getPublishedPostSlugs, getRelatedPosts, readingMinutes } from "../../lib/blog";
import { CONTACT, SITE_NAME, SITE_URL } from "../../lib/site";

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
  if (!post) return { title: "Post Not Found", robots: { index: false } };
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt || undefined;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title,
      description,
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      images: post.imagePath ? [post.imagePath] : undefined,
    },
    twitter: { card: "summary_large_image", title, description, images: post.imagePath ? [post.imagePath] : undefined },
  };
}

async function loadRelated(slug: string) {
  try {
    return await getRelatedPosts(slug, 3);
  } catch {
    return [];
  }
}

// Article typography. Raw HTML in markdown is NOT rendered (react-markdown default), so CMS content is safe.
const md: Components = {
  h2: ({ children }) => (
    <h2 className="scroll-mt-28 pt-6 text-2xl sm:text-[1.75rem] font-black leading-tight tracking-tight text-[#E8DCC8]">{children}</h2>
  ),
  h3: ({ children }) => <h3 className="pt-3 text-lg sm:text-xl font-bold text-sky-300">{children}</h3>,
  h4: ({ children }) => <h4 className="pt-2 text-base sm:text-lg font-bold text-[#E8DCC8]">{children}</h4>,
  p: ({ children }) => <p className="text-left text-base sm:text-[1.075rem] leading-[1.8] text-[#E8DCC8]/85">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  em: ({ children }) => <em className="text-[#E8DCC8]">{children}</em>,
  a: ({ href, children }) => {
    const external = href?.startsWith("http");
    return (
      <a
        href={href}
        className="font-medium text-sky-300 underline decoration-sky-300/40 underline-offset-4 hover:decoration-sky-300"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => <ul className="space-y-2.5 pl-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal space-y-2.5 pl-6 marker:font-bold marker:text-sky-400">{children}</ol>,
  li: ({ children }) => (
    <li className="relative pl-6 text-left text-base sm:text-[1.075rem] leading-[1.75] text-[#E8DCC8]/85 before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-sky-400 [ol>&]:pl-1 [ol>&]:before:hidden">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="rounded-r-xl border-l-4 border-sky-400 bg-sky-400/5 px-5 py-3 [&_p]:text-[#E8DCC8]">{children}</blockquote>
  ),
  img: ({ src, alt }) =>
    typeof src === "string" ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        decoding="async"
        className="my-4 w-full rounded-2xl border border-[#E8DCC8]/10 bg-[#0b1329]"
      />
    ) : null,
  hr: () => <hr className="my-6 border-[#E8DCC8]/10" />,
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await loadRelated(post.slug);
  const minutes = readingMinutes(post.content);
  const url = `${SITE_URL}/blog/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt || undefined,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    image: post.imagePath ? new URL(post.imagePath, SITE_URL).toString() : undefined,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-tuglas.png` } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020612] text-[#E8DCC8]">
      <Header />
      <main id="main-content" className="flex-1">
        <article className="relative">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }} />
          <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[120px]" />

          {/* Header */}
          <header className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 space-y-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#E8DCC8]/70 transition-colors hover:text-sky-300"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              All articles
            </Link>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-sky-400">
              {post.publishedAt && <time dateTime={post.publishedAt.toISOString()}>{formatPostDate(post.publishedAt)}</time>}
              <span aria-hidden className="h-1 w-1 rounded-full bg-sky-400/60" />
              <span className="inline-flex items-center gap-1.5 text-[#E8DCC8]/70">
                <Clock className="h-4 w-4" aria-hidden />
                {minutes} min read
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black leading-[1.1] tracking-tight text-[#E8DCC8]">{post.title}</h1>
          </header>

          {post.imagePath && (
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.imagePath}
                alt=""
                fetchPriority="high"
                decoding="async"
                className="aspect-[16/9] w-full rounded-3xl border border-[#E8DCC8]/10 object-cover shadow-[0_30px_80px_-30px_rgba(56,189,248,0.35)]"
              />
            </div>
          )}

          {/* Body */}
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-12 space-y-5">
            <ReactMarkdown components={md}>{post.content}</ReactMarkdown>
          </div>

          {/* Share + CTA */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 space-y-10">
            <div className="border-y border-[#E8DCC8]/10 py-5">
              <ShareButtons url={url} title={post.title} />
            </div>
            <aside className="rounded-3xl border border-sky-400/20 bg-gradient-to-br from-sky-500/10 via-[#0b1329] to-[#0b1329] p-7 sm:p-10 space-y-5">
              <h2 className="text-2xl font-black uppercase tracking-tight text-[#E8DCC8]">Have questions?</h2>
              <p className="text-[#E8DCC8]/80 text-left">
                Talk to the Taglus team about materials, thermoforming and the right setup for your lab.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sky-500/20 transition-all duration-200 hover:scale-[1.02]"
                >
                  Contact us
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#E8DCC8]/25 px-6 py-3 text-sm font-semibold text-[#E8DCC8] transition-colors hover:border-sky-400 hover:text-sky-300"
                >
                  Talk to us on WhatsApp
                </a>
              </div>
            </aside>
          </div>
        </article>

        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="border-t border-[#E8DCC8]/10 bg-[#050B17]/60">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 space-y-8">
              <div className="flex items-end justify-between gap-4">
                <h2 id="related-heading" className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#E8DCC8]">
                  More articles
                </h2>
                <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-400 hover:text-sky-300">
                  View all
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <BlogPostCard key={p.id} post={p} headingLevel="h3" />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
