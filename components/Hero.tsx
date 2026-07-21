"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-green-100 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
              🥛 Fresh From Our Farm
            </span>

            <h1 className="text-6xl font-extrabold mt-8 leading-tight text-green-800">
              Pure Milk

              <br />

              Delivered

              <br />

              Every Morning
            </h1>

            <p className="text-gray-900 text-xl mt-8 leading-8">

              Fresh Cow Milk

              •

              Buffalo Milk

              •

              A2 Milk

              •

              No Chemicals

            </p>

            <div className="flex gap-5 mt-10">

              <button className="bg-green-600 hover:bg-green-700 duration-300 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105">

                Subscribe Now

              </button>

              <button className="border-2 border-green-600 text-green-800 hover:bg-green-600 hover:text-white duration-300 px-8 py-4 rounded-xl font-bold">

                Order Today

              </button>

            </div>

          </motion.div>{/* RIGHT SIDE */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center"
          >
            <Image
              src="/images/hero.jpeg"
              alt="NSV Pure Milk"
              width={550}
              height={550}
              className="rounded-3xl shadow-2xl hover:scale-105 transition duration-500 w-full max-w-lg h-auto"
              priority
            />

            <div className="absolute -top-6 -left-6 bg-white shadow-xl rounded-2xl px-6 py-4">
              <p className="text-green-800 font-bold">🐄 Farm Fresh</p>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-green-600 text-white shadow-xl rounded-2xl px-6 py-4">
              <p className="font-bold">🚚 Daily Delivery</p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}