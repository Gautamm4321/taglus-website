// Shared by the admin forms (client) and the server actions (server).
// The server ALWAYS re-validates — never trust what the browser sends.
import { z } from "zod";

/* ---------- shared helpers ---------- */

export type ActionResult =
  | { ok: true; id?: number }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

export function zodToResult(error: z.ZodError): ActionResult {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.map(String).join(".");
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return { ok: false, error: "Please fix the highlighted fields.", fieldErrors };
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[®™©]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 150);
}

const text = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .max(max, `${label} must be ${max} characters or fewer.`);

const plainText = (label: string, max: number) =>
  z.string().trim().max(max, `${label} must be ${max} characters or fewer.`);

/** Empty string in the form becomes NULL in the database. */
const optionalText = (label: string, max: number) =>
  plainText(label, max).transform((v) => (v === "" ? null : v));

const slugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(2, "URL slug is required.")
  .max(150, "URL slug is too long.")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Use only lowercase letters, numbers and single hyphens (e.g. taglus-ultra)."
  );

const dateString = (label: string) =>
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, `${label} must be a valid date.`);

const optionalUrl = z
  .string()
  .trim()
  .refine((v) => v === "" || /^https?:\/\/\S+$/i.test(v), "Enter a full link starting with https://")
  .transform((v) => (v === "" ? null : v));

/* ---------- products ---------- */

export const PRODUCT_TEMPLATES = ["SHEET", "RESIN", "ROLL", "MACHINE", "ACCESSORIES"] as const;
export type ProductTemplateName = (typeof PRODUCT_TEMPLATES)[number];

export const TEMPLATE_LABELS: Record<ProductTemplateName, string> = {
  SHEET: "Sheet (aligner / retainer material)",
  RESIN: "Resin (3D printing)",
  ROLL: "Roll (automated thermoforming)",
  MACHINE: "Machine / equipment",
  ACCESSORIES: "Accessories showcase",
};

export const MENU_GROUPS = ["ALIGNER", "RETAINER", "AESTHETIC", "THERMOFORMING", "PRINTING", "ACCESSORIES"] as const;
export type MenuGroupName = (typeof MENU_GROUPS)[number];

export const MENU_GROUP_LABELS: Record<MenuGroupName, string> = {
  ALIGNER: "Aligner Materials",
  RETAINER: "Retainer & Splint",
  AESTHETIC: "Aesthetic & Interim",
  THERMOFORMING: "Thermoforming",
  PRINTING: "3D Printing",
  ACCESSORIES: "Accessories & Packaging",
};

/** Sensible menu column for a page layout, used to pre-fill new products. */
export const DEFAULT_MENU_GROUP: Record<ProductTemplateName, MenuGroupName> = {
  SHEET: "ALIGNER",
  RESIN: "PRINTING",
  ROLL: "THERMOFORMING",
  MACHINE: "THERMOFORMING",
  ACCESSORIES: "ACCESSORIES",
};

const stringList = z.array(z.string().trim().min(1).max(100)).max(50);

export const productSchema = z.object({
  name: text("Product name", 191),
  slug: slugSchema,
  template: z.enum(PRODUCT_TEMPLATES),
  category: text("Category", 191),
  tagline: plainText("Tagline", 500),
  imagePath: text("Product image", 1000),
  overview: text("Overview", 10000),
  propertiesIntro: plainText("Properties introduction", 10000),
  testingNote: plainText("Testing note", 5000),
  features: z
    .array(
      z.object({
        title: text("Feature title", 191),
        description: plainText("Feature description", 2000),
      })
    )
    .max(30),
  propertiesList: z
    .array(
      z.object({
        label: text("Property name", 191),
        value: text("Property value", 500),
      })
    )
    .max(50),
  sizes: z
    .object({
      roundDimensions: stringList,
      squareDimensions: stringList,
      thicknesses: stringList,
    })
    .nullable(),
  faqs: z
    .array(
      z.object({
        question: text("Question", 500),
        answer: text("Answer", 5000),
      })
    )
    .max(50),
  metaTitle: optionalText("SEO title", 191),
  metaDescription: optionalText("SEO description", 500),
  published: z.boolean(),
  menuGroup: z.enum(MENU_GROUPS).nullable(),
  menuTitle: optionalText("Menu name", 100),
  menuDescription: optionalText("Menu description", 160),
  sortOrder: z.number().int().min(0).max(100000),
});

export type ProductInput = z.input<typeof productSchema>;

/* ---------- events ---------- */

export const eventSchema = z
  .object({
    title: text("Title", 191),
    slug: slugSchema,
    startDate: dateString("Start date"),
    endDate: z.union([z.literal(""), dateString("End date")]),
    location: text("Location", 191),
    description: text("Description", 20000),
    imagePath: optionalText("Image", 1000),
    registrationUrl: optionalUrl,
    published: z.boolean(),
  })
  .refine((d) => d.endDate === "" || d.endDate >= d.startDate, {
    message: "End date can't be before the start date.",
    path: ["endDate"],
  });

export type EventInput = z.input<typeof eventSchema>;

/* ---------- blog ---------- */

export const blogSchema = z.object({
  title: text("Title", 191),
  slug: slugSchema,
  excerpt: optionalText("Excerpt", 1000),
  content: text("Content", 200000),
  imagePath: optionalText("Cover image", 1000),
  metaTitle: optionalText("SEO title", 191),
  metaDescription: optionalText("SEO description", 500),
  published: z.boolean(),
});

export type BlogInput = z.input<typeof blogSchema>;
