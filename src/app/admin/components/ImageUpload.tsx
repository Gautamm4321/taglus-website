"use client";

import { useRef, useState } from "react";
import { uploadImage } from "../../actions/uploadActions";
import { inputClass } from "./ui";

const MAX_MB = 5;

export default function ImageUpload({
  value,
  onChange,
  folder,
}: {
  value: string;
  onChange: (url: string) => void;
  folder: "products" | "events" | "blog";
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showManual, setShowManual] = useState(false);

  async function handleFile(file: File) {
    setError(null);
    if (file.size > MAX_MB * 1024 * 1024) return setError(`Image must be smaller than ${MAX_MB} MB.`);

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);
      const res = await uploadImage(fd);
      if (res.ok) onChange(res.url);
      else setError(res.error);
    } catch {
      setError("Upload failed. Please check your connection and try again.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-4">
        <div className="h-28 w-28 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#101b38] flex items-center justify-center">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="Preview" className="h-full w-full object-contain" />
          ) : (
            <span className="text-xs text-gray-500">No image</span>
          )}
        </div>

        <div className="space-y-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
              className="px-4 py-2 rounded-lg bg-[#D4AF37] text-black text-sm font-semibold hover:bg-[#c29f2f] disabled:opacity-50"
            >
              {uploading ? "Uploading…" : value ? "Replace image" : "Upload image"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="px-4 py-2 rounded-lg border border-white/10 text-sm text-red-300 hover:bg-red-500/10"
              >
                Remove
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500">JPG, PNG, WEBP or AVIF · max {MAX_MB} MB · transparent PNG works best for products</p>
          <button type="button" onClick={() => setShowManual((s) => !s)} className="text-xs text-blue-400 hover:underline">
            {showManual ? "Hide" : "Or enter an image path / URL"}
          </button>
        </div>
      </div>

      {showManual && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/tuff.png or https://…"
          className={inputClass}
        />
      )}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
