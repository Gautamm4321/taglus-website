"use server";

import { requireAdmin } from "../lib/auth";
import { uploadImageBuffer } from "../lib/upload";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
const ALLOWED_FOLDERS = ["products", "events", "blog"];
const MAX_UPLOAD_MB = 5; // "use server" files may only export async functions

export async function uploadImage(
  formData: FormData
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  await requireAdmin();

  const file = formData.get("file");
  const folder = String(formData.get("folder") ?? "products");

  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "Please choose an image." };
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { ok: false, error: "Only JPG, PNG, WEBP, AVIF or GIF images are allowed." };
  }
  if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
    return { ok: false, error: `Image must be smaller than ${MAX_UPLOAD_MB} MB.` };
  }
  if (!ALLOWED_FOLDERS.includes(folder)) return { ok: false, error: "Invalid upload folder." };

  try {
    const url = await uploadImageBuffer(Buffer.from(await file.arrayBuffer()), `taglus/${folder}`);
    return { ok: true, url };
  } catch (e) {
    console.error("Image upload failed:", e);
    return { ok: false, error: "Upload failed. Please try again." };
  }
}
