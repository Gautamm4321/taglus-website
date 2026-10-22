// Run ONCE:  npx tsx prisma/apply-product-copy.ts
// Applies the client's "Website Product Page Copy" (Word document) to the existing products:
// category label, short description, overview, key-benefit cards and SEO description.
// For the Resin, Roll and Accessories layouts it updates their "Page content" text.
// Technical tables, sizes, FAQs and images are NOT touched (except the missing Accessories cover image).
// Before changing anything it saves the current values to prisma/product-copy-backup.json.
import { writeFileSync } from "fs";
import path from "path";
import { Prisma, PrismaClient } from "@prisma/client";
import { resolveExtra, type AccessoriesContent, type ResinContent, type RollContent } from "../src/app/lib/templateContent";

const prisma = new PrismaClient();

type Card = { title: string; description: string };
type Copy = { category: string; tagline: string; overview: string; features?: Card[]; metaDescription: string };

const ENQUIRE = "Get in touch with our team for technical specifications and details.";

const COPY: Record<string, Copy> = {
  "taglus-premium": {
    category: "ALIGNER & RETAINER SHEETS",
    tagline: "A dependable thermoforming material option for everyday clear aligner fabrication workflows.",
    overview: `Taglus Premium is a dependable thermoforming material option for everyday clear aligner fabrication workflows. It is intended for dental laboratories fabricating clear aligners using validated thermoforming processes. ${ENQUIRE}`,
    features: [
      { title: "Designed for Clear Aligners", description: "Developed specifically for clear aligner fabrication." },
      { title: "Routine Lab Workflows", description: "Supports routine dental laboratory thermoforming workflows." },
      { title: "Clear Product Selection", description: "Available options and forming guidance are presented clearly to help you choose." },
      { title: "Technical Support", description: ENQUIRE },
    ],
    metaDescription: "Taglus Premium clear aligner sheets: a dependable thermoforming material for everyday clear aligner fabrication in dental laboratories.",
  },
  "taglus-pu-flex": {
    category: "ALIGNER & RETAINER SHEETS",
    tagline: "A polyurethane-based material option for clear aligner fabrication.",
    overview: `Taglus PU Flex is a polyurethane-based material option for clear aligner fabrication, subject to the product's approved technical specifications. It is intended for aligner fabrication workflows validated for Taglus PU Flex. ${ENQUIRE}`,
    features: [
      { title: "Polyurethane Material", description: "Offers an alternative material profile for aligner production." },
      { title: "Workflow-Led Selection", description: "Evaluate material selection against your workflow and treatment requirements." },
      { title: "Approved Test Data", description: "Technical properties and processing guidance are based on approved test data." },
    ],
    metaDescription: "Taglus PU Flex polyurethane aligner sheets: an alternative material profile for clear aligner fabrication and orthodontic thermoforming.",
  },
  "taglus-ultra": {
    category: "MULTILAYER ALIGNER SHEETS",
    tagline: "Multilayer technology for clear aligner fabrication, with a combination of hard and soft layers.",
    overview: `Taglus Ultra uses multilayer technology for clear aligner fabrication, combining hard and soft layers in one sheet. It is intended for clear aligner fabrication using validated thermoforming workflows. ${ENQUIRE}`,
    features: [
      { title: "Three-Layer Construction", description: "Soft outer layer / hard inner layer / soft outer layer." },
      { title: "Hard + Soft in One Sheet", description: "Combines different material layers in one aligner sheet." },
      { title: "Guided Selection", description: "Product-specific forming instructions and test-backed material properties support selection." },
    ],
    metaDescription: "Taglus Ultra multilayer aligner sheets: soft / hard / soft construction combining material layers in one clear aligner sheet.",
  },
  "taglus-tuff": {
    category: "RETAINER SHEETS",
    tagline: "A thin-sheet option designed for orthodontic retainer fabrication, including a 0.8 mm option where specified.",
    overview: `Taglus TUFF is a thin-sheet option designed for orthodontic retainer fabrication, including a 0.8 mm option where specified. It is intended for dental laboratories fabricating retainers using validated thermoforming processes. ${ENQUIRE}`,
    features: [
      { title: "Designed for Retainers", description: "Developed for orthodontic retainer fabrication." },
      { title: "0.8 mm Option", description: "A thinner retainer material for labs that need it." },
      { title: "Double-Sided Masking", description: "Available where confirmed for the specific SKU." },
    ],
    metaDescription: "Taglus TUFF thin retainer sheets, including a 0.8 mm option, for orthodontic retainer thermoforming in dental laboratories.",
  },
  "taglus-duoform": {
    category: "DENTAL PRESSURE THERMOFORMING MACHINE",
    tagline: "A pressure thermoforming solution for clear aligners, retainers and other compatible thermoformed appliances.",
    overview: `Taglus Duoform is a pressure thermoforming solution designed for dental laboratories fabricating clear aligners, retainers and other compatible thermoformed appliances. It suits dental labs seeking a compact pressure-forming solution within the machine's specified material and appliance range. ${ENQUIRE}`,
    features: [
      { title: "Straightforward Operation", description: "Designed for straightforward operation in dental lab workflows." },
      { title: "Pressure Thermoforming", description: "Supports pressure thermoforming for compatible dental appliances." },
      { title: "Clear Documentation", description: "Product documentation helps confirm utilities, forming format and operating requirements." },
    ],
    metaDescription: "Taglus Duoform dental pressure thermoforming machine for clear aligners, retainers and compatible thermoformed appliances.",
  },
  "taglus-autoform": {
    category: "DENTAL THERMOFORMING MACHINES",
    tagline: "An automated sheet thermoforming solution for compatible orthodontic appliance production workflows.",
    overview: `Taglus Autoform is an automated sheet thermoforming solution for compatible orthodontic appliance production workflows. It is intended for dental laboratories looking to integrate sheet-based thermoforming into their manufacturing process. ${ENQUIRE}`,
    features: [
      { title: "Sheet-Based Thermoforming", description: "Designed for sheet-based thermoforming workflows." },
      { title: "Production Fit", description: "Helps labs assess equipment fit against material and production requirements." },
      { title: "Validated Data", description: "Operating and throughput data available on request to support purchasing decisions." },
    ],
    metaDescription: "Taglus Autoform automated sheet thermoforming machine for orthodontic appliance production in dental laboratories.",
  },
  "taglus-autoform-roll": {
    category: "ROLL-FED THERMOFORMING MACHINES",
    tagline: "A roll-based thermoforming solution designed for high-throughput clear aligner production workflows.",
    overview: `Taglus Autoform Roll is a roll-based thermoforming solution designed for high-throughput clear aligner production workflows. It is intended for dental laboratories producing clear aligners using a validated roll-fed process. ${ENQUIRE}`,
    metaDescription: "Taglus Autoform Roll: roll-fed thermoforming for high-throughput clear aligner production using a validated process.",
  },
  "taglus-model-resin": {
    category: "DENTAL 3D PRINTING RESINS",
    tagline: "A dental model resin for printing models used in orthodontic and digital dentistry workflows.",
    overview:
      "Taglus Model Resin is a dental model resin for 3D printing dental models, including models used in clear aligner and retainer production, where supported by the product's IFU. Also available as Water-Washable and Low-Odour formulations.",
    metaDescription: "Taglus dental model resins for orthodontic 3D printing: Model Resin, Water-Washable Resin and Low-Odour Resin.",
  },
  "taglus-orthodontic-accessories": {
    category: "ORTHODONTIC ACCESSORIES & LAB ESSENTIALS",
    tagline: "Aligner-care, storage, packaging and lab essentials for the digital orthodontic workflow.",
    overview:
      "Taglus orthodontic accessories and lab essentials: ortho chewies, aligner removal tools, aligner cases, retainer boxes, pillow boxes, dental model articulators and impression trays.",
    metaDescription: "Taglus orthodontic accessories: ortho chewies, aligner removal tool, aligner case, retainer box, pillow box, articulator and impression tray.",
  },
};

/* ---------- page content for the special layouts ---------- */

function resinContent(current: ResinContent): ResinContent {
  return {
    ...current,
    heroBadge: "Dental 3D Printing Resins",
    heroTitle: "TAGLUS 3D PRINT",
    heroHighlight: "MODEL RESIN",
    heroText:
      "A dental model resin for printing models used in orthodontic and digital dentistry workflows, including models used in clear aligner and retainer production, where supported by the product's IFU.",
    pointsEyebrow: "Why Labs Choose It",
    pointsTitle: "Built for Dental Model Printing",
    points: [
      { title: "Dental Model Printing", description: "Designed for dental model printing." },
      { title: "Orthodontic Workflows", description: "Supports digital model production for relevant orthodontic workflows." },
      { title: "Easy-to-Find Guidance", description: "Printer settings and post-processing guidance are easy to access." },
    ],
    formulations: [
      {
        label: "Formulation 01",
        title: "TAGLUS LOW-ODOUR RESIN",
        lines:
          "A dental model resin formulated as a low-odour option for compatible model-printing workflows.\nFor dental model production using validated printer settings and post-processing instructions.",
        highlight: "Validated compatibility and handling information provided.",
        image: current.formulations[0]?.image || "/taglus-model-risen-btl.png",
        caption: "TAGLUS LOW-ODOUR RESIN",
      },
      {
        label: "Formulation 02",
        title: "TAGLUS WATER-WASHABLE RESIN",
        lines:
          "A water-washable resin option for dental model printing, used according to the product's approved instructions.\nWater-washable post-processing approach, according to the IFU.",
        highlight: "Clear instructions support appropriate handling and workflow setup.",
        image: current.formulations[1]?.image || "/taglus-washable-bottle.png",
        caption: "TAGLUS WATER-WASHABLE RESIN",
      },
    ],
  };
}

function rollContent(current: RollContent): RollContent {
  return {
    ...current,
    heroBadge: "Roll-Fed Thermoforming Machines",
    heroTitle: "Taglus Autoform",
    heroHighlight: "Roll",
    heroSubtitle: "A roll-based thermoforming solution designed for high-throughput clear aligner production workflows.",
    heroText: `For dental laboratories producing clear aligners using a validated roll-fed process. ${ENQUIRE}`,
    advantagesEyebrow: "Key Benefits",
    advantagesTitle: "Built for Roll-Fed Production",
    advantages: [
      { title: "Roll-Based Thermoforming", description: "Designed for roll-based thermoforming." },
      { title: "Repeated Forming Cycles", description: "Supports production workflows built around repeated forming cycles." },
      { title: "Defined Throughput", description: "Throughput is published with clearly defined conditions and production assumptions." },
    ],
  };
}

/** Titles are kept as they are: the header menu links point to each block by its title. */
const ACCESSORY_TEXT: Record<string, { description: string; bullets: string; buttonText: string }> = {
  "Taglus Retainer Boxes": {
    description: "A dedicated case for storing orthodontic retainers between uses, for retainer storage and transport according to the clinician's instructions.",
    bullets: "Provides a designated storage case\nSuitable for inclusion in retainer handover kits\nDimensions, material, closure and colour options on request",
    buttonText: "ENQUIRE ABOUT THIS PRODUCT",
  },
  "Taglus Aligner Chewies": {
    description: "An orthodontic accessory intended to help patients seat clear aligners according to their clinician's instructions. For use as directed by the treating dental professional.",
    bullets: "Provides an accessory for aligner-seating routines\nCan be included in patient aligner-care kits\nUse and replacement guidance follows approved product instructions",
    buttonText: "ENQUIRE ABOUT THIS PRODUCT",
  },
  "Taglus Aligner Removal Tool": {
    description: "A dedicated tool designed to assist patients with removing clear aligners. For patient use as directed by the treating dental professional.",
    bullets: "An alternative to removing aligners with fingertips alone\nCompact accessory for aligner-care kits\nMaterial, cleaning and usage instructions provided",
    buttonText: "ENQUIRE ABOUT THIS PRODUCT",
  },
  "Premium Dental Pillow Boxes": {
    description: "Pillow-style packaging for presenting or supplying compatible dental appliances and accessories.",
    bullets: "Compact packaging format\nSupports organised presentation of compatible products\nDimensions, material and pack quantity help you choose the right option",
    buttonText: "ENQUIRE ABOUT THIS PRODUCT",
  },
  "Articulator With Stopper": {
    description: "An articulator accessory for positioning compatible upper and lower dental models together, for dental laboratory model handling and assessment.",
    bullets: "Supports positioning of compatible models\nUseful for selected lab assessment and finishing workflows\nCompatibility, movement and mounting details on request",
    buttonText: "ENQUIRE ABOUT THIS PRODUCT",
  },
  "Taglus Dental Impression Trays": {
    description: "A tray option for dental impression-taking workflows, for use by trained dental professionals in accordance with product instructions.",
    bullets: "A tray option for clinical impression workflows\nSizes and arch configurations on request\nEach variant is clearly labelled as disposable or reusable",
    buttonText: "ENQUIRE ABOUT THIS PRODUCT",
  },
};

function accessoriesContent(current: AccessoriesContent): AccessoriesContent {
  const items = current.items.map((it) => (ACCESSORY_TEXT[it.title] ? { ...it, ...ACCESSORY_TEXT[it.title] } : it));
  return { ...current, heroBadge: "Orthodontic Accessories & Lab Essentials", items };
}

async function main() {
  const slugs = Object.keys(COPY);
  const products = await prisma.product.findMany({ where: { slug: { in: slugs } } });
  writeFileSync(path.join(__dirname, "product-copy-backup.json"), JSON.stringify(products, null, 2));
  console.log(`Backup of ${products.length} products saved to prisma/product-copy-backup.json\n`);

  for (const p of products) {
    const c = COPY[p.slug];
    const data: Prisma.ProductUpdateInput = {
      category: c.category,
      tagline: c.tagline,
      overview: c.overview,
      metaDescription: c.metaDescription,
    };
    if (c.features) data.features = c.features as Prisma.InputJsonValue;

    // Ultra's technical table said "High-force aligner sheet": align it with the approved multilayer copy
    if (p.slug === "taglus-ultra" && Array.isArray(p.propertiesList)) {
      data.propertiesList = (p.propertiesList as { label: string; value: string }[]).map((row) =>
        /material type/i.test(row.label) ? { ...row, value: "Multilayer aligner sheet (soft / hard / soft)" } : row
      ) as Prisma.InputJsonValue;
    }

    if (p.template === "RESIN") data.extra = resinContent(resolveExtra("RESIN", p.extra)) as Prisma.InputJsonValue;
    if (p.template === "ROLL") data.extra = rollContent(resolveExtra("ROLL", p.extra)) as Prisma.InputJsonValue;
    if (p.template === "ACCESSORIES") {
      data.extra = accessoriesContent(resolveExtra("ACCESSORIES", p.extra)) as Prisma.InputJsonValue;
      // its main image pointed to a file that does not exist (/acesories-1.jpeg)
      if (!p.imagePath || p.imagePath === "/acesories-1.jpeg") data.imagePath = "/acesories-B.jpg";
    }

    await prisma.product.update({ where: { id: p.id }, data });
    console.log(`✓ ${p.name}`);
  }

  const missing = slugs.filter((s) => !products.some((p) => p.slug === s));
  if (missing.length) console.log(`\nNot found (skipped): ${missing.join(", ")}`);
  console.log("\nDone. Refresh the product pages to see the new copy.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
