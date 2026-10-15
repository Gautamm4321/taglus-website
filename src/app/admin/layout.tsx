import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { isAdmin } from "../lib/auth";
import { logout } from "../actions/authActions";
import AdminNav from "./components/AdminNav";

export const metadata: Metadata = {
  title: "Taglus CMS",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const authed = await isAdmin();

  if (!authed) {
    return <div className="min-h-screen bg-[#050B17] text-white">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#050B17] text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#050B17]/95 backdrop-blur">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-6">
            <Link href="/admin/products" className="font-bold text-[#E8DCC8] tracking-tight">
              Taglus CMS
            </Link>
            <AdminNav />
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" target="_blank" className="text-gray-400 hover:text-white">
              View site ↗
            </Link>
            <form action={logout}>
              <button type="submit" className="text-gray-400 hover:text-red-300">
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
