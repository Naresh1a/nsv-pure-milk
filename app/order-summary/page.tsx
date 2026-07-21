"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function OrderSummaryPage() {
  const router = useRouter();

  const order = {
    customer: "Naresh",
    phone: "+91 9876543210",
    milk: "Cow Milk",
    quantity: "1 Litre",
    plan: "1 Month",
    delivery: "Morning (5:00 AM - 8:00 AM)",
    address: "NSV Demo Address",
    startDate: "22 Jul 2026",
    endDate: "21 Aug 2026",
    dailyPrice: 60,
    totalDays: 30,
    totalAmount: 1800,
  };

  const handlePayment = () => {
    router.push("/payment");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="mx-auto max-w-4xl px-6 py-10">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-sm font-semibold text-green-600">
            STEP 4 OF 5
          </p>

          <div className="mx-auto mt-3 h-2 w-72 rounded-full bg-gray-200">
            <div className="h-2 w-4/5 rounded-full bg-green-600"></div>
          </div>

          <h1 className="mt-8 text-4xl font-bold text-green-700">
            Order Summary
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            Please review your subscription before payment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 rounded-3xl bg-white p-8 shadow-xl"
        >
          <div className="grid gap-4 md:grid-cols-2">

            <div>
              <p className="text-gray-500">Customer</p>
              <h3 className="font-semibold">{order.customer}</h3>
            </div>

            <div>
              <p className="text-gray-500">Phone</p>
              <h3 className="font-semibold">{order.phone}</h3>
            </div>

            <div>
              <p className="text-gray-500">Milk</p>
              <h3 className="font-semibold">{order.milk}</h3>
            </div>

            <div>
              <p className="text-gray-500">Quantity</p>
              <h3 className="font-semibold">{order.quantity}</h3>
            </div>
            <div>
              <p className="text-gray-500">Subscription</p>
              <h3 className="font-semibold">{order.plan}</h3>
            </div>

            <div>
              <p className="text-gray-500">Delivery Time</p>
              <h3 className="font-semibold">{order.delivery}</h3>
            </div>

            <div className="md:col-span-2">
              <p className="text-gray-500">Delivery Address</p>
              <h3 className="font-semibold">{order.address}</h3>
            </div>

          </div>

          <hr className="my-8" />

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Subscription Start</span>
              <strong>{order.startDate}</strong>
            </div>

            <div className="flex justify-between">
              <span>Subscription End</span>
              <strong>{order.endDate}</strong>
            </div>

            <div className="flex justify-between">
              <span>Price Per Day</span>
              <strong>₹{order.dailyPrice}</strong>
            </div>

            <div className="flex justify-between">
              <span>Total Days</span>
              <strong>{order.totalDays}</strong>
            </div>

            <div className="flex justify-between border-t pt-4 text-xl font-bold text-green-700">
              <span>Total Amount</span>
              <span>₹{order.totalAmount}</span>
            </div>

          </div>

          <div className="mt-8 rounded-2xl bg-green-50 p-4">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 accent-green-600"
              />
              <span className="text-sm text-gray-700">
                I confirm that the above order details are correct and I agree
                to the Terms & Conditions.
              </span>
            </label>
          </div>

          <button
            onClick={handlePayment}
            className="mt-8 w-full rounded-full bg-green-600 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
          >
            Proceed to Payment →
          </button>

        </motion.div>

      </div>
    </main>
  );
}