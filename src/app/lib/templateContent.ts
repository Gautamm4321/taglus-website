// Editable page content for the Resin, Roll and Accessories layouts.
// Stored in the product's `extra` JSON column and edited in CMS → Products → "Page content".
// The defaults below are the content the pages showed before they were connected to the CMS,
// so a product with no saved content yet still renders exactly as before.
import { z } from "zod";

const s = (max: number) => z.string().trim().max(max, `Must be ${max} characters or fewer.`);
const req = (label: string, max: number) => z.string().trim().min(1, `${label} is required.`).max(max, `${label} must be ${max} characters or fewer.`);
const card = z.object({ title: req("Title", 191), description: s(2000) });

/* ---------- Resin ---------- */

export const resinSchema = z.object({
  heroBadge: s(120),
  heroTitle: s(120),
  heroHighlight: s(120),
  heroText: s(2000),
  heroImage: s(1000),
  pointsEyebrow: s(120),
  pointsTitle: s(200),
  points: z.array(card).max(12),
  formulations: z
    .array(
      z.object({
        label: s(120),
        title: req("Formulation name", 191),
        lines: s(2000),
        highlight: s(500),
        image: s(1000),
        caption: s(191),
      })
    )
    .max(2),
  galleryEyebrow: s(120),
  galleryTitle: s(200),
  gallerySubtitle: s(300),
  gallery: z.array(z.object({ image: req("Image", 1000), title: req("Title", 191), description: s(1000) })).max(24),
});
export type ResinContent = z.infer<typeof resinSchema>;

export const RESIN_DEFAULTS: ResinContent = {
  heroBadge: "Next-Gen 3D Photopolymer Resin",
  heroTitle: "TAGLUS 3D PRINT",
  heroHighlight: "MODEL RESIN",
  heroText:
    "Engineered exclusively for high-accuracy dental aligner model manufacturing. Delivers extreme dimensional stability, high heat endurance during thermoforming, and a glare-free matte surface for effortless optical inspection.",
  heroImage: "/model resin.jpg",
  pointsEyebrow: "Clinical Precision Standards",
  pointsTitle: "Why Orthodontic Labs Rely On Taglus Resin",
  points: [
    { title: "Zero Thermoforming Warp", description: "High heat deflection temperature withstands intense pressure without tooth arch deformation." },
    { title: "Micro-Detail Margins", description: "Captures sharp gingival margins and interproximal undercuts for snug aligner seating." },
    { title: "Non-Brittle Tough Core", description: "Stays tough under heavy handling, laboratory transport, and rapid tool trimming." },
    { title: "Glare-Free Matte Finish", description: "Reduces visual technician eye strain and enables smooth intraoral scan verification." },
    { title: "Universal 385–405nm Light", description: "Seamless compatibility across standard DLP, LCD, and SLA printers with rapid layer reset." },
  ],
  formulations: [
    {
      label: "Formulation 01",
      title: "TAGLUS ODOURLESS RESIN",
      lines:
        "Engineered with high tensile yield strength and break resilience.\nVirtually odourless photopolymer minimizing irritating laboratory fumes.",
      highlight: "Optimized for heavy orthodontic thermoforming & aligner models.",
      image: "/taglus-model-risen-btl.png",
      caption: "TAGLUS STANDARD MODEL RESIN",
    },
    {
      label: "Formulation 02",
      title: "TAGLUS WATER WASHABLE RESIN",
      lines:
        "Cleans completely with tap water, eliminating expensive IPA alcohol baths.\nRetains razor-sharp tooth contour accuracy with ultra-low surface shrinkage.",
      highlight: "Eco-conscious, user-friendly formulation for rapid chairside workflows.",
      image: "/taglus-washable-bottle.png",
      caption: "TAGLUS WATER WASHABLE RESIN",
    },
  ],
  galleryEyebrow: "Real Lab Output",
  galleryTitle: "Precision 3D Printed Teeth Arches",
  gallerySubtitle: "Hover over any model to inspect clinical print details",
  gallery: [
    { image: "/risen-teeth-2.webp", title: "Orthodontic Working Model", description: "Glare-free matte texture providing sharp optical contrast under operatory inspection." },
    { image: "/risen-teeth-3.webp", title: "Full Arch Study Model", description: "Exceptional marginal fidelity and accurate interproximal tooth reproduction." },
    { image: "/risen-teeth-4.png", title: "Quadrant Section Model", description: "Crisp margin retention with non-brittle edge stability during aligner trimming." },
    { image: "/risen-teeth-5.png", title: "Diagnostic Study Cast", description: "Zero moisture distortion ensuring consistent arch width across clinical checkups." },
    { image: "/risen-teeth-6.png", title: "Thermoforming Working Arch", description: "High heat resistance preventing deformation during high-pressure aligner forming." },
    { image: "/risen-teeth-7.png", title: "High-Precision Dental Arch", description: "Minimal shrinkage under 405nm UV exposure for tight clinical tray seating." },
    { image: "/risen-teeth-8.png", title: "Aligner Master Model", description: "Durable surface hardness withstanding repeated aligner insertion and detachments." },
    { image: "/risen-teeth-9.png", title: "Digital Aligner Sequence", description: "Homogeneous particle suspension preventing layer-line visibility on fine contours." },
  ],
};

/* ---------- Roll ---------- */

export const rollSchema = z.object({
  heroBadge: s(120),
  heroTitle: s(120),
  heroHighlight: s(120),
  heroSubtitle: s(500),
  heroText: s(2000),
  heroImage: s(1000),
  primaryCtaLabel: s(60),
  primaryCtaUrl: s(1000),
  secondaryCtaLabel: s(60),
  advantagesEyebrow: s(120),
  advantagesTitle: s(200),
  advantages: z.array(card).max(12),
  variantsEyebrow: s(120),
  variantsTitle: s(200),
  variantsImage: s(1000),
  variants: z.array(z.object({ name: req("Variant name", 191), description: s(1000), thicknesses: s(300) })).max(20),
  variantsNote: s(500),
});
export type RollContent = z.infer<typeof rollSchema>;

export const ROLL_DEFAULTS: RollContent = {
  heroBadge: "Automated Production Solutions",
  heroTitle: "Automated Thermoforming",
  heroHighlight: "Machine Rolls",
  heroSubtitle: "Validated by HAMER & ALVY Systems.\nDesigned to scale volume while reducing material costs up to 73%.",
  heroText:
    "Taglus aligner and retainer rolls are the optimal high-speed choice for industrial thermoforming equipment. Available in an extensive range of thicknesses, dimensions, and proprietary polymer alloys tailored specifically to commercial clear aligner manufacturing facilities.",
  heroImage: "/trim-2.webp",
  primaryCtaLabel: "Download Sizes & Weights",
  primaryCtaUrl: "/Taglus-Product-Catalogue.pdf",
  secondaryCtaLabel: "Request Quotation",
  advantagesEyebrow: "Engineering Superiority",
  advantagesTitle: "Advantages of Taglus ATM Rolls",
  advantages: [
    { title: "Internationally Certified", description: "Certified under ISO 13485:2016 and compliant with stringent global regulatory medical standards." },
    { title: "PU & PETG Materials", description: "Available in both high-elasticity polyurethane and crystal-clear glycol-modified polyethylene options." },
    { title: "High-Pressure Precision", description: "Engineered to produce exact, defect-free adaptations under high pneumatic pressure chambers." },
    { title: "Up to 73% Cost Savings", description: "Continuous-feed rolls significantly decrease per-tray material scrap and optimize automation speeds." },
  ],
  variantsEyebrow: "Available Portfolio Variants",
  variantsTitle: "Material & Thickness Specifications",
  variantsImage: "/trim-1.webp",
  variants: [
    { name: "Taglus PU Flex", description: "Smartest polyurethane formulation for complex aligner staging and maximum patient comfort.", thicknesses: "0.76 mm, 1.02 mm" },
    { name: "Taglus Premium", description: "Ultra-transparent PET-G material offering best-in-class mechanical balance and clarity.", thicknesses: "0.76 mm, 1.02 mm" },
    { name: "Taglus Standard", description: "High-value, cost-effective workhorse material optimized for high-volume commercial labs.", thicknesses: "0.76 mm, 1.02 mm" },
    { name: "Taglus TUFF", description: "Uniaxially oriented amorphous retainer polymer engineered for extreme fracture resistance.", thicknesses: "0.80 mm" },
  ],
  variantsNote: "Full machine validation documentation and heating parameters provided upon request.",
};

/* ---------- Accessories ---------- */

export const accessoriesSchema = z.object({
  heroBadge: s(120),
  heroTitle: s(120),
  heroHighlight: s(120),
  heroText: s(1000),
  items: z
    .array(
      z.object({
        category: s(120),
        title: req("Item name", 191),
        description: s(2000),
        bullets: s(2000),
        image: req("Image", 1000),
        buttonText: s(60),
      })
    )
    .max(30),
  ctaTitle: s(200),
  ctaText: s(1000),
  ctaButton: s(60),
});
export type AccessoriesContent = z.infer<typeof accessoriesSchema>;

export const ACCESSORIES_DEFAULTS: AccessoriesContent = {
  heroBadge: "Taglus Orthodontic Essentials",
  heroTitle: "Taglus Orthodontic",
  heroHighlight: "Accessories & Consumables",
  heroText: "Complete the digital workflow with precision delivery accessories, chairside tools, and packaging systems.",
  items: [
    {
      category: "CLINICAL BRANDING & STORAGE",
      title: "Taglus Retainer Boxes",
      description:
        "Created using a unique in-house precision injection moulding process. Sturdy, lightweight, and customisable to elevate your orthodontic brand presence.",
      bullets:
        "Customisable with your clinic logo & brand colours\nSturdy and lightweight protective architecture\nSecure magnetic closure mechanism\nCompetitive lab & clinic pricing tiers",
      image: "/acesories-B.jpg",
      buttonText: "CUSTOMISE RETAINER BOXES",
    },
    {
      category: "CHAIRSIDE & PATIENT COMPLIANCE",
      title: "Taglus Aligner Chewies",
      description:
        "Engineered with medical-grade silicone to provide uniform bite pressure, ensuring perfect seating of thermoformed aligner trays and optimal orthodontic tracking.",
      bullets:
        "High-grade medical silicone composition\nEnsures tight seating and seating accuracy\nMaintains oral hygiene standards during insertion\nAvailable in attractive clinical color variants",
      image: "/acesories-A.jpg",
      buttonText: "VIEW CHEWIES VARIANTS",
    },
    {
      category: "PATIENT SAFETY INSTRUMENTS",
      title: "Taglus Aligner Removal Tool",
      description:
        "Manufactured with durable, non-toxic dental plastic. Designed to safely and effortlessly disengage invisible aligners without damaging composite attachments or injuring sensitive gingival tissues.",
      bullets:
        "Ergonomic handle for comfortable, non-slip grip\nPrecision dual-sided lever hook architecture\nEliminates fingernail damage & prevents gum trauma\nCompact footprint engineered to fit inside retainer cases",
      image: "/acesories-D.jpg",
      buttonText: "EXPLORE REMOVAL TOOL",
    },
    {
      category: "LUXURY ALIGNER PACKAGING",
      title: "Premium Dental Pillow Boxes",
      description:
        "Sleek and sustainable branded secondary packaging designed to deliver aligners and retainers with an uncompromising premium patient experience.",
      bullets:
        "Available in 1-inch, 2-inch, and 3-inch depth configurations\nFully customizable with clinical brand identity\nEco-conscious and sustainable recyclable material\nProfessional presentation for aligner start kits",
      image: "/acesories-F.jpeg",
      buttonText: "VIEW PACKAGING SIZES",
    },
    {
      category: "DENTAL LAB CALIBRATION",
      title: "Articulator With Stopper",
      description:
        "Compact curved dental articulator built specifically for 3D printed orthodontic models. Minimises printed model height to directly reduce photopolymer resin consumption.",
      bullets:
        "Integrated stopper mechanism for precise occlusal alignment\nCurved ergonomic geometry for rapid lab mounting\nReduces required base height, saving 3D resin costs\nLightweight, durable lab construction",
      image: "/acesories-C.jpg",
      buttonText: "ORDER LAB ARTICULATORS",
    },
    {
      category: "IMPRESSION & SCANNING GEAR",
      title: "Taglus Dental Impression Trays",
      description:
        "Anatomically contoured rigid impression trays engineered for high-precision bite records, aligner pre-treatment planning, and physical workflow transfers.",
      bullets:
        "Medical-grade rigid non-flex polymer construction\nPerforated retention borders for secure impression hold\nAnatomically mapped arch curvatures (Upper & Lower)\nAutoclavable and single-use hygienic variants available",
      image: "/acesories-E.jpg",
      buttonText: "EXPLORE TRAY SIZES",
    },
  ],
  ctaTitle: "Looking to Build a Custom Aligner Delivery Kit?",
  ctaText:
    "We offer custom logo printing, packaging boxes, and clinical tool sets for aligner brands and regional distribution partners.",
  ctaButton: "Speak With a Specialist",
};

/* ---------- helpers ---------- */

export const EXTRA_SCHEMAS = { RESIN: resinSchema, ROLL: rollSchema, ACCESSORIES: accessoriesSchema } as const;
export const EXTRA_DEFAULTS = { RESIN: RESIN_DEFAULTS, ROLL: ROLL_DEFAULTS, ACCESSORIES: ACCESSORIES_DEFAULTS } as const;
export type ExtraTemplate = keyof typeof EXTRA_SCHEMAS;
export type ExtraContent = ResinContent | RollContent | AccessoriesContent;

export const hasExtra = (template: string): template is ExtraTemplate => template in EXTRA_SCHEMAS;

/** Saved content for a layout, or its defaults when nothing valid is saved yet. Never throws. */
export function resolveExtra<T extends ExtraTemplate>(template: T, raw: unknown): (typeof EXTRA_DEFAULTS)[T] {
  const parsed = EXTRA_SCHEMAS[template].safeParse(raw);
  return (parsed.success ? parsed.data : EXTRA_DEFAULTS[template]) as (typeof EXTRA_DEFAULTS)[T];
}

/** "a\nb\n\nc" → ["a", "b", "c"] */
export const lines = (text: string) => text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
/** "0.76 mm, 1.02 mm" → ["0.76 mm", "1.02 mm"] */
export const commaList = (text: string) => text.split(/[,\n]/).map((l) => l.trim()).filter(Boolean);
