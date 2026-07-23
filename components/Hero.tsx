"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const heroSlides = [
  {
    image: "/images/hero_farm_milk.jpg",
    title: "NSV Pure Raw Milk Bottle",
    tag: "🐄 100% Farm Fresh",
    subtag: "Chilled at 4°C Untouched Purity",
  },
  {
    image: "/images/hero_cow_grazing.jpg",
    title: "Free-Grazing Organic Cows",
    tag: "🌱 Grass-Fed Dairy Farm",
    subtag: "Natural Nutrition & High Calcium",
  },
  {
    image: "/images/hero_milk_pouring.jpg",
    title: "Thick Cream Raw Milk",
    tag: "🥛 Zero Powder & Zero Water",
    subtag: "Delivered Every Morning <7 AM",
  },
];

export default function Hero() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  // AUTO SLIDE CHANGE EVERY 4 SECONDS
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-amber-50/60 via-white to-emerald-50/40 py-12 sm:py-20 overflow-hidden border-b border-emerald-100/80">
      
      {/* BACKGROUND LUXURY GLOWS */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-200/35 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* LEFT CONTENT COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* PILL BADGE */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-emerald-100 via-amber-100 to-emerald-100 text-emerald-950 border border-emerald-300 px-4.5 py-1.5 rounded-full text-xs sm:text-sm font-black shadow-xs"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
              <span>{t("heroPill")}</span>
            </motion.div>

            {/* MAIN HEADLINE */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {t("heroTitle")}
            </h1>

            {/* SUBHEADLINE */}
            <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t("heroSubtitle")}
            </p>

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <a
                href="#products"
                className="w-full sm:w-auto text-center bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 hover:from-emerald-900 hover:to-teal-900 text-white font-extrabold text-base px-8 py-4 rounded-2xl shadow-xl shadow-emerald-800/25 hover:scale-[1.03] active:scale-[0.98] transition-all"
              >
                {t("exploreProductsBtn")}
              </a>

              <a
                href="#subscription"
                className="w-full sm:w-auto text-center bg-white text-emerald-950 border-2 border-emerald-700 hover:bg-emerald-50 font-extrabold text-base px-7 py-3.5 rounded-2xl shadow-xs hover:scale-[1.02] transition-all"
              >
                {t("monthPlansBtn")}
              </a>
            </div>

            {/* TRUST STATS */}
            <div className="pt-5 border-t border-slate-200 flex items-center justify-center lg:justify-start gap-6 sm:gap-10 text-slate-600">
              <div>
                <p className="text-2xl font-black text-emerald-900">1,200+</p>
                <p className="text-xs font-semibold text-slate-500">Happy Families</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <p className="text-2xl font-black text-emerald-900">4.9 ★</p>
                <p className="text-xs font-semibold text-slate-500">Quality Rating</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <p className="text-2xl font-black text-emerald-900">Before 7 AM</p>
                <p className="text-xs font-semibold text-slate-500">Guaranteed Delivery</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT VISUAL HERO CAROUSEL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 relative flex flex-col items-center"
          >
            <div className="relative w-full max-w-lg">
              
              {/* IMAGE CONTAINER WITH ANIMATED SLIDING */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-emerald-950/20 border-4 border-white ring-4 ring-emerald-500/20 group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={heroSlides[currentSlide].image}
                      alt={heroSlides[currentSlide].title}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover object-center w-full h-full"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                    {/* OVERLAY BADGE FOR CURRENT SLIDE */}
                    <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-white flex items-center justify-between z-10">
                      <div>
                        <p className="text-xs font-black text-amber-300">{heroSlides[currentSlide].tag}</p>
                        <p className="text-[11px] font-medium text-slate-200">{heroSlides[currentSlide].subtag}</p>
                      </div>
                      <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Live Farm Photo
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* REAL BRAND OVERLAY STAMP */}
                <div className="absolute top-3 left-3 bg-emerald-950/90 backdrop-blur-md text-white text-xs font-black px-3.5 py-1.5 rounded-full border border-white/30 shadow-md flex items-center gap-2 z-20">
                  <span>🥛</span>
                  <span>NSV DAIRY FARM • ESTD 2026</span>
                </div>
              </div>

              {/* CAROUSEL INDICATOR DOTS */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? "w-8 bg-emerald-700" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}