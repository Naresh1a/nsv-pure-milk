"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import NSVLogo from "@/components/NSVLogo";
import { useLanguage } from "@/lib/LanguageContext";

const milkVariants = [
  { id: "cow-milk", name: "Farm Fresh Cow Milk", basePrice: 65, emoji: "🐄", desc: "Naturally rich, lightly pasteurized at 4°C", badge: "⭐ Most Popular" },
  { id: "buffalo-milk", name: "High-Fat Buffalo Milk", basePrice: 80, emoji: "🥛", desc: "Thick cream, perfect for sweets & tea", badge: "🔥 Rich Cream" },
  { id: "a2-milk", name: "A2 Organic Milk", basePrice: 110, emoji: "🧬", desc: "Pure desi Gir cow A2 beta-casein", badge: "👑 Premium" },
];

const quantities = [
  { ml: 500, label: "500 ml", factor: 0.5 },
  { ml: 1000, label: "1 Litre", factor: 1 },
  { ml: 1500, label: "1.5 Litres", factor: 1.5 },
  { ml: 2000, label: "2 Litres", factor: 2 },
];

function OrderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useLanguage();

  const paramProduct = searchParams.get("product");

  const [selectedMilk, setSelectedMilk] = useState(milkVariants[0]);
  const [selectedQty, setSelectedQty] = useState(quantities[1]);

  useEffect(() => {
    const found = milkVariants.find((m) => m.id === paramProduct);
    if (found) setSelectedMilk(found);
  }, [paramProduct]);

  const priceToday = Math.round(selectedMilk.basePrice * selectedQty.factor);

  const handleOrderNow = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "nsv_onetime_order",
        JSON.stringify({
          milkId: selectedMilk.id,
          milkName: selectedMilk.name,
          quantity: selectedQty.factor,
          quantityLabel: selectedQty.label,
          priceToday,
          orderType: "onetime",
        })
      );
    }
    router.push(`/checkout?type=onetime&product=${selectedMilk.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20 selection:bg-emerald-500 selection:text-white">

      {/* HEADER */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 shadow-2xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <NSVLogo size="sm" />
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase border border-amber-300">
              🛒 Today&apos;s Fresh Order
            </span>
          </div>
          <Link href="/" className="text-xs font-black text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl transition-all border border-slate-700">
            ← Home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 mt-8 space-y-8">

        {/* HERO */}
        <div className="text-center space-y-2">
          <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            🥛 Fresh Farm Milk · Delivered Today by 6 AM
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Order Today&apos;s Fresh Milk
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-medium max-w-lg mx-auto">
            {language === "te"
              ? "ఈరోజు తాజా పాలు తెప్పించుకోండి. రేపటి నుండి మొదలవుతుంది — రోజూ పొద్దున 6 AM లోపు డెలివరీ."
              : "One-time fresh milk delivery. Ideal for trying out or a quick top-up. Delivered tomorrow morning by 6 AM."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-3 space-y-6">

            {/* STEP 1: MILK VARIANT */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <h2 className="text-sm font-black uppercase text-amber-400 tracking-wider">
                1️⃣ Select Milk Variety
              </h2>
              <div className="space-y-3">
                {milkVariants.map((milk) => {
                  const cardPrice = Math.round(milk.basePrice * selectedQty.factor);
                  return (
                    <button
                      key={milk.id}
                      type="button"
                      onClick={() => setSelectedMilk(milk)}
                      className={`w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center justify-between gap-3 cursor-pointer ${
                        selectedMilk.id === milk.id
                          ? "border-emerald-500 bg-emerald-950/40 ring-2 ring-emerald-500/30"
                          : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{milk.emoji}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full uppercase">{milk.badge}</span>
                          </div>
                          <h3 className="font-extrabold text-white text-sm mt-1">{milk.name}</h3>
                          <p className="text-[10px] text-slate-400 font-medium">{milk.desc}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-emerald-400 font-black text-lg">₹{cardPrice}</span>
                        <p className="text-[10px] text-slate-500">{selectedQty.label}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: QUANTITY */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <h2 className="text-sm font-black uppercase text-amber-400 tracking-wider flex items-center justify-between">
                <span>2️⃣ Choose Quantity</span>
                <span className="text-emerald-400 text-xs font-extrabold">{selectedQty.label}</span>
              </h2>
              <div className="grid grid-cols-4 gap-3">
                {quantities.map((q) => (
                  <button
                    key={q.ml}
                    type="button"
                    onClick={() => setSelectedQty(q)}
                    className={`py-3.5 px-2 rounded-2xl font-black text-xs transition-all border cursor-pointer text-center ${
                      selectedQty.ml === q.ml
                        ? "bg-emerald-600 border-emerald-400 text-white shadow-lg"
                        : "bg-slate-950 text-slate-300 border-slate-800 hover:text-white"
                    }`}
                  >
                    <div>{q.label}</div>
                    <div className="text-[10px] font-medium mt-0.5 opacity-80">
                      ₹{Math.round(selectedMilk.basePrice * q.factor)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="md:col-span-2">
            <div className="bg-gradient-to-b from-slate-900 to-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-5 sticky top-24">
              <div className="border-b border-slate-800 pb-3">
                <span className="bg-emerald-950 text-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border border-emerald-800">
                  ORDER SUMMARY
                </span>
                <h3 className="text-base font-black text-white mt-2">{selectedMilk.name}</h3>
                <p className="text-[11px] text-slate-400 font-medium">One-Time Fresh Delivery · Tomorrow 6 AM</p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Milk Variant:</span>
                  <span className="font-bold text-white">{selectedMilk.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Quantity:</span>
                  <span className="font-bold text-white">{selectedQty.label}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Rate:</span>
                  <span className="font-bold text-white">₹{selectedMilk.basePrice}/L</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Delivery:</span>
                  <span className="font-bold text-emerald-400">Free 🎉</span>
                </div>
              </div>

              <div className="bg-emerald-950/80 border border-emerald-800 p-3 rounded-2xl flex items-center justify-between text-emerald-300 font-black text-sm">
                <span>Total Amount:</span>
                <span className="text-2xl">₹{priceToday}</span>
              </div>

              <button
                type="button"
                onClick={handleOrderNow}
                className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm py-4 rounded-2xl shadow-xl transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🛒 Order Now — ₹{priceToday}</span>
                <span>→</span>
              </button>

              <p className="text-[10px] text-slate-500 text-center">
                🔒 Secure checkout · Delivered tomorrow by 6 AM
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-white font-bold">Loading Order Page...</div>}>
      <OrderContent />
    </Suspense>
  );
}
