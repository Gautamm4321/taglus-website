import { cache } from "react";
import { z } from "zod";
import type { Product } from "@prisma/client";
import { prisma } from "./prisma";
import type { ProductInput } from "./validation";

// JSON columns are checked at runtime so one bad row can never crash a page.
const featuresSchema = z.array(z.object({ title: z.string(), description: z.string().default("") }));
const propertiesSchema = z.array(z.object({ label: z.string(), value: z.string() }));
const faqsSchema = z.array(z.object({ question: z.string(), answer: z.string() }));
const sizesSchema = z.object({
  roundDimensions: z.array(z.string()).default([]),
  squareDimensions: z.array(z.string()).default([]),
  thicknesses: z.array(z.string()).default([]),
});

export function toProductView(p: Product) {
  const features = featuresSchema.safeParse(p.features);
  const propertiesList = propertiesSchema.safeParse(p.propertiesList);
  const faqs = faqsSchema.safeParse(p.faqs);
  const sizes = sizesSchema.safeParse(p.sizes);
  return {
    ...p,
    features: features.success ? features.data : [],
    propertiesList: propertiesList.success ? propertiesList.data : [],
    faqs: faqs.success ? faqs.data : [],
    // Hide the sizes section when every list is empty (avoids an empty table on the page)
    sizes:
      sizes.success &&
      (sizes.data.roundDimensions.length > 0 ||
        sizes.data.squareDimensions.length > 0 ||
        sizes.data.thicknesses.length > 0)
        ? sizes.data
        : null,
  };
}

export type ProductView = ReturnType<typeof toProductView>;

/** Shape the edit form expects. */
export function toProductInput(p: Product): ProductInput {
  const v = toProductView(p);
  return {
    name: v.name,
    slug: v.slug,
    template: v.template,
    category: v.category,
    tagline: v.tagline,
    imagePath: v.imagePath,
    overview: v.overview,
    propertiesIntro: v.propertiesIntro,
    testingNote: v.testingNote,
    features: v.features,
    propertiesList: v.propertiesList,
    sizes: v.sizes,
    faqs: v.faqs,
    metaTitle: v.metaTitle ?? "",
    metaDescription: v.metaDescription ?? "",
    published: v.published,
    sortOrder: v.sortOrder,
  };
}

/** Wrapped in cache() so generateMetadata + page share ONE database query. */
export const getProductBySlug = cache(async (slug: string) => {
  const p = await prisma.product.findUnique({ where: { slug } });
  if (!p || !p.published) return null;
  return toProductView(p);
});

/** For menus, the products listing page, homepage cards, footer links… */
export async function getPublishedProducts() {
  return prisma.product.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: { id: true, slug: true, name: true, tagline: true, category: true, template: true, imagePath: true },
  });
}

export async function getPublishedSlugs() {
  const rows = await prisma.product.findMany({ where: { published: true }, select: { slug: true } });
  return rows.map((r) => r.slug);
}

export async function getCategories() {
  const rows = await prisma.product.findMany({
    distinct: ["category"],
    select: { category: true },
    orderBy: { category: "asc" },
  });
  return rows.map((r) => r.category);
}

