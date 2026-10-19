import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Mail, Phone } from "lucide-react";

/* ---------- Links ---------- */

const QUICK_LINKS = [
  { label: "Products", href: "/#products" },
  { label: "About Taglus", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Events", href: "/events" },
];

const COMPANY_LINKS = [
  { label: "Quality & Certifications", href: "/certifications" },
  { label: "Blog & News", href: "/blog" },
  { label: "Product Catalogue", href: "/Taglus-Product-Catalogue.pdf", external: true },
  { label: "Contact", href: "/contact" },
];

/* ---------- Social icons (inline SVG: lucide no longer ships brand logos) ---------- */

const svgProps = { viewBox: "0 0 24 24", className: "w-[18px] h-[18px]", fill: "currentColor", "aria-hidden": true } as const;

const SOCIALS: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/taglus_official/",
    icon: (
      <svg {...svgProps} fill="none" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/tagluscom/",
    icon: (
      <svg {...svgProps}>
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-1.8 3.77-1.8 4.03 0 4.37 2.4 4.37 5.5v5.8h-4v-5.15c0-1.23-.02-2.8-1.8-2.8-1.8 0-2.2 1.3-2.2 2.7v5.25h-4v-11Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@taglus",
    icon: (
      <svg {...svgProps}>
        <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.75 15.1V8.9L15.5 12l-5.75 3.1Z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/Taglus_Official",
    icon: (
      <svg {...svgProps} className="w-4 h-4">
        <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.2h1.7L7.4 4.73H5.58L16.67 19.2Z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919930905047",
    icon: (
      <svg {...svgProps}>
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3 .78.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.24-.64.8-.78.96-.15.17-.29.19-.54.07-.25-.13-1.04-.39-1.98-1.23-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31c-.23.25-.86.85-.86 2.06 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.6.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.17-.48-.29Z" />
      </svg>
    ),
  },
  {
    label: "Call +91 99309 05047",
    href: "tel:+919930905047",
    icon: <Phone size={17} strokeWidth={1.8} />,
  },
  {
    label: "Email info@taglus.com",
    href: "mailto:info@taglus.com",
    icon: <Mail size={17} strokeWidth={1.8} />,
  },
];

function FooterLink({ href, label, external }: { href: string; label: string; external?: boolean }) {
  return (
    <li>
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="text-[15px] sm:text-base text-[#E8DCC8] hover:text-sky-300 transition-colors"
      >
        {label}
      </Link>
    </li>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-[#E8DCC8]/10 bg-gradient-to-b from-transparent via-[#04102a]/60 to-[#020612]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-10 sm:pt-12 pb-6">
        {/* ===== Top: links (left) + brand, socials & buttons (right) ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8">
          {/* Link columns */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-8 sm:gap-16 max-w-md">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#E8DCC8]">Quick Links</h2>
              <ul className="mt-4 space-y-2.5">
                {QUICK_LINKS.map((l) => (
                  <FooterLink key={l.label} {...l} />
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#E8DCC8]">Company</h2>
              <ul className="mt-4 space-y-2.5">
                {COMPANY_LINKS.map((l) => (
                  <FooterLink key={l.label} {...l} />
                ))}
              </ul>
            </div>
          </div>

          {/* Brand + socials + buttons */}
          <div className="lg:col-span-6 flex flex-col items-start lg:items-end gap-4">
            <Link href="/" aria-label="Taglus home">
              <Image src="/logo-tuglas.png" alt="Taglus" width={150} height={40} className="h-8 w-auto object-contain" />
            </Link>

            <p className="text-[15px] sm:text-base text-[#E8DCC8] font-light leading-relaxed max-w-md text-left lg:text-right">
              Aligner and retainer sheets, 3D printing resins, thermoforming machines and accessories: one partner for the
              complete digital orthodontic workflow.
            </p>

            <ul className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={s.label}
                    title={s.label}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#E8DCC8]/25 text-[#E8DCC8] hover:text-white hover:border-sky-400 hover:bg-sky-500/15 flex items-center justify-center transition-colors"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] text-white text-sm font-semibold hover:opacity-95 transition shadow-lg shadow-sky-500/20"
              >
                Become a Distributor <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#E8DCC8]/30 text-[#E8DCC8] text-sm font-semibold hover:border-sky-400 hover:text-white transition-colors"
              >
                Request a Sample
              </Link>
            </div>
          </div>
        </div>

        {/* ===== Bottom bar ===== */}
        <div className="mt-8 sm:mt-10 pt-5 border-t border-[#E8DCC8]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-[#E8DCC8]">
          <p className="uppercase tracking-wider">© {year} Taglus. All rights reserved.</p>
          <p>ISO 13485:2016 certified · Mumbai, India</p>
        </div>
      </div>
    </footer>
  );
}
