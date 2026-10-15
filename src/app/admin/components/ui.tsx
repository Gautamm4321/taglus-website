import type { ReactNode } from "react";

export const inputClass =
  "w-full bg-[#101b38] border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37]";

export const buttonPrimary =
  "px-5 py-2.5 bg-[#D4AF37] hover:bg-[#c29f2f] text-black font-semibold rounded-lg transition-colors text-sm shadow-md disabled:opacity-50";

export const buttonSecondary =
  "px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors";

export function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label}
        {required && <span className="text-[#D4AF37]"> *</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-[#0b1329] border border-white/10 rounded-xl p-6 sm:p-8 space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-[#E8DCC8]">{title}</h2>
        {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export function ErrorBanner({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div role="alert" className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
      {message}
    </div>
  );
}

export function StatusBadge({ published }: { published: boolean }) {
  return published ? (
    <span className="inline-block rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs text-emerald-300">Live</span>
  ) : (
    <span className="inline-block rounded-full bg-gray-500/20 px-2.5 py-0.5 text-xs text-gray-300">Draft</span>
  );
}

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#E8DCC8]">{title}</h1>
        {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
      </div>
      {action}
    </div>
  );
}
