"use client";

import { useRef } from "react";

export default function OTPPage() {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 1);

    e.target.value = value;

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === "Backspace" &&
      e.currentTarget.value === "" &&
      index > 0
    ) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    paste.split("").forEach((digit, index) => {
      if (inputs.current[index]) {
        inputs.current[index]!.value = digit;
      }
    });

    if (paste.length > 0) {
      inputs.current[Math.min(paste.length, 5)]?.focus();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-800">
            NSV Pure Milk
          </h1>

          <p className="text-gray-700 mt-2">
            OTP Verification
          </p>
        </div>

        <div className="mt-8">
          <p className="text-center text-gray-600 mb-6">
            Enter the 6-digit OTP sent to your mobile number
          </p>

          <div className="flex justify-center gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                onPaste={handlePaste}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 border border-gray-300 rounded-xl text-center text-2xl font-bold focus:border-green-600 focus:ring-2 focus:ring-green-500 outline-none"
              />
            ))}
          </div>

          <button className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white rounded-xl p-4 font-semibold transition">
            Verify OTP
          </button>

          <p className="text-center mt-6 text-gray-700">
            Didn't receive OTP?
            <span className="text-green-600 font-bold cursor-pointer ml-2">
              Resend
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}