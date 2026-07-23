"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function Process() {
  const { t } = useLanguage();

  const steps = [
    {
      step: "01",
      title: t("step1Title"),
      desc: t("step1Desc"),
      icon: "🐄",
      color: "border-amber-200 bg-amber-50/60 text-amber-900",
    },
    {
      step: "02",
      title: t("step2Title"),
      desc: t("step2Desc"),
      icon: "❄️",
      color: "border-teal-200 bg-teal-50/60 text-teal-900",
    },
    {
      step: "03",
      title: t("step3Title"),
      desc: t("step3Desc"),
      icon: "🔬",
      color: "border-emerald-200 bg-emerald-50/60 text-emerald-900",
    },
    {
      step: "04",
      title: t("step4Title"),
      desc: t("step4Desc"),
      icon: "🚚",
      color: "border-amber-200 bg-amber-50/60 text-amber-900",
    },
  ];

  return (
    <section id="process" className="py-16 sm:py-24 bg-stone-50/80 text-slate-900 relative overflow-hidden border-b border-slate-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-12">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-xs">
            ⚙️ 4-Step Cold Chain Process
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            {t("processTitle")}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            {t("processSubtitle")}
          </p>
        </div>

        {/* STEPS GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-6 rounded-3xl border ${s.color} shadow-lg backdrop-blur-xl flex flex-col justify-between space-y-4 hover:shadow-xl transition-all`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{s.icon}</span>
                <span className="text-2xl font-black opacity-30 text-slate-700">{s.step}</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
