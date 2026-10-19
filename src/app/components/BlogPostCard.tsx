import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { formatPostDate, type PostSummary } from "../lib/blog";

/** Article card used on the blog listing and in "More articles". */
export default function BlogPostCard({ post, headingLevel = "h2" }: { post: PostSummary; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col h-full rounded-2xl border border-[#E8DCC8]/10 bg-[#0b1329]/80 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:shadow-[0_20px_50px_-20px_rgba(56,189,248,0.35)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[#050B17]">
        {post.imagePath ? (
          // CMS images can live on any host, so a plain lazy <img> is used
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.imagePath}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-sky-500/20 to-transparent" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-wider text-sky-400">
          {post.publishedAt && <time dateTime={post.publishedAt.toISOString()}>{formatPostDate(post.publishedAt)}</time>}
          <span aria-hidden className="h-1 w-1 rounded-full bg-sky-400/60" />
          <span className="inline-flex items-center gap-1 text-[#E8DCC8]/70">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {post.minutes} min read
          </span>
        </div>
        <Heading className="text-lg sm:text-xl font-bold leading-snug text-[#E8DCC8] transition-colors group-hover:text-sky-300">
          {post.title}
        </Heading>
        {post.excerpt && <p className="text-sm leading-relaxed text-[#E8DCC8]/75 line-clamp-3 text-left">{post.excerpt}</p>}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-sky-400">
          Read article
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
