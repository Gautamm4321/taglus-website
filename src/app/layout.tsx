import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taglus — The Invisible Architecture of Smiles | Next-Gen Aligner Polymers",
  description: "Taglus manufactures world-class clear aligner thermoforming sheets, retainer materials, and 3D dental resins. Engineered for precision orthodontics and global aligner laboratories.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#020612] text-[#E8DCC8] font-sans">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}