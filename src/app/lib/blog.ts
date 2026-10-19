import { cache } from "react";
import type { Blog } from "@prisma/client";
import { prisma } from "./prisma";
import type { BlogInput } from "./validation";

export function toBlogInput(b: Blog): BlogInput {
  return {
    title: b.title,
    slug: b.slug,
    excerpt: b.excerpt ?? "",
    content: b.content,
    imagePath: b.imagePath ?? "",
    metaTitle: b.metaTitle ?? "",
    metaDescription: b.metaDescription ?? "",
    published: b.published,
  };
}

export const getPostBySlug = cache(async (slug: string) => {
  const post = await prisma.blog.findUnique({ where: { slug } });
  return post && post.published ? post : null;
});

/** Rough reading time for an article (≈200 words per minute, minimum 1). */
export function readingMinutes(markdown: string) {
  const words = markdown.replace(/!\[[^\]]*\]\([^)]*\)/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export async function getPublishedPosts() {
  const rows = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: { id: true, slug: true, title: true, excerpt: true, imagePath: true, publishedAt: true, content: true },
  });
  return rows.map(({ content, ...post }) => ({ ...post, minutes: readingMinutes(content) }));
}

export type PostSummary = Awaited<ReturnType<typeof getPublishedPosts>>[number];

/** Latest published posts other than the one being read. */
export async function getRelatedPosts(excludeSlug: string, take = 3) {
  const rows = await prisma.blog.findMany({
    where: { published: true, slug: { not: excludeSlug } },
    orderBy: { publishedAt: "desc" },
    take,
    select: { id: true, slug: true, title: true, excerpt: true, imagePath: true, publishedAt: true, content: true },
  });
  return rows.map(({ content, ...post }) => ({ ...post, minutes: readingMinutes(content) }));
}

export async function getPublishedPostSlugs() {
  const rows = await prisma.blog.findMany({ where: { published: true }, select: { slug: true } });
  return rows.map((r) => r.slug);
}

export function formatPostDate(d: Date | null) {
  return d ? d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";
}
