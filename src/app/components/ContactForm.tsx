"use client";

import { useActionState, useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { sendContactMessage, type ContactState } from "../actions/contactActions";

const inputClass =
  "w-full px-4 py-3 bg-black/40 border border-[#E8DCC8]/20 text-[#E8DCC8] placeholder:text-[#E8DCC8]/40 rounded-none focus:outline-none focus:border-sky-400/80 transition-colors text-sm aria-[invalid=true]:border-red-400/70";
const labelClass = "block text-[11px] uppercase font-mono tracking-wider text-[#E8DCC8] mb-2";

const FIELDS = [
  { name: "name", label: "Name", type: "text", placeholder: "Your name", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", placeholder: "example@yourmail.com", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text", placeholder: "e.g. Distributor enquiry", autoComplete: "off" },
] as const;

export default function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContactMessage, { status: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const fieldErrors = state.status === "error" ? state.fieldErrors ?? {} : {};

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-10">
        <CheckCircle2 size={40} className="text-sky-400" aria-hidden="true" />
        <h3 className="text-2xl font-black uppercase tracking-tight text-[#E8DCC8]">Message sent</h3>
        <p className="text-sm sm:text-base text-[#E8DCC8] leading-relaxed text-left">
          Thank you for contacting Taglus. Our team will get back to you shortly. For anything urgent, call or WhatsApp
          +91 99309 05047.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} noValidate className="space-y-5">
      {FIELDS.map((f) => (
        <div key={f.name}>
          <label htmlFor={`contact-${f.name}`} className={labelClass}>
            {f.label}
          </label>
          <input
            id={`contact-${f.name}`}
            name={f.name}
            type={f.type}
            placeholder={f.placeholder}
            autoComplete={f.autoComplete}
            required
            aria-invalid={Boolean(fieldErrors[f.name])}
            aria-describedby={fieldErrors[f.name] ? `contact-${f.name}-error` : undefined}
            className={inputClass}
          />
          {fieldErrors[f.name] && (
            <p id={`contact-${f.name}-error`} className="mt-1.5 text-xs text-red-300 text-left">
              {fieldErrors[f.name]}
            </p>
          )}
        </div>
      ))}

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="How can we help?"
          required
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          className={`${inputClass} resize-none`}
        />
        {fieldErrors.message && (
          <p id="contact-message-error" className="mt-1.5 text-xs text-red-300 text-left">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {/* Honeypot (hidden from people, bots fill it) */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="contact-company-website">Company website</label>
        <input id="contact-company-website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && !Object.keys(fieldErrors).length && (
        <p role="alert" className="text-sm text-red-300 text-left">
          {state.error}
        </p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={pending}
          className="w-full py-3.5 px-6 rounded-full border border-[#E8DCC8]/40 hover:border-sky-400 bg-white/[0.03] hover:bg-gradient-to-r hover:from-[#0052cc] hover:to-[#00d4ff] text-[#E8DCC8] hover:text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg cursor-pointer disabled:opacity-60 disabled:cursor-wait"
        >
          {pending ? "Sending…" : "Send Now"}
        </button>
      </div>
    </form>
  );
}
