"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function Reviews() {
  const { t } = useLanguage();

  const reviews = [
    {
      name: "Ramesh Reddy K.",
      place: "Jubilee Hills, Hyderabad",
      rating: "⭐⭐⭐⭐⭐ 5.0",
      verified: "Verified Subscriber (Daily 1L)",
      review: t("review1Text"),
      avatarBg: "bg-emerald-100 text-emerald-950 font-black",
    },
    {
      name: "Dr. Lakshmi Rao M.",
      place: "Gachibowli, Hyderabad",
      rating: "⭐⭐⭐⭐⭐ 5.0",
      verified: "Verified Subscriber (Native A2)",
      review: t("review2Text"),
      avatarBg: "bg-teal-100 text-teal-950 font-black",
    },
    {
      name: "Suresh Verma V.",
      place: "Hanamkonda, Warangal",
      rating: "⭐⭐⭐⭐⭐ 5.0",
      verified: "Verified Subscriber (Buffalo Milk)",
      review: t("review3Text"),
      avatarBg: "bg-amber-100 text-amber-950 font-black",
    },
  ];

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-amber-50/20 to-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block bg-emerald-100 text-emerald-950 border border-emerald-300 font-extrabold text-xs tracking-wider uppercase px-4 py-1.5 rounded-full shadow-xs">
            {t("reviewsBadge")}
          </span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            {t("reviewsTitle")}
          </motion.h2>

          <p className="text-slate-600 text-base sm:text-lg font-medium">
            {t("reviewsSubtitle")}
          </p>
        </div>

        {/* REVIEWS GRID */}
        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {reviews.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.4 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-md hover:shadow-2xl hover:border-emerald-500 transition-all flex flex-col justify-between"
            >
              <div>
                {/* RATING & BADGE */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black text-amber-500 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    {item.rating}
                  </span>
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                    {item.verified}
                  </span>
                </div>

                {/* REVIEW TEXT */}
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mt-5 font-medium italic">
                  {item.review}
                </p>
              </div>

              {/* USER PROFILE */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center gap-3.5">
                <div className={`w-11 h-11 rounded-2xl ${item.avatarBg} flex items-center justify-center font-extrabold text-base shadow-xs`}>
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {item.name}
                  </h3>
                  <p className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <span>📍</span>
                    <span>{item.place}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}