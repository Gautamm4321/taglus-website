"use client";

import { useActionState, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { subscribe, type SubscribeState } from "../actions/subscribeActions";
import { COUNTRIES } from "../lib/countries";

const STORAGE_KEY = "taglus-network";
const SHOW_AFTER_MS = 12000; // or when the visitor has scrolled 40% of the page, whichever comes first
const REMIND_AFTER_DAYS = 14; // closed without joining → ask again after two weeks

function shouldShow() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;
    const saved = JSON.parse(raw) as { joined?: boolean; closedAt?: number };
    if (saved.joined) return false;
    return !saved.closedAt || Date.now() - saved.closedAt > REMIND_AFTER_DAYS * 864e5;
  } catch {
    return true; // storage blocked: still show once per page load
  }
}

function remember(value: { joined?: boolean; closedAt?: number }) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* storage blocked: nothing to do */
  }
}

const input =
  "w-full rounded-xl border border-[#E8DCC8]/15 bg-white/[0.04] px-4 py-3 text-sm text-[#E8DCC8] placeholder:text-[#E8DCC8]/40 outline-none transition-colors focus:border-sky-400 focus:bg-white/[0.06] aria-[invalid=true]:border-red-400";

/** "Join the Taglus Network" e-mailer pop-up (sign-ups go to Admin → Subscribers). */
export default function JoinNetworkPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState<SubscribeState, FormData>(subscribe, { status: "idle" });
  const firstField = useRef<HTMLInputElement>(null);
  const shown = useRef(false);

  const isAdmin = pathname?.startsWith("/admin");

  const show = useCallback(() => {
    if (shown.current) return;
    shown.current = true;
    setOpen(true);
  }, []);

  // Timed / scroll trigger
  useEffect(() => {
    if (isAdmin || !shouldShow()) return;
    const timer = setTimeout(show, SHOW_AFTER_MS);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.4) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isAdmin, show]);

  // Can also be opened from anywhere: window.dispatchEvent(new Event("open-taglus-network"))
  useEffect(() => {
    const openNow = () => setOpen(true);
    window.addEventListener("open-taglus-network", openNow);
    return () => window.removeEventListener("open-taglus-network", openNow);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    if (state.status !== "success") remember({ closedAt: Date.now() });
  }, [state.status]);

  useEffect(() => {
    if (state.status === "success") remember({ joined: true });
  }, [state.status]);

  // Esc to close, focus the first field, lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.lenis?.stop();
    const t = setTimeout(() => firstField.current?.focus(), 350);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.lenis?.start();
      clearTimeout(t);
    };
  }, [open, close]);

  if (isAdmin) return null;
  const fe = state.status === "error" ? state.fieldErrors ?? {} : {};

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button type="button" aria-label="Close" onClick={close} className="absolute inset-0 bg-[#01030a]/75 backdrop-blur-sm cursor-default" />

          <motion.div
            role="dialog"
            data-lenis-prevent
            aria-modal="true"
            aria-labelledby="tn-title"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[880px] max-h-[92vh] overflow-y-auto rounded-[1.75rem] p-[1px] bg-gradient-to-br from-sky-400/60 via-[#E8DCC8]/15 to-indigo-500/50 shadow-[0_40px_120px_-20px_rgba(14,165,233,0.45)]"
          >
            <div className="grid md:grid-cols-[0.9fr_1.1fr] rounded-[1.7rem] bg-[#030919] overflow-hidden">
              {/* Visual side */}
              <div className="relative hidden md:block min-h-[460px] bg-[radial-gradient(ellipse_at_50%_110%,#155096_0%,#0a2350_45%,#040b1d_80%)] overflow-hidden">
                <div aria-hidden className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(232,220,200,.5)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
                <motion.div
                  className="absolute inset-x-8 top-16 bottom-24"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image src="/taglus_premium-removebg-preview.png" alt="" fill sizes="360px" className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]" />
                </motion.div>
                <div className="absolute left-7 right-7 bottom-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-300">Taglus Network</p>
                  <p className="mt-1 text-sm text-[#E8DCC8]/80 leading-relaxed">Labs and clinicians in 70+ countries.</p>
                </div>
              </div>

              {/* Form side */}
              <div className="relative p-7 sm:p-10">
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E8DCC8]/15 text-[#E8DCC8]/80 transition-colors hover:border-sky-400 hover:text-sky-300"
                >
                  <X size={17} />
                </button>

                {state.status === "success" ? (
                  <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
                    <CheckCircle2 size={52} className="text-sky-400" />
                    <h2 className="mt-5 text-2xl font-black uppercase tracking-tight text-[#E8DCC8]">Welcome to the network</h2>
                    <p className="mt-3 max-w-sm text-sm text-[#E8DCC8]/80 text-center">
                      Thank you for joining. You&apos;ll be the first to hear about exclusive offers, product updates and workflow insights.
                    </p>
                    <button type="button" onClick={close} className="mt-7 rounded-full border border-[#E8DCC8]/25 px-6 py-2.5 text-sm font-semibold text-[#E8DCC8] hover:border-sky-400 hover:text-sky-300">
                      Continue browsing
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-400">Join the Taglus Network</p>
                    <h2 id="tn-title" className="mt-3 pr-8 text-3xl sm:text-[2.1rem] font-black uppercase leading-[1.05] tracking-tight text-[#E8DCC8]">
                      Better Outcomes{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-300">Start Here.</span>
                    </h2>
                    <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[#E8DCC8]/80 text-left">
                      Get exclusive offers, product updates, and insights to improve your orthodontic workflow.
                    </p>

                    <form action={formAction} noValidate className="mt-6 space-y-3.5">
                      <div aria-hidden className="absolute -left-[9999px]">
                        <label>
                          Company website
                          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
                        </label>
                      </div>

                      <Field id="tn-name" label="Name" error={fe.name}>
                        <input ref={firstField} id="tn-name" name="name" autoComplete="name" required aria-invalid={!!fe.name} aria-describedby={fe.name ? "tn-name-err" : undefined} className={input} placeholder="Dr. Jane Smith" />
                      </Field>
                      <div className="grid gap-3.5 sm:grid-cols-2">
                        <Field id="tn-country" label="Country" error={fe.country}>
                          <input id="tn-country" name="country" list="tn-countries" autoComplete="country-name" required aria-invalid={!!fe.country} aria-describedby={fe.country ? "tn-country-err" : undefined} className={input} placeholder="India" />
                          <datalist id="tn-countries">
                            {COUNTRIES.map((c) => (
                              <option key={c} value={c} />
                            ))}
                          </datalist>
                        </Field>
                        <Field id="tn-phone" label="Phone number" error={fe.phone}>
                          <input id="tn-phone" name="phone" type="tel" autoComplete="tel" required aria-invalid={!!fe.phone} aria-describedby={fe.phone ? "tn-phone-err" : undefined} className={input} placeholder="+91 98765 43210" />
                        </Field>
                      </div>
                      <Field id="tn-email" label="Email ID" error={fe.email}>
                        <input id="tn-email" name="email" type="email" autoComplete="email" required aria-invalid={!!fe.email} aria-describedby={fe.email ? "tn-email-err" : undefined} className={input} placeholder="you@clinic.com" />
                      </Field>

                      {state.status === "error" && !Object.keys(fe).length && (
                        <p role="alert" className="text-sm text-red-300">{state.error}</p>
                      )}

                      <button
                        type="submit"
                        disabled={pending}
                        className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-[0_10px_40px_-10px_rgba(0,180,255,0.7)] transition-all hover:scale-[1.02] disabled:opacity-60"
                      >
                        {pending ? "Joining…" : "Join the Taglus Network"}
                        {!pending && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
                      </button>
                      <p className="text-center text-[11px] text-[#E8DCC8]/50">We respect your privacy. Unsubscribe any time.</p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#E8DCC8]/70">
        {label} <span className="text-sky-400">*</span>
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
