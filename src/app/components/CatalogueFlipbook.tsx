"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PageFlip } from "page-flip/dist/js/page-flip.module.js";

/** Page shape (width / height), like a printed catalogue page */
const PAGE_RATIO = 419.53 / 595.28; // same shape as the PDF pages (A5)
const MAX_PAGE_H = 660;

/**
 * The Taglus product catalogue (PDF pages as images) as a real page-turning book (StPageFlip).
 * The book is sized to fit the screen with no scrolling: two pages side by side on
 * desktop, one page on mobile. Turn pages with Previous / Next, the arrow keys,
 * or by dragging / swiping a page. /catalogue?sheet=<slug> opens that sheet.
 */
export default function CatalogueFlipbook({ pages }: { pages: string[] }) {
  const stage = useRef<HTMLDivElement>(null);
  const holder = useRef<HTMLDivElement>(null);
  const template = useRef<HTMLDivElement>(null);
  const book = useRef<PageFlip | null>(null);
  const pageRef = useRef(0);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [size, setSize] = useState<{ w: number; h: number; spread: boolean } | null>(null);

  // Work out the page size from the free space on screen (and again when the window changes)
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const measure = () => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      const spread = W >= 768;
      const h = Math.min(H, MAX_PAGE_H, (spread ? W / 2 : W) / PAGE_RATIO);
      const next = { w: Math.floor(h * PAGE_RATIO), h: Math.floor(h), spread };
      setSize((cur) => (cur && cur.w === next.w && cur.h === next.h && cur.spread === next.spread ? cur : next));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // (Re)build the book whenever the page size changes, staying on the same page
  useEffect(() => {
    if (!size) return;
    let cancelled = false;
    let instance: PageFlip | null = null;
    let el: HTMLDivElement | null = null;
    const from = book.current ? pageRef.current : 0;

    import("page-flip/dist/js/page-flip.module.js").then(({ PageFlip }) => {
      if (cancelled || !holder.current || !template.current) return;
      el = document.createElement("div");
      el.style.width = `${size.spread ? size.w * 2 : size.w}px`;
      el.style.height = `${size.h}px`;
      holder.current.appendChild(el);
      template.current.querySelectorAll<HTMLElement>(".book-page").forEach((p) => el!.appendChild(p.cloneNode(true)));

      instance = new PageFlip(el, {
        width: size.w,
        height: size.h,
        size: "fixed",
        showCover: true,
        usePortrait: !size.spread,
        mobileScrollSupport: false,
        useMouseEvents: false, // swipes are handled below, so links on the pages stay clickable
        maxShadowOpacity: 0.4,
        flippingTime: 850,
        startPage: from,
      });
      instance.loadFromHTML(el.querySelectorAll<HTMLElement>(".book-page"));
      instance.on("flip", (e) => {
        pageRef.current = Number(e.data);
        setPage(Number(e.data));
      });
      book.current = instance;
      pageRef.current = instance.getCurrentPageIndex();
      setTotal(instance.getPageCount());
      setPage(instance.getCurrentPageIndex());
    });

    return () => {
      cancelled = true;
      try {
        instance?.destroy();
      } catch {
        /* already gone */
      }
      el?.remove();
    };
  }, [size]);

  // Turning pages without the buttons (same idea as the reference menu book):
  //  • finger swipe left / right anywhere on the screen (mobile)
  //  • mouse: click-and-drag left / right, or click the right / left page
  //  • laptop trackpad: two-finger swipe left / right, or the mouse wheel
  useEffect(() => {
    let cooldown = false;
    const turn = (dir: "next" | "prev") => {
      if (cooldown || !book.current) return;
      cooldown = true;
      setTimeout(() => (cooldown = false), 650);
      if (dir === "next") book.current.flipNext();
      else book.current.flipPrev();
    };
    const onControl = (t: EventTarget | null) => !!(t as Element | null)?.closest?.("a, button, input, select, textarea, header, nav");

    // Finger swipe
    let tx = 0;
    let ty = 0;
    let tOk = false;
    const tStart = (e: TouchEvent) => {
      tOk = !onControl(e.target);
      tx = e.changedTouches[0].clientX;
      ty = e.changedTouches[0].clientY;
    };
    const tEnd = (e: TouchEvent) => {
      if (!tOk) return;
      const dx = e.changedTouches[0].clientX - tx;
      const dy = e.changedTouches[0].clientY - ty;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) turn(dx < 0 ? "next" : "prev");
    };

    // Mouse drag, or a plain click on a page
    let mx = 0;
    let my = 0;
    let mOk = false;
    const mDown = (e: PointerEvent) => {
      if (e.pointerType === "touch" || e.button !== 0) return;
      mOk = !onControl(e.target);
      mx = e.clientX;
      my = e.clientY;
    };
    const mUp = (e: PointerEvent) => {
      if (e.pointerType === "touch" || !mOk) return;
      mOk = false;
      const dx = e.clientX - mx;
      const dy = e.clientY - my;
      if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) return turn(dx < 0 ? "next" : "prev");
      // a click (no drag) on the book: right side = next page, left side = previous page
      const r = holder.current?.querySelector(".stf__parent")?.getBoundingClientRect();
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6 && r && e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
        turn(e.clientX > r.left + r.width / 2 ? "next" : "prev");
      }
    };

    // Trackpad swipe / mouse wheel
    const wheel = (e: WheelEvent) => {
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const d = horizontal ? e.deltaX : e.deltaY;
      if (horizontal) e.preventDefault(); // stop the browser's "go back" swipe
      if (Math.abs(d) > 25) turn(d > 0 ? "next" : "prev");
    };
    const noDrag = (e: Event) => e.preventDefault();

    window.addEventListener("touchstart", tStart, { passive: true });
    window.addEventListener("touchend", tEnd, { passive: true });
    window.addEventListener("pointerdown", mDown);
    window.addEventListener("pointerup", mUp);
    window.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("dragstart", noDrag);
    return () => {
      window.removeEventListener("touchstart", tStart);
      window.removeEventListener("touchend", tEnd);
      window.removeEventListener("pointerdown", mDown);
      window.removeEventListener("pointerup", mUp);
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("dragstart", noDrag);
    };
  }, []);

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") book.current?.flipNext();
      if (e.key === "ArrowLeft") book.current?.flipPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const atStart = page <= 0;
  const atEnd = total > 0 && page >= total - 1;

  return (
    <div className="flex h-full w-full flex-col">
      {/* Free space the book is fitted into */}
      <div ref={stage} className="relative min-h-0 flex-1">
        <div
          ref={holder}
          className="book-holder absolute inset-0 flex items-center justify-center touch-pan-y select-none cursor-grab active:cursor-grabbing [&_img]:pointer-events-none [&_img]:select-none [filter:drop-shadow(0_28px_40px_rgba(0,0,0,0.55))]"
        />
      </div>

      <div className="mx-auto mt-4 sm:mt-5 flex w-full max-w-3xl shrink-0 items-center justify-between px-2">
        <NavButton dir="prev" onClick={() => book.current?.flipPrev()} disabled={atStart} />
        <p className="hidden sm:block text-[11px] uppercase tracking-[0.25em] text-[#E8DCC8]/60">Swipe, drag or click a page to turn it</p>
        <NavButton dir="next" onClick={() => book.current?.flipNext()} disabled={atEnd} />
      </div>

      {/* Page templates (hidden): copied into the book on load */}
      <div ref={template} hidden aria-hidden>
        {/* Front cover: vertical Taglus factory photo */}
        <div className="book-page" data-density="hard">
          <div className="relative h-full w-full overflow-hidden bg-[#020612]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/factory-landscape-image.jpg" alt="Taglus factory" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
        {/* Every page of the printed catalogue */}
        {pages.map((src, i) => (
          <div key={src} className="book-page">
            <div className="relative h-full w-full overflow-hidden bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Catalogue page ${i + 1}`} className="absolute inset-0 h-full w-full object-contain" />
            </div>
          </div>
        ))}
        {/* Back cover: lets the last catalogue page turn over too, and closes the book */}
        <div className="book-page" data-density="hard">
          <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b1d3f] via-[#061229] to-[#020612]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-tuglas.png" alt="Taglus" className="w-[55%] h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavButton({ dir, onClick, disabled }: { dir: "prev" | "next"; onClick: () => void; disabled?: boolean }) {
  const prev = dir === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-full border border-[#E8DCC8]/25 bg-[#0b1329]/90 px-5 py-2.5 text-sm font-semibold text-[#E8DCC8] transition-colors hover:border-sky-400 disabled:opacity-30 disabled:pointer-events-none"
    >
      {prev && <ChevronLeft size={18} />}
      {prev ? "Previous" : "Next"}
      {!prev && <ChevronRight size={18} />}
    </button>
  );
}

