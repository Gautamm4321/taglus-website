"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PageFlip } from "page-flip/dist/js/page-flip.module.js";

export type BookSheet = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  overview: string;
  imagePath: string;
  features: { title: string; description: string }[];
  properties: { label: string; value: string }[];
  thicknesses: string[];
  dimensions: string[];
  audience: { title: string; description: string }[];
  /** Accessories: short list of selling points, shown on a 2-page spread instead of 4 pages */
  bullets?: string[];
  /** "Full details" link on the last page (defaults to /products/<slug>) */
  href?: string;
};

/** Each sheet takes 4 pages: photo, overview, features, specifications. Page 0 is the cover. */
/** Products take 4 pages (photo, overview, features, specs); accessories take 2 (photo, details). */
const pagesFor = (s: BookSheet) => (s.bullets ? 2 : 4);
/** First page of each item (page 0 is the cover) */
const startPages = (sheets: BookSheet[]) => {
  let p = 1;
  return sheets.map((s) => {
    const start = p;
    p += pagesFor(s);
    return start;
  });
};

/** Page shape (width / height), like a printed catalogue page */
const PAGE_RATIO = 0.74;
const MAX_PAGE_H = 660;

/**
 * Taglus sheet catalogue as a real page-turning book (StPageFlip).
 * The book is sized to fit the screen with no scrolling: two pages side by side on
 * desktop, one page on mobile. Turn pages with Previous / Next, the arrow keys,
 * or by dragging / swiping a page. /catalogue?sheet=<slug> opens that sheet.
 */
export default function SheetFlipbook({ sheets }: { sheets: BookSheet[] }) {
  const stage = useRef<HTMLDivElement>(null);
  const holder = useRef<HTMLDivElement>(null);
  const template = useRef<HTMLDivElement>(null);
  const book = useRef<PageFlip | null>(null);
  const pageRef = useRef(0);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [size, setSize] = useState<{ w: number; h: number; spread: boolean } | null>(null);
  const params = useSearchParams();
  const wanted = params.get("sheet");
  const wantedIndex = sheets.findIndex((s) => s.slug === wanted);
  const starts = startPages(sheets);
  const startPage = wantedIndex >= 0 ? starts[wantedIndex] : 0;
  const [initialPage] = useState(startPage);

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
    const from = book.current ? pageRef.current : initialPage;

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
  }, [size, initialPage]);

  // Header link clicked while the book is already open: go to that sheet
  useEffect(() => {
    const b = book.current;
    if (!b || wantedIndex < 0) return;
    // animated page-curl to that sheet (the "flip" event then updates the page number)
    if (b.getCurrentPageIndex() !== startPage) b.flip(startPage);
  }, [startPage, wantedIndex]);

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
        <Cover />
        {sheets.map((s, i) => (
          s.bullets ? (
            <AccessoryPages key={s.slug} sheet={s} number={i + 1} firstPage={starts[i]} />
          ) : (
            <SheetPages key={s.slug} sheet={s} number={i + 1} firstPage={starts[i]} />
          )
        ))}
        <BackCover />
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

/* ---------------- pages ---------------- */
// Sizes use cqw (percent of the page width) so the text scales with the book on every screen.

const PAPER = "book-page bg-[#FBF8F2] text-[#0B1A33] [&_p]:!text-left";

function PageShell({ children, num, className = "" }: { children: React.ReactNode; num?: number; className?: string }) {
  return (
    <div className={PAPER}>
      <div className={`@container relative h-full w-full overflow-hidden ${className}`}>
        {children}
        {num !== undefined && (
          <span className="absolute bottom-[3.5cqw] left-0 right-0 text-center text-[2.4cqw] font-semibold tracking-[0.2em] text-[#0B1A33]/50">
            {String(num).padStart(2, "0")}
          </span>
        )}
      </div>
    </div>
  );
}

function Cover() {
  return (
    <div className="book-page" data-density="hard">
      <div className="relative h-full w-full overflow-hidden bg-[#020612]">
        {/* Vertical factory photo fills the cover (no text on top) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/factory-landscape-image.jpg" alt="Taglus factory" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </div>
  );
}

function BackCover() {
  return (
    <div className="book-page [&_p]:!text-center" data-density="hard">
      <div className="@container relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b1d3f] via-[#061229] to-[#020612] text-center text-[#E8DCC8]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-tuglas.png" alt="Taglus" className="w-[55cqw] h-auto" />
        <p className="mt-[6cqw] text-[3cqw] uppercase tracking-[0.3em]">www.taglus.com</p>
        <p className="mt-[2cqw] text-[3cqw] tracking-wide">info@taglus.com</p>
      </div>
    </div>
  );
}

function SheetPages({ sheet, number, firstPage }: { sheet: BookSheet; number: number; firstPage: number }) {
  const no = String(number).padStart(2, "0");
  const sizes = [...sheet.dimensions, ...sheet.thicknesses];

  return (
    <>
      <PhotoPage sheet={sheet} no={no} />

      {/* 2: overview */}
      <PageShell num={firstPage + 1}>
        <div className="flex h-full flex-col px-[8cqw] pt-[10cqw] pb-[12cqw]">
          <p className="text-[2.6cqw] font-semibold uppercase tracking-[0.3em] text-[#0066cc]">{no} · Overview</p>
          <p className="mt-[3cqw] text-[6.5cqw] font-black uppercase leading-[1] tracking-tight">{sheet.name}</p>
          <p className="mt-[4cqw] border-l-[0.8cqw] border-[#0066cc] pl-[3cqw] text-[3.8cqw] font-semibold leading-snug">
            {sheet.tagline}
          </p>
          <p className="mt-[5cqw] text-[3.15cqw] leading-[1.65] text-[#0B1A33]/85 line-clamp-[14]">{sheet.overview}</p>
        </div>
      </PageShell>

      {/* 3: key features */}
      <PageShell num={firstPage + 2}>
        <div className="flex h-full flex-col px-[8cqw] pt-[10cqw] pb-[12cqw]">
          <p className="text-[2.6cqw] font-semibold uppercase tracking-[0.3em] text-[#0066cc]">{no} · Key features</p>
          <p className="mt-[3cqw] text-[6.5cqw] font-black uppercase leading-[1] tracking-tight">Why labs choose it</p>
          <ol className="mt-[5cqw] space-y-[4cqw]">
            {sheet.features.slice(0, 4).map((f, i) => (
              <li key={f.title} className="flex gap-[3cqw]">
                <span className="shrink-0 text-[3cqw] font-black text-[#0066cc]">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block text-[3.6cqw] font-bold leading-tight">{f.title}</span>
                  <span className="mt-[1cqw] block text-[2.9cqw] leading-[1.5] text-[#0B1A33]/80 line-clamp-4">{f.description}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </PageShell>

      {/* 4: specifications */}
      <PageShell num={firstPage + 3}>
        <div className="flex h-full flex-col px-[8cqw] pt-[10cqw] pb-[12cqw]">
          <p className="text-[2.6cqw] font-semibold uppercase tracking-[0.3em] text-[#0066cc]">{no} · Specifications</p>
          <p className="mt-[3cqw] text-[6.5cqw] font-black uppercase leading-[1] tracking-tight">Technical details</p>

          {sheet.properties.length > 0 && (
            <dl className="mt-[4cqw] divide-y divide-[#0B1A33]/10 border-y border-[#0B1A33]/10">
              {sheet.properties.slice(0, 7).map((p) => (
                <div key={p.label} className="flex justify-between gap-[3cqw] py-[1.8cqw] text-[2.9cqw]">
                  <dt className="text-[#0B1A33]/70">{p.label}</dt>
                  <dd className="text-right font-semibold">{p.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {sizes.length > 0 && (
            <div className="mt-[5cqw]">
              <p className="text-[2.6cqw] font-semibold uppercase tracking-[0.25em] text-[#0B1A33]/60">Available sizes</p>
              <div className="mt-[2cqw] flex flex-wrap gap-[1.6cqw]">
                {sizes.slice(0, 10).map((s) => (
                  <span key={s} className="rounded-full border border-[#0066cc]/40 px-[2.4cqw] py-[0.8cqw] text-[2.6cqw] font-semibold text-[#0066cc]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {sheet.properties.length === 0 && sheet.audience.length > 0 && (
            <div className="mt-[5cqw]">
              <p className="text-[2.6cqw] font-semibold uppercase tracking-[0.25em] text-[#0B1A33]/60">Made for</p>
              <ul className="mt-[2cqw] space-y-[2.5cqw]">
                {sheet.audience.slice(0, 3).map((a) => (
                  <li key={a.title}>
                    <span className="block text-[3.3cqw] font-bold">{a.title}</span>
                    <span className="block text-[2.8cqw] leading-[1.5] text-[#0B1A33]/80 line-clamp-2">{a.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <a
            href={sheet.href ?? `/products/${sheet.slug}`}
            className="mt-auto inline-flex w-fit items-center gap-[1.5cqw] rounded-full bg-[#0B1A33] px-[4cqw] py-[2cqw] text-[2.7cqw] font-semibold uppercase tracking-[0.15em] text-[#E8DCC8]"
          >
            Full product details →
          </a>
        </div>
      </PageShell>
    </>
  );
}

/** Product photo page: the whole image on top (nothing cut), name and tagline below */
function PhotoPage({ sheet, no }: { sheet: BookSheet; no: string }) {
  return (
    <PageShell className="bg-gradient-to-b from-[#0b1d3f] via-[#061229] to-[#020612]">
      <div className="flex h-full flex-col">
        <div className="relative aspect-[3/2] w-full shrink-0 bg-[#020612]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sheet.imagePath} alt={sheet.name} className="absolute inset-0 h-full w-full object-contain" />
        </div>
        <div className="flex flex-1 flex-col justify-center px-[7cqw] text-[#E8DCC8]">
          <p className="text-[2.6cqw] font-semibold uppercase tracking-[0.3em] text-sky-300">
            {no} · {sheet.category}
          </p>
          <p className="mt-[2.5cqw] text-[8cqw] font-black uppercase leading-[0.95] tracking-tight">{sheet.name}</p>
          <p className="mt-[3cqw] text-[3.6cqw] leading-snug">{sheet.tagline}</p>
        </div>
      </div>
    </PageShell>
  );
}

/** Accessories: photo page + one details page (description and selling points) */
function AccessoryPages({ sheet, number, firstPage }: { sheet: BookSheet; number: number; firstPage: number }) {
  const no = String(number).padStart(2, "0");
  return (
    <>
      <PhotoPage sheet={sheet} no={no} />
      <PageShell num={firstPage + 1}>
        <div className="flex h-full flex-col px-[8cqw] pt-[10cqw] pb-[12cqw]">
          <p className="text-[2.6cqw] font-semibold uppercase tracking-[0.3em] text-[#0066cc]">{no} · {sheet.category}</p>
          <p className="mt-[3cqw] text-[6.5cqw] font-black uppercase leading-[1] tracking-tight">{sheet.name}</p>
          {sheet.overview && <p className="mt-[4cqw] text-[3.15cqw] leading-[1.65] text-[#0B1A33]/85 line-clamp-[8]">{sheet.overview}</p>}
          {sheet.bullets && sheet.bullets.length > 0 && (
            <ul className="mt-[5cqw] space-y-[2.6cqw]">
              {sheet.bullets.slice(0, 6).map((b) => (
                <li key={b} className="flex gap-[2.5cqw] text-[3cqw] leading-snug">
                  <span className="mt-[1.2cqw] h-[1.4cqw] w-[1.4cqw] shrink-0 rounded-full bg-[#0066cc]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
          <a
            href={sheet.href ?? `/products/${sheet.slug}`}
            className="mt-auto inline-flex w-fit items-center gap-[1.5cqw] rounded-full bg-[#0B1A33] px-[4cqw] py-[2cqw] text-[2.7cqw] font-semibold uppercase tracking-[0.15em] text-[#E8DCC8]"
          >
            Full product details →
          </a>
        </div>
      </PageShell>
    </>
  );
}
