"use client";

import { motion } from "framer-motion";

const items = [
  {
    icon: "🥛",
    title: "Farm Fresh",
    text: "Collected Fresh Every Morning",
  },
  {
    icon: "❄️",
    title: "Chilled at 4°C",
    text: "Freshness Preserved Naturally",
  },
  {
    icon: "🚚",
    title: "Morning Delivery",
    text: "Delivered Before Breakfast",
  },
  {
    icon: "🌿",
    title: "No Preservatives",
    text: "Pure Milk. Nothing Added.",
  },
];

export default function TrustBar() {
  return (
    <section className="bg-green-700 py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="text-center text-white"
            >
              <div className="text-4xl mb-2">
                {item.icon}
              </div>

              <h3 className="font-bold text-lg">
                {item.title}
              </h3>

              <p className="text-green-100 text-sm mt-1">
                {item.text}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}