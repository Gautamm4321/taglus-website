"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../lib/auth";
import { blogSchema, zodToResult, type ActionResult, type BlogInput } from "../lib/validation";

export async function savePost(id: number | null, input: BlogInput): Promise<ActionResult> {
  await requireAdmin();

  const parsed = blogSchema.safeParse(input);
  if (!parsed.success) return zodToResult(parsed.error);
  const data = parsed.data;

  try {
    // Set publishedAt the first time a post goes live, and keep it after that.
    const existing = id
      ? await prisma.blog.findUnique({ where: { id }, select: { publishedAt: true } })
      : null;
    const publishedAt = data.published ? existing?.publishedAt ?? new Date() : existing?.publishedAt ?? null;

    const saved = id
      ? await prisma.blog.update({ where: { id }, data: { ...data, publishedAt } })
      : await prisma.blog.create({ data: { ...data, publishedAt } });
    revalidatePath("/", "layout");
    return { ok: true, id: saved.id };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return {
        ok: false,
        error: "Please fix the highlighted fields.",
        fieldErrors: { slug: "Another post already uses this URL slug." },
      };
    }
    console.error("savePost failed:", e);
    return { ok: false, error: "Something went wrong while saving. Please try again." };
  }
}

export async function deletePost(id: number): Promise<ActionResult> {
  await requireAdmin();
  await prisma.blog.deleteMany({ where: { id } });
  revalidatePath("/", "layout");
  return { ok: true };
}
