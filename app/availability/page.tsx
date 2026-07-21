"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AvailabilityPage() {
  const router = useRouter();

  // Demo
  const [isAvailable] = useState(true);

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChecking(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    router.push("/subscription");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">

      <div className="mx-auto max-w-4xl px-6 py-10">

        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >

          <p className="text-sm font-semibold text-green-600">
            STEP 2 OF 5
          </p>

          <div className="mx-auto mt-3 h-2 w-72 rounded-full bg-gray-200">

            <div className="h-2 w-2/5 rounded-full bg-green-600"></div>

          </div>

          <h1 className="mt-8 text-4xl font-bold text-green-700">
            📍 Checking Delivery Availability
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Please wait while we verify whether
            NSV Pure Milk delivers to your location.
          </p>

        </motion.div>{checking ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 rounded-3xl bg-white p-10 text-center shadow-xl"
          >
            <div className="mx-auto h-20 w-20 animate-spin rounded-full border-4 border-green-200 border-t-green-600"></div>

            <h2 className="mt-6 text-2xl font-bold text-green-700">
              Checking Your Location...
            </h2>

            <p className="mt-3 text-gray-600">
              Please wait a moment.
            </p>
          </motion.div>
        ) : isAvailable ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 rounded-3xl bg-white p-10 shadow-xl"
          >
            <div className="text-center">

              <div className="text-6xl">🎉</div>

              <h2 className="mt-5 text-3xl font-bold text-green-700">
                Great News!
              </h2>

              <p className="mt-4 text-lg text-gray-600">
                NSV Pure Milk is available in your area.
              </p>

              <button
                onClick={handleContinue}
                className="mt-8 rounded-full bg-green-600 px-10 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
              >
                Continue to Subscription →
              </button>

            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 rounded-3xl bg-white p-10 shadow-xl"
          >
            <div className="text-center">

              <div className="text-6xl">😔</div>

              <h2 className="mt-5 text-3xl font-bold text-red-600">
                Service Not Available
              </h2>

              <p className="mt-4 text-lg text-gray-600">
                Thank you for choosing NSV Pure Milk.
                <br />
                Currently we are not delivering to your location.
              </p>

              <div className="mt-8 flex flex-col gap-4 md:flex-row md:justify-center">

                <a
                  href="tel:+919999999999"
                  className="rounded-full bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700"
                >
                  📞 Call Us
                </a>

                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-green-600 px-8 py-4 font-semibold text-green-700 hover:bg-green-50"
                >
                  💬 WhatsApp
                </a>

              </div>

            </div>
          </motion.div>
        )}

      </div>
    </main>
  );
}