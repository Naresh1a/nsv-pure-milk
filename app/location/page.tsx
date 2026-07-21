"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LocationPage() {
  const router = useRouter();

  const [step] = useState(1);
  const [locationType, setLocationType] = useState<
    "current" | "manual" | null
  >(null);

  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    house: "",
    street: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  const handleCurrentLocation = () => {
    setLocationType("current");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleContinue = () => {
    router.push("/availability");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">

      <div className="mx-auto max-w-5xl px-6 py-10">

        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="mb-4">

            <p className="text-sm font-semibold text-green-600">
              STEP {step} OF 5
            </p>

            <div className="mx-auto mt-3 h-2 w-72 rounded-full bg-gray-200">

              <div className="h-2 w-1/5 rounded-full bg-green-600"></div>

            </div>

          </div>

          <h1 className="text-4xl font-bold text-green-700">
            📍 Confirm Your Delivery Location
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Help us deliver your fresh milk faster by confirming your
            delivery location.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-3xl bg-white p-8 shadow-xl"
        >

          <h2 className="text-2xl font-bold text-green-700">
            🚚 Why do we need your location?
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">

            <div className="rounded-xl bg-green-50 p-5">
              ✅ Faster Delivery
            </div>

            <div className="rounded-xl bg-green-50 p-5">
              ✅ Correct Address
            </div>

            <div className="rounded-xl bg-green-50 p-5">
              ✅ Fresh Milk On Time
            </div>

            <div className="rounded-xl bg-green-50 p-5">
              ✅ Easy For Delivery Partner
            </div>

          </div>

          <div className="mt-8 rounded-2xl border border-green-200 bg-green-100 p-6">

            <h3 className="text-xl font-bold text-green-700">
              🛡 Privacy Promise
            </h3>

            <p className="mt-3 text-gray-700">
              Your location is used only for delivering your milk orders.
              It is never used for advertising or unnecessary tracking.
            </p>

          </div>

        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: .98 }}
            onClick={handleCurrentLocation}
            className={`rounded-3xl p-8 text-left shadow-xl transition ${
              locationType === "current"
                ? "bg-green-600 text-white"
                : "bg-white"
            }`}
          >

            <h3 className="text-2xl font-bold">
              📍 Use Current Location
            </h3>

            <p className="mt-3">
              Automatically detect your address using GPS.
            </p>

          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: .98 }}
            onClick={() => setLocationType("manual")}
            className={`rounded-3xl p-8 text-left shadow-xl transition ${
              locationType === "manual"
                ? "bg-green-600 text-white"
                : "bg-white"
            }`}
          >

            <h3 className="text-2xl font-bold">
              ✍️ Enter Address Manually
            </h3>

            <p className="mt-3">
              Type your delivery address manually.
            </p>

          </motion.button>

        </div>{locationType === "current" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 rounded-3xl bg-white p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-green-700">
              📍 Current Location
            </h2>

            {loading ? (
              <div className="mt-6">
                <p className="text-gray-600">Detecting your location...</p>

                <div className="mt-4 h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 w-1/2 animate-pulse rounded-full bg-green-600"></div>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl bg-green-50 p-6">
                <p className="font-medium text-green-700">
                  ✅ Google Maps integration will be connected in the next step.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {locationType === "manual" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 rounded-3xl bg-white p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-green-700 mb-6">
              🏠 Delivery Address
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                placeholder="House / Flat No."
                className="rounded-xl border p-3"
                value={address.house}
                onChange={(e) =>
                  setAddress({ ...address, house: e.target.value })
                }
              />

              <input
                placeholder="Street"
                className="rounded-xl border p-3"
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
              />

              <input
                placeholder="Area / Village"
                className="rounded-xl border p-3"
                value={address.area}
                onChange={(e) =>
                  setAddress({ ...address, area: e.target.value })
                }
              />

              <input
                placeholder="City"
                className="rounded-xl border p-3"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />

              <input
                placeholder="State"
                className="rounded-xl border p-3"
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
              />

              <input
                placeholder="Pincode"
                className="rounded-xl border p-3"
                value={address.pincode}
                onChange={(e) =>
                  setAddress({ ...address, pincode: e.target.value })
                }
              />
            </div>

            <input
              placeholder="Landmark (Optional)"
              className="mt-4 w-full rounded-xl border p-3"
              value={address.landmark}
              onChange={(e) =>
                setAddress({ ...address, landmark: e.target.value })
              }
            />
          </motion.div>
        )}

        <div className="mt-12 text-center">
          <button
            onClick={handleContinue}
            disabled={!locationType}
            className="rounded-full bg-green-600 px-10 py-4 text-lg font-semibold text-white transition hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Continue →
          </button>
        </div>

      </div>
    </main>
  );
}