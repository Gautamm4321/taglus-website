// Run ONCE after `npx prisma db push`:  npx tsx prisma/add-new-sheets.ts
// Adds Taglus Ultra, Hard & Soft, Soft and Smiles (same page layout as Premium / PU Flex / TUFF).
// Safe to run again: products that already exist are NOT overwritten, so CMS edits are kept.
import { PrismaClient, Prisma, type MenuGroup } from "@prisma/client";

const prisma = new PrismaClient();

type Card = { title: string; description: string };
type NewSheet = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  overview: string;
  imagePath: string;
  features: Card[];
  audience: Card[];
  sizes: { roundDimensions: string[]; squareDimensions: string[]; thicknesses: string[] };
  faqs: { question: string; answer: string }[];
  metaDescription: string;
  menuGroup: MenuGroup;
  menuTitle: string;
  menuDescription: string;
  sortOrder: number;
};

const SHEETS: NewSheet[] = [
  /* ---------------- TAGLUS ULTRA ---------------- */
  {
    slug: "taglus-ultra",
    name: "TAGLUS® ULTRA",
    category: "HIGH-FORCE ALIGNER SHEET",
    tagline: "More force. More control. More movement.",
    overview:
      "A high-force aligner sheet engineered for demanding orthodontic cases and accelerated treatment timelines. Some cases need more: moderate to severe crowding, significant rotations and challenging bite corrections require a material that delivers higher, sustained orthodontic forces without sacrificing clarity or comfort. Available for sale only in Asia Pacific, Europe and South America.",
    imagePath: "/products/ultra.jpg",
    features: [
      { title: "High Force Delivery", description: "Formulated to generate stronger initial forces than standard aligner materials, delivering more tooth movement per step for demanding cases." },
      { title: "Superior Clarity", description: "Maintains high optical clarity throughout the wear cycle while delivering higher orthodontic forces." },
      { title: "Precision Fit", description: "Excellent adaptation during thermoforming, including tight interproximal spaces and complex posterior anatomy." },
      { title: "Biocompatible & Certified", description: "CE & TGA certified. BPA free and suitable for intraoral use throughout the treatment." },
    ],
    audience: [
      { title: "Orthodontists", description: "Orthodontists managing complex cases: severe crowding, significant rotations or difficult bite corrections." },
      { title: "Clinicians", description: "Clinicians running accelerated aligner protocols who need higher per-step force." },
      { title: "Dental Labs", description: "Labs producing aligners for enterprise aligner companies with demanding clinical specifications." },
    ],
    sizes: { roundDimensions: [], squareDimensions: [], thicknesses: ["0.762 mm", "1.0 mm"] },
    faqs: [
      {
        question: "How does Ultra differ from PU Flex?",
        answer:
          "Both are high-performance aligner materials, but they serve different clinical needs. PU Flex is optimised for flexibility, patient comfort, and sustained gentle force across all cases. Ultra is formulated for higher force output, making it the choice for complex cases requiring more aggressive tooth movement per step.",
      },
      {
        question: "Is it compatible with standard thermoforming machines?",
        answer:
          "Yes. Taglus Ultra is compatible with most commercially available thermoforming units. Contact us or download the compatibility guide for specific working codes.",
      },
    ],
    metaDescription: "Taglus Ultra: a high-force aligner sheet for complex orthodontic cases, with high clarity and precise thermoforming fit.",
    menuGroup: "ALIGNER",
    menuTitle: "Taglus Ultra",
    menuDescription: "High-force aligner sheet",
    sortOrder: 30,
  },

  /* ---------------- TAGLUS HARD & SOFT ---------------- */
  {
    slug: "taglus-hard-and-soft",
    name: "TAGLUS® HARD & SOFT",
    category: "BILAYER ALIGNER SHEET",
    tagline: "Hard on the outside. Easy on your patients.",
    overview:
      "A bilayer aligner sheet combining rigid force delivery with a soft inner surface for exceptional patient comfort. The outer layer needs to be rigid enough to move teeth predictably; the inner layer needs to be comfortable enough that patients actually wear it. Taglus Hard and Soft delivers both in a single sheet: hard where it matters for treatment, soft where it matters for your patient.",
    imagePath: "/products/hard-and-soft.jpg",
    features: [
      { title: "Rigid Outer Layer", description: "The hard exterior delivers controlled, consistent orthodontic force, giving you the treatment predictability you design your case plan around." },
      { title: "Soft Inner Surface", description: "The inner layer sits against the gingival margin and tooth surfaces. Patients report significantly improved comfort, especially in the first few days of a new step." },
      { title: "Bonded Bilayer Construction", description: "Hard and soft layers are factory-bonded, with no delamination risk during thermoforming or in use. One sheet, two materials, no compromise." },
      { title: "Clear and Aesthetic", description: "High optical clarity is maintained through both layers. The bilayer construction doesn't compromise aesthetics: patients won't see the difference, but they'll feel it." },
    ],
    audience: [
      { title: "Orthodontists", description: "Orthodontists whose patients report discomfort or low compliance." },
      { title: "Sensitive Cases", description: "Cases involving sensitive gingival margins or patients with a low pain threshold." },
      { title: "Premium Practices", description: "Practices differentiating their offering with a premium, comfort-led aligner product." },
    ],
    sizes: { roundDimensions: ["120 mm", "125 mm", "240 mm"], squareDimensions: [], thicknesses: [] },
    faqs: [
      {
        question: "Does the soft inner layer affect tooth-moving force?",
        answer:
          "No. The rigid outer layer delivers the orthodontic force. The soft layer functions as a comfort interface with the tooth and gingival surface; it doesn't reduce treatment efficacy.",
      },
      {
        question: "Does it thermoform differently from single-layer sheets?",
        answer:
          "The thermoforming parameters differ slightly from single-layer materials. Refer to the instructions for use or contact our team for working codes specific to your machine.",
      },
    ],
    metaDescription: "Taglus Hard & Soft: a bilayer aligner sheet with a rigid outer layer for force and a soft inner surface for patient comfort.",
    menuGroup: "RETAINER",
    menuTitle: "Taglus Hard & Soft",
    menuDescription: "Bilayer sheet: rigid outside, soft inside",
    sortOrder: 20,
  },

  /* ---------------- TAGLUS SOFT ---------------- */
  {
    slug: "taglus-soft",
    name: "TAGLUS® SOFT",
    category: "FLEXIBLE EVA SHEET · BPA-FREE",
    tagline: "Comfort and protection, formed to fit.",
    overview:
      "A flexible EVA thermoforming material built for mouthguards, nightguards, duplication molds and bleaching trays. Taglus Soft Sheets are engineered for cases where flexibility, cushioning and a snug, conforming fit matter more than stiffness: protecting teeth during impact or wear, while staying comfortable enough for extended use.",
    imagePath: "/products/soft.jpg",
    features: [
      { title: "Flexible Cushioning", description: "Flexible EVA engineered for cushioning and a snug, conforming fit that protects teeth during impact or wear." },
      { title: "Three Thickness Options", description: "1.5 mm, 2 mm and 3 mm, so labs can match material thickness to the appliance, from lightweight nightguards to heavier-duty mouthguards." },
      { title: "Multi-Application Versatility", description: "One material, four uses: mouthguards, nightguards, duplication molds and bleaching trays, reducing the number of separate materials a lab needs to stock." },
      { title: "BPA-Free", description: "Formulated without BPA, for peace of mind on every appliance produced." },
    ],
    audience: [
      { title: "Sports Mouthguard Labs & Practices", description: "Labs and practices producing sports mouthguards requiring cushioned impact protection." },
      { title: "Nightguard Practices", description: "Practices fabricating nightguards for patients managing bruxism or clenching." },
      { title: "Lab & Model Work", description: "Labs needing a reliable material for duplication molds and model work." },
      { title: "Bleaching Tray Practices", description: "Practices producing bleaching trays for at-home or in-office whitening treatment." },
    ],
    sizes: { roundDimensions: [], squareDimensions: [], thicknesses: ["1.5 mm", "2 mm", "3 mm"] },
    faqs: [
      {
        question: "Which thickness should I use for which application?",
        answer:
          "Thinner sheets (1.5 mm) suit bleaching trays and duplication molds where flexibility and light contact are enough. Mid-range (2 mm) works well for standard nightguards. Thicker sheets (3 mm) are better suited to mouthguards, where greater cushioning and impact protection are needed.",
      },
      {
        question: "Is Taglus Soft biocompatible?",
        answer:
          "Yes. The material is BPA-free and meets biocompatibility requirements for intraoral use. Contact us for certification documentation specific to your market.",
      },
    ],
    metaDescription: "Taglus Soft: flexible, BPA-free EVA sheets in 1.5, 2 and 3 mm for mouthguards, nightguards, duplication molds and bleaching trays.",
    menuGroup: "RETAINER",
    menuTitle: "Taglus Soft",
    menuDescription: "Flexible EVA for guards & trays",
    sortOrder: 30,
  },

  /* ---------------- TAGLUS SMILES ---------------- */
  {
    slug: "taglus-smiles",
    name: "TAGLUS® SMILES",
    category: "SHADED THERMOFORMING MATERIAL",
    tagline: "Natural-looking interim solutions, shade-matched to the patient.",
    overview:
      "A shaded thermoforming material available in A1, A2 and A3, purpose-built for interim restorations and pontic spaces in removable appliances.",
    imagePath: "/products/smiles.jpg",
    features: [
      { title: "True Shade Match", description: "A1, A2 and A3 matched to standard tooth shades, so pontic areas and interim restorations blend naturally instead of standing out." },
      { title: "Comfortable, Wearable Interim Fit", description: "Smooth-forming material that seats comfortably as a temporary solution while a patient's permanent restoration or treatment plan progresses." },
      { title: "Available Globally", description: "Part of the Taglus range shipped to 70+ countries, with local distribution in most major markets." },
    ],
    audience: [
      { title: "Dental Labs", description: "Labs and practices fabricating interim retainers or appliances with a pontic space (missing tooth) that needs to look natural." },
      { title: "Orthodontic Practices", description: "Orthodontic practices managing patients with a missing tooth mid-treatment who need an aesthetic, wearable interim solution." },
      { title: "Clinicians", description: "Clinicians who want shade-matched material on hand rather than sending pontic cases out to an external lab." },
    ],
    sizes: { roundDimensions: ["120 mm", "125 mm", "240 mm"], squareDimensions: [], thicknesses: [] },
    faqs: [
      {
        question: "How is Smiles different from clear thermoforming sheets?",
        answer:
          "Standard thermoforming sheets are clear and best suited to aligners and retainers with no pontic requirement. Smiles is shaded (A1, A2, A3) specifically for cases where a pontic space or interim restoration needs to match natural tooth colour rather than stay transparent.",
      },
      {
        question: "Is it biocompatible?",
        answer:
          "Yes. Taglus Smiles meets biocompatibility requirements for intraoral use and is available with certification documentation. Contact us for details specific to your market's regulatory requirements.",
      },
    ],
    metaDescription: "Taglus Smiles: shaded A1, A2 and A3 thermoforming sheets for natural-looking pontics and interim restorations.",
    menuGroup: "AESTHETIC",
    menuTitle: "Taglus Smiles",
    menuDescription: "Shaded sheets for pontics & interims",
    sortOrder: 10,
  },
];

async function main() {
  for (const s of SHEETS) {
    const exists = await prisma.product.findUnique({ where: { slug: s.slug }, select: { id: true } });
    if (exists) {
      console.log(`${s.slug.padEnd(24)} already exists, skipped (your CMS edits are kept)`);
      continue;
    }
    await prisma.product.create({
      data: {
        ...s,
        template: "SHEET",
        propertiesIntro: "",
        testingNote: "",
        propertiesList: [],
        features: s.features as Prisma.InputJsonValue,
        audience: s.audience as Prisma.InputJsonValue,
        sizes: s.sizes as Prisma.InputJsonValue,
        faqs: s.faqs as Prisma.InputJsonValue,
        metaTitle: `${s.menuTitle} | Taglus`,
        published: true,
      },
    });
    console.log(`${s.slug.padEnd(24)} added ✔`);
  }
  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
