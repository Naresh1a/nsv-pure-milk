"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SubscriptionPage() {
  const router = useRouter();

  const [milkType, setMilkType] = useState("Cow Milk");
  const [quantity, setQuantity] = useState("1 Litre");
  const [plan, setPlan] = useState("1 Month");
  const [deliveryTime, setDeliveryTime] = useState("Morning");

  const handleContinue = () => {
    router.push("/order-summary");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="mx-auto max-w-5xl px-6 py-10">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-sm font-semibold text-green-600">
            STEP 3 OF 5
          </p>

          <div className="mx-auto mt-3 h-2 w-72 rounded-full bg-gray-200">
            <div className="h-2 w-3/5 rounded-full bg-green-600"></div>
          </div>

          <h1 className="mt-8 text-4xl font-bold text-green-700">
            🥛 Choose Your Subscription
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Select your preferred milk, quantity, subscription plan and delivery time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 rounded-3xl bg-white p-8 shadow-xl"
        >

          <label className="mb-2 block font-semibold text-gray-700">
            Milk Type
          </label>

          <select
            value={milkType}
            onChange={(e) => setMilkType(e.target.value)}
            className="mb-6 w-full rounded-xl border border-gray-300 p-4 focus:border-green-600 focus:outline-none"
          >
            <option>Cow Milk</option>
            <option>Buffalo Milk</option>
            <option>Raw Milk</option>
          </select>

          <label className="mb-2 block font-semibold text-gray-700">
            Quantity
          </label>

          <select
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mb-6 w-full rounded-xl border border-gray-300 p-4 focus:border-green-600 focus:outline-none"
          >
            <option>500 ml</option>
            <option>1 Litre</option>
            <option>2 Litres</option>
            <option>5 Litres</option>
          </select>
          <label className="mb-2 block font-semibold text-gray-700">
            Subscription Plan
          </label>

          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="mb-6 w-full rounded-xl border border-gray-300 p-4 focus:border-green-600 focus:outline-none"
          >
            <option>1 Month</option>
            <option>3 Months</option>
            <option>6 Months</option>
            <option>12 Months</option>
          </select>

          <label className="mb-2 block font-semibold text-gray-700">
            Delivery Time
          </label>

          <select
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            className="mb-8 w-full rounded-xl border border-gray-300 p-4 focus:border-green-600 focus:outline-none"
          >
            <option>Morning (5:00 AM - 8:00 AM)</option>
            <option>Evening (5:00 PM - 8:00 PM)</option>
          </select>

          <div className="rounded-2xl bg-green-50 p-6">

            <h2 className="text-xl font-bold text-green-700">
              Subscription Summary
            </h2>

            <div className="mt-4 space-y-2 text-gray-700">
              <p><strong>Milk:</strong> {milkType}</p>
              <p><strong>Quantity:</strong> {quantity}</p>
              <p><strong>Plan:</strong> {plan}</p>
              <p><strong>Delivery:</strong> {deliveryTime}</p>
            </div>

          </div>

          <button
            onClick={handleContinue}
            className="mt-8 w-full rounded-full bg-green-600 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
          >
            Continue to Order Summary →
          </button>

        </motion.div>

      </div>
    </main>
  );
}