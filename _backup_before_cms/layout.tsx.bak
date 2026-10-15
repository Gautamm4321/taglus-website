import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";

// 1. Headings ke liye clean bold geometric font
const fontHeading = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

// 2. Body, buttons, badges, aur normal text ke liye
const fontBody = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Taglus — The Invisible Architecture of Smiles | Next-Gen Aligner Polymers",
  description:
    "Taglus manufactures world-class clear aligner thermoforming sheets, retainer materials, and 3D dental resins. Engineered for precision orthodontics and global aligner laboratories.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontHeading.variable} ${fontBody.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#020612] text-[#E8DCC8] overflow-x-hidden">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}