"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Scan, 
  Layers, 
  Printer, 
  Flame, 
  Scissors, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Cpu
} from "lucide-react";

interface WorkflowStep {
  id: string;
  stepNumber: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  icon: any;
  bulletPoints: string[];
  products: { name: string; tag: string; desc: string }[];
  mediaType: "single" | "grid-resins" | "grid-duo" | "grid-quad";
  mediaLabel: string;
  mediaItems: { title: string; subtitle: string; imagePath: string }[];
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: "scan",
    stepNumber: "01",
    title: "SCAN",
    category: "Data Acquisition",
    shortDesc: "Intraoral digital scanning",
    fullDesc: "Capture high-fidelity 3D digital impressions of the patient dentition using standard open-format intraoral scanners, laying the bedrock for clinical precision.",
    icon: Scan,
    bulletPoints: [
      "Open STL / PLY file architecture",
      "Sub-micron gingival margin resolution",
      "Seamless laboratory software transfer"
    ],
    products: [
      { name: "Digital Impression", tag: "Diagnostic", desc: "Patient arch scan data" }
    ],
    mediaType: "single",
    mediaLabel: "Digital Arch Impression",
    mediaItems: [
      { 
        title: "3D Intraoral Scan", 
        subtitle: "Open Architecture STL/PLY", 
        imagePath: "/Screenshot_2026-09-15_102027-removebg-preview.png" 
      }
    ]
  },
  {
    id: "plan",
    stepNumber: "02",
    title: "PLAN",
    category: "Software & CAD",
    shortDesc: "Design and stage tooth movements",
    fullDesc: "Simulate and design sequential tooth movements, staging velocity and anchorage control within orthodontic CAD planning platforms.",
    icon: Layers,
    bulletPoints: [
      "Staged biomechanical force vectors",
      "Automatic trimline curve generation",
      "Precision attachment positioning"
    ],
    products: [
      { name: "Trimline Generator", tag: "CAD Software", desc: "Automated margin toolpath generator" }
    ],
    mediaType: "single",
    mediaLabel: "CAD Treatment Staging",
    mediaItems: [
      { 
        title: "Trimline Software Planning", 
        subtitle: "Automated Path Calculations", 
        imagePath: "/plan.jpeg" 
      }
    ]
  },
  {
    id: "print",
    stepNumber: "03",
    title: "PRINT",
    category: "3D Additive Resins",
    shortDesc: "Create accurate treatment models",
    fullDesc: "Fabricate dimensionally stable dental models for thermoforming using Taglus biomedical-grade photopolymer resins engineered for high heat resistance.",
    icon: Printer,
    bulletPoints: [
      "High thermal stability during thermoforming",
      "Ultra-crisp undercut and embrasure detail",
      "Formulated for 385nm and 405nm DLP/LCD/SLA printers"
    ],
    products: [
      { name: "Taglus Model Resin", tag: "Flagship", desc: "Precision for treatment models" },
      { name: "Water-Washable Resin", tag: "Eco Workflow", desc: "Simplified cleaning workflow without IPA" },
      { name: "Low-Odor Resin", tag: "Comfort", desc: "Designed for a more comfortable lab working environment" }
    ],
    mediaType: "grid-resins",
    mediaLabel: "Taglus Resins — 3 Materials",
    mediaItems: [
      { 
        title: "Model Resin", 
        subtitle: "High Precision Models", 
        imagePath: "/print-1-img.jpeg" 
      },
      { 
        title: "Water-Washable", 
        subtitle: "Simplified Cleaning", 
        imagePath: "/print-2-img.jpeg" 
      },
      { 
        title: "Low-Odor Resin", 
        subtitle: "Lab Comfort", 
        imagePath: "/print-3-img.jpeg" 
      }
    ]
  },
  {
    id: "form",
    stepNumber: "04",
    title: "FORM",
    category: "Thermoforming Engineering",
    shortDesc: "Thermoform with Taglus materials",
    fullDesc: "Adapt engineering-grade thermoplastic sheets over the printed models utilizing rapid sub-second positive pressure thermoforming systems.",
    icon: Flame,
    bulletPoints: [
      "Continuous, sustained orthodontic tooth-moving force",
      "Multi-layer impact dampening core",
      "Near-zero stress relaxation over wear duration"
    ],
    products: [
      { name: "Taglus Sheets", tag: "Materials", desc: "Premium | Ultra | Tuff | Duoform" },
      { name: "Taglus Duoform", tag: "Hardware", desc: "Sub-second heat-up pressure former" }
    ],
    mediaType: "grid-duo",
    mediaLabel: "Thermoforming Machine & Sheet Material",
    mediaItems: [
      { 
        title: "Thermoforming Machine", 
        subtitle: "Taglus Duoform Pressure Former", 
        imagePath: "/Form-1-img.jpeg" 
      },
      { 
        title: "Taglus Clear Sheet", 
        subtitle: "Ultra / Premium Thermoforming Disc", 
        imagePath: "/Form-2-img.jpeg" 
      }
    ]
  },
  {
    id: "trim",
    stepNumber: "05",
    title: "TRIM",
    category: "Automated Trimming",
    shortDesc: "Automated Laser & Milling Trimming",
    fullDesc: "Automate aligner margin cutouts along the patient's scanned gingival contour with robotic 5-axis routers and precision CO2 laser systems.",
    icon: Scissors,
    bulletPoints: [
      "Eliminates manual micro-burr trimming",
      "Smooth, uniform gingival edge margins",
      "High-throughput multi-appliance automated batches"
    ],
    products: [
      { name: "5X Trimming Machine", tag: "Milling", desc: "Trimming tool moves precisely around margin" },
      { name: "LAC (Laser Aligner Cutter)", tag: "Laser", desc: "Clean, consistent margin without tool wear" }
    ],
    mediaType: "grid-duo",
    mediaLabel: "Automated Trimming Hardware",
    mediaItems: [
      { 
        title: "5X Trimming Machine", 
        subtitle: "Milling cutter follows margin contour", 
        imagePath: "/machine-5x.png" 
      },
      { 
        title: "LAC Laser Cutter", 
        subtitle: "Contactless CO2 Laser Precision", 
        imagePath: "/machine-lac.png" 
      }
    ]
  },
  {
    id: "finish",
    stepNumber: "06",
    title: "FINISH",
    category: "Polishing & Essentials",
    shortDesc: "Smooth, polish and prepare the appliance",
    fullDesc: "Deburr, polish, and package the aligner alongside clinical-grade orthodontic delivery accessories for patient comfort and case success.",
    icon: Sparkles,
    bulletPoints: [
      "Ultra-smooth tongue and cheek contact comfort",
      "Complete patient delivery presentation",
      "Medical-grade chairside essentials"
    ],
    products: [
      { name: "Finishing Solutions", tag: "Polishing", desc: "Surface smoothing & edge polishing compounds" },
      { name: "Orthodontic Accessories", tag: "Essentials", desc: "Chewies, boxes, trays and removal tools" }
    ],
    mediaType: "grid-quad",
    mediaLabel: "Orthodontic Accessories & Delivery Kit",
    mediaItems: [
      { 
        title: "Ortho Chewies", 
        subtitle: "Aligner Seating", 
        imagePath: "/finish-4.jpeg" 
      },
      { 
        title: "Retainer Box", 
        subtitle: "Smart Storage", 
        imagePath: "/finish-3.jpeg" 
      },
      { 
        title: "Impression Tray", 
        subtitle: "Clinical Arch Form", 
        imagePath: "/finish-1.jpeg" 
      },
      { 
        title: "Removal Tool", 
        subtitle: "Safe Patient Removal", 
        imagePath: "/finish-2.jpeg" 
      }
    ]
  }
];

export default function FeatureHighlights() {
  const [activeStepIndex, setActiveStepIndex] = useState(2); // Step 3 PRINT
  const currentStep = WORKFLOW_STEPS[activeStepIndex];

  return (
    <section id="workflow" className="relative w-full py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#E8DCC8]/20 text-sky-300 text-xs font-semibold tracking-widest uppercase mb-4 backdrop-blur-md">
          <Cpu size={14} className="text-sky-400" />
          <span>Integrated Production Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#E8DCC8]">
          The 6-Step Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-indigo-300">Orthodontic Workflow</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#E8DCC8]/70 font-light leading-relaxed">
          From first intraoral scan to final patient packaging. Taglus supplies every critical layer of material science, 3D resin chemistry, and automated fabrication machinery.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full mb-12 overflow-x-auto pb-4 scrollbar-none">
        <div className="flex items-center justify-between min-w-[720px] bg-[#030919]/80 border border-[#E8DCC8]/15 rounded-2xl p-2 backdrop-blur-xl">
          {WORKFLOW_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-3 rounded-xl transition-all duration-300 cursor-pointer text-left ${
                  isActive 
                    ? "bg-gradient-to-r from-sky-500/20 to-blue-600/30 border border-sky-400/50 shadow-[0_0_20px_rgba(0,180,255,0.25)] text-white" 
                    : "text-[#E8DCC8]/60 hover:text-[#E8DCC8] hover:bg-white/[0.03]"
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isActive ? "bg-sky-400 text-slate-950 font-bold" : "bg-white/[0.05] text-[#E8DCC8]/70"
                }`}>
                  <Icon size={14} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-mono leading-none tracking-wider text-sky-400/80">STEP {step.stepNumber}</p>
                  <p className={`text-xs font-bold uppercase tracking-wide truncate ${isActive ? "text-white" : "text-[#E8DCC8]"}`}>
                    {step.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage Detail Card */}
      <div className="glass-box rounded-[2.5rem] p-6 sm:p-10 md:p-12 border border-[#E8DCC8]/20 bg-[#030919]/70 backdrop-blur-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
          >
            {/* Left Specs */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-medium uppercase tracking-wider mb-4">
                  <span>Stage {currentStep.stepNumber} of 06</span>
                  <span>•</span>
                  <span>{currentStep.category}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#E8DCC8] tracking-tight uppercase">
                  {currentStep.title} — {currentStep.shortDesc}
                </h3>

                <p className="mt-4 text-sm sm:text-base text-[#E8DCC8]/75 font-light leading-relaxed">
                  {currentStep.fullDesc}
                </p>

                <div className="mt-6 space-y-2.5">
                  {currentStep.bulletPoints.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#E8DCC8]/85 font-light">
                      <CheckCircle2 size={16} className="text-sky-400 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.08]">
                <p className="text-[11px] font-bold text-sky-400 uppercase tracking-widest mb-3">
                  Taglus Products In This Stage
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentStep.products.map((prod, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-sky-400/30 transition">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#E8DCC8]">{prod.name}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-400/10 text-sky-300">
                          {prod.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#E8DCC8]/60 font-light mt-1 leading-snug">
                        {prod.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Images Gallery */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[380px] bg-gradient-to-b from-white/[0.03] to-transparent rounded-3xl border border-white/[0.08] p-6 overflow-hidden">
              <div className="absolute w-64 h-64 rounded-full bg-sky-500/15 blur-[80px] pointer-events-none" />

              <div className="w-full relative z-10">
                <p className="text-xs font-mono uppercase tracking-widest text-[#E8DCC8]/60 text-center mb-6">
                  {currentStep.mediaLabel}
                </p>

                {/* 1. 3 Resins Grid */}
                {currentStep.mediaType === "grid-resins" && (
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 items-end justify-center">
                    {currentStep.mediaItems.map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center group">
                        <div className="w-full aspect-[3/4] max-w-[130px] rounded-2xl bg-black/50 border border-[#E8DCC8]/20 flex items-center justify-center p-2 group-hover:border-sky-400/50 transition-all shadow-lg relative overflow-hidden">
                          <Image
                            src={item.imagePath}
                            alt={item.title}
                            fill
                            className="object-contain p-2 group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <p className="text-xs font-semibold text-[#E8DCC8] text-center mt-2 group-hover:text-sky-300 transition-colors">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-[#E8DCC8]/60 text-center font-light">
                          {item.subtitle}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* 2. Duo Cards (Form & Trim) */}
                {currentStep.mediaType === "grid-duo" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentStep.mediaItems.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-black/50 border border-[#E8DCC8]/20 flex flex-col items-center text-center group hover:border-sky-400/50 transition shadow-lg">
                        <div className="w-full aspect-[4/3] rounded-xl relative overflow-hidden mb-3 bg-black/30">
                          <Image
                            src={item.imagePath}
                            alt={item.title}
                            fill
                            className="object-contain p-2 group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <p className="text-xs font-bold text-[#E8DCC8]">{item.title}</p>
                        <p className="text-[10px] text-[#E8DCC8]/60 font-light mt-0.5">{item.subtitle}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. Quad Grid (Finish: 4 Accessories in 2x2) */}
                {currentStep.mediaType === "grid-quad" && (
                  <div className="grid grid-cols-2 gap-3">
                    {currentStep.mediaItems.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-black/50 border border-[#E8DCC8]/20 flex flex-col items-center text-center group hover:border-sky-400/50 transition shadow-md">
                        <div className="w-full aspect-[16/10] rounded-lg relative overflow-hidden mb-2 bg-black/30">
                          <Image
                            src={item.imagePath}
                            alt={item.title}
                            fill
                            className="object-contain p-2 group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <p className="text-[11px] font-bold text-[#E8DCC8] truncate w-full">{item.title}</p>
                        <p className="text-[9px] text-[#E8DCC8]/60 font-light truncate w-full">{item.subtitle}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. Single for Scan & Plan */}
                {currentStep.mediaType === "single" && (
                  <div className="w-full max-w-sm mx-auto aspect-[16/10] rounded-2xl bg-black/50 border border-[#E8DCC8]/20 relative overflow-hidden flex items-center justify-center p-4">
                    <Image
                      src={currentStep.mediaItems[0].imagePath}
                      alt={currentStep.mediaItems[0].title}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Summary Matrix Table */}
      <div className="mt-14 glass-box rounded-2xl p-6 sm:p-8 border border-white/[0.08] bg-[#020612]/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#E8DCC8]">
              Workflow Lineage Summary
            </h4>
            <p className="text-xs text-[#E8DCC8]/60 font-light mt-0.5">
              Taglus Resins → 3D Printed Models → Taglus Sheets → Thermoforming → LAC / 5X Trimmer → Finishing → Final Aligner
            </p>
          </div>
          <Link
            href="#sample-kit"
            className="inline-flex items-center gap-2 text-xs font-semibold text-sky-300 hover:text-white transition"
          >
            <span>Request Full Workflow Specifications</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#E8DCC8]/80 border-collapse">
            <thead>
              <tr className="border-b border-white/[0.1] text-sky-400 uppercase tracking-widest text-[10px]">
                <th className="py-3 px-4 font-semibold">Stage</th>
                <th className="py-3 px-4 font-semibold">Taglus Dedicated Product</th>
                <th className="py-3 px-4 font-semibold hidden md:table-cell">Target Output</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              <tr>
                <td className="py-3 px-4 font-bold text-white">PRINT</td>
                <td className="py-3 px-4">Taglus Resins (Model resin, Odorless model resin, Water-washable)</td>
                <td className="py-3 px-4 text-[#E8DCC8]/60 hidden md:table-cell">Dimensionally stable 3D dental model</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">FORM</td>
                <td className="py-3 px-4">Taglus Sheets (Standard, Premium, PU Flex, Ultra, Hard & Soft)</td>
                <td className="py-3 px-4 text-[#E8DCC8]/60 hidden md:table-cell">Thermoformed clear aligner shell</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">TRIM</td>
                <td className="py-3 px-4">LAC (Laser Aligner Cutter) & 5X Trimming Machine</td>
                <td className="py-3 px-4 text-[#E8DCC8]/60 hidden md:table-cell">Clean, consistent scalloped gingival margin</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">FINISH</td>
                <td className="py-3 px-4">Finishing Solutions & Orthodontic Accessories</td>
                <td className="py-3 px-4 text-[#E8DCC8]/60 hidden md:table-cell">Polished patient-ready clear aligner appliance</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
}