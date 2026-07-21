"use client";

import { motion } from "framer-motion";

const products = [
  {
    name: "Cow Milk",
    icon: "🥛",
    price: "₹65 / Litre",
    badge: "Best Seller",
  },
  {
    name: "Buffalo Milk",
    icon: "🐃",
    price: "₹80 / Litre",
    badge: "Rich & Creamy",
  },
  {
    name: "A2 Milk",
    icon: "🌿",
    price: "₹110 / Litre",
    badge: "Premium",
  },
  {
    name: "Fresh Curd",
    icon: "🥣",
    price: "₹60 / Kg",
    badge: "Farm Fresh",
  },
];

export default function Products() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center text-green-800"
        >
          Our Products
        </motion.h2>

        <p className="text-center text-gray-900 mt-4 mb-12">
          Farm Fresh Dairy Products Delivered Every Morning
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="rounded-3xl bg-white shadow-xl p-8 text-center"
            >
              <div className="text-6xl">{product.icon}</div>

              <span className="inline-block mt-4 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                {product.badge}
              </span>

              <h3 className="mt-5 text-2xl font-bold text-gray-900">
                {product.name}
              </h3>

              <p className="mt-3 text-2xl font-bold text-green-800">
                {product.price}
              </p>

              <button className="mt-8 w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700 transition">
                Subscribe
              </button>

              <button className="mt-3 w-full rounded-xl border-2 border-green-600 py-3 font-semibold text-green-800 hover:bg-green-600 hover:text-white transition">
                Order Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}