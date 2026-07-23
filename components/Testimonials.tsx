"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function Testimonials() {
  const { t } = useLanguage();

  const reviews = [
    {
      name: "Ramesh Reddy K.",
      location: "📍 Jubilee Hills, Hyderabad",
      text: t("review1Text"),
      rating: "5.0 ★",
      badge: "Verified Subscriber (Cow Milk)",
      initial: "R",
      bgColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
    },
    {
      name: "Dr. Lakshmi Rao M.",
      location: "📍 Gachibowli, Hyderabad",
      text: t("review2Text"),
      rating: "5.0 ★",
      badge: "Verified Subscriber (A2 Milk)",
      initial: "L",
      bgColor: "bg-purple-100 text-purple-900 border-purple-300",
    },
    {
      name: "Suresh Verma V.",
      location: "📍 Hanamkonda, Warangal",
      text: t("review3Text"),
      rating: "5.0 ★",
      badge: "Verified Subscriber (Buffalo Milk)",
      initial: "S",
      bgColor: "bg-amber-100 text-amber-900 border-amber-300",
    },
  ];

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-stone-50 text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-12">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-xs">
            {t("reviewsBadge")}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            {t("reviewsTitle")}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            {t("reviewsSubtitle")}
          </p>
        </div>

        {/* REVIEWS GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-amber-500 font-black text-sm">★★★★★ {rev.rating}</span>
                  <span className="bg-emerald-50 border border-emerald-200 text-emerald-900 text-[10px] font-black px-2.5 py-1 rounded-full">
                    {rev.badge}
                  </span>
                </div>
                <p className="text-slate-700 text-xs font-medium italic leading-relaxed">
                  {rev.text}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-black text-sm shrink-0 ${rev.bgColor}`}>
                  {rev.initial}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm">{rev.name}</h4>
                  <p className="text-[11px] font-bold text-slate-500">{rev.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
