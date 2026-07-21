"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function PaymentPage() {
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const handlePayment = () => {
    router.push("/payment-success");
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
            STEP 5 OF 5
          </p>

          <div className="mx-auto mt-3 h-2 w-72 rounded-full bg-gray-200">
            <div className="h-2 w-full rounded-full bg-green-600"></div>
          </div>

          <h1 className="mt-8 text-4xl font-bold text-green-700">
            Secure Payment
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Select your preferred payment method.
          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 rounded-3xl bg-white p-8 shadow-xl"
        >

          <label className="mb-2 block font-semibold text-gray-700">
            Payment Method
          </label>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-4 focus:border-green-600 focus:outline-none"
          >
            <option>UPI</option>
            <option>Google Pay</option>
            <option>PhonePe</option>
            <option>Paytm</option>
            <option>Credit / Debit Card</option>
            <option>Net Banking</option>
          </select>

          <div className="mt-8 rounded-2xl bg-green-50 p-6">

            <h2 className="text-xl font-bold text-green-700">
              Payment Summary
            </h2>

            <div className="mt-4 space-y-2 text-gray-700">
              <p><strong>Order ID:</strong> ORD000001</p>
              <p><strong>Amount:</strong> ₹1800</p>
              <p><strong>Status:</strong> Awaiting Payment</p>
            </div>

          </div>
          <div className="mt-8 rounded-2xl border border-green-200 bg-white p-6">

            <h3 className="text-lg font-bold text-green-700">
              Your Selected Method
            </h3>

            <p className="mt-3 text-gray-700">
              {paymentMethod}
            </p>

            <p className="mt-4 text-sm text-gray-500">
              🔒 Your payment is secured with SSL encryption. Your payment
              details are never stored on our servers.
            </p>

          </div>

          <button
            onClick={handlePayment}
            className="mt-8 w-full rounded-full bg-green-600 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
          >
            Pay ₹1800 Securely →
          </button>

          <p className="mt-6 text-center text-sm text-gray-500">
            By clicking the payment button, you agree to our Terms &
            Conditions and Privacy Policy.
          </p>

        </motion.div>

      </div>
    </main>
  );
}