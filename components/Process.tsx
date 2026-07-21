"use client";

import { motion } from "framer-motion";

const steps = [
  {
    icon: "🐄",
    title: "Milk Collection",
    description: "Fresh milk collected every morning from trusted dairy farms.",
  },
  {
    icon: "❄️",
    title: "Rapidly Chilled",
    description: "Quickly chilled at 4°C to preserve freshness and quality.",
  },
  {
    icon: "🧪",
    title: "Quality Checked",
    description: "Every batch is carefully checked before delivery.",
  },
  {
    icon: "🚚",
    title: "Morning Delivery",
    description: "Delivered fresh to your doorstep every morning.",
  },
];

export default function Process() {
  return (
    <section className="py-24 bg-green-50">
      <div className="max-w-7xl mx-auto px-6">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center text-green-800"
        >
          From Farm to Your Family
        </motion.h2>

        <p className="text-center text-gray-900 mt-4 max-w-3xl mx-auto">
          Every drop of NSV Pure Milk follows a carefully maintained freshness
          process to ensure quality, taste, and trust.
        </p>

        <div className="grid md:grid-cols-4 gap-8 mt-16">

          {steps.map((step, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl shadow-xl p-8 text-center"
            >

              <div className="text-6xl mb-5">
                {step.icon}
              </div>

              <h3 className="text-2xl font-bold text-green-800">
                {step.title}
              </h3>

              <p className="text-gray-900 mt-4">
                {step.description}
              </p>

            </motion.div>

          ))}

        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-green-700 rounded-3xl text-center py-8 px-6"
        >
          <h3 className="text-3xl font-bold text-white">
            ✅ Freshly Chilled • Quality Checked • Delivered with Care
          </h3>
        </motion.div>

      </div>
    </section>
  );
}

