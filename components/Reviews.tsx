"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    name: "Ramesh",
    place: "Nandyal",
    review:
      "Milk is always fresh and delivered before 7 AM. Excellent service!",
  },
  {
    name: "Lakshmi",
    place: "Kurnool",
    review:
      "Very clean bottles and great quality. My family loves the taste.",
  },
  {
    name: "Suresh",
    place: "Allagadda",
    review:
      "Best buffalo milk we have used. Fresh every single day.",
  },
];

export default function Reviews() {
  return (
    <section className="py-24 bg-green-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-green-900">
          What Our Customers Say
        </h2>

        <p className="text-center text-gray-600 mt-4 mb-16">
          Freshness, Quality and Trust — Every Morning.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {reviews.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >

              <div className="text-yellow-500 text-2xl">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-gray-600 mt-5 italic">
                "{item.review}"
              </p>

              <div className="mt-8">
                <h3 className="font-bold text-xl">
                  {item.name}
                </h3>

                <p className="text-green-700">
                  {item.place}
                </p>
              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}