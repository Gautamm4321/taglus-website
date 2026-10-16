"use client";

// Passes the CMS products (loaded once in app/layout.tsx on the server) down to the
// client-side Header, so the menu works on every page, including "use client" pages.
import { createContext, useContext, type ReactNode } from "react";
import type { MenuProduct } from "../lib/products";

const MenuContext = createContext<MenuProduct[]>([]);

export function MenuProvider({ products, children }: { products: MenuProduct[]; children: ReactNode }) {
  return <MenuContext.Provider value={products}>{children}</MenuContext.Provider>;
}

export function useMenuProducts() {
  return useContext(MenuContext);
}