"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../lib/auth";
import { productSchema, zodToResult, type ActionResult, type ProductInput } from "../lib/validation";

const isPrismaError = (e: unknown, code: string) =>
  e instanceof Prisma.PrismaClientKnownRequestError && e.code === code;

/** Refresh every page that might show products (product pages, menus, listings). */
function refreshSite() {
  revalidatePath("/", "layout");
}

export async function saveProduct(id: number | null, input: ProductInput): Promise<ActionResult> {
  await requireAdmin();

  const parsed = productSchema.safeParse(input);
  if (!parsed.success) return zodToResult(parsed.error);

  const { sizes, ...rest } = parsed.data;
  const data = { ...rest, sizes: sizes ?? Prisma.DbNull };

  try {
    const saved = id
      ? await prisma.product.update({ where: { id }, data })
      : await prisma.product.create({ data });
    refreshSite();
    return { ok: true, id: saved.id };
  } catch (e) {
    if (isPrismaError(e, "P2002")) {
      return {
        ok: false,
        error: "Please fix the highlighted fields.",
        fieldErrors: { slug: "Another product already uses this URL slug." },
      };
    }
    if (isPrismaError(e, "P2025")) return { ok: false, error: "This product no longer exists." };
    console.error("saveProduct failed:", e);
    return { ok: false, error: "Something went wrong while saving. Please try again." };
  }
}

export async function deleteProduct(id: number): Promise<ActionResult> {
  await requireAdmin();
  try {
    await prisma.product.delete({ where: { id } });
  } catch (e) {
    if (!isPrismaError(e, "P2025")) {
      console.error("deleteProduct failed:", e);
      return { ok: false, error: "Could not delete the product." };
    }
  }
  refreshSite();
  return { ok: true };
}

/** Copies a product as a hidden draft — the easiest way for a client to add a similar product. */
export async function duplicateProduct(id: number): Promise<ActionResult> {
  await requireAdmin();
  const original = await prisma.product.findUnique({ where: { id } });
  if (!original) return { ok: false, error: "Product not found." };

  let slug = `${original.slug}-copy`;
  for (let i = 2; await prisma.product.findUnique({ where: { slug }, select: { id: true } }); i++) {
    slug = `${original.slug}-copy-${i}`;
  }

  const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = original;
  const copy = await prisma.product.create({
    data: {
      ...rest,
      slug,
      name: `${original.name} (Copy)`,
      published: false,
      features: rest.features as Prisma.InputJsonValue,
      propertiesList: rest.propertiesList as Prisma.InputJsonValue,
      faqs: rest.faqs as Prisma.InputJsonValue,
      sizes: rest.sizes === null ? Prisma.DbNull : (rest.sizes as Prisma.InputJsonValue),
    },
  });
  refreshSite();
  return { ok: true, id: copy.id };
}
