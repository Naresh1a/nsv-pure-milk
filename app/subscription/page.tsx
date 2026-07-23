"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import NSVLogo from "@/components/NSVLogo";
import { useLanguage } from "@/lib/LanguageContext";

function SubscriptionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useLanguage();

  const paramPlan = searchParams.get("plan");
  const paramProduct = searchParams.get("product");

  const [milkType, setMilkType] = useState("Buffalo Milk");
  const [quantity, setQuantity] = useState(1); // litres per day
  const [frequency, setFrequency] = useState("1 Month (30 Days)");
  const [deliverySlot, setDeliverySlot] = useState("5:30 AM - 7:00 AM (Early Morning)");

  useEffect(() => {
    if (paramPlan === "plan-lite") setQuantity(0.5);
    else if (paramPlan === "plan-family") setQuantity(1);
    else if (paramPlan === "plan-premium") setQuantity(2);

    if (paramProduct === "a2-cow-milk") setMilkType("A2 Cow Milk");
    else if (paramProduct === "buffalo-milk") setMilkType("Buffalo Milk");
    else if (paramProduct === "raw-milk") setMilkType("Raw Farm Milk");
  }, [paramPlan, paramProduct]);

  // Price calculations per litre
  const prices: Record<string, number> = {
    "Buffalo Milk": 68,
    "A2 Cow Milk": 74,
    "Raw Farm Milk": 62,
  };

  const currentPricePerLitre = prices[milkType] || 68;

  const getDaysInPlan = (freqStr: string) => {
    if (freqStr.includes("12 Months") || freqStr.includes("365")) return 365;
    if (freqStr.includes("6 Months") || freqStr.includes("180")) return 180;
    if (freqStr.includes("3 Months") || freqStr.includes("90")) return 90;
    if (freqStr.includes("15 Days")) return 15;
    return 30; // 1 Month default
  };

  const daysInPlan = getDaysInPlan(frequency);
  const discountFactor = frequency.includes("12 Months")
    ? 0.85
    : frequency.includes("6 Months")
    ? 0.9
    : frequency.includes("3 Months")
    ? 0.95
    : 1.0;

  const rawTotal = quantity * daysInPlan * currentPricePerLitre;
  const monthlyTotal = Math.round(rawTotal * discountFactor);
  const walletCashback = Math.round(monthlyTotal * 0.05); // 5% instant cashback

  const handleContinueToCheckout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "nsv_subscription_draft",
        JSON.stringify({
          milkType,
          quantity,
          frequency,
          daysInPlan,
          deliverySlot,
          monthlyTotal,
          walletCashback,
        })
      );
    }
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20 selection:bg-emerald-500 selection:text-white">
      
      {/* HEADER BAR */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 shadow-2xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <NSVLogo size="sm" />
            <span className="bg-emerald-950 text-emerald-300 text-[10px] font-black px-3 py-1 rounded-full uppercase border border-emerald-800">
              STEP 2 OF 4: SUBSCRIPTION PLAN
            </span>
          </div>

          <Link
            href="/"
            className="text-xs font-black text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl transition-all border border-slate-700"
          >
            ← Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 space-y-8">
        
        {/* HERO TITLE */}
        <div className="text-center space-y-3">
          <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
            🥛 100% Pure & Fresh Daily Morning Doorstep Delivery
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Choose Your Milk & Custom Plan
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto font-medium">
            Select your preferred pure milk variant, daily quantity, delivery schedule and morning time slot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN: CUSTOMIZATION STEPS */}
          <div className="md:col-span-2 space-y-6">
            
            {/* STEP 1: MILK VARIANT SELECTION */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <h2 className="text-sm font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
                <span>1️⃣ Select Milk Variant</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { name: "Buffalo Milk", basePrice: 68, badge: "⭐ Popular", desc: "Rich & Thick Cream (6.5% Fat)" },
                  { name: "A2 Cow Milk", basePrice: 74, badge: "A2 Premium", desc: "Pure Desi Gir Cow Milk" },
                  { name: "Raw Farm Milk", basePrice: 62, badge: "Unprocessed", desc: "Chilled Churn Direct" },
                ].map((item) => {
                  const dailyCardPrice = Math.round(item.basePrice * quantity);
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setMilkType(item.name)}
                      className={`p-4 rounded-2xl border-2 transition-all text-left flex flex-col justify-between space-y-2 cursor-pointer ${
                        milkType === item.name
                          ? "border-emerald-500 bg-emerald-950/40 shadow-lg ring-2 ring-emerald-500/30"
                          : "border-slate-800 bg-slate-950/60 hover:bg-slate-850"
                      }`}
                    >
                      <div>
                        <span className="text-[9px] font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full uppercase">
                          {item.badge}
                        </span>
                        <h3 className="font-extrabold text-white text-sm mt-2">{item.name}</h3>
                        <p className="text-[10px] text-slate-400 mt-1 font-medium">{item.desc}</p>
                      </div>
                      <div className="pt-2 border-t border-slate-800/80 flex items-baseline justify-between">
                        <span className="text-emerald-400 font-black text-sm">₹{dailyCardPrice} <span className="text-[10px] text-slate-400 font-medium">/ Day</span></span>
                        <span className="text-[10px] font-bold text-slate-400">({quantity === 0.5 ? "500ml" : `${quantity}L`})</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: DAILY QUANTITY */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <h2 className="text-sm font-black uppercase text-amber-400 tracking-wider flex items-center justify-between">
                <span>2️⃣ Daily Delivery Quantity</span>
                <span className="text-emerald-400 text-xs font-extrabold">{quantity} Litre(s) / Day</span>
              </h2>

              <div className="grid grid-cols-4 gap-3">
                {[0.5, 1, 1.5, 2].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuantity(q)}
                    className={`py-3.5 px-3 rounded-2xl font-black text-xs transition-all border cursor-pointer ${
                      quantity === q
                        ? "bg-emerald-600 border-emerald-400 text-white shadow-lg"
                        : "bg-slate-950 text-slate-300 border-slate-800 hover:text-white"
                    }`}
                  >
                    {q === 0.5 ? "500 ml" : `${q} Litre${q > 1 ? "s" : ""}`}
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 3: FREQUENCY & MORNING SLOT */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <h2 className="text-sm font-black uppercase text-amber-400 tracking-wider">
                3️⃣ Delivery Schedule & Morning Time Slot
              </h2>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-300 block">Subscription Duration Period:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
                  {[
                    { id: "1 Month (30 Days)", label: "1 Month", days: "30 Days", badge: "Standard" },
                    { id: "3 Months (90 Days)", label: "3 Months", days: "90 Days", badge: "5% OFF" },
                    { id: "6 Months (180 Days)", label: "6 Months", days: "180 Days", badge: "10% OFF" },
                    { id: "12 Months (365 Days)", label: "12 Months", days: "365 Days", badge: "15% OFF" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFrequency(item.id)}
                      className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between cursor-pointer ${
                        frequency === item.id
                          ? "bg-emerald-950 border-emerald-500 text-emerald-300 font-black ring-2 ring-emerald-500/30"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <div>
                        <span className="text-[9px] font-black bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-full uppercase">
                          {item.badge}
                        </span>
                        <h4 className="font-extrabold text-white text-xs mt-1.5">{item.label}</h4>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">{item.days}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-800">
                <label className="text-xs font-bold text-slate-300 block">Morning Delivery Slot:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { slot: "5:30 AM - 7:00 AM (Early Morning)", badge: "⚡ Guaranteed 7 AM" },
                    { slot: "7:00 AM - 8:30 AM (Standard Slot)", badge: "Regular" },
                  ].map((item) => (
                    <button
                      key={item.slot}
                      type="button"
                      onClick={() => setDeliverySlot(item.slot)}
                      className={`p-3 rounded-xl border transition-all text-left flex items-center justify-between ${
                        deliverySlot === item.slot
                          ? "bg-emerald-950 border-emerald-500 text-emerald-300 font-black"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <span>{item.slot}</span>
                      <span className="text-[9px] font-black bg-emerald-900 text-emerald-200 px-2 py-0.5 rounded-full">{item.badge}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: MONTHLY SUMMARY BILL CARD */}
          <div className="space-y-6">
            <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950/40 p-6 rounded-3xl border border-emerald-900/60 shadow-2xl space-y-5 sticky top-24">
              
              <div className="border-b border-slate-800 pb-4">
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                  ⚡ INSTANT SUBSCRIPTION SAVINGS
                </span>
                <h3 className="text-lg font-black text-white mt-2">Subscription Summary</h3>
                <p className="text-[11px] text-slate-400 font-medium">Auto-renew & pause/resume anytime from dashboard.</p>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 font-medium">Selected Milk:</span>
                  <span className="font-black text-white">{milkType}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 font-medium">Daily Quantity:</span>
                  <span className="font-bold text-white">{quantity} L / Day</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 font-medium">Schedule:</span>
                  <span className="font-bold text-white">{frequency}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 font-medium">Total Litres:</span>
                  <span className="font-bold text-emerald-400">{quantity * daysInPlan} Litres</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 font-medium">Per Litre Rate:</span>
                  <span className="font-bold text-white">₹{currentPricePerLitre}/L</span>
                </div>

                <div className="bg-emerald-950/80 border border-emerald-800 p-3 rounded-2xl flex items-center justify-between text-emerald-300 font-black text-xs">
                  <span>👛 Instant Wallet Cashback:</span>
                  <span>+ ₹{walletCashback}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-xs font-black text-slate-300 uppercase">Total Bill Amount:</span>
                  <span className="text-2xl font-black text-emerald-400">₹{monthlyTotal}</span>
                </div>

                <button
                  type="button"
                  onClick={handleContinueToCheckout}
                  className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm py-4 rounded-2xl shadow-xl transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <span>→</span>
                </button>
              </div>

              <div className="text-[10px] text-slate-400 text-center space-y-1 pt-2">
                <p>🔒 100% Secure Payment via UPI / NSV Wallet</p>
                <p>✨ Pause milk delivery anytime with 1-click in App</p>
              </div>

            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

export default function SubscriptionPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-white font-bold">Loading Subscription Builder...</div>}>
      <SubscriptionContent />
    </Suspense>
  );
}