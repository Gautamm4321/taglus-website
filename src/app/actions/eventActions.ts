"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../lib/auth";
import { eventSchema, zodToResult, type ActionResult, type EventInput } from "../lib/validation";

const toUtcDate = (yyyyMmDd: string) => new Date(`${yyyyMmDd}T00:00:00.000Z`);

export async function saveEvent(id: number | null, input: EventInput): Promise<ActionResult> {
  await requireAdmin();

  const parsed = eventSchema.safeParse(input);
  if (!parsed.success) return zodToResult(parsed.error);

  const d = parsed.data;
  const data = {
    ...d,
    startDate: toUtcDate(d.startDate),
    endDate: d.endDate ? toUtcDate(d.endDate) : null,
  };

  try {
    const saved = id
      ? await prisma.event.update({ where: { id }, data })
      : await prisma.event.create({ data });
    revalidatePath("/", "layout");
    return { ok: true, id: saved.id };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return {
        ok: false,
        error: "Please fix the highlighted fields.",
        fieldErrors: { slug: "Another event already uses this URL slug." },
      };
    }
    console.error("saveEvent failed:", e);
    return { ok: false, error: "Something went wrong while saving. Please try again." };
  }
}

export async function deleteEvent(id: number): Promise<ActionResult> {
  await requireAdmin();
  await prisma.event.deleteMany({ where: { id } });
  revalidatePath("/", "layout");
  return { ok: true };
}
