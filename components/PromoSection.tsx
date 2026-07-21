"use client";

import { motion } from "framer-motion";

const promos = [
  {
    icon: "🥛",
    title: "100% Pure Milk",
    text: "Fresh milk collected directly from our farm every morning.",
  },
  {
    icon: "🚚",
    title: "Free Morning Delivery",
    text: "Fast doorstep delivery before 7:00 AM every day.",
  },
  {
    icon: "❄️",
    title: "Rapid Chilling",
    text: "Milk is chilled immediately at 4°C to preserve freshness.",
  },
  {
    icon: "❤️",
    title: "Trusted Families",
    text: "Hundreds of happy families trust NSV Pure Milk every day.",
  },
];

export default function PromoSection() {
  return (
    <section className="py-24 bg-gradient-to-r from-green-700 via-green-600 to-green-700">

      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{opacity:0,y:-40}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:.6}}
          viewport={{once:true}}
          className="text-center text-white"
        >
          <h2 className="text-5xl font-bold">
            Why Choose NSV Pure Milk?
          </h2>

          <p className="mt-5 text-green-100 text-lg">
            Freshness • Quality • Trust • Delivered Every Morning
          </p>

        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {promos.map((item,index)=>(

            <motion.div
              key={index}
              initial={{opacity:0,y:60}}
              whileInView={{opacity:1,y:0}}
              transition={{
                duration:.6,
                delay:index*.15
              }}
              viewport={{once:true}}
              whileHover={{
                scale:1.05,
                y:-10
              }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center"
            >

              <motion.div
                animate={{
                  y:[0,-8,0]
                }}
                transition={{
                  repeat:Infinity,
                  duration:2
                }}
                className="text-6xl"
              >
                {item.icon}
              </motion.div>

              <h3 className="text-2xl font-bold text-white mt-6">
                {item.title}
              </h3>

              <p className="text-green-100 mt-4 leading-7">
                {item.text}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}