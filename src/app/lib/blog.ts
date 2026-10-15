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

export async function getPublishedPosts() {
  return prisma.blog.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: { id: true, slug: true, title: true, excerpt: true, imagePath: true, publishedAt: true },
  });
}

export async function getPublishedPostSlugs() {
  const rows = await prisma.blog.findMany({ where: { published: true }, select: { slug: true } });
  return rows.map((r) => r.slug);
}

export function formatPostDate(d: Date | null) {
  return d ? d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";
}
