// Run ONCE after migrating:  npx tsx prisma/backfill-templates.ts
// Sets the new `template` column for existing products using the old slug rules.
import { PrismaClient, type ProductTemplate } from "@prisma/client";

const prisma = new PrismaClient();

function guessTemplate(slug: string, category: string): ProductTemplate {
  if (slug.includes("resin") || category.toLowerCase().includes("resin")) return "RESIN";
  if (slug.includes("roll")) return "ROLL";
  if (slug.includes("accessories")) return "ACCESSORIES";
  if (["duoform", "autoform", "cutter", "trimming"].some((k) => slug.includes(k))) return "MACHINE";
  return "SHEET";
}

async function main() {
  const products = await prisma.product.findMany({ select: { id: true, slug: true, category: true } });
  for (const p of products) {
    const template = guessTemplate(p.slug, p.category);
    await prisma.product.update({ where: { id: p.id }, data: { template } });
    console.log(`${p.slug.padEnd(40)} → ${template}`);
  }
  console.log(`Done. Updated ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
