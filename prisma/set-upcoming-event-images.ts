// Run ONCE:  npx tsx prisma/set-upcoming-event-images.ts
// Adds the poster images to the 2 upcoming 2027 events. Safe to run again.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const IMAGES: Record<string, string> = {
  "aeedc-dubai-2027": "/event-img1.jpeg",
  "ids-2027-cologne": "/event-img2.jpeg",
};

async function main() {
  for (const [slug, imagePath] of Object.entries(IMAGES)) {
    const res = await prisma.event.updateMany({ where: { slug }, data: { imagePath } });
    console.log(`${slug}: ${res.count ? "image set ✔" : "event not found ✘"}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
