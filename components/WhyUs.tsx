"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function WhyUs() {
  const { t } = useLanguage();

  const features = [
    {
      icon: "🥛",
      title: t("why1Title"),
      desc: t("why1Desc"),
    },
    {
      icon: "🚚",
      title: t("why2Title"),
      desc: t("why2Desc"),
    },
    {
      icon: "❄️",
      title: t("why3Title"),
      desc: t("why3Desc"),
    },
    {
      icon: "❤️",
      title: t("why4Title"),
      desc: t("why4Desc"),
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-emerald-950 text-white relative overflow-hidden border-t border-emerald-900">
      
      {/* GLOW DECORATION */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-800/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-12">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {t("whyTitle")}
          </h2>
          <p className="text-emerald-200 text-sm sm:text-base font-medium">
            {t("whySubtitle")}
          </p>
        </div>

        {/* FEATURES GRID (4 CARDS) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-slate-950/60 p-6 rounded-3xl border border-emerald-800/60 shadow-xl space-y-3 text-center hover:border-emerald-500/80 transition-all hover:scale-[1.02]"
            >
              <div className="w-14 h-14 bg-emerald-900/60 border border-emerald-700 text-emerald-300 rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-md">
                {f.icon}
              </div>
              <h3 className="text-lg font-black text-white">{f.title}</h3>
              <p className="text-slate-300 text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
