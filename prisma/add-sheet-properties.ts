// Run ONCE:  npx tsx prisma/add-sheet-properties.ts
// Adds a "Technical Properties" table (and the matching button) to Ultra, Hard & Soft, Soft and Smiles.
// Only fills products whose properties list is still empty, so edits made in the CMS are never overwritten.
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const PROPS: Record<string, { intro: string; list: { label: string; value: string }[] }> = {
  "taglus-ultra": {
    intro:
      "A high-force aligner sheet for demanding orthodontic cases: higher, sustained forces with high optical clarity and precise thermoforming adaptation.",
    list: [
      { label: "Material Type", value: "High-force aligner sheet" },
      { label: "Thickness", value: "0.762 mm · 1.0 mm" },
      { label: "Optical Clarity", value: "High, throughout the wear cycle" },
      { label: "Certification", value: "CE & TGA" },
      { label: "BPA", value: "BPA-free" },
      { label: "Availability", value: "Asia Pacific, Europe & South America" },
    ],
  },
  "taglus-hard-and-soft": {
    intro:
      "A factory-bonded bilayer sheet: a rigid outer layer that delivers the orthodontic force and a soft inner layer that improves patient comfort.",
    list: [
      { label: "Construction", value: "Factory-bonded bilayer" },
      { label: "Outer Layer", value: "Rigid · force delivery" },
      { label: "Inner Layer", value: "Soft · comfort interface" },
      { label: "Optical Clarity", value: "High, through both layers" },
      { label: "Disc Sizes", value: "120 mm · 125 mm · 240 mm" },
      { label: "Format", value: "Square & roll" },
    ],
  },
  "taglus-soft": {
    intro:
      "A flexible EVA thermoforming sheet for mouthguards, nightguards, duplication molds and bleaching trays, available in three thicknesses.",
    list: [
      { label: "Material", value: "Flexible EVA" },
      { label: "Thickness", value: "1.5 mm · 2 mm · 3 mm" },
      { label: "1.5 mm", value: "Bleaching trays & duplication molds" },
      { label: "2 mm", value: "Standard nightguards" },
      { label: "3 mm", value: "Mouthguards" },
      { label: "BPA", value: "BPA-free" },
    ],
  },
  "taglus-smiles": {
    intro:
      "A shaded thermoforming material matched to standard tooth shades, for pontic spaces and interim restorations in removable appliances.",
    list: [
      { label: "Material Type", value: "Shaded thermoforming sheet" },
      { label: "Shades", value: "A1 · A2 · A3" },
      { label: "Application", value: "Pontics & interim restorations" },
      { label: "Disc Sizes", value: "120 mm · 125 mm · 240 mm" },
      { label: "Format", value: "Square & roll" },
      { label: "Biocompatibility", value: "Suitable for intraoral use" },
    ],
  },
};

async function main() {
  for (const [slug, p] of Object.entries(PROPS)) {
    const product = await prisma.product.findUnique({ where: { slug }, select: { id: true, propertiesList: true } });
    if (!product) {
      console.log(`${slug.padEnd(24)} not found ✘`);
      continue;
    }
    if (Array.isArray(product.propertiesList) && product.propertiesList.length > 0) {
      console.log(`${slug.padEnd(24)} already has properties, skipped`);
      continue;
    }
    await prisma.product.update({
      where: { slug },
      data: { propertiesIntro: p.intro, propertiesList: p.list as Prisma.InputJsonValue },
    });
    console.log(`${slug.padEnd(24)} properties added ✔`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
