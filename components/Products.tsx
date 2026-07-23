"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function Products() {
  const { t } = useLanguage();

  const productsList = [
    {
      id: "cow-milk",
      name: t("cowMilkName"),
      tag: "🐄 Farm Fresh Cow Milk",
      desc: t("cowMilkDesc"),
      price: "₹65",
      unit: "/ Litre",
      badge: "⭐ MOST POPULAR",
      badgeBg: "bg-emerald-100 text-emerald-900 border-emerald-300 font-black",
      rating: "4.9 ★ (850+ reviews)",
      image: "/images/cow_milk.jpg",
      subscribers: "850+ Daily Families",
    },
    {
      id: "buffalo-milk",
      name: t("buffaloMilkName"),
      tag: "🥛 High-Fat Rich Buffalo Milk",
      desc: t("buffaloMilkDesc"),
      price: "₹80",
      unit: "/ Litre",
      badge: "🔥 RICH CREAM",
      badgeBg: "bg-amber-100 text-amber-900 border-amber-300 font-black",
      rating: "4.9 ★ (620+ reviews)",
      image: "/images/buffalo_milk.jpg",
      subscribers: "620+ Daily Families",
    },
    {
      id: "a2-milk",
      name: t("a2MilkName"),
      tag: "🧬 Pure Organic A2 Beta-Casein",
      desc: t("a2MilkDesc"),
      price: "₹110",
      unit: "/ Litre",
      badge: "👑 PREMIUM HEALTH",
      badgeBg: "bg-purple-100 text-purple-900 border-purple-300 font-black",
      rating: "5.0 ★ (340+ reviews)",
      image: "/images/a2_milk.jpg",
      subscribers: "340+ Daily Families",
    },
    {
      id: "fresh-curd",
      name: t("freshCurdName"),
      tag: "🥣 Natural Clay Pot Curd",
      desc: t("freshCurdDesc"),
      price: "₹60",
      unit: "/ Kg Pot",
      badge: "🏺 CLAY POT SET",
      badgeBg: "bg-teal-100 text-teal-900 border-teal-300 font-black",
      rating: "4.8 ★ (410+ reviews)",
      image: "/images/fresh_curd.jpg",
      subscribers: "410+ Daily Families",
    },
  ];

  return (
    <section id="products" className="py-16 sm:py-24 bg-stone-50/80 text-slate-900 relative overflow-hidden border-b border-slate-200/80">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-12">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-xs">
            {t("catalogBadge")}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            {t("catalogTitle")}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            {t("catalogSubtitle")}
          </p>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {productsList.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl border border-slate-200 hover:border-emerald-500 shadow-xl hover:shadow-2xl overflow-hidden flex flex-col justify-between group transition-all hover:-translate-y-1"
            >
              {/* IMAGE CONTAINER */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* BADGE */}
                <div className="absolute top-3 left-3 z-10">
                  <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border shadow-sm ${product.badgeBg}`}>
                    {product.badge}
                  </span>
                </div>

                {/* PRICE OVERLAY */}
                <div className="absolute bottom-3 right-3 z-10 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-md text-right">
                  <span className="text-lg font-black text-emerald-800">{product.price}</span>
                  <span className="text-[10px] text-slate-600 font-bold ml-1">{product.unit}</span>
                </div>
              </div>

              {/* DETAILS CONTENT */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider block">
                    {product.tag}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-600 text-xs font-medium leading-relaxed">
                    {product.desc}
                  </p>
                </div>

                {/* RATING */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-semibold">
                  <span className="text-amber-600 font-black">{product.rating}</span>
                  <span className="text-[11px] text-slate-500">{product.subscribers}</span>
                </div>

                {/* ACTION BUTTONS */}
                <div className="space-y-2 pt-2">
                  <Link
                    href={`/subscription?product=${product.id}`}
                    className="block w-full text-center bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 hover:from-emerald-900 hover:to-teal-900 text-white font-black text-xs py-3.5 rounded-2xl shadow-md transition-all hover:scale-[1.01]"
                  >
                    {t("subscribeDailyBtn")}
                  </Link>
                  <Link
                    href={`/order?product=${product.id}`}
                    className="block w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs py-3 rounded-2xl border border-slate-300 transition-all"
                  >
                    🛒 Order Fresh Today (One-Day)
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}