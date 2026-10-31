"use client";

import { useActionState, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { subscribe, type SubscribeState } from "../actions/subscribeActions";

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
    window.taglusLenis?.stop();
    const t = setTimeout(() => firstField.current?.focus(), 350);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.taglusLenis?.start();
      clearTimeout(t);
    };
  }, [open, close]);

  if (isAdmin) return null;
  const emailError = state.status === "error" ? state.fieldErrors?.email ?? state.error : undefined;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
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
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[900px] max-h-[92vh] overflow-y-auto bg-[#030919] border border-[#E8DCC8]/15 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.85)]"
          >
            {/* Taglus factory photo (landscape) across the top */}
            <div className="relative aspect-[16/7] w-full overflow-hidden bg-[#020612]">
              <Image
                src="/factory.jpg"
                alt="Taglus manufacturing facility"
                fill
                sizes="(min-width: 900px) 900px, 100vw"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#030919]/70 via-transparent to-transparent" />
            </div>

            {/* Text + form */}
            <div className="px-6 py-7 sm:px-10 sm:py-9">
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#030919]/70 text-[#E8DCC8] backdrop-blur transition-colors hover:text-sky-300"
              >
                <X size={20} />
              </button>

              {state.status === "success" ? (
                <div className="py-6 text-center md:text-left">
                  <CheckCircle2 size={44} className="text-sky-400 mx-auto md:mx-0" />
                  <h2 className="mt-5 text-2xl sm:text-3xl font-black uppercase text-[#E8DCC8]">Welcome to the network</h2>
                  <p className="mt-3 text-sm sm:text-base text-[#E8DCC8] !text-center md:!text-left">
                    Thank you for joining. You&apos;ll be the first to hear about exclusive offers, product updates and workflow insights.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 md:items-center md:gap-10">
                  <div>
                  <h2 id="tn-title" className=" text-2xl sm:text-3xl font-black uppercase leading-[1.05] text-[#E8DCC8]">
                    Better Outcomes{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-300">Start Here.</span>
                  </h2>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#E8DCC8] !text-left">
                    Get exclusive offers, product updates, and insights to improve your orthodontic workflow.
                  </p>
                  </div>

                  <form action={formAction} noValidate className="space-y-3">
                    <div aria-hidden className="absolute -left-[9999px]">
                      <label>
                        Company website
                        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
                      </label>
                    </div>

                    <label htmlFor="tn-email" className="sr-only">Email address</label>
                    <input
                      ref={firstField}
                      id="tn-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      aria-invalid={!!emailError}
                      aria-describedby={emailError ? "tn-email-err" : undefined}
                      placeholder="Email address"
                      className="w-full border border-[#E8DCC8]/40 bg-transparent px-4 py-4 text-center text-sm sm:text-base text-[#E8DCC8] placeholder:text-[#E8DCC8]/55 outline-none transition-colors focus:border-sky-400 aria-[invalid=true]:border-red-400"
                    />
                    {emailError && (
                      <p id="tn-email-err" role="alert" className="text-xs text-red-300 !text-left">
                        {emailError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={pending}
                      className="w-full bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] px-6 py-4 text-[13px] sm:text-sm font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white transition-opacity hover:opacity-95 disabled:opacity-60"
                    >
                      {pending ? "Joining…" : "Join the Taglus Network"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
