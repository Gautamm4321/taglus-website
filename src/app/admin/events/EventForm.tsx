"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveEvent } from "../../actions/eventActions";
import { slugify, type EventInput } from "../../lib/validation";
import { buttonPrimary, buttonSecondary, ErrorBanner, Field, inputClass, Section } from "../components/ui";
import ImageUpload from "../components/ImageUpload";

const EMPTY_EVENT: EventInput = {
  title: "",
  slug: "",
  startDate: "",
  endDate: "",
  location: "",
  description: "",
  imagePath: "",
  registrationUrl: "",
  published: true,
};

export default function EventForm({ eventId, initialData }: { eventId?: number; initialData?: EventInput }) {
  const router = useRouter();
  const isEdit = eventId !== undefined;
  const [data, setData] = useState<EventInput>(initialData ?? EMPTY_EVENT);
  const [slugEdited, setSlugEdited] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fe, setFe] = useState<Record<string, string>>({});

  const set = <K extends keyof EventInput>(key: K, value: EventInput[K]) => setData((d) => ({ ...d, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setFe({});
    try {
      const res = await saveEvent(eventId ?? null, data);
      if (res.ok) {
        router.push("/admin/events");
        router.refresh();
        return;
      }
      setError(res.error);
      setFe(res.fieldErrors ?? {});
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Could not save. Your login may have expired — log in again and retry.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ErrorBanner message={error} />

      <Section title="Event details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Event title" required error={fe.title}>
            <input
              type="text"
              value={data.title}
              onChange={(e) =>
                setData((d) => ({ ...d, title: e.target.value, slug: slugEdited ? d.slug : slugify(e.target.value) }))
              }
              className={inputClass}
              placeholder="e.g. AAO Annual Session 2027"
            />
          </Field>
          <Field label="URL slug" required error={fe.slug}>
            <input
              type="text"
              value={data.slug}
              onChange={(e) => {
                setSlugEdited(true);
                set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
              }}
              className={`${inputClass} font-mono`}
            />
          </Field>
          <Field label="Start date" required error={fe.startDate}>
            <input type="date" value={data.startDate} onChange={(e) => set("startDate", e.target.value)} className={inputClass} />
          </Field>
          <Field label="End date" error={fe.endDate} hint="Leave empty for a one-day event.">
            <input
              type="date"
              value={data.endDate}
              min={data.startDate || undefined}
              onChange={(e) => set("endDate", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Location" required error={fe.location}>
            <input
              type="text"
              value={data.location}
              onChange={(e) => set("location", e.target.value)}
              className={inputClass}
              placeholder="Booth 1234, Orlando, USA"
            />
          </Field>
          <Field label="Registration / info link" error={fe.registrationUrl} hint="Optional">
            <input
              type="url"
              value={data.registrationUrl}
              onChange={(e) => set("registrationUrl", e.target.value)}
              className={inputClass}
              placeholder="https://…"
            />
          </Field>
        </div>

        <Field label="Description" required error={fe.description}>
          <textarea
            rows={6}
            value={data.description}
            onChange={(e) => set("description", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Event image" error={fe.imagePath} hint="Optional">
          <ImageUpload value={data.imagePath ?? ""} onChange={(url) => set("imagePath", url)} folder="events" />
        </Field>

        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={data.published}
            onChange={(e) => set("published", e.target.checked)}
            className="h-4 w-4 accent-[#D4AF37]"
          />
          Published (visible on the website)
        </label>
      </Section>

      <div className="flex justify-end gap-3">
        <Link href="/admin/events" className={buttonSecondary}>
          Cancel
        </Link>
        <button type="submit" disabled={saving} className={buttonPrimary}>
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create event"}
        </button>
      </div>
    </form>
  );
}
