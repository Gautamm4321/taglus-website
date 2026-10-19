"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

interface AccessoryItem {
  id: string;
  category: string;
  title: string;
  description: string;
  bullets: string[];
  image: string;
  buttonText: string;
}

const accessoriesData: AccessoryItem[] = [
  {
    id: "retainer-box",
    category: "CLINICAL BRANDING & STORAGE",
    title: "Taglus Retainer Boxes",
    description:
      "Created using a unique in-house precision injection moulding process. Sturdy, lightweight, and customisable to elevate your orthodontic brand presence.",
    bullets: [
      "Customisable with your clinic logo & brand colours",
      "Sturdy and lightweight protective architecture",
      "Secure magnetic closure mechanism",
      "Competitive lab & clinic pricing tiers",
    ],
    image: "/acesories-B.jpg",
    buttonText: "CUSTOMISE RETAINER BOXES",
  },
  {
    id: "chewies",
    category: "CHAIRSIDE & PATIENT COMPLIANCE",
    title: "Taglus Aligner Chewies",
    description:
      "Engineered with medical-grade silicone to provide uniform bite pressure, ensuring perfect seating of thermoformed aligner trays and optimal orthodontic tracking.",
    bullets: [
      "High-grade medical silicone composition",
      "Ensures tight seating and seating accuracy",
      "Maintains oral hygiene standards during insertion",
      "Available in attractive clinical color variants",
    ],
    image: "/acesories-A.jpg",
    buttonText: "VIEW CHEWIES VARIANTS",
  },
  {
    id: "removal-tool",
    category: "PATIENT SAFETY INSTRUMENTS",
    title: "Taglus Aligner Removal Tool",
    description:
      "Manufactured with durable, non-toxic dental plastic. Designed to safely and effortlessly disengage invisible aligners without damaging composite attachments or injuring sensitive gingival tissues.",
    bullets: [
      "Ergonomic handle for comfortable, non-slip grip",
      "Precision dual-sided lever hook architecture",
      "Eliminates fingernail damage & prevents gum trauma",
      "Compact footprint engineered to fit inside retainer cases",
    ],
    image: "/acesories-D.jpg",
    buttonText: "EXPLORE REMOVAL TOOL",
  },
  {
    id: "pillow-box",
    category: "LUXURY ALIGNER PACKAGING",
    title: "Premium Dental Pillow Boxes",
    description:
      "Sleek and sustainable branded secondary packaging designed to deliver aligners and retainers with an uncompromising premium patient experience.",
    bullets: [
      "Available in 1-inch, 2-inch, and 3-inch depth configurations",
      "Fully customizable with clinical brand identity",
      "Eco-conscious and sustainable recyclable material",
      "Professional presentation for aligner start kits",
    ],
    image: "/acesories-F.jpeg",
    buttonText: "VIEW PACKAGING SIZES",
  },
  {
    id: "articulator",
    category: "DENTAL LAB CALIBRATION",
    title: "Articulator With Stopper",
    description:
      "Compact curved dental articulator built specifically for 3D printed orthodontic models. Minimises printed model height to directly reduce photopolymer resin consumption.",
    bullets: [
      "Integrated stopper mechanism for precise occlusal alignment",
      "Curved ergonomic geometry for rapid lab mounting",
      "Reduces required base height, saving 3D resin costs",
      "Lightweight, durable lab construction",
    ],
    image: "/acesories-C.png",
    buttonText: "ORDER LAB ARTICULATORS",
  },
  {
    id: "impression-tray",
    category: "IMPRESSION & SCANNING GEAR",
    title: "Taglus Dental Impression Trays",
    description:
      "Anatomically contoured rigid impression trays engineered for high-precision bite records, aligner pre-treatment planning, and physical workflow transfers.",
    bullets: [
      "Medical-grade rigid non-flex polymer construction",
      "Perforated retention borders for secure impression hold",
      "Anatomically mapped arch curvatures (Upper & Lower)",
      "Autoclavable and single-use hygienic variants available",
    ],
    image: "/acesories-E.png",
    buttonText: "EXPLORE TRAY SIZES",
  },
];

export default function AccessoriesShowcaseTemplate() {
  return (
    <div className="w-full bg-[#020612] text-[#E8DCC8] font-sans selection:bg-sky-400 selection:text-slate-950">
      
      {/* ========================================================
          TOP HEADER FRAME (Strict 2-Lines)
      ======================================================== */}
      <section className="relative w-full pt-28 sm:pt-36 pb-14 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto border-b border-[#E8DCC8]/15 text-center">
        <div className="max-w-5xl mx-auto flex flex-col items-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#E8DCC8]/25 text-sky-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md">
            <Sparkles size={14} className="text-sky-400" />
            <span>Taglus Orthodontic Essentials</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#E8DCC8] leading-[1.2]">
            Taglus Orthodontic <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-300 whitespace-normal sm:whitespace-nowrap">
              Accessories &amp; Consumables
            </span>
          </h1>

          <p className="text-sm sm:text-base text-sky-300/90 font-mono font-medium leading-relaxed max-w-2xl">
            Complete the digital workflow with precision delivery accessories, chairside tools, and packaging systems.
          </p>
        </div>
      </section>

      {/* ========================================================
          ALTERNATING 1:1 SHOWCASE GRID (Reference Style)
      ======================================================== */}
      <section className="w-full">
        {accessoriesData.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={item.id}
              id={item.id}
              className="w-full border-b border-[#E8DCC8]/15"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[550px] lg:min-h-[max(560px,40vw)]">
                
                {/* 1:1 Image Panel */}
                <div
                  className={`relative w-full aspect-[5/4] lg:aspect-auto bg-[#030919] overflow-hidden ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020612]/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content Panel */}
                <div
                  className={`flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-16 ${
                    isEven
                      ? "lg:order-2 bg-[#020612]"
                      : "lg:order-1 bg-[#020612] lg:border-r border-[#E8DCC8]/15"
                  }`}
                >
                  <div className="max-w-xl space-y-6">
                    {/* Category Label */}
                    <p className="text-xs sm:text-[13px] font-mono tracking-widest uppercase text-sky-400 font-semibold">
                      {item.category}
                    </p>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#E8DCC8] leading-tight">
                      {item.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-[#E8DCC8] font-light leading-relaxed">
                      {item.description}
                    </p>

                    {/* Bullet Points */}
                    <ul className="space-y-3 pt-2">
                      {item.bullets.map((bullet, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-xs sm:text-sm text-[#E8DCC8] font-light"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-2" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Button */}
                    <div className="pt-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 py-3 px-6 rounded-full border border-[#E8DCC8]/30 hover:border-sky-400 bg-white/[0.03] hover:bg-gradient-to-r hover:from-[#0052cc] hover:to-[#00d4ff] text-[#E8DCC8] hover:text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300"
                      >
                        <span>{item.buttonText}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </section>

      {/* ========================================================
          BOTTOM WORKFLOW CALL TO ACTION
      ======================================================== */}
      <section className="relative py-16 px-6 sm:px-12 max-w-6xl mx-auto text-center space-y-4">
        <h3 className="text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#E8DCC8] lg:whitespace-nowrap">
          Looking to Build a Custom Aligner Delivery Kit?
        </h3>
        <p className="text-sm sm:text-base text-[#E8DCC8] font-light max-w-2xl mx-auto">
          We offer custom logo printing, packaging boxes, and clinical tool sets for aligner brands and regional distribution partners.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-gradient-to-r from-[#0052cc] via-[#0088ff] to-[#00d4ff] hover:opacity-95 text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-sky-500/20"
          >
            <span>Speak With a Specialist</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

    </div>
  );
}