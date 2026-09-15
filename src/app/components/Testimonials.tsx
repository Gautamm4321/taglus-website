"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  review: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Mr. Joe Schiavello",
    role: "Orthoshop, Australia",
    rating: 5,
    review:
      "I have been very happy after the trial of Taglus in my laboratory, so much so that it will now be offered to all our customers for retainers. All aligner cases will also be manufactured using Taglus aligner material. Overall, the new Taglus aligner/retainer material has my approval and will be definitely used in my laboratory.",
  },
  {
    name: "Amalia Tsetsou",
    role: "Dental Lab Technician",
    rating: 5,
    review:
      "In the past we were using other big brands and we saw a great difference on how clear was the final product, the easiness of use on all stages, cutting polishing etc. Since we Taglus sheets on aligners and retainers we also saw great difference regarding other brands on the fact that it doesn't color so fast and it's abilities on teeth movements is as described.",
  },
  {
    name: "Manuel Fernández Cano",
    role: "Spain",
    rating: 5,
    review:
      "I have been using Taglus Premium for my aligners for over 3 years with excellent results. They have very good mechanical properties to achieve the intended results.",
  },
  {
    name: "Dr. Abdullah Ali",
    role: "Egypt",
    rating: 5,
    review:
      "Using the proper staging technique, the right sheet material, thickness mild to moderate crowding cases could be treated efficiently using in-house aligners. Taglus Sheets done the job perfectly as wanted.",
  },
  {
    name: "Dr. Anastasios Drakos",
    role: "Orthodontics & Dental Lab",
    rating: 5,
    review:
      "Taglus is always very helpful, fast responding and with a very fast delivery despite the great distance and the Covid-19 virus situation which is a factor affecting every business in the world. The quality of the products is excellent and this comes not only by our own lab and the results on patients using aligners and retainers made with Taglus sheets but also from customers feedback received by our sellers.",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const item = TESTIMONIALS[currentIndex];

  return (
    <section className="w-full py-20 px-4 sm:px-8 max-w-5xl mx-auto relative select-none">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-[#433878] leading-[1.08] tracking-tight">
          <span className="block text-3xl sm:text-4xl md:text-5xl font-semibold">
            See what
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl font-light tracking-tighter mt-1">
            they’re saying!
          </span>
        </h2>
      </div>

      {/* 1 Centered Box with Left & Right Transparent Arrow Buttons */}
      <div className="relative flex items-center justify-center gap-3 sm:gap-6">
        
        {/* Left Transparent Glass Arrow Button */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous Review"
          className="shrink-0 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/40 hover:bg-white/80 backdrop-blur-md border border-white/80 text-slate-800 shadow-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Fixed-Size Single Card */}
        <div className="w-full max-w-2xl min-h-[360px] md:min-h-[380px] p-8 md:p-10 rounded-[2.5rem] rounded-br-[4.5rem] bg-gradient-to-br from-white/90 via-white/70 to-[#dff7ff]/60 backdrop-blur-xl border border-white/80 shadow-[0_20px_50px_-15px_rgba(0,102,204,0.12)] flex flex-col justify-between relative transition-all duration-300">
          
          {/* Quote Watermark */}
          <div className="absolute top-6 right-8 text-blue-200/40 pointer-events-none">
            <Quote size={48} className="rotate-180" />
          </div>

          <div>
            {/* 5 Golden Stars */}
            <div className="flex items-center gap-1.5 mb-5 text-amber-400">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-amber-400 stroke-amber-400 drop-shadow-sm"
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal relative z-10">
              “{item.review}”
            </p>
          </div>

          {/* Author Details Footer */}
          <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between">
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight">
                {item.name}
              </h4>
              {item.role && (
                <p className="text-xs sm:text-sm font-semibold text-amber-600 tracking-wide mt-0.5">
                  {item.role}
                </p>
              )}
            </div>

            {/* Monogram Pill */}
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#7fcdff] to-[#dff7ff] border border-white shadow-sm flex items-center justify-center font-bold text-blue-900 text-sm">
              {item.name.replace(/^(Mr\.|Dr\.)\s*/, "").charAt(0)}
            </div>
          </div>
        </div>

        {/* Right Transparent Glass Arrow Button */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next Review"
          className="shrink-0 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/40 hover:bg-white/80 backdrop-blur-md border border-white/80 text-slate-800 shadow-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Pagination Indicators */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {TESTIMONIALS.map((_, dotIdx) => (
          <button
            key={dotIdx}
            type="button"
            onClick={() => setCurrentIndex(dotIdx)}
            aria-label={`Go to slide ${dotIdx + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              dotIdx === currentIndex
                ? "w-8 bg-blue-700"
                : "w-2.5 bg-blue-300/80 hover:bg-blue-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}