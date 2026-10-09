"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { upsertProduct } from "../../actions/productActions";

interface ProductFormProps {
  initialData?: any;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form states
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [name, setName] = useState(initialData?.name || "");
  const [tagline, setTagline] = useState(initialData?.tagline || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [overview, setOverview] = useState(initialData?.overview || "");
  const [imagePath, setImagePath] = useState(initialData?.imagePath || "");
  const [propertiesIntro, setPropertiesIntro] = useState(initialData?.propertiesIntro || "");
  const [testingNote, setTestingNote] = useState(initialData?.testingNote || "");

  // Structured JSON fields (string format for easy edit)
  const [features, setFeatures] = useState(
    JSON.stringify(initialData?.features || [
      { title: "Sample Feature", description: "Sample feature description" }
    ], null, 2)
  );

  const [propertiesList, setPropertiesList] = useState(
    JSON.stringify(initialData?.propertiesList || [
      { label: "Tensile Strength", value: "High Grade" }
    ], null, 2)
  );

  const [sizes, setSizes] = useState(
    JSON.stringify(initialData?.sizes || {
      roundDimensions: ["120 mm", "125 mm"],
      squareDimensions: ["125 mm x 125 mm"],
      thicknesses: ["0.80 mm", "1.00 mm"]
    }, null, 2)
  );

  const [faqs, setFaqs] = useState(
    JSON.stringify(initialData?.faqs || [
      { question: "What is this product for?", answer: "Used for orthodontic retainers and aligners." }
    ], null, 2)
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (initialData?.id) formData.append("id", initialData.id.toString());
    formData.append("slug", slug);
    formData.append("name", name);
    formData.append("tagline", tagline);
    formData.append("category", category);
    formData.append("overview", overview);
    formData.append("imagePath", imagePath);
    formData.append("propertiesIntro", propertiesIntro);
    formData.append("testingNote", testingNote);
    formData.append("features", features);
    formData.append("propertiesList", propertiesList);
    formData.append("sizes", sizes);
    formData.append("faqs", faqs);

    const res = await upsertProduct(formData);
    setLoading(false);

    if (res?.success) {
      router.push("/admin");
      router.refresh();
    } else {
      alert("Error saving product!");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl bg-[#0b1329] p-8 rounded-xl border border-white/10 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Product Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#101b38] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
            placeholder="e.g. TAGLUS ULTRA"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">URL Slug</label>
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
            className="w-full bg-[#101b38] border border-white/10 rounded-lg px-4 py-2 text-white font-mono focus:outline-none focus:border-[#D4AF37]"
            placeholder="e.g. taglus-ultra"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Tagline</label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full bg-[#101b38] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
            placeholder="Next-gen polymer toughness"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-[#101b38] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
            placeholder="Aligner & Retainer Material"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Image Path / URL</label>
        <input
          type="text"
          value={imagePath}
          onChange={(e) => setImagePath(e.target.value)}
          className="w-full bg-[#101b38] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
          placeholder="/products/premium-box.png"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Overview Description</label>
        <textarea
          rows={3}
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
          className="w-full bg-[#101b38] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
          placeholder="Brief description of the material..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Properties Introduction</label>
          <textarea
            rows={2}
            value={propertiesIntro}
            onChange={(e) => setPropertiesIntro(e.target.value)}
            className="w-full bg-[#101b38] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Testing Note</label>
          <textarea
            rows={2}
            value={testingNote}
            onChange={(e) => setTestingNote(e.target.value)}
            className="w-full bg-[#101b38] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/10 pt-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Features (JSON)</label>
          <textarea
            rows={5}
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="w-full bg-[#101b38] border border-white/10 rounded-lg p-3 text-xs font-mono text-gray-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Properties List (JSON)</label>
          <textarea
            rows={5}
            value={propertiesList}
            onChange={(e) => setPropertiesList(e.target.value)}
            className="w-full bg-[#101b38] border border-white/10 rounded-lg p-3 text-xs font-mono text-gray-200"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#c29f2f] text-black font-semibold text-sm transition-colors shadow-md disabled:opacity-50"
        >
          {loading ? "Saving..." : initialData ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
}