"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveProduct } from "../../actions/productActions";
import {
  PRODUCT_TEMPLATES,
  TEMPLATE_LABELS,
  slugify,
  type ProductInput,
  type ProductTemplateName,
  type MenuGroupName,
  DEFAULT_MENU_GROUP,
  MENU_GROUPS,
  MENU_GROUP_LABELS,
} from "../../lib/validation";
import { buttonPrimary, buttonSecondary, ErrorBanner, Field, inputClass, Section } from "../components/ui";
import RepeaterField from "../components/RepeaterField";
import StringListField from "../components/StringListField";
import ImageUpload from "../components/ImageUpload";

// New products start EMPTY — no sample FAQ / feature ever leaks onto the live site.
const EMPTY_PRODUCT: ProductInput = {
  name: "",
  slug: "",
  template: "SHEET",
  category: "",
  tagline: "",
  imagePath: "",
  overview: "",
  propertiesIntro: "",
  testingNote: "",
  features: [],
  propertiesList: [],
  sizes: null,
  faqs: [],
  audience: [],
  metaTitle: "",
  metaDescription: "",
  published: true,
  sortOrder: 0,
  menuGroup: DEFAULT_MENU_GROUP.SHEET,
  menuTitle: "",
  menuDescription: "",
};

const EMPTY_SIZES = { roundDimensions: [], squareDimensions: [], thicknesses: [] };

export default function ProductForm({
  productId,
  initialData,
  categories,
}: {
  productId?: number;
  initialData?: ProductInput;
  categories: string[];
}) {
  const router = useRouter();
  const isEdit = productId !== undefined;

  const [data, setData] = useState<ProductInput>(initialData ?? EMPTY_PRODUCT);
  const [slugEdited, setSlugEdited] = useState(isEdit);
  const [menuGroupEdited, setMenuGroupEdited] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const set = <K extends keyof ProductInput>(key: K, value: ProductInput[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const setSizes = (key: keyof typeof EMPTY_SIZES, values: string[]) =>
    setData((d) => ({ ...d, sizes: { ...(d.sizes ?? EMPTY_SIZES), [key]: values } }));

  const onNameChange = (name: string) =>
    setData((d) => ({ ...d, name, slug: slugEdited ? d.slug : slugify(name) }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setFieldErrors({});
    try {
      const res = await saveProduct(productId ?? null, data);
      if (res.ok) {
        router.push("/admin/products");
        router.refresh();
        return;
      }
      setError(res.error);
      setFieldErrors(res.fieldErrors ?? {});
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Could not save. Your login may have expired — open the CMS in a new tab, log in, then try again.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSaving(false);
    }
  }

  const fe = fieldErrors;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-24">
      <ErrorBanner message={error} />

      {/* ---------- Basics ---------- */}
      <Section title="Basic information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Product name" required error={fe.name}>
            <input
              type="text"
              value={data.name}
              onChange={(e) => onNameChange(e.target.value)}
              className={inputClass}
              placeholder="e.g. TAGLUS ULTRA"
            />
          </Field>

          <Field label="URL slug" required error={fe.slug} hint={`Page address: /products/${data.slug || "…"}`}>
            <input
              type="text"
              value={data.slug}
              onChange={(e) => {
                setSlugEdited(true);
                set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
              }}
              className={`${inputClass} font-mono`}
              placeholder="taglus-ultra"
            />
          </Field>

          <Field label="Page layout" required error={fe.template} hint="Controls which design the product page uses.">
            <select
              value={data.template}
              onChange={(e) => {
                const template = e.target.value as ProductTemplateName;
                // New product: suggest a matching menu column until the user picks one
                setData((d) => ({
                  ...d,
                  template,
                  menuGroup: menuGroupEdited ? d.menuGroup : DEFAULT_MENU_GROUP[template],
                }));
              }}
              className={inputClass}
            >
              {PRODUCT_TEMPLATES.map((t) => (
                <option key={t} value={t}>
                  {TEMPLATE_LABELS[t]}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Category" required error={fe.category} hint="Pick an existing one or type a new one.">
            <input
              type="text"
              list="product-categories"
              value={data.category}
              onChange={(e) => set("category", e.target.value)}
              className={inputClass}
              placeholder="Aligner & Retainer Material"
            />
            <datalist id="product-categories">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </Field>
        </div>

        <Field label="Tagline" error={fe.tagline}>
          <input
            type="text"
            value={data.tagline}
            onChange={(e) => set("tagline", e.target.value)}
            className={inputClass}
            placeholder="Superior material properties and enhanced esthetics"
          />
        </Field>

        <Field label="Product image" required error={fe.imagePath}>
          <ImageUpload value={data.imagePath} onChange={(url) => set("imagePath", url)} folder="products" />
        </Field>

        <Field label="Overview" required error={fe.overview}>
          <textarea
            rows={5}
            value={data.overview}
            onChange={(e) => set("overview", e.target.value)}
            className={inputClass}
            placeholder="Short description shown at the top of the product page…"
          />
        </Field>
      </Section>

      {/* ---------- Features ---------- */}
      <Section title="Key features" description="The highlight cards on the product page.">
        <RepeaterField
          items={data.features}
          onChange={(v) => set("features", v)}
          columns={[
            { key: "title", label: "Title", placeholder: "Ultra-Transparent Sheets" },
            { key: "description", label: "Description", multiline: true },
          ]}
          emptyRow={{ title: "", description: "" }}
          addLabel="Add feature"
          emptyText="No features yet."
          errors={fe}
          errorPrefix="features"
        />
      </Section>

      {/* ---------- Who it's for ---------- */}
      <Section title="Who it's for" description="Optional cards about the customers this product suits. Leave empty to hide the section.">
        <RepeaterField
          items={data.audience ?? []}
          onChange={(v) => set("audience", v)}
          columns={[
            { key: "title", label: "Title", placeholder: "Orthodontists" },
            { key: "description", label: "Description", multiline: true },
          ]}
          emptyRow={{ title: "", description: "" }}
          addLabel="Add audience card"
          emptyText="No audience cards yet."
          errors={fe}
          errorPrefix="audience"
        />
      </Section>

      {/* ---------- Properties ---------- */}
      <Section title="Technical properties">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Properties introduction" error={fe.propertiesIntro}>
            <textarea
              rows={4}
              value={data.propertiesIntro}
              onChange={(e) => set("propertiesIntro", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Testing note" error={fe.testingNote}>
            <textarea
              rows={4}
              value={data.testingNote}
              onChange={(e) => set("testingNote", e.target.value)}
              className={inputClass}
              placeholder="Tested by an NABL accredited laboratory…"
            />
          </Field>
        </div>

        <RepeaterField
          items={data.propertiesList}
          onChange={(v) => set("propertiesList", v)}
          columns={[
            { key: "label", label: "Property", placeholder: "Tensile Stress at Break" },
            { key: "value", label: "Value", placeholder: "59 MPa" },
          ]}
          emptyRow={{ label: "", value: "" }}
          addLabel="Add property"
          emptyText="No properties yet."
          errors={fe}
          errorPrefix="propertiesList"
        />
      </Section>

      {/* ---------- Sizes ---------- */}
      <Section title="Sizes & dimensions">
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={data.sizes !== null}
            onChange={(e) => set("sizes", e.target.checked ? data.sizes ?? EMPTY_SIZES : null)}
            className="h-4 w-4 accent-[#D4AF37]"
          />
          Show a sizes section for this product
        </label>

        {data.sizes && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Field label="Round dimensions">
              <StringListField
                values={data.sizes.roundDimensions}
                onChange={(v) => setSizes("roundDimensions", v)}
                placeholder="125 mm"
              />
            </Field>
            <Field label="Square dimensions">
              <StringListField
                values={data.sizes.squareDimensions}
                onChange={(v) => setSizes("squareDimensions", v)}
                placeholder="125 mm x 125 mm"
              />
            </Field>
            <Field label="Thicknesses">
              <StringListField
                values={data.sizes.thicknesses}
                onChange={(v) => setSizes("thicknesses", v)}
                placeholder="0.76 mm"
              />
            </Field>
          </div>
        )}
      </Section>

      {/* ---------- FAQs ---------- */}
      <Section title="FAQs">
        <RepeaterField
          items={data.faqs}
          onChange={(v) => set("faqs", v)}
          columns={[
            { key: "question", label: "Question" },
            { key: "answer", label: "Answer", multiline: true },
          ]}
          emptyRow={{ question: "", answer: "" }}
          addLabel="Add FAQ"
          emptyText="No FAQs yet."
          errors={fe}
          errorPrefix="faqs"
        />
      </Section>

      {/* ---------- SEO & visibility ---------- */}
            {/* ---------- Website menu ---------- */}
      <Section title="Website menu" description="Where this product appears in the Products menu at the top of the website.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Field label="Menu column" error={fe.menuGroup}>
            <select
              value={data.menuGroup ?? ""}
              onChange={(e) => {
                setMenuGroupEdited(true);
                set("menuGroup", e.target.value === "" ? null : (e.target.value as MenuGroupName));
              }}
              className={inputClass}
            >
              <option value="">— Don&apos;t show in menu —</option>
              {MENU_GROUPS.map((g) => (
                <option key={g} value={g}>
                  {MENU_GROUP_LABELS[g]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Name in menu" error={fe.menuTitle} hint="Optional. Short name, e.g. “Taglus Premium”.">
            <input
              type="text"
              value={data.menuTitle ?? ""}
              onChange={(e) => set("menuTitle", e.target.value)}
              className={inputClass}
              placeholder={data.name || "Taglus Premium"}
            />
          </Field>
          <Field label="Short description in menu" error={fe.menuDescription} hint="Optional. A few words, e.g. “High-clarity PET-G”.">
            <input
              type="text"
              value={data.menuDescription ?? ""}
              onChange={(e) => set("menuDescription", e.target.value)}
              className={inputClass}
              placeholder={data.tagline ? data.tagline.slice(0, 40) : "High-clarity PET-G"}
            />
          </Field>
        </div>
      </Section>
      <Section title="SEO & visibility">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="SEO title" error={fe.metaTitle} hint="Optional. Shown in Google results and the browser tab.">
            <input
              type="text"
              value={data.metaTitle}
              onChange={(e) => set("metaTitle", e.target.value)}
              className={inputClass}
              placeholder={data.name ? `${data.name} | Taglus` : ""}
            />
          </Field>
          <Field label="Display order" hint="Lower numbers appear first in menus and lists.">
            <input
              type="number"
              min={0}
              value={data.sortOrder}
              onChange={(e) => set("sortOrder", Math.max(0, Math.floor(Number(e.target.value) || 0)))}
              className={inputClass}
            />
          </Field>
        </div>
        <Field
          label="SEO description"
          error={fe.metaDescription}
          hint={`Optional. ~155 characters. Currently ${data.metaDescription?.length ?? 0}.`}
        >
          <textarea
            rows={2}
            value={data.metaDescription}
            onChange={(e) => set("metaDescription", e.target.value)}
            className={inputClass}
          />
        </Field>
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={data.published}
            onChange={(e) => set("published", e.target.checked)}
            className="h-4 w-4 accent-[#D4AF37]"
          />
          Published (visible on the website). Untick to save as a hidden draft.
        </label>
      </Section>

      {/* ---------- Sticky save bar ---------- */}
      <div className="fixed bottom-0 inset-x-0 z-10 border-t border-white/10 bg-[#050B17]/95 backdrop-blur">
        <div className="max-w-6xl mx-auto flex justify-end gap-3 px-6 py-3">
          <Link href="/admin/products" className={buttonSecondary}>
            Cancel
          </Link>
          <button type="submit" disabled={saving} className={buttonPrimary}>
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create product"}
          </button>
        </div>
      </div>
    </form>
  );
}
