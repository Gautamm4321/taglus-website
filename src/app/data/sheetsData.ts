export interface SheetFeature {
  title: string;
  description: string;
}

export interface SheetProperty {
  label: string;
  value: string;
}

export interface SheetFAQ {
  question: string;
  answer: string;
}

export interface SheetProduct {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  overview: string;
  imagePath: string;
  features: SheetFeature[];
  propertiesIntro: string;
  testingNote: string;
  propertiesList: SheetProperty[];
  sizes?: {
    roundDimensions: string[];
    squareDimensions: string[];
    thicknesses: string[];
  };
  faqs: SheetFAQ[];
}

export const SHEETS_DATA: Record<string, SheetProduct> = {
  "taglus-premium": {
    slug: "taglus-premium",
    name: "TAGLUS PREMIUM",
    tagline: "Superior material properties and enhanced esthetics",
    category: "Aligner & Retainer Material",
    overview:
      "Taglus Premium is an innovative aligner and retainer material with superior material properties and enhanced esthetics. As a unique engineering combination of elasticity with matchless rigidity and crack resistance, it offers the most optical clarity along with stain resistance for enhanced esthetics.",
    imagePath: "/premium box.png",
    features: [
      {
        title: "Ultra-Transparent Sheets",
        description:
          "Light transmission of Taglus premium as per ASTM D1003 is 91% makes it the most optically clear aligner material in its class.",
      },
      {
        title: "Best-in-class mechanical properties",
        description:
          "High tensile modulus, impact & flexural strength impart exceptional crack resistance and durability to aligners.",
      },
      {
        title: "Predictable tooth movement",
        description:
          "Gentle yet consistent sustained forces help in treating diverse orthodontic cases with high precision.",
      },
      {
        title: "Dual Protective masking",
        description:
          "Ultra-thin, peel away masking on both sides ensures that it remains scratch-proof, moisture resistant and promotes shelf life.",
      },
    ],
    propertiesIntro:
      "In applications where plastic films are designed to withstand orthodontic forces in an aligner, the mechanical properties of polymers namely Strength, Stiffness & Toughness play a vital role. Such properties of TAGLUS Premium sheets when investigated using standardised test methods, e.g. tensile stress as per ASTM D 638: 2014 by briefly applying load in one direction the approximate results and values observed during such test, demonstrate that TAGLUS Premium is a unique balance of rigidity with elasticity.",
    testingNote:
      "The test was performed by an NABL accredited Laboratory complying with ISO/IEC 17025 Laboratory Management System.",
    propertiesList: [
      { label: "Tensile Stress", value: "High Yield & Break Resistance" },
      { label: "Tensile Modulus", value: "Balanced Flexural Stiffness" },
      { label: "Optical Clarity", value: "91% Light Transmission (ASTM D1003)" },
      { label: "Standard Test", value: "ASTM D 638: 2014 Standardized" },
    ],
    sizes: {
      roundDimensions: ["125mm", "120mm"],
      squareDimensions: ["125mm x 125mm"],
      thicknesses: ["0.5 mm", "0.762 mm", "1.02 mm", "1.5 mm", "2.0 mm"],
    },
    faqs: [
      {
        question: "Is it clinically tested? How safe is it to use in the mouth?",
        answer:
          "Yes, Taglus Premium materials undergo rigorous biocompatibility testing compliant with ISO 10993 standards, ensuring non-cytotoxic and safe intraoral wear.",
      },
      {
        question:
          "What advantage does PETG material have over the traditional PET material used in other thermoformed/ thermoplastic sheets?",
        answer:
          "PET-G includes glycol modification that eliminates crystallization during rapid thermoforming, preserving optical clarity, high impact toughness, and preventing brittleness.",
      },
      {
        question: "How much effective tooth movement is possible when used for aligners?",
        answer:
          "Taglus Premium delivers gentle yet sustained continuous orthodontic force vectors, enabling predictable translational, rotational, and tipping tooth movements per staging plan.",
      },
      {
        question: "What are working codes for Taglus Premium?",
        answer:
          "Standard lab working codes follow ISO 13485 medical device tracking protocols, and each batch includes full traceability documentation.",
      },
      {
        question: "Do they offer any advantage when used for fabrication of surgical splints?",
        answer:
          "Yes, the high tensile modulus and crack resistance provide exceptional dimensional stability and bite resistance under occlusal loading.",
      },
      {
        question: "What does the peel away mask do?",
        answer:
          "The dual ultra-thin protective film prevents scratches, dust contamination, and atmospheric moisture absorption before thermoforming.",
      },
      {
        question: "What are the various commercially available dimensions and thicknesses of these sheets?",
        answer:
          "Available in both round (120mm, 125mm) and square formats with standard clinical thicknesses including 0.76mm, 0.80mm, and 1.0mm.",
      },
      {
        question: "Is it easily available all over?",
        answer:
          "Yes, Taglus products are distributed across 70+ countries worldwide through our authorized global distributor network.",
      },
      {
        question: "What is the shelf life of taglus premium?",
        answer:
          "With intact protective masking and standard dry storage conditions, Taglus Premium maintains optimal material integrity for up to 3 years from manufacture.",
      },
    ],
  },

  "taglus-pu-flex": {
    slug: "taglus-pu-flex",
    name: "TAGLUS PU FLEX",
    tagline: "Smartest material properties and enhanced esthetics",
    category: "Polyurethane Aligner & Retainer Material",
    overview:
      "Taglus® PU Flex is a homogeneous polyurethane sheet that consists of linear polymeric chains made of alternating flexible and rigid segments. It is a high-performance aligner and retainer material that provides excellent flexibility, strength, and durability, while also providing comfort for the wearer.",
    imagePath: "/taglus pu flex.png",
    features: [
      {
        title: "Highly Flexible",
        description:
          "Unique polymer formulation results in higher toughness yet significantly more flexibility for patient comfort.",
      },
      {
        title: "Comfortable and Durable",
        description:
          "High value of elongation at break dramatically reduces the risk of aligner cracks and premature clinical failure.",
      },
      {
        title: "Brilliant Wear & Tear Resistance",
        description:
          "Engineered for long-term wear to consistently withstand active masticatory and tooth-moving forces.",
      },
      {
        title: "Optimized Orthodontic Forces",
        description:
          "Generates 20% more initial forces versus traditional PU materials, enabling rapid and predictable initial alignment.",
      },
    ],
    propertiesIntro:
      "In applications where plastic films are designed to withstand orthodontic forces in an aligner, the mechanical properties of polymers namely Strength, Stiffness & Toughness play a vital role. Such properties of Taglus® PU Flex sheets when investigated using standardized test methods, e.g. tensile stress as per ASTM D 638: 2014 by briefly applying load in one direction the approximate results and values observed during such test, demonstrate that Taglus® PU Flex has the highest tensile stress at the break in its class approximately equal to 61 MPa. So, it is an optimal balance of rigidity with elasticity.",
    testingNote:
      "The test was performed by an NABL accredited Laboratory complying with ISO/IEC 17025 Laboratory Management System.",
    propertiesList: [
      { label: "Tensile Stress at Break", value: "~61 MPa (Class-Leading)" },
      { label: "Polymer Matrix", value: "Alternating Rigid & Flexible Segments" },
      { label: "Force Vector", value: "+20% Initial Force Generation" },
      { label: "Standardized Evaluation", value: "ASTM D 638: 2014 Standardized" },
    ],
    sizes: {
      roundDimensions: ["125mm", "120mm"],
      squareDimensions: [],
      thicknesses: ["0.45 mm", "0.76 mm", "1.02 mm"],
    },
    faqs: [
      {
        question: "What makes Taglus PU Flex different from PET-G materials?",
        answer:
          "Taglus PU Flex is manufactured from advanced medical-grade polyurethane elastomer chains rather than polyester, offering superior crack-resistance, elasticity, and prolonged continuous force delivery.",
      },
      {
        question: "How does the 20% higher initial force benefit clinical tooth movement?",
        answer:
          "The optimized elastic modulus delivers immediate gentle pressure without sharp force decay, ensuring predictable aligner seating and efficient movement in severe crowding cases.",
      },
      {
        question: "Is Taglus PU Flex biocompatible and safe for intraoral use?",
        answer:
          "Yes, it is thoroughly tested according to ISO 10993 cytotoxicity and sensitization standards, ensuring complete safety for long-term aligner and retainer wear.",
      },
      {
        question: "What forming parameters are recommended for PU Flex sheets?",
        answer:
          "PU Flex sheets require clean thermoforming conditions with standard pressure units (like Taglus Duoform) using calibrated heating cycles to maintain optical clarity.",
      },
      {
        question: "What thicknesses are available for Taglus PU Flex?",
        answer:
          "It is commercially supplied in 0.45mm, 0.76mm, and 1.02mm thickness options in standard round formats (120mm and 125mm).",
      },
    ],
  },

"taglus-tuff": {
    slug: "taglus-tuff",
    name: "TAGLUS® TUFF",
    tagline: "Revolutionary engineered plastic for Retainers",
    category: "Break-Resistant Retainer Material",
    overview:
      "Uniaxially oriented amorphous material with polymer chains locked together in a non-specific lattice structure. Our addition of special grade glycol to PET removes the hazing effect seen during heating and prevents undesirable crystallization, creating a more comfortable feel with unmatched break resistance.",
    imagePath: "/tuff.png", // ya public folder me jo TUFF ka exact image name ho (e.g. /tuff.png)
    features: [
      {
        title: "Ultra Thin Profile",
        description:
          "Taglus Tuff is an ultra-thin retainer sheet with 0.80mm thickness, providing maximum patient compliance and comfort.",
      },
      {
        title: "Ideal Mechanical Properties",
        description:
          "Significant high break strength of 59 MPa keeps the sheet from cracking, backed by 7% yield elongation for superior ductility.",
      },
      {
        title: "Predictable Retaining Force",
        description:
          "Delivers a consistent 41 MPa yield strength to reliably lock and retain final tooth positions post-treatment.",
      },
      {
        title: "Dual Protective Masking",
        description:
          "Ultra-thin peel-away masking on both surfaces ensures scratch-proofing, moisture resistance, and prolonged storage stability.",
      },
    ],
    propertiesIntro:
      "In applications where plastic films are designed to withstand orthodontic forces in an aligner or retainer, the mechanical properties of polymers namely Strength, Stiffness & Toughness play a vital role. Standardized tests under ASTM D 638: 2014 demonstrate that TAGLUS Tuff sheets achieve a unique balance of strength and toughness. Tested by an NABL accredited Laboratory complying with ISO/IEC 17025 Laboratory Management System.",
    testingNote:
      "Tested by an NABL accredited Laboratory complying with ISO/IEC 17025 Laboratory Management System.",
    propertiesList: [
      { label: "Tensile Stress at Break", value: "59 MPa (High Break Strength)" },
      { label: "Yield Strength", value: "41 MPa (Consistent Retention)" },
      { label: "Yield Elongation", value: "7% (High Ductility)" },
      { label: "Standardized Evaluation", value: "ASTM D 638: 2014 Standardized" },
    ],
    sizes: {
      roundDimensions: ["125mm", "120mm"],
      squareDimensions: ["125mm x 125mm"],
      thicknesses: ["0.80 mm"],
    },
    faqs: [
      {
        question: "Is it clinically tested? How safe is it to use in the mouth?",
        answer:
          "Yes, Taglus Tuff complies with ISO 10993 biocompatibility requirements, guaranteeing complete non-toxicity and patient safety for prolonged nocturnal and daytime retainer wear.",
      },
      {
        question: "What material is it made of?",
        answer:
          "It is made of uniaxially oriented amorphous PET modified with a proprietary glycol grade that eliminates hazing and prevents brittle crystallization during thermoforming.",
      },
      {
        question: "How strong is it? Does it crack under pressure or after biting?",
        answer:
          "With an exceptional break strength of 59 MPa and 7% elongation at yield, Taglus Tuff exhibits outstanding fracture toughness and impact resistance against heavy occlusal biting forces.",
      },
      {
        question: "What does the peel away mask do?",
        answer:
          "The dual-side peel-away protective masking shields the sheet surface from scratches, dirt, and ambient moisture absorption before and during processing.",
      },
      {
        question: "What are the various commercially available dimensions and thicknesses of these sheets?",
        answer:
          "Taglus Tuff is available in 120mm and 125mm round discs, as well as 125mm x 125mm square sheets, with a dedicated 0.80mm calibrated thickness profile.",
      },
      {
        question: "What are working codes for Taglus tuff ?",
        answer:
          "Working codes and batch traceability comply with ISO 13485 medical device quality systems, stamped clearly on each box for lab documentation.",
      },
      {
        question: "Is it easily available all over?",
        answer:
          "Yes, Taglus Tuff is globally supplied through Taglus's international distribution network across more than 70 countries.",
      },
      {
        question: "What’s the shelf life?",
        answer:
          "Under standard dry and temperature-controlled storage conditions, Taglus Tuff maintains optimum polymer performance for up to 3 years.",
      },
    ],
  },

};