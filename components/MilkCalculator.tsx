"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function MilkCalculator() {
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(2);
  const [curdUse, setCurdUse] = useState(true);

  // CALCULATE ESTIMATED DAILY & MONTHLY REQUIREMENTS
  const dailyTotal = (adults * 0.25 + kids * 0.4 + (curdUse ? 0.5 : 0)).toFixed(1);
  const monthlyLiters = (parseFloat(dailyTotal) * 30).toFixed(0);
  const estimatedCost = (parseFloat(dailyTotal) * 65 * 30).toFixed(0);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white relative overflow-hidden my-12 rounded-3xl mx-4 sm:mx-8 border border-emerald-500/40 shadow-2xl">
      
      {/* BACKGROUND SHIMMER */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-10 relative z-10">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block bg-amber-400 text-amber-950 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-sm">
            🧮 Telangana Smart Milk Calculator
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Estimate Your Family's <br />
            <span className="text-amber-400">Daily Pure Milk Requirement</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-medium">
            మీ కుటుంబానికి రోజుకి ఎంత పాలు అవసరమో మరియు నెలవారీ ధరను ఇక్కడే లెక్కించండి!
          </p>
        </div>

        {/* CALCULATOR CONTROLS & RESULT GRID */}
        <div className="grid md:grid-cols-12 gap-8 mt-10 items-center">
          
          {/* CONTROLS (LEFT 7 COLS) */}
          <div className="md:col-span-7 bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6">
            
            {/* ADULTS COUNTER */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-extrabold text-white">👨‍👩‍👧 Adults in Family</p>
                <p className="text-[11px] text-emerald-200">Tea, Coffee & Daily Consumption</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 text-white font-black text-lg flex items-center justify-center transition-all"
                >
                  -
                </button>
                <span className="text-xl font-black w-6 text-center text-amber-300">{adults}</span>
                <button
                  onClick={() => setAdults(adults + 1)}
                  className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 text-white font-black text-lg flex items-center justify-center transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* KIDS COUNTER */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <p className="text-sm font-extrabold text-white">👶 Kids (Growing Children)</p>
                <p className="text-[11px] text-emerald-200">2 Glasses Pure Milk Daily</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setKids(Math.max(0, kids - 1))}
                  className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 text-white font-black text-lg flex items-center justify-center transition-all"
                >
                  -
                </button>
                <span className="text-xl font-black w-6 text-center text-amber-300">{kids}</span>
                <button
                  onClick={() => setKids(kids + 1)}
                  className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 text-white font-black text-lg flex items-center justify-center transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* CURD TOGGLE */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <p className="text-sm font-extrabold text-white">🥣 Homemade Curd & Ghee</p>
                <p className="text-[11px] text-emerald-200">Extra 500ml for fresh curd</p>
              </div>
              <button
                onClick={() => setCurdUse(!curdUse)}
                className={`px-4 py-1.5 rounded-xl font-extrabold text-xs transition-all ${
                  curdUse ? "bg-amber-400 text-amber-950" : "bg-white/20 text-slate-300"
                }`}
              >
                {curdUse ? "✓ Included" : "+ Add"}
              </button>
            </div>

          </div>

          {/* DYNAMIC RESULT CARD (RIGHT 5 COLS) */}
          <div className="md:col-span-5">
            <motion.div
              key={dailyTotal}
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-amber-950 p-6 sm:p-8 rounded-3xl shadow-2xl text-center space-y-5 border-2 border-white/40"
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest bg-amber-950 text-amber-300 px-3 py-1 rounded-full">
                  Recommended Daily Plan
                </span>
                <p className="text-4xl sm:text-5xl font-black mt-3">{dailyTotal} Litres</p>
                <p className="text-xs font-black uppercase tracking-wider mt-1 opacity-90">Per Day Doorstep Delivery</p>
              </div>

              <div className="pt-4 border-t border-amber-950/20 grid grid-cols-2 gap-2 text-left">
                <div className="bg-amber-950/10 p-2.5 rounded-xl">
                  <p className="text-[10px] font-bold opacity-80 uppercase">Monthly Milk</p>
                  <p className="text-lg font-black">{monthlyLiters} Litres</p>
                </div>
                <div className="bg-amber-950/10 p-2.5 rounded-xl">
                  <p className="text-[10px] font-bold opacity-80 uppercase">Est. Monthly Cost</p>
                  <p className="text-lg font-black">₹{estimatedCost}</p>
                </div>
              </div>

              <a
                href="#subscription"
                className="block w-full bg-amber-950 hover:bg-black text-amber-300 font-extrabold text-xs py-3.5 rounded-2xl shadow-lg transition-all"
              >
                Subscribe Now for Telangana →
              </a>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
