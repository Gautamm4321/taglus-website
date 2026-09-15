"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Header() {
  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
    { label: "Product", href: "#product" },
    { label: "Resources", href: "#resources" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full pt-6 px-4 sm:px-8">
      <nav className="max-w-7xl mx-auto glass-nav rounded-full px-6 py-3 flex items-center justify-between transition-all">
        {/* Left: Taglus Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-tuglas.png"
            alt="Taglus Logo"
            width={140}
            height={36}
            priority
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </Link>

        {/* Center: Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-800">
          {links.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="hover:text-blue-700 transition-colors font-semibold"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Corner: Read More Pill */}
        <Link
          href="#about"
          className="group flex items-center gap-2.5 pl-5 pr-2 py-1.5 rounded-full bg-black text-white text-xs sm:text-sm font-medium hover:bg-slate-900 transition-all duration-200 hover:scale-[1.02] shadow-md"
        >
          <span>Read More</span>
          <div className="w-6 h-6 rounded-full bg-[#5b52e0] text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
            <ArrowRight size={13} />
          </div>
        </Link>
      </nav>
    </header>
  );
}