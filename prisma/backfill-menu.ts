// Run ONCE after `npx prisma db push`:  npx tsx prisma/backfill-menu.ts
// Puts the existing products into the header menu exactly as it looked before.
import { PrismaClient, type MenuGroup } from "@prisma/client";

const prisma = new PrismaClient();

const MENU: Record<string, { group: MenuGroup | null; title?: string; desc?: string; order: number }> = {
  "taglus-pu-flex": { group: "ALIGNER", title: "Taglus PU Flex", desc: "Polyurethane for demanding cases", order: 10 },
  "taglus-premium": { group: "ALIGNER", title: "Taglus Premium", desc: "High-clarity PET-G", order: 20 },
  "taglus-tuff": { group: "RETAINER", title: "Taglus TUFF", desc: "Break-resistant retainer sheet", order: 10 },
  "taglus-duoform": { group: "THERMOFORMING", title: "Taglus Duoform", desc: "Pressure former, sub-second heat-up", order: 10 },
  "taglus-autoform": { group: "THERMOFORMING", title: "Taglus Autoform", desc: "Automated sheet forming", order: 20 },
  "taglus-autoform-roll": { group: "THERMOFORMING", title: "Taglus Autoform Roll", desc: "Roll-fed forming for production volume", order: 30 },
  "taglus-model-resin": { group: "PRINTING", title: "Model Resin", desc: "Accurate dental models for thermoforming", order: 10 },
  // Accessories are already linked section-by-section in the menu, so the page itself isn't listed.
  "taglus-orthodontic-accessories": { group: null, order: 10 },
};

async function main() {
  for (const [slug, m] of Object.entries(MENU)) {
    const res = await prisma.product.updateMany({
      where: { slug },
      data: { menuGroup: m.group, menuTitle: m.title ?? null, menuDescription: m.desc ?? null, sortOrder: m.order },
    });
    console.log(`${slug.padEnd(34)} → ${(m.group ?? "not in menu").padEnd(14)} ${res.count ? "✓" : "(not found)"}`);
  }
  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
