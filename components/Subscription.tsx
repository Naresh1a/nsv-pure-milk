"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function Subscription() {
  const { t } = useLanguage();

  const plans = [
    {
      id: "plan-lite",
      name: t("litePlanTitle"),
      volume: "📦 500 ml / Day",
      price: "₹960",
      period: "/ Month",
      desc: "Ideal for small families or singles needing daily fresh pure milk.",
      features: [
        "100% Farm Fresh Cow or Buffalo Milk",
        "Daily Morning Delivery before 7:00 AM",
        "Pause, Resume or Modify Anytime",
        "Chilled Cold-Chain Storage at 4°C",
      ],
      popular: false,
      buttonText: t("startPlanBtn"),
      badge: "Trial Pack",
    },
    {
      id: "plan-family",
      name: t("familyPlanTitle"),
      volume: "📦 1 Litre / Day",
      price: "₹1,860",
      period: "/ Month",
      desc: "Our most popular monthly family plan for healthy daily nutrition.",
      features: [
        "100% Farm Fresh Pure Milk (1L/Day)",
        "Guaranteed Delivery Before 7:00 AM",
        "Pause / Resume Anytime via App/WhatsApp",
        "Free Sample Bottle on First Order",
        "Priority Doorstep Service",
      ],
      popular: true,
      buttonText: t("startPlanBtn"),
      badge: "⭐ MOST POPULAR",
    },
    {
      id: "plan-premium",
      name: t("premiumPlanTitle"),
      volume: "📦 2 Litres / Day",
      price: "₹3,600",
      period: "/ Month",
      desc: "Best value subscription for large families needing rich milk & curd.",
      features: [
        "2 Litres Daily Pure Milk Delivery",
        "Mix Cow Milk & Buffalo Milk as needed",
        "Flexible Delivery Schedules",
        "Zero Cancellation or Pause Fees",
      ],
      popular: false,
      buttonText: t("startPlanBtn"),
      badge: "Best Value",
    },
  ];

  return (
    <section id="subscription" className="py-16 sm:py-24 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-12">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block bg-amber-100 text-amber-950 border border-amber-300 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-xs">
            📅 Monthly Subscription Packages
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            {t("subsTitle")}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            {t("subsSubtitle")}
          </p>
        </div>

        {/* SUBSCRIPTION CARDS GRID */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all ${
                plan.popular
                  ? "bg-gradient-to-b from-emerald-50 via-white to-emerald-50/40 border-2 border-emerald-500 shadow-2xl scale-[1.03]"
                  : "bg-stone-50 border border-slate-200 hover:border-slate-300 shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 text-[10px] font-black uppercase px-4 py-1 rounded-full shadow-md border border-amber-300">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-black text-emerald-800 uppercase tracking-wider block">
                    {plan.volume}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">{plan.name}</h3>
                  <p className="text-slate-600 text-xs mt-2 leading-relaxed font-medium">{plan.desc}</p>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                  <span className="text-xs font-bold text-slate-500 ml-1">{plan.period}</span>
                </div>

                <ul className="space-y-3 pt-2 text-xs font-medium text-slate-700">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-emerald-700 font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href={`/subscription?plan=${plan.id}`}
                  className={`block w-full text-center font-black text-xs py-4 rounded-2xl shadow-md transition-all hover:scale-[1.01] ${
                    plan.popular
                      ? "bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 hover:from-emerald-900 hover:to-teal-900 text-white"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}