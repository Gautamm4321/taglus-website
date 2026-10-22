"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Site-wide motion layer (one place, no per-page wiring needed):
 *  • smooth inertia scrolling (Lenis) on desktop
 *  • reveal-on-scroll: every section's blocks fade/slide in, grid items stagger in
 *  • parallax for elements marked data-parallax="0.2" (speed, + or −)
 *  • thin scroll-progress bar at the top
 * Turned off on /admin, on the About and Case Studies pages (they have their own motion),
 * and completely for visitors who ask their device for reduced motion.
 */
const SKIP_REVEAL = ["/admin", "/about", "/case-studies"];

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export default function MotionEffects() {
  const pathname = usePathname() ?? "/";
  const isAdmin = pathname.startsWith("/admin");

  /* ---------- smooth scrolling + progress bar + parallax (one rAF loop) ---------- */
  useEffect(() => {
    if (isAdmin) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const bar = document.getElementById("scroll-progress");
    const lenis = reduce ? undefined : new Lenis({ duration: 1.15, smoothWheel: true, anchors: { offset: -96 }, prevent: (n) => !!n.closest?.("[data-lenis-prevent]") });
    window.lenis = lenis;

    let frame = 0;
    const tick = (time: number) => {
      lenis?.raf(time);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      if (!reduce) {
        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = parseFloat(el.dataset.parallax || "0.15");
          const rect = el.parentElement?.getBoundingClientRect() ?? el.getBoundingClientRect();
          if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
          const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
          el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
        });
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      window.lenis = undefined;
    };
  }, [isAdmin]);

  /* ---------- reveal on scroll ---------- */
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || SKIP_REVEAL.some((p) => pathname.startsWith(p))) {
      root.classList.remove("motion-ready");
      return;
    }
    root.classList.add("motion-ready");

    // After the entrance, hand the element back to its own hover/transition styles
    const show = (el: HTMLElement, instant = false) => {
      el.classList.add("is-visible");
      const delay = parseInt(el.style.getPropertyValue("--reveal-delay") || "0", 10);
      setTimeout(() => (el.dataset.revealed = "1"), instant ? 0 : 1000 + delay);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );

    const tag = (scope: ParentNode) => {
      const main = document.getElementById("main-content");
      if (!main) return;
      // Blocks inside each section, unless the section opts out or already animates itself
      scope.querySelectorAll<HTMLElement>("#main-content section, #main-content article, footer").forEach((section) => {
        if (section.closest("[data-no-reveal]")) return;
        // Section header blocks and big blocks: the section's own children
        Array.from(section.children).forEach((child) => {
          const el = child as HTMLElement;
          if (el.dataset.reveal !== undefined || el.dataset.revealed || el.matches("script, style, [aria-hidden='true'], [data-no-reveal]") || el.classList.contains("absolute") || el.classList.contains("fixed")) return;
          // Blocks with their own entrance animation (page heroes) are left alone
          if (el.classList.contains("animate-fade-up") || el.querySelector(".animate-fade-up")) return;
          el.dataset.reveal = el.dataset.reveal || "up";
        });
        // Cards in grids: stagger in one after another
        section.querySelectorAll<HTMLElement>(".grid").forEach((grid) => {
          if (grid.closest("[data-no-reveal], .animate-fade-up")) return;
          Array.from(grid.children).forEach((child, i) => {
            const el = child as HTMLElement;
            if (el.dataset.reveal !== undefined || el.dataset.revealed || el.classList.contains("absolute")) return;
            el.dataset.reveal = "up";
            el.style.setProperty("--reveal-delay", `${(i % 6) * 90}ms`);
          });
        });
      });
      scope.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)").forEach((el) => {
        // Already on screen when tagged (top of the page): show at once, no flash
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9 && !firstRunDone) show(el, true);
        else io.observe(el);
      });
    };

    let firstRunDone = false;
    tag(document);
    firstRunDone = true;
    // Content that appears later (client components, CMS data) gets picked up too
    const mo = new MutationObserver(() => tag(document));
    const main = document.getElementById("main-content");
    if (main) mo.observe(main, { childList: true, subtree: true });

    // Safety net: never leave anything hidden (e.g. printed page, odd browsers)
    const safety = setTimeout(() => {
      document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) show(el as HTMLElement, true);
      });
    }, 2500);

    return () => {
      io.disconnect();
      mo.disconnect();
      clearTimeout(safety);
    };
  }, [pathname]);

  if (isAdmin) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[120] h-[3px]">
      <div id="scroll-progress" className="h-full origin-left scale-x-0 bg-gradient-to-r from-[#0052cc] via-sky-400 to-[#00d4ff] shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
    </div>
  );
}
