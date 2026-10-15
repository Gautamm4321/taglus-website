"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";

export async function deleteProduct(id: number) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/admin");
    revalidatePath("/products/[slug]", "page");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}

export async function upsertProduct(formData: FormData) {
  const id = formData.get("id") ? Number(formData.get("id")) : undefined;
  const slug = formData.get("slug") as string;
  const name = formData.get("name") as string;
  const tagline = formData.get("tagline") as string;
  const category = formData.get("category") as string;
  const overview = formData.get("overview") as string;
  const imagePath = formData.get("imagePath") as string;
  const propertiesIntro = formData.get("propertiesIntro") as string;
  const testingNote = formData.get("testingNote") as string;

  let features = [];
  let propertiesList = [];
  let sizes = null;
  let faqs = [];

  try {
    features = JSON.parse((formData.get("features") as string) || "[]");
  } catch {}
  try {
    propertiesList = JSON.parse((formData.get("propertiesList") as string) || "[]");
  } catch {}
  try {
    sizes = JSON.parse((formData.get("sizes") as string) || "null");
  } catch {}
  try {
    faqs = JSON.parse((formData.get("faqs") as string) || "[]");
  } catch {}

  const data = {
    slug,
    name,
    tagline,
    category,
    overview,
    imagePath,
    propertiesIntro,
    testingNote,
    features,
    propertiesList,
    sizes,
    faqs,
  };

  if (id) {
    await prisma.product.update({
      where: { id },
      data,
    });
  } else {
    await prisma.product.create({
      data,
    });
  }

  revalidatePath("/admin");
  revalidatePath(`/products/${slug}`);
  return { success: true };
}