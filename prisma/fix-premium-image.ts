// Run ONCE:  npx tsx prisma/fix-premium-image.ts
// Points Taglus Premium at the image file that actually exists in /public.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const res = await prisma.product.updateMany({
    where: { slug: "taglus-premium" },
    data: { imagePath: "/premium box.png" },
  });
  console.log(res.count ? "✓ Taglus Premium image set to /premium box.png" : "Product taglus-premium not found");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
