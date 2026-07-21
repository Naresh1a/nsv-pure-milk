"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    router.push("/admin/dashboard");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
      >

        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
            🥛
          </div>

          <h1 className="mt-6 text-3xl font-bold text-green-700">
            NSV Pure Milk
          </h1>

          <p className="mt-2 text-gray-500">
            Admin Login
          </p>

        </div>

        <div className="mt-8">

          <label className="mb-2 block font-semibold text-gray-700">
            Mobile Number
          </label>

          <input
            type="tel"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="mb-6 w-full rounded-xl border border-gray-300 p-4 focus:border-green-600 focus:outline-none"
          />

          <label className="mb-2 block font-semibold text-gray-700">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-4 focus:border-green-600 focus:outline-none"
          />
          <button
            onClick={handleLogin}
            className="mt-8 w-full rounded-xl bg-green-600 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
          >
            Login
          </button>

          <div className="mt-8 rounded-2xl bg-green-50 p-4">

            <h3 className="font-semibold text-green-700">
              Demo Admin Credentials
            </h3>

            <p className="mt-2 text-sm text-gray-700">
              Mobile : 9876543210
            </p>

            <p className="text-sm text-gray-700">
              Password : admin123
            </p>

          </div>

        </div>

      </motion.div>

    </main>
  );
}