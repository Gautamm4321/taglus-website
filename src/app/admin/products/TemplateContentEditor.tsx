"use client";

import type { ReactNode } from "react";
import { Field, inputClass, Section } from "../components/ui";
import RepeaterField from "../components/RepeaterField";
import ImageUpload from "../components/ImageUpload";
import type { AccessoriesContent, ExtraContent, ExtraTemplate, ResinContent, RollContent } from "../../lib/templateContent";

type Errors = Record<string, string>;

/** Small helpers so every text box in this editor looks and behaves the same. */
function Text({
  label,
  value,
  onChange,
  error,
  hint,
  rows,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: string;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <Field label={label} error={error} hint={hint}>
      {rows ? (
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} placeholder={placeholder} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} placeholder={placeholder} />
      )}
    </Field>
  );
}

function Img({ label, value, onChange, error, hint }: { label: string; value: string; onChange: (v: string) => void; error?: string; hint?: string }) {
  return (
    <Field label={label} error={error} hint={hint}>
      <ImageUpload value={value} onChange={onChange} folder="products" />
    </Field>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#0e1730]/60 p-5 space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D4AF37]">{title}</h3>
      {children}
    </div>
  );
}

const grid2 = "grid grid-cols-1 md:grid-cols-2 gap-5";

/* ---------------- Resin ---------------- */

function ResinEditor({ value, onChange, fe }: { value: ResinContent; onChange: (v: ResinContent) => void; fe: Errors }) {
  const set = <K extends keyof ResinContent>(k: K, v: ResinContent[K]) => onChange({ ...value, [k]: v });
  const e = (k: string) => fe[`extra.${k}`];
  return (
    <>
      <Group title="Top banner">
        <Text label="Small badge" value={value.heroBadge} onChange={(v) => set("heroBadge", v)} error={e("heroBadge")} />
        <div className={grid2}>
          <Text label="Title (first line)" value={value.heroTitle} onChange={(v) => set("heroTitle", v)} error={e("heroTitle")} />
          <Text label="Title (blue second line)" value={value.heroHighlight} onChange={(v) => set("heroHighlight", v)} error={e("heroHighlight")} />
        </div>
        <Text label="Text" rows={4} value={value.heroText} onChange={(v) => set("heroText", v)} error={e("heroText")} />
        <Img label="Banner image" value={value.heroImage} onChange={(v) => set("heroImage", v)} error={e("heroImage")} />
      </Group>

      <Group title="Key points cards">
        <div className={grid2}>
          <Text label="Small heading" value={value.pointsEyebrow} onChange={(v) => set("pointsEyebrow", v)} />
          <Text label="Section title" value={value.pointsTitle} onChange={(v) => set("pointsTitle", v)} />
        </div>
        <RepeaterField
          items={value.points}
          onChange={(v) => set("points", v)}
          columns={[
            { key: "title", label: "Title" },
            { key: "description", label: "Description", multiline: true },
          ]}
          emptyRow={{ title: "", description: "" }}
          addLabel="Add card"
          emptyText="No cards: the section is hidden."
          errors={fe}
          errorPrefix="extra.points"
        />
      </Group>

      <Group title="Resin bottles (up to 2: left and right)">
        <RepeaterField
          items={value.formulations}
          onChange={(v) => set("formulations", v.slice(0, 2))}
          columns={[
            { key: "label", label: "Small label", placeholder: "Formulation 01" },
            { key: "title", label: "Name" },
            { key: "lines", label: "Description lines", multiline: true, hint: "One sentence per line." },
            { key: "highlight", label: "Blue highlight line" },
            { key: "image", label: "Bottle image", image: true },
            { key: "caption", label: "Caption under the bottle" },
          ]}
          emptyRow={{ label: "", title: "", lines: "", highlight: "", image: "", caption: "" }}
          addLabel={value.formulations.length >= 2 ? "Maximum 2 bottles" : "Add bottle"}
          emptyText="No bottles: the section is hidden."
          errors={fe}
          errorPrefix="extra.formulations"
        />
      </Group>

      <Group title="Sliding gallery">
        <div className={grid2}>
          <Text label="Small heading" value={value.galleryEyebrow} onChange={(v) => set("galleryEyebrow", v)} />
          <Text label="Section title" value={value.galleryTitle} onChange={(v) => set("galleryTitle", v)} />
        </div>
        <Text label="Subtitle" value={value.gallerySubtitle} onChange={(v) => set("gallerySubtitle", v)} />
        <RepeaterField
          items={value.gallery}
          onChange={(v) => set("gallery", v)}
          columns={[
            { key: "image", label: "Image (square works best)", image: true },
            { key: "title", label: "Title" },
            { key: "description", label: "Text shown on hover", multiline: true },
          ]}
          emptyRow={{ image: "", title: "", description: "" }}
          addLabel="Add gallery image"
          emptyText="No images: the gallery is hidden."
          errors={fe}
          errorPrefix="extra.gallery"
        />
      </Group>
    </>
  );
}

/* ---------------- Roll ---------------- */

function RollEditor({ value, onChange, fe }: { value: RollContent; onChange: (v: RollContent) => void; fe: Errors }) {
  const set = <K extends keyof RollContent>(k: K, v: RollContent[K]) => onChange({ ...value, [k]: v });
  const e = (k: string) => fe[`extra.${k}`];
  return (
    <>
      <Group title="Top banner">
        <Text label="Small badge" value={value.heroBadge} onChange={(v) => set("heroBadge", v)} />
        <div className={grid2}>
          <Text label="Title (first line)" value={value.heroTitle} onChange={(v) => set("heroTitle", v)} />
          <Text label="Title (blue second line)" value={value.heroHighlight} onChange={(v) => set("heroHighlight", v)} />
        </div>
        <Text label="Blue sub-heading" rows={2} hint="Each line shows on its own line." value={value.heroSubtitle} onChange={(v) => set("heroSubtitle", v)} />
        <Text label="Text" rows={4} value={value.heroText} onChange={(v) => set("heroText", v)} />
        <Img label="Banner image" value={value.heroImage} onChange={(v) => set("heroImage", v)} error={e("heroImage")} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Text label="Main button text" value={value.primaryCtaLabel} onChange={(v) => set("primaryCtaLabel", v)} hint="Leave empty to hide." />
          <Text
            label="Main button link"
            value={value.primaryCtaUrl}
            onChange={(v) => set("primaryCtaUrl", v)}
            hint="A PDF like /Taglus-Product-Catalogue.pdf or a full https:// link."
          />
          <Text label="Second button text" value={value.secondaryCtaLabel} onChange={(v) => set("secondaryCtaLabel", v)} hint="Opens the Contact page." />
        </div>
      </Group>

      <Group title="Advantage cards">
        <div className={grid2}>
          <Text label="Small heading" value={value.advantagesEyebrow} onChange={(v) => set("advantagesEyebrow", v)} />
          <Text label="Section title" value={value.advantagesTitle} onChange={(v) => set("advantagesTitle", v)} />
        </div>
        <RepeaterField
          items={value.advantages}
          onChange={(v) => set("advantages", v)}
          columns={[
            { key: "title", label: "Title" },
            { key: "description", label: "Description", multiline: true },
          ]}
          emptyRow={{ title: "", description: "" }}
          addLabel="Add card"
          emptyText="No cards: the section is hidden."
          errors={fe}
          errorPrefix="extra.advantages"
        />
      </Group>

      <Group title="Variants & thicknesses">
        <div className={grid2}>
          <Text label="Small heading" value={value.variantsEyebrow} onChange={(v) => set("variantsEyebrow", v)} />
          <Text label="Section title" value={value.variantsTitle} onChange={(v) => set("variantsTitle", v)} />
        </div>
        <Img label="Side image" value={value.variantsImage} onChange={(v) => set("variantsImage", v)} />
        <RepeaterField
          items={value.variants}
          onChange={(v) => set("variants", v)}
          columns={[
            { key: "name", label: "Variant name", placeholder: "Taglus Premium" },
            { key: "description", label: "Description", multiline: true },
            { key: "thicknesses", label: "Thicknesses", placeholder: "0.76 mm, 1.02 mm", hint: "Separate with commas." },
          ]}
          emptyRow={{ name: "", description: "", thicknesses: "" }}
          addLabel="Add variant"
          emptyText="No variants: the section is hidden."
          errors={fe}
          errorPrefix="extra.variants"
        />
        <Text label="Note under the list" value={value.variantsNote} onChange={(v) => set("variantsNote", v)} />
      </Group>
    </>
  );
}

/* ---------------- Accessories ---------------- */

function AccessoriesEditor({ value, onChange, fe }: { value: AccessoriesContent; onChange: (v: AccessoriesContent) => void; fe: Errors }) {
  const set = <K extends keyof AccessoriesContent>(k: K, v: AccessoriesContent[K]) => onChange({ ...value, [k]: v });
  return (
    <>
      <Group title="Top banner">
        <Text label="Small badge" value={value.heroBadge} onChange={(v) => set("heroBadge", v)} />
        <div className={grid2}>
          <Text label="Title (first line)" value={value.heroTitle} onChange={(v) => set("heroTitle", v)} />
          <Text label="Title (blue second line)" value={value.heroHighlight} onChange={(v) => set("heroHighlight", v)} />
        </div>
        <Text label="Text" rows={2} value={value.heroText} onChange={(v) => set("heroText", v)} />
      </Group>

      <Group title="Accessories (image + text blocks)">
        <RepeaterField
          items={value.items}
          onChange={(v) => set("items", v as AccessoriesContent["items"])}
          columns={[
            { key: "image", label: "Image", image: true },
            { key: "category", label: "Small label", placeholder: "CLINICAL BRANDING & STORAGE" },
            { key: "title", label: "Name", placeholder: "Taglus Retainer Boxes" },
            { key: "description", label: "Description", multiline: true },
            { key: "bullets", label: "Bullet points", multiline: true, hint: "One bullet per line." },
            { key: "buttonText", label: "Button text", hint: "Opens the Contact page. Leave empty to hide." },
          ]}
          emptyRow={{ image: "", imageSize: "full", category: "", title: "", description: "", bullets: "", buttonText: "" }}
          addLabel="Add accessory"
          emptyText="No accessories yet."
          errors={fe}
          errorPrefix="extra.items"
        />
      </Group>

      <Group title="Bottom call to action">
        <Text label="Title" value={value.ctaTitle} onChange={(v) => set("ctaTitle", v)} hint="Leave empty to hide this block." />
        <Text label="Text" rows={2} value={value.ctaText} onChange={(v) => set("ctaText", v)} />
        <Text label="Button text" value={value.ctaButton} onChange={(v) => set("ctaButton", v)} hint="Opens the Contact page." />
      </Group>
    </>
  );
}

/* ---------------- wrapper ---------------- */

export default function TemplateContentEditor({
  template,
  value,
  onChange,
  errors,
}: {
  template: ExtraTemplate;
  value: ExtraContent;
  onChange: (v: ExtraContent) => void;
  errors: Errors;
}) {
  return (
    <Section
      title="Page content"
      description="Everything shown on this product's page. Empty sections are hidden automatically. Save to publish your changes."
    >
      {template === "RESIN" && <ResinEditor value={value as ResinContent} onChange={onChange} fe={errors} />}
      {template === "ROLL" && <RollEditor value={value as RollContent} onChange={onChange} fe={errors} />}
      {template === "ACCESSORIES" && <AccessoriesEditor value={value as AccessoriesContent} onChange={onChange} fe={errors} />}
    </Section>
  );
}
