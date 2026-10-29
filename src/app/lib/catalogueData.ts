import { prisma } from "./prisma";
import { toProductView } from "./products";
import { resolveExtra, lines } from "./templateContent";
import { slugify } from "./validation";
import { ACCESSORIES_SLUG, EQUIPMENT_SLUGS } from "./catalogue";
import type { BookSheet } from "../components/SheetFlipbook";

/** Machines, rolls and resin + every accessory item, as pages for the equipment book. Never throws. */
export async function loadEquipmentBook(): Promise<BookSheet[]> {
  try {
    const rows = await prisma.product.findMany({
      where: { slug: { in: [...EQUIPMENT_SLUGS, ACCESSORIES_SLUG] }, published: true },
    });

    const products = EQUIPMENT_SLUGS.flatMap((slug): BookSheet[] => {
      const row = rows.find((r) => r.slug === slug);
      if (!row) return [];
      const p = toProductView(row);
      let image = p.imagePath;
      let overview = p.overview;
      let features = p.features;
      let properties = p.propertiesList;

      // Roll and resin pages keep extra content (from the CMS "Page content" editor); use it to fill gaps
      if (row.template === "ROLL") {
        const x = resolveExtra("ROLL", row.extra);
        image = x.heroImage || image;
        overview = overview || x.heroText;
        if (!features.length) features = x.advantages;
        if (!properties.length) properties = x.variants.map((v) => ({ label: v.name, value: v.thicknesses }));
      }
      if (row.template === "RESIN") {
        const x = resolveExtra("RESIN", row.extra);
        image = x.heroImage || image;
        overview = overview || x.heroText;
        if (!features.length) features = x.points;
        if (!properties.length) properties = x.formulations.map((f) => ({ label: f.label || "Formulation", value: f.title }));
      }

      return [
        {
          slug: p.slug,
          name: p.name,
          category: p.category,
          tagline: p.tagline,
          overview,
          imagePath: image,
          features,
          properties,
          thicknesses: p.sizes?.thicknesses ?? [],
          dimensions: [...(p.sizes?.roundDimensions ?? []), ...(p.sizes?.squareDimensions ?? [])],
          audience: p.audience,
        },
      ];
    });

    const acc = rows.find((r) => r.slug === ACCESSORIES_SLUG);
    const accessories: BookSheet[] = acc
      ? resolveExtra("ACCESSORIES", acc.extra).items.map((item) => {
          const id = slugify(item.title);
          return {
            slug: id,
            name: item.title,
            category: item.category,
            tagline: item.description.split(/(?<=\.)\s/)[0] ?? "",
            overview: item.description,
            imagePath: item.image,
            features: [],
            properties: [],
            thicknesses: [],
            dimensions: [],
            audience: [],
            bullets: lines(item.bullets),
            href: `/products/${ACCESSORIES_SLUG}#${id}`,
          };
        })
      : [];

    return [...products, ...accessories];
  } catch (e) {
    console.error("equipment book: could not load products", e);
    return [];
  }
}
