"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin/products", label: "Products" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/messages", label: "Messages" },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1">
      {LINKS.map((l) => {
        const active = pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              active ? "bg-[#D4AF37]/15 text-[#D4AF37]" : "text-gray-300 hover:bg-white/5"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
