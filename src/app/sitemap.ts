import type { MetadataRoute } from "next";
import { prisma } from "./lib/prisma";
import { SITE_URL } from "./lib/site";

// Rebuilt at most once an hour (products, posts and events come from the CMS)
export const revalidate = 3600;

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/certifications", priority: 0.7, changeFrequency: "monthly" },
  { path: "/case-studies", priority: 0.7, changeFrequency: "monthly" },
  { path: "/events", priority: 0.6, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path === "/" ? "" : r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  try {
    const [products, posts] = await Promise.all([
      prisma.product.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
      prisma.blog.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    ]);
    for (const p of products) {
      entries.push({ url: `${SITE_URL}/products/${p.slug}`, lastModified: p.updatedAt, changeFrequency: "monthly", priority: 0.9 });
    }
    for (const b of posts) {
      entries.push({ url: `${SITE_URL}/blog/${b.slug}`, lastModified: b.updatedAt, changeFrequency: "monthly", priority: 0.5 });
    }
  } catch (e) {
    // Database unreachable: still serve the static pages
    console.error("sitemap: could not load CMS content", e);
  }

  return entries;
}
