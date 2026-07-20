"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "100% Fresh Milk",
    icon: "🥛",
    description: "Collected fresh every morning from our dairy farm.",
  },
  {
    title: "Daily Delivery",
    icon: "🚚",
    description: "Delivered to your doorstep before 7 AM.",
  },
  {
    title: "No Chemicals",
    icon: "🌿",
    description: "Pure milk with no preservatives or additives.",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-green-900"
        >
          Why Choose NSV Pure Milk?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-green-50 rounded-2xl p-8 text-center shadow-lg"
            >
              <div className="text-5xl">{feature.icon}</div>

              <h3 className="text-2xl font-bold mt-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-3">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}