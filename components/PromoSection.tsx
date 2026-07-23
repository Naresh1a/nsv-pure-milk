"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function PromoSection() {
  const { t } = useLanguage();

  const promos = [
    {
      icon: "🥛",
      title: t("why1Title"),
      text: t("why1Desc"),
    },
    {
      icon: "🚚",
      title: t("why2Title"),
      text: t("why2Desc"),
    },
    {
      icon: "❄️",
      title: t("why3Title"),
      text: t("why3Desc"),
    },
    {
      icon: "❤️",
      title: t("why4Title"),
      text: t("why4Desc"),
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white relative overflow-hidden">
      
      {/* GLOW DECORATIONS */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <span className="inline-block bg-emerald-700/80 text-emerald-100 border border-emerald-500/60 font-extrabold text-xs tracking-wider uppercase px-4 py-1.5 rounded-full shadow-sm">
            ⭐ The NSV Pure Promise
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {t("whyTitle")}
          </h2>

          <p className="text-emerald-100/90 text-base sm:text-lg font-medium">
            {t("whySubtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {promos.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 hover:border-white/40 rounded-3xl p-8 text-center transition-all group shadow-xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-4xl mx-auto shadow-md group-hover:scale-110 transition-transform">
                {item.icon}
              </div>

              <h3 className="text-xl font-extrabold text-white mt-6">
                {item.title}
              </h3>

              <p className="text-emerald-50 text-xs sm:text-sm mt-3 leading-relaxed font-medium">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}