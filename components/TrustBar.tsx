"use client";

import { motion } from "framer-motion";

const items = [
  {
    icon: "🥛",
    title: "100% Farm Fresh",
    text: "Collected Fresh Every Morning",
  },
  {
    icon: "❄️",
    title: "Chilled at 4°C",
    text: "Natural Freshness Preserved",
  },
  {
    icon: "🚚",
    title: "Before 7:00 AM",
    text: "Guaranteed Doorstep Delivery",
  },
  {
    icon: "🌿",
    title: "Zero Chemicals",
    text: "Pure Milk. Nothing Added.",
  },
];

export default function TrustBar() {
  return (
    <section className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 py-8 border-y border-emerald-700/50 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 group-hover:bg-emerald-500/20 backdrop-blur-md flex items-center justify-center text-2xl text-white shadow-xs border border-white/10 group-hover:border-emerald-400/40 transition-all duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              <div>
                <h3 className="font-extrabold text-white text-base tracking-tight">
                  {item.title}
                </h3>
                <p className="text-emerald-200/80 text-xs font-medium mt-0.5">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}