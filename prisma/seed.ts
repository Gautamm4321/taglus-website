import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    slug: "taglus-premium",
    name: "TAGLUS PREMIUM",
    tagline: "Superior material properties and enhanced esthetics",
    category: "Aligner & Retainer Material",
    overview:
      "Taglus Premium is an innovative aligner and retainer material with superior material properties and enhanced esthetics. As a unique engineering combination of elasticity with matchless rigidity and crack resistance, it offers optical clarity along with stain resistance.",
    imagePath: "/products/premium-box.png",
    propertiesIntro:
      "In applications where plastic films are designed to withstand orthodontic forces in an aligner, the mechanical properties of polymers namely Strength, Stiffness & Toughness play a vital role. TAGLUS Premium is a unique balance of rigidity with elasticity.",
    testingNote:
      "The test was performed by an NABL accredited Laboratory complying with ISO/IEC 17025 Laboratory Management System.",
    features: [
      {
        title: "Ultra-Transparent Sheets",
        description: "Light transmission of 91% as per ASTM D1003 for high cosmetic clarity.",
      },
      {
        title: "Best-in-class mechanical properties",
        description: "High tensile modulus and balanced flexural strength preventing crack formation.",
      },
      {
        title: "Predictable tooth movement",
        description: "Delivers gentle yet consistent sustained force vectors over treatment duration.",
      },
      {
        title: "Dual Protective Masking",
        description: "Ultra-thin peel-away masking on both sides ensures pristine surface finish during thermoforming.",
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
        answer:
          "With intact protective masking and standard dry storage conditions, Taglus Premium maintains optimal material integrity.",
      },
      {
        question: "Is Taglus Premium distributed globally?",
        answer:
          "Yes, Taglus products are distributed across 70+ countries worldwide through our authorized global distributor network.",
      },
    ],
  },
  {
    slug: "taglus-pu-flex",
    name: "TAGLUS® PU FLEX",
    tagline: "Smartest material properties and enhanced esthetics",
    category: "Polyurethane Aligner & Retainer Material",
    overview:
      "Taglus® PU Flex is a homogeneous polyurethane sheet that consists of linear polymeric chains made of alternating flexible and rigid segments.",
    imagePath: "/products/taglus-pu-flex.png",
    propertiesIntro:
      "Investigated using ASTM D 638: 2014, Taglus® PU Flex demonstrates high tensile stress at break (~61 MPa), offering ideal balance between flexibility and rigidity.",
    testingNote:
      "The test was performed by an NABL accredited Laboratory complying with ISO/IEC 17025 Laboratory Management System.",
    features: [
      {
        title: "Highly Flexible",
        description: "Unique polymer formulation results in higher toughness yet significantly more flexibility for patient comfort.",
      },
      {
        title: "Comfortable and Durable",
        description: "High value of elongation at break dramatically reduces the risk of aligner cracks and premature clinical failure.",
      },
    ],
    propertiesList: [
      { label: "Tensile Stress at Break", value: "~61 MPa" },
      { label: "Initial Force Vector", value: "+20% Initial Force Generation" },
      { label: "Elongation at Break", value: "High plastic deformation tolerance" },
    ],
    sizes: {
      roundDimensions: ["120 mm", "125 mm"],
      squareDimensions: [],
      thicknesses: ["0.45 mm", "0.76 mm", "1.02 mm"],
    },
    faqs: [
      {
        question: "What makes Taglus PU Flex different?",
        answer:
          "Its alternating flexible and rigid polyurethane block segments allow sustained low-force application with high crack resistance.",
      },
    ],
  },
  {
    slug: "taglus-tuff",
    name: "TAGLUS® TUFF",
    tagline: "Revolutionary engineered plastic for Retainers",
    category: "Break-Resistant Retainer Material",
    overview:
      "Taglus® Tuff is an uniaxially oriented amorphous material with polymer chains locked together in a non-specific lattice structure to maximize durability.",
    imagePath: "/products/taglus-tuff.jpeg",
    propertiesIntro:
      "Standardized tests under ASTM D 638: 2014 demonstrate that TAGLUS Tuff sheets achieve exceptional break strength.",
    testingNote:
      "Tested by an NABL accredited Laboratory complying with ISO/IEC 17025 Laboratory Management System.",
    features: [
      {
        title: "Ultra Thin Profile",
        description: "Delivers maximum retention strength with an ultra-thin 0.80mm profile.",
      },
      {
        title: "High Break Resistance",
        description: "High break strength of 59 MPa prevents accidental fractures during long-term retainer wear.",
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
      thicknesses: ["0.80 mm"],
    },
    faqs: [
      {
        question: "What makes Taglus Tuff ideal for retainers?",
        answer:
          "Its engineered lattice structure provides superior crack resistance against grinding forces compared to standard PET-G.",
      },
    ],
  },
];

async function main() {
  console.log("Seeding products into MySQL...");
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log("All products successfully seeded into MySQL!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });