"use client";

import { motion } from "framer-motion";

const products = [
  {
    icon: "🥛",
    badge: "100% Natural",
    name: "Fresh Cow Milk",
    desc: "Fresh farm milk delivered every morning.",
    price: "₹60 / Litre",
  },
  {
    icon: "🐃",
    badge: "Premium",
    name: "Fresh Buffalo Milk",
    desc: "Rich, creamy buffalo milk.",
    price: "₹80 / Litre",
  },
  {
    icon: "🥣",
    badge: "Farm Fresh",
    name: "Curd",
    desc: "Homemade fresh curd.",
    price: "₹90 / Kg",
  },
  {
    icon: "🧈",
    badge: "Pure",
    name: "Pure Ghee",
    desc: "Traditional pure ghee.",
    price: "₹850 / Kg",
  },
];

export default function ProductsPage() {
  return (
    <main className="relative overflow-hidden min-h-screen bg-gradient-to-br from-white via-green-50 to-green-100 py-20">

      {/* Background Blur */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-80 right-0 w-80 h-80 bg-yellow-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-20" />

      {/* Floating Badges */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute left-8 top-40 hidden lg:block bg-white shadow-xl rounded-full px-5 py-3"
      >
        🥛 Farm Fresh
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute right-10 top-64 hidden lg:block bg-white shadow-xl rounded-full px-5 py-3"
      >
        🚚 Daily Delivery
      </motion.div>

      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <h1 className="text-5xl font-bold text-green-800">
            Our Products
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            Farm Fresh Dairy Products Delivered Every Morning
          </p>

        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: .6,
                delay: index * .15,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-green-100"
            >

              <div className="bg-gradient-to-br from-green-100 to-green-50 p-10 text-center">

                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                  }}
                  className="text-7xl"
                >
                  {item.icon}
                </motion.div>

              </div>

              <div className="p-7">

                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                  {item.badge}
                </span>

                <h2 className="text-2xl font-bold mt-4">
                  {item.name}
                </h2>

                <p className="text-gray-500 mt-3">
                  {item.desc}
                </p>

                <h3 className="text-3xl font-bold text-green-700 mt-5">
                  {item.price}
                </h3>

                <div className="grid grid-cols-3 gap-2 mt-6">

                  <button className="border rounded-xl py-2 hover:bg-green-600 hover:text-white transition">
                    500ml
                  </button>

                  <button className="border rounded-xl py-2 hover:bg-green-600 hover:text-white transition">
                    1L
                  </button>

                  <button className="border rounded-xl py-2 hover:bg-green-600 hover:text-white transition">
                    2L
                  </button>

                </div>

                <button className="mt-7 w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 font-semibold transition">
                  Subscribe Now
                </button>

              </div>

            </motion.div>

          ))}

        </div>{/* Why Choose NSV Pure Milk */}

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="rounded-3xl bg-gradient-to-r from-green-700 via-green-600 to-green-700 p-10 text-white shadow-2xl">

            <h2 className="text-4xl font-bold text-center">
              Why Choose NSV Pure Milk?
            </h2>

            <p className="text-center mt-3 text-green-100">
              Freshness • Quality • Trust • Delivered Every Morning
            </p>

            <div className="grid md:grid-cols-4 gap-6 mt-12">

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center"
              >
                <div className="text-5xl">🥛</div>
                <h3 className="font-bold text-xl mt-4">
                  100% Pure
                </h3>
                <p className="text-green-100 mt-2">
                  Fresh milk collected directly from our farm every morning.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center"
              >
                <div className="text-5xl">🚚</div>
                <h3 className="font-bold text-xl mt-4">
                  Fast Delivery
                </h3>
                <p className="text-green-100 mt-2">
                  Delivered before 7:00 AM to your doorstep.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center"
              >
                <div className="text-5xl">❄️</div>
                <h3 className="font-bold text-xl mt-4">
                  Chilled at 4°C
                </h3>
                <p className="text-green-100 mt-2">
                  Maintained at ideal temperature to preserve freshness.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center"
              >
                <div className="text-5xl">❤️</div>
                <h3 className="font-bold text-xl mt-4">
                  Trusted Families
                </h3>
                <p className="text-green-100 mt-2">
                  Hundreds of happy customers trust NSV Pure Milk every day.
                </p>
              </motion.div>

            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}