"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ArrowRight, Menu, X } from "lucide-react";
import { useMenuProducts } from "./MenuProvider";
import type { MenuGroupName } from "../lib/validation";

type MenuItem = { name: string; desc: string; href: string; badge?: string };

/*
 * Products menu columns.
 * - Products come from the CMS: Admin → Product → "Website menu" section.
 * - `upcoming`: products not in the CMS yet. Each one disappears automatically
 *   once a published product with the same name is added to that column.
 * - `fixed`: links that always show (sections of the accessories page).
 */
const MENU_COLUMNS: { group: MenuGroupName; title: string; upcoming?: MenuItem[]; fixed?: MenuItem[] }[] = [
  {
    group: "ALIGNER",
    title: "Aligner Materials",
    upcoming: [
      { name: "Taglus Ultra", desc: "High-force aligner sheet", href: "/products/taglus-ultra" },
    ],
  },
  {
    group: "RETAINER",
    title: "Retainer & Splint",
    upcoming: [
      { name: "Taglus Hard & Soft", desc: "Bilayer sheet: rigid outside, soft inside", href: "/products/taglus-hard-and-soft" },
      { name: "Taglus Soft", desc: "Flexible EVA for guards & trays", href: "/products/taglus-soft" },
    ],
  },
  {
    group: "AESTHETIC",
    title: "Aesthetic & Interim",
    upcoming: [
      { name: "Taglus Smiles", desc: "Shaded sheets for pontics & interims", href: "/products/taglus-smiles", badge: "Shades: A1, A2 & A3" },
    ],
  },
  { group: "THERMOFORMING", title: "Thermoforming" },
  { group: "PRINTING", title: "3D Printing" },
  {
    group: "ACCESSORIES",
    title: "Accessories & Packaging",
    fixed: [
      { name: "Retainer Box", desc: "Protective retainer case", href: "/products/taglus-orthodontic-accessories#taglus-retainer-boxes" },
      { name: "Orthodontic Accessories", desc: "Chewies & removal tools", href: "/products/taglus-orthodontic-accessories#taglus-aligner-chewies" },
      { name: "Membrane / Pillow Box", desc: "Smart aligner packaging", href: "/products/taglus-orthodontic-accessories#premium-dental-pillow-boxes" },
      { name: "Articulator", desc: "Dental model articulator", href: "/products/taglus-orthodontic-accessories#articulator-with-stopper" },
      { name: "Impression Tray", desc: "Trays for dental impressions", href: "/products/taglus-orthodontic-accessories#taglus-dental-impression-trays" },
    ],
  },
];

/** "TAGLUS® Ultra" and "Taglus Ultra" both become "ultra", so upcoming items match CMS products. */
const normalizeName = (s: string) =>
  s.toLowerCase().replace(/[®™]/g, "").replace(/taglus/g, "").replace(/[^a-z0-9]/g, "");

type NavLink = { title: string; desc: string; href: string; isPdf?: boolean };

// Shared by the desktop dropdowns and the mobile menu (edit links in one place)
const RESOURCES_LINKS: NavLink[] = [
  { title: "Product Catalogue", desc: "Full portfolio, PDF", href: "/Taglus-Product-Catalogue.pdf", isPdf: true },
  { title: "Case Studies", desc: "Real cases, real workflows", href: "/case-studies" },
  { title: "Blog & News", desc: "Material science, made practical", href: "/blog" },
];

const COMPANY_LINKS: NavLink[] = [
  { title: "About Taglus", desc: "Who we are and how we manufacture", href: "/about" },
  { title: "Quality & Certifications", desc: "ISO 13485:2016, CE, UKCA, TGA, ANVISA", href: "/certifications" },
  { title: "Events", desc: "Meet us at IDS 2027 and other shows", href: "/events" },
];

/* ---------- Mobile menu building blocks ---------- */
function MobileGroup({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[#E8DCC8]/10">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-4 text-base font-semibold tracking-wide text-[#E8DCC8]"
      >
        <span>{title}</span>
        <ChevronDown size={18} className={`transition-transform duration-200 ${open ? "rotate-180 text-sky-400" : "text-[#E8DCC8]"}`} />
      </button>
      {open && <div className="pb-4 space-y-1">{children}</div>}
    </div>
  );
}

function MobileLink({
  href,
  title,
  desc,
  badge,
  isPdf,
  onNavigate,
}: {
  href: string;
  title: string;
  desc?: string;
  badge?: string;
  isPdf?: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      target={isPdf ? "_blank" : undefined}
      rel={isPdf ? "noopener noreferrer" : undefined}
      className="block rounded-xl px-3 py-2.5 hover:bg-white/[0.05] active:bg-white/[0.08] transition-colors"
    >
      <span className="block text-sm font-medium text-[#E8DCC8]">{title}</span>
      {desc && <span className="block text-xs font-light text-[#E8DCC8] mt-0.5 leading-snug">{desc}</span>}
      {badge && (
        <span className="inline-block mt-1.5 text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
          {badge}
        </span>
      )}
    </Link>
  );
}

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSection(null);
  };
  const toggleSection = (id: string) => setMobileSection((s) => (s === id ? null : id));

  // While the mobile menu is open: stop the page behind it from scrolling, close on Esc
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setMobileSection(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);
  const menuProducts = useMenuProducts();

  const menuColumns = MENU_COLUMNS.map((col) => {
    const fromCms: MenuItem[] = menuProducts
      .filter((p) => p.group === col.group)
      .map((p) => ({ name: p.title, desc: p.description, href: `/products/${p.slug}` }));
    const inCms = new Set(fromCms.map((i) => normalizeName(i.name)));
    const upcoming = (col.upcoming ?? []).filter((i) => !inCms.has(normalizeName(i.name)));
    return { ...col, items: [...(col.fixed ?? []), ...fromCms, ...upcoming] };
  }).filter((col) => col.items.length > 0);

  // Esc closes an open desktop dropdown (keyboard users)
  useEffect(() => {
    if (!activeMenu) return;
    const closeDesktopOnEsc = (e: KeyboardEvent) => e.key === "Escape" && setActiveMenu(null);
    window.addEventListener("keydown", closeDesktopOnEsc);
    return () => window.removeEventListener("keydown", closeDesktopOnEsc);
  }, [activeMenu]);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 w-full bg-[#020612]/80 backdrop-blur-2xl border-b border-[#E8DCC8]/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <nav aria-label="Main" className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">

        {/* Left: Taglus Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo-tuglas.png"
            alt="Taglus home"
            width={130}
            height={34}
            priority
            style={{ width: "auto" }}
            className="h-7 sm:h-8 object-contain"
          />
        </Link>

        {/* Center: Main Nav Items */}
        <ul className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wide">

          {/* 1. Products (Mega-Menu Trigger) */}
          <li
            className="relative py-2 cursor-pointer"
            onMouseEnter={() => setActiveMenu("products")}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={activeMenu === "products"}
              onClick={() => setActiveMenu(activeMenu === "products" ? null : "products")}
              className="flex items-center gap-1.5 text-[#E8DCC8] hover:text-white transition-colors">
              <span>Products</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === "products" ? "rotate-180 text-sky-400" : "text-[#E8DCC8]"}`} />
            </button>
          </li>

          {/* 3. Resources Dropdown */}
          <li
            className="relative py-2 cursor-pointer"
            onMouseEnter={() => setActiveMenu("resources")}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={activeMenu === "resources"}
              onClick={() => setActiveMenu(activeMenu === "resources" ? null : "resources")}
              className="flex items-center gap-1.5 text-[#E8DCC8] hover:text-white transition-colors">
              <span>Resources</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === "resources" ? "rotate-180 text-sky-400" : "text-[#E8DCC8]"}`} />
            </button>

            {activeMenu === "resources" && (
              <div className="absolute top-full left-0 mt-3 w-84 rounded-2xl bg-[#030919]/95 backdrop-blur-2xl border border-[#E8DCC8]/20 p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="space-y-2.5">
                  {RESOURCES_LINKS.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      target={item.isPdf ? "_blank" : undefined}
                      rel={item.isPdf ? "noopener noreferrer" : undefined}
                      className="block p-2 rounded-xl hover:bg-white/[0.06] transition group"
                    >
                      <p className="text-xs font-semibold text-[#E8DCC8] group-hover:text-sky-300 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-[#E8DCC8] font-light mt-0.5">
                        {item.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>

          {/* 4. Company Dropdown */}
          <li
            className="relative py-2 cursor-pointer"
            onMouseEnter={() => setActiveMenu("company")}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={activeMenu === "company"}
              onClick={() => setActiveMenu(activeMenu === "company" ? null : "company")}
              className="flex items-center gap-1.5 text-[#E8DCC8] hover:text-white transition-colors">
              <span>Company</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === "company" ? "rotate-180 text-sky-400" : "text-[#E8DCC8]"}`} />
            </button>

            {activeMenu === "company" && (
              <div className="absolute top-full left-0 mt-3 w-80 rounded-2xl bg-[#030919]/95 backdrop-blur-2xl border border-[#E8DCC8]/20 p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="space-y-2.5">
                  {COMPANY_LINKS.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="block p-2 rounded-xl hover:bg-white/[0.06] transition group"
                    >
                      <p className="text-xs font-semibold text-[#E8DCC8] group-hover:text-sky-300 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-[#E8DCC8] font-light mt-0.5">
                        {item.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>

          {/* 5. Contact (Single Link) */}
          <li>
            <Link
              href="/contact"
              className="text-[#E8DCC8] hover:text-white transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>

        <Link
          href="/contact"
          className="group hidden lg:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] hover:from-blue-600 hover:to-cyan-400 text-white text-xs sm:text-[13px] font-semibold tracking-wide shadow-md shadow-sky-500/20 hover:scale-[1.02] transition-all duration-200"
        >
          <span>Become a Distributor</span>
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>

        {/* Mobile: hamburger button (right side) */}
        <button
          type="button"
          onClick={() => (mobileOpen ? closeMobile() : setMobileOpen(true))}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 rounded-xl text-[#E8DCC8] hover:bg-white/[0.06] transition-colors"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div className="lg:hidden h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain border-t border-[#E8DCC8]/10 bg-[#020612]">
          <div className="px-6 pt-2 pb-10">
            <MobileGroup title="Products" open={mobileSection === "products"} onToggle={() => toggleSection("products")}>
              <div className="space-y-5 pt-1">
                {menuColumns.map((col) => (
                  <div key={col.group}>
                    <p className="px-3 pb-1 text-[11px] font-bold text-sky-400 uppercase tracking-widest">{col.title}</p>
                    {col.items.map((item) => (
                      <MobileLink
                        key={`${item.href}-${item.name}`}
                        href={item.href}
                        title={item.name}
                        desc={item.desc}
                        badge={item.badge}
                        onNavigate={closeMobile}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </MobileGroup>

            <MobileGroup title="Resources" open={mobileSection === "resources"} onToggle={() => toggleSection("resources")}>
              {RESOURCES_LINKS.map((l) => (
                <MobileLink key={l.title} href={l.href} title={l.title} desc={l.desc} isPdf={l.isPdf} onNavigate={closeMobile} />
              ))}
            </MobileGroup>

            <MobileGroup title="Company" open={mobileSection === "company"} onToggle={() => toggleSection("company")}>
              {COMPANY_LINKS.map((l) => (
                <MobileLink key={l.title} href={l.href} title={l.title} desc={l.desc} onNavigate={closeMobile} />
              ))}
            </MobileGroup>

            <Link
              href="/contact"
              onClick={closeMobile}
              className="flex items-center justify-between py-4 text-base font-semibold tracking-wide text-[#E8DCC8] border-b border-[#E8DCC8]/10"
            >
              <span>Contact</span>
              <ArrowRight size={18} className="text-[#E8DCC8]" />
            </Link>
          </div>
        </div>
      )}

      {/* ================= PRODUCTS MEGA-MENU OVERLAY ================= */}
      {activeMenu === "products" && (
        <div
          className="hidden lg:block max-w-7xl mx-auto mb-4 rounded-2xl bg-[#030919]/98 backdrop-blur-3xl border border-[#E8DCC8]/15 shadow-[0_30px_70px_rgba(0,0,0,0.9)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
          onMouseEnter={() => setActiveMenu("products")}
        >
          {/* Product columns, driven by the CMS (see MENU_COLUMNS at the top of this file) */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-7 border-b border-white/[0.08]">
            {menuColumns.map((col) => (
              <div key={col.group} className="space-y-4">
                <h4 className="text-[11px] font-bold text-sky-400 uppercase tracking-widest border-b border-white/10 pb-2">
                  {col.title}
                </h4>
                <div className="space-y-3">
                  {col.items.map((item) => (
                    <Link key={`${item.href}-${item.name}`} href={item.href} className="block group">
                      <p className="text-xs font-semibold text-[#E8DCC8] group-hover:text-white transition-colors">{item.name}</p>
                      <p className="text-[10px] text-[#E8DCC8] font-light leading-snug line-clamp-2">{item.desc}</p>
                      {item.badge && (
                        <span className="inline-block mt-1 text-[9px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Strip: Specialist CTA */}
          <div className="px-7 py-3.5 bg-white/[0.02] flex items-center justify-between text-xs">
            <span className="text-[#E8DCC8] font-light">
              Not sure which sheet fits your workflow?
            </span>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 font-semibold text-sky-300 hover:text-white transition-colors"
            >
              <span>Talk to a specialist</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}