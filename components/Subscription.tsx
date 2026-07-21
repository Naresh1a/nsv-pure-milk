"use client";

import { motion } from "framer-motion";

const plans = [
  {
    title: "Daily Lite",
    quantity: "500 ml / Day",
    badge: "Best for Individuals",
  },
  {
    title: "Family Plan",
    quantity: "1 Litre / Day",
    badge: "⭐ Most Popular",
  },
  {
    title: "Premium Family",
    quantity: "2 Litres / Day",
    badge: "Best Value",
  },
];

export default function Subscription() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-green-800">
          Choose Your Subscription
        </h2>

        <p className="text-center text-gray-900 mt-4 mb-14">
          Fresh milk delivered every morning. Pause or resume anytime.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {plans.map((plan, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className={`rounded-3xl shadow-xl p-8 text-center ${
                index === 1
                  ? "border-4 border-green-600"
                  : "border"
              }`}
            >

              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold">
                {plan.badge}
              </span>

              <h3 className="text-3xl font-bold mt-6">
                {plan.title}
              </h3>

              <p className="text-green-800 font-bold text-xl mt-3">
                {plan.quantity}
              </p>

              <ul className="text-left mt-8 space-y-3 text-gray-900">
                <li>✅ Farm Fresh Milk</li>
                <li>✅ Chilled at 4°C</li>
                <li>✅ Daily Morning Delivery</li>
                <li>✅ Flexible Subscription</li>
              </ul>

              <button className="mt-10 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition">
                Start Subscription
              </button>

            </motion.div>

          ))}

        </div>
      </div>
    </section>
  );
}