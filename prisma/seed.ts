import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const products: Prisma.ProductCreateInput[] = [
  {
    slug: "taglus-premium",
    name: "TAGLUS PREMIUM",
    tagline: "Superior material properties and enhanced esthetics",
    category: "ALIGNER & RETAINER MATERIAL",
    overview:
      "Taglus Premium is an innovative aligner and retainer material with superior material properties and enhanced esthetics. As a unique engineering combination of elasticity with matchless rigidity and crack resistance, it offers optical clarity along with stain resistance.",
    imagePath: "/premium-box.png",
    propertiesIntro:
      "In applications where plastic films are designed to withstand orthodontic forces in an aligner, the mechanical properties of polymers namely Strength, Stiffness & Toughness play a vital role. TAGLUS Premium has unique balance of rigidity with elasticity.",
    testingNote:
      "Tested by an NABL accredited laboratory complying with ISO/IEC 17025 Laboratory Management System.",
    features: [
      {
        title: "ULTRA-TRANSPARENT SHEETS",
        description: "Light transmission of 91% as per ASTM D 1003 for high cosmetic clarity.",
      },
      {
        title: "BEST-IN-CLASS MECHANICAL PROPERTIES",
        description: "High tensile modulus and balanced flexural strength preventing crack formation.",
      },
      {
        title: "PREDICTABLE TOOTH MOVEMENT",
        description: "Delivers gentle yet consistent sustained force vectors over treatment duration.",
      },
      {
        title: "DUAL PROTECTIVE MASKING",
        description: "Ultra-thin peel-away masking on both sides prevents contamination prior to thermoforming.",
      },
    ],
    propertiesList: [
      { label: "Tensile Stress at Yield", value: "ASTM D 638: 2014 Standardized" },
      { label: "Tensile Modulus", value: "Balanced Flexural Stiffness" },
      { label: "Optical Clarity", value: "91% Light Transmission (ASTM D1003)" },
      { label: "Biocompatibility", value: "ISO 10993 Certified" },
    ],
    sizes: {
      roundDimensions: ["120 mm", "125 mm"],
      squareDimensions: ["125 mm x 125 mm"],
      thicknesses: ["0.5 mm", "0.762 mm", "1.02 mm", "1.5 mm", "2.0 mm"],
    },
    faqs: [
      {
        question: "What is the shelf life of taglus premium?",
        answer: "Taglus Premium sheets have a shelf life of up to 3 years when stored in their original sealed protective packaging away from direct heat and UV exposure.",
      },
      {
        question: "Is Taglus Premium distributed globally?",
        answer: "Yes, Taglus Premium is certified under MDR IIa and ISO standards, distributed across North America, Europe, Asia, and Latin America.",
      },
    ],
  },
  {
    slug: "taglus-pu-flex",
    name: "TAGLUS® PU FLEX",
    tagline: "Smartest material properties and enhanced esthetics",
    category: "POLYURETHANE ALIGNER & RETAINER MATERIAL",
    overview:
      "Taglus® PU Flex is a homogeneous polyurethane sheet that consists of linear polymeric chains made of alternating flexible and rigid segments.",
    imagePath: "/taglus pu flex.png",
    propertiesIntro:
      "Investigated using ASTM D 638: 2014. Taglus® PU Flex demonstrates high tensile stress at break (~61 MPa), offering ideal balance between flexibility and rigidity.",
    testingNote:
      "The test was performed by an NABL accredited laboratory complying with ISO/IEC 17025 Laboratory Management System.",
    features: [
      {
        title: "HIGHLY FLEXIBLE",
        description: "Unique polymer formulation results in higher toughness yet significantly more flexibility for patient comfort.",
      },
      {
        title: "COMFORTABLE AND DURABLE",
        description: "High value of elongation at break dramatically reduces the risk of aligner cracks and premature clinical failure.",
      },
      {
        title: "SUSTAINED KINETIC FORCES",
        description: "Delivers sustained orthodontic forces over treatment periods without rapid relaxation degradation.",
      },
      {
        title: "EXCELLENT ADAPTATION",
        description: "Precise thermoforming adaptation into interproximal dental areas without thinning excessively.",
      },
    ],
    propertiesList: [
      { label: "Tensile Stress at Break", value: "~61 MPa" },
      { label: "Initial Force Vector", value: "~20% Initial Force Generation" },
      { label: "Elongation at Break", value: "High plastic deformation tolerance" },
    ],
    sizes: {
      roundDimensions: ["120 mm", "125 mm"],
      squareDimensions: ["125 mm x 125 mm"],
      thicknesses: ["0.45 mm", "0.76 mm", "1.02 mm"],
    },
    faqs: [
      {
        question: "What makes Taglus PU Flex different?",
        answer: "Taglus PU Flex combines elastomeric polyurethane segments that absorb masticatory stress while applying continuous biological force to target tooth positions.",
      },
      {
        question: "Is it suitable for severe misalignments?",
        answer: "Yes, its high elasticity allows it to engage deep undercuts without tearing or causing excessive patient discomfort.",
      },
    ],
  },
  {
    slug: "taglus-tuff",
    name: "TAGLUS® TUFF",
    tagline: "Revolutionary engineered plastic for Retainers",
    category: "BREAK-RESISTANT RETAINER MATERIAL",
    overview:
      "Taglus® Tuff is an uniaxially oriented amorphous material with polymer chains locked together in a non-specific lattice structure to maximize durability.",
    imagePath: "/tuff.png",
    propertiesIntro:
      "Standardized tests under ASTM D 638: 2014 demonstrate that TAGLUS Tuff sheets achieve exceptional break strength.",
    testingNote:
      "Tested by an NABL accredited laboratory complying with ISO/IEC 17025 Laboratory Management System.",
    features: [
      {
        title: "ULTRA THIN PROFILE",
        description: "Delivers maximum retention strength with an ultra-thin 0.80 mm profile.",
      },
      {
        title: "HIGH BREAK RESISTANCE",
        description: "High break strength of 59 MPa prevents accidental fractures during long-term retainer wear.",
      },
      {
        title: "BRUXISM DEFENSE",
        description: "Amorphous lattice structure engineered to resist nocturnal grind wear and surface micro-cracking.",
      },
      {
        title: "DIMENSIONAL STABILITY",
        description: "Zero moisture absorption retention maintaining shape integrity across extended clinical retention cycles.",
      },
    ],
    propertiesList: [
      { label: "Tensile Stress at Break", value: "59 MPa" },
      { label: "Yield Strength", value: "41 MPa" },
      { label: "Standard Test", value: "ASTM D 638: 2014" },
    ],
    sizes: {
      roundDimensions: ["120 mm", "125 mm"],
      squareDimensions: ["125 mm x 125 mm"],
      thicknesses: ["0.80 mm", "1.00 mm"],
    },
    faqs: [
      {
        question: "What makes Taglus Tuff ideal for retainers?",
        answer: "Its uniaxially oriented amorphous formulation gives it superior fracture resistance, making it virtually indestructible under normal retainer wear and nocturnal bruxism.",
      },
      {
        question: "How long can a patient wear a Taglus Tuff retainer?",
        answer: "Because of its high molecular stability and resistance to intraoral moisture, retainers made with Taglus Tuff maintain their fit and retention over long-term protocols.",
      },
    ],
  },
  {
    slug: "taglus-model-resin",
    name: "TAGLUS 3D PRINT MODEL RESIN",
    tagline: "High-precision DLP/LCD 3D printing resin with smooth matte finish for dental models",
    category: "3D PRINTING DENTAL RESIN",
    overview:
      "Taglus Model Resin is engineered for high-precision, high-accuracy digital dental model making. Featuring high form and break stability, it offers superior resistance to abrasion, moisture, and light, making it the ideal choice for aligner, orthodontic, and crown & bridge models.",
    imagePath: "/taglus-model-risen-btl.png",
    propertiesIntro:
      "Formulated for open DLP, LCD, and SLA printers operating between 385nm and 405nm. Delivers crisp margins, non-brittle toughness, and optimal thermal resistance during thermoforming.",
    testingNote:
      "Benchmarked and tested for rigorous orthodontic workflows and high-speed thermoforming protocols.",
    features: [
      {
        title: "LIQUID & LOW VISCOSITY",
        description: "Easy to clean with low viscosity, enabling faster tank resets and smooth resin flow.",
      },
      {
        title: "ODOURLESS & SAFE",
        description: "No irritating fumes or volatile monomers. Safe and comfortable laboratory working environment.",
      },
      {
        title: "MINIMAL SHRINKAGE",
        description: "Exceptional dimensional accuracy with minimal shrinkage post-curing for exact orthodontic fits.",
      },
      {
        title: "HARD BUT TOUGH",
        description: "Not brittle. Easily withstands high thermoforming pressures, high impact forces, and drills.",
      },
      {
        title: "HEAT & MOISTURE RESISTANT",
        description: "Maintains high structural integrity and zero deformation under aligner pressure thermoforming.",
      },
      {
        title: "COST EFFECTIVE",
        description: "Affordable digital dental production solution designed for commercial labs and clinical workflows.",
      },
    ],
    propertiesList: [
      { label: "Hardness", value: "105 on R Scale" },
      { label: "Flexural Modulus of Elasticity", value: "10,433 KGF/CM²" },
      { label: "Tensile Strength", value: "205 KGF/CM²" },
      { label: "Viscosity", value: "300 mPa.s" },
      { label: "Technology", value: "DLP / LCD / SLA (385nm - 405nm)" },
      { label: "Volume / Net Weight", value: "1000g (1 Kg)" },
    ],
    sizes: {
      roundDimensions: ["1000g Bottle"],
      squareDimensions: ["1 Kg Pack"],
      thicknesses: ["Standard Viscosity"],
    },
    faqs: [
      {
        question: "Which 3D printers are compatible with Taglus Model Resin?",
        answer: "Taglus Model Resin works seamlessly with standard open-material DLP, LCD, and SLA 3D printers operating at 385nm to 405nm wavelengths.",
      },
      {
        question: "Can Taglus printed models withstand aligner thermoforming?",
        answer: "Yes, it is specially formulated with high heat and pressure resistance so models won't warp or deform during vacuum and pressure forming.",
      },
    ],
  },
  {
    slug: "taglus-autoform-roll",
    name: "TAGLUS AUTOMATED THERMOFORMING MACHINE ROLL",
    tagline: "Increase production capacity while reducing material cost up to 73%",
    category: "THERMOFORMING EQUIPMENT & ROLLS",
    overview:
      "Taglus aligner and retainer rolls are engineered specifically for automated high-speed thermoforming machines. Validated by industry-leading equipment including HAMER and ALVY Systems, they deliver consistent optical clarity, zero-stress thermoforming, and precision clinical adaptation across large-scale aligner production lines.",
    imagePath: "/trim-1.png",
    propertiesIntro:
      "Engineered to withstand rigorous automated feed cycles and high-pressure forming without thinning or thermal stress fractures.",
    testingNote:
      "Validated and certified by HAMER and ALVY Systems for automated thermoforming operations.",
    features: [
      {
        title: "INTERNATIONALLY CERTIFIED MATERIAL",
        description:
          "Manufactured under ISO 13485:2016 standards with global biocompatibility approvals for aligner manufacturing.",
      },
      {
        title: "AVAILABLE IN PU & PETG",
        description:
          "Offered across our entire material science portfolio including Taglus PU Flex, Premium, Standard, and TUFF formulations.",
      },
      {
        title: "HIGH-PRESSURE OPTIMIZATION",
        description:
          "Engineered specifically to produce uniform wall thickness and crisp margins under positive pressure forming systems.",
      },
      {
        title: "UP TO 73% COST REDUCTION",
        description:
          "Continuous roll-fed automation eliminates individual sheet handling, maximizing operational yield and drastically cutting per-aligner material waste.",
      },
    ],
    propertiesList: [
      { label: "Validated Systems", value: "HAMER & ALVY Systems" },
      { label: "Thickness Options", value: "0.76 mm, 0.80 mm, 1.02 mm" },
      { label: "Material Variants", value: "PU Flex, Premium, Standard, TUFF" },
      { label: "Feed System", value: "Automated Continuous Web-Roll" },
    ],
    sizes: {
      roundDimensions: ["Continuous Web Roll"],
      squareDimensions: ["Custom Roll Diameters"],
      thicknesses: ["0.76 mm", "0.80 mm", "1.02 mm"],
    },
    faqs: [
      {
        question: "Which automated thermoforming machines are compatible with Taglus rolls?",
        answer:
          "Taglus Automated Thermoforming Rolls are officially validated and optimized for HAMER, ALVY Systems, and other high-volume automated pressure forming equipment.",
      },
      {
        question: "What material formulations are available in roll format?",
        answer:
          "Rolls are available in Taglus PU Flex (0.76 mm & 1.02 mm), Taglus Premium (0.76 mm & 1.02 mm), Taglus Standard (0.76 mm & 1.02 mm), and Taglus TUFF (0.80 mm).",
      },
    ],
  },
  {
    slug: "taglus-orthodontic-accessories",
    name: "TAGLUS ORTHODONTIC ACCESSORIES & CONSUMABLES",
    tagline: "Essential chairside tools, branded packaging, and dental lab accessories",
    category: "ORTHODONTIC ACCESSORIES",
    overview:
      "A complete suite of orthodontic delivery essentials and chairside accessories: Retainer Boxes, Aligner Chewies, Removal Tools, Pillow Boxes, and Articulators.",
    imagePath: "/acesories-1.jpeg",
    propertiesIntro: "Medical-grade polymers and precision engineering for orthodontic clinics.",
    testingNote: "Biocompatible and clinically evaluated.",
    features: [],
    propertiesList: [],
    sizes: {
      roundDimensions: [],
      squareDimensions: [],
      thicknesses: [],
    },
    faqs: [],
  },
];

async function main() {
  console.log("Seeding complete product data...");

  for (const item of products) {
    await prisma.product.upsert({
      where: { slug: item.slug },
      update: item as Prisma.ProductUpdateInput,
      create: item as Prisma.ProductCreateInput,
    });
  }

  console.log("Done! All 6 products updated with full features, FAQs, and image paths.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });