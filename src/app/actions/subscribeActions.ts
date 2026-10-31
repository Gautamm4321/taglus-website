"use server";

import { createHash } from "crypto";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../lib/auth";

export type SubscribeState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; error: string; fieldErrors?: Record<string, string> };

// The pop-up only asks for an email; name / country / phone stay optional (saved empty)
const optional = (max: number) => z.string().trim().max(max).optional().default("");
const schema = z.object({
  name: optional(120),
  country: optional(100),
  phone: optional(40),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address.").max(191),
});

const MAX_PER_HOUR = 5;

/** "Join the Taglus Network" pop-up. Saves the sign-up; shows in Admin → Subscribers. */
export async function subscribe(_prev: SubscribeState, formData: FormData): Promise<SubscribeState> {
  // Honeypot: real visitors never fill this hidden field
  if (String(formData.get("company_website") ?? "").trim() !== "") return { status: "success" };

  const parsed = schema.safeParse({
    name: formData.get("name") ?? undefined,
    country: formData.get("country") ?? undefined,
    phone: formData.get("phone") ?? undefined,
    email: formData.get("email"),
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", error: fieldErrors.email ?? "Please check the highlighted fields.", fieldErrors };
  }

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  const ipHash = createHash("sha256").update(`${ip}:${process.env.AUTH_SECRET ?? ""}`).digest("hex");

  try {
    const recent = await prisma.subscriber.count({
      where: { ipHash, createdAt: { gte: new Date(Date.now() - 60 * 60 * 1000) } },
    });
    if (recent >= MAX_PER_HOUR) return { status: "error", error: "Too many sign-ups from this connection. Please try again later." };

    await prisma.subscriber.create({ data: { ...parsed.data, ipHash } });
    revalidatePath("/admin/subscribers");
    return { status: "success" };
  } catch (e) {
    // Already subscribed → treat as success (don't reveal who is on the list)
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") return { status: "success" };
    console.error("subscribe failed:", e);
    return { status: "error", error: "Sorry, something went wrong. Please try again in a moment." };
  }
}

export async function deleteSubscriber(id: number) {
  await requireAdmin();
  try {
    await prisma.subscriber.delete({ where: { id } });
  } catch {
    return { ok: false as const, error: "Could not delete this subscriber." };
  }
  revalidatePath("/admin/subscribers");
  return { ok: true as const };
}
