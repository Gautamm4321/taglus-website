"use server";

import { createHash } from "crypto";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../lib/auth";
import { sendEnquiryEmail } from "../lib/mailer";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; error: string; fieldErrors?: Record<string, string> };

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120, "Name is too long."),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address.").max(191),
  subject: z.string().trim().min(2, "Please enter a subject.").max(200, "Subject is too long."),
  message: z.string().trim().min(10, "Please write a few more words (at least 10 characters).").max(5000, "Message is too long."),
});

const MAX_PER_HOUR = 5;

export async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real visitors never fill this hidden field
  if (String(formData.get("company_website") ?? "").trim() !== "") return { status: "success" };

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", error: "Please check the highlighted fields.", fieldErrors };
  }

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  const ipHash = createHash("sha256").update(`${ip}:${process.env.AUTH_SECRET ?? ""}`).digest("hex");

  try {
    const recent = await prisma.contactMessage.count({
      where: { ipHash, createdAt: { gte: new Date(Date.now() - 60 * 60 * 1000) } },
    });
    if (recent >= MAX_PER_HOUR) {
      return { status: "error", error: "You've sent several messages already. Please try again later or email info@taglus.com." };
    }
    await prisma.contactMessage.create({ data: { ...parsed.data, ipHash } });
    revalidatePath("/admin/messages");
    // Email the business inbox after the visitor gets their response. If email fails,
    // the enquiry is still safe in Admin → Messages.
    const enquiry = parsed.data;
    after(async () => {
      try {
        await sendEnquiryEmail(enquiry);
      } catch (e) {
        console.error("Contact enquiry email failed:", e);
      }
    });
    return { status: "success" };
  } catch (e) {
    console.error("sendContactMessage failed:", e);
    return {
      status: "error",
      error: "Sorry, your message could not be sent right now. Please email info@taglus.com or WhatsApp +91 99309 05047.",
    };
  }
}

export async function setMessageRead(id: number, read: boolean) {
  await requireAdmin();
  await prisma.contactMessage.update({ where: { id }, data: { read } });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: number) {
  await requireAdmin();
  try {
    await prisma.contactMessage.delete({ where: { id } });
  } catch {
    return { ok: false as const, error: "Could not delete the message." };
  }
  revalidatePath("/admin/messages");
  return { ok: true as const };
}
