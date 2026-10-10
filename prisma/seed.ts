import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
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
];

async function main() {
  console.log("Seeding complete product data...");

  for (const item of products) {
    await prisma.product.upsert({
      where: { slug: item.slug },
      update: item,
      create: item,
    });
  }

  console.log("Done! All 3 products updated with full features, FAQs, and image paths.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });