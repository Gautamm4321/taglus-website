// Run ONCE:  npx tsx prisma/seed-events.ts
// Adds 2 upcoming + 5 past events. Safe to run again: it updates events with the same slug
// instead of creating duplicates. Everything can be edited later in Admin → Events.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const d = (yyyyMmDd: string) => new Date(`${yyyyMmDd}T00:00:00.000Z`);
const CONTACT = "To book a meeting with our team, email info@taglus.com or message us on WhatsApp.";
const WHATSAPP = "https://wa.me/919930905047";

const events = [
  /* ---------------- UPCOMING ---------------- */
  {
    slug: "aeedc-dubai-2027",
    title: "Taglus at AEEDC Dubai 2027",
    startDate: d("2027-01-19"),
    endDate: d("2027-01-21"),
    location: "Dubai World Trade Centre (DWTC), Dubai, UAE",
    description: [
      "Taglus returns to AEEDC Dubai, one of the world's largest annual scientific dental conferences and exhibitions.",
      "Visit us to explore our aligner and retainer sheets, 3D printing resins, thermoforming machines and orthodontic accessories, and talk to our specialists about precision, workflow efficiency and patient outcomes.",
      CONTACT,
    ].join("\n\n"),
    imagePath: null,
    registrationUrl: WHATSAPP,
  },
  {
    slug: "ids-2027-cologne",
    title: "Taglus at IDS 2027, Cologne",
    startDate: d("2027-03-16"),
    endDate: d("2027-03-20"),
    location: "Koelnmesse, Messegelände Köln-Deutz, Cologne, Germany",
    description: [
      "Meet Taglus at IDS 2027, the International Dental Show in Cologne, the world's leading dental trade fair held every two years.",
      "See our complete digital orthodontic workflow, from 3D printing resins and thermoforming sheets to thermoforming machines and finishing accessories, and discuss new opportunities with our team.",
      CONTACT,
    ].join("\n\n"),
    imagePath: null,
    registrationUrl: WHATSAPP,
  },

  /* ---------------- PAST (from the current taglus.com events page) ---------------- */
  {
    slug: "aeedc-dubai-2026",
    title: "Taglus at the 30th Edition of AEEDC Dubai",
    startDate: d("2026-01-19"),
    endDate: d("2026-01-21"),
    location: "Dubai World Trade Centre, Dubai, UAE",
    description: [
      "Taglus exhibited at Booth 2D08 at the 30th edition of AEEDC Dubai, the world's largest annual scientific dental conference and exhibition.",
      "Visitors saw our latest orthodontic and aligner solutions through live demonstrations, and met our experts to discuss workflow efficiency, precision and patient outcomes.",
    ].join("\n\n"),
    imagePath: "https://www.taglus.com/wp-content/uploads/2025/11/Image.png",
    registrationUrl: null,
  },
  {
    slug: "aao-2025-philadelphia",
    title: "Taglus at AAO 2025 – A Grand Celebration of Orthodontics",
    startDate: d("2025-04-25"),
    endDate: d("2025-04-27"),
    location: "Pennsylvania Convention Center, Philadelphia, PA, USA",
    description: [
      "Taglus took part in the American Association of Orthodontists (AAO) 2025 Annual Session at Booth #1043.",
      "We showcased our complete range for thermoforming workflows: thermoforming sheets, 3D printing resins, thermoforming machines and orthodontic accessories for practices and labs.",
    ].join("\n\n"),
    imagePath: "https://www.taglus.com/wp-content/uploads/2025/03/AAO.April1_.jpeg",
    registrationUrl: null,
  },
  {
    slug: "ids-2025-cologne",
    title: "Taglus at IDS 2025 – Leading Dental Business Summit",
    startDate: d("2025-03-25"),
    endDate: d("2025-03-29"),
    location: "Koelnmesse Exhibition Center, Cologne, Germany",
    description: [
      "Taglus exhibited at the 41st International Dental Show (IDS) in Cologne, at Hall 2.2, Stand E040.",
      "Visitors explored our thermoforming sheets, 3D printing resins and thermoforming solutions, and met our team to discuss new possibilities for dental professionals.",
    ].join("\n\n"),
    imagePath: "https://www.taglus.com/wp-content/uploads/2025/03/Event-page.jpeg",
    registrationUrl: null,
  },
  {
    slug: "aeedc-dubai-2025",
    title: "Taglus at AEEDC Dubai 2025",
    startDate: d("2025-02-04"),
    endDate: d("2025-02-06"),
    location: "Dubai World Trade Centre, Dubai, UAE",
    description: [
      "Taglus took part in the 29th edition of AEEDC Dubai at Booth 2D08.",
      "We presented our aligner sheets, thermoforming machines and accessories, and connected with industry leaders on advances in orthodontic technology and aligner production.",
    ].join("\n\n"),
    imagePath: "https://www.taglus.com/wp-content/uploads/2025/01/thumbnail-3.jpeg",
    registrationUrl: null,
  },
  {
    slug: "aao-winter-conference-2025",
    title: "Taglus at the AAO Winter Conference 2025",
    startDate: d("2025-01-24"),
    endDate: d("2025-01-26"),
    location: "Marco Island, Florida, USA",
    description: [
      "Taglus joined the AAO Winter Conference 2025, focused on interdisciplinary orthodontic techniques and innovative patient management, at Booth No. 100.",
      "Attendees learned about our advanced aligner and retainer thermoplastic materials and how they can be tailored to each practice's needs.",
    ].join("\n\n"),
    imagePath: "https://www.taglus.com/wp-content/uploads/2024/12/WhatsApp-Image-2024-12-30-at-12.11.48-PM.jpeg",
    registrationUrl: null,
  },
];

async function main() {
  for (const e of events) {
    const data = { ...e, published: true };
    await prisma.event.upsert({ where: { slug: e.slug }, update: data, create: data });
    console.log(`✓ ${e.startDate.toISOString().slice(0, 10)}  ${e.title}`);
  }
  console.log(`Done. ${events.length} events saved.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
