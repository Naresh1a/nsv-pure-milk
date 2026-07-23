"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function OTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mobile = searchParams.get("mobile") || "";

  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

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
  const getOTP = () => {
    return inputs.current.map((input) => input?.value || "").join("");
  };
  const handleVerify = async () => {
  const otp = getOTP();

  if (otp.length !== 6) {
    alert("Please enter 6-digit OTP");
    return;
  }

  setLoading(true);

  // Development OTP
  if (otp === "123456") {
    alert("OTP Verified Successfully");
    router.push("/dashboard");
    return;
  }

  setLoading(false);
  alert("Invalid OTP");
};

const handleResend = () => {
  setTimer(60);

  inputs.current.forEach((input) => {
    if (input) input.value = "";
  });

  inputs.current[0]?.focus();

  alert("Development OTP : 123456");
};

return (
  <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-6">
    <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">

      <div className="text-center">

        <h1 className="text-4xl font-extrabold text-green-700">
          NSV Pure Milk
        </h1>

        <p className="text-gray-600 mt-2 text-lg">
          OTP Verification
        </p>

        <div className="mt-6 bg-green-50 rounded-xl p-4">

          <p className="text-gray-600">
            OTP sent to
          </p>

          <h2 className="text-xl font-bold text-green-700 mt-1">
            +91 {mobile}
          </h2>

        </div>

      </div>

      <div className="mt-8">

        <p className="text-center text-gray-700 mb-6">
          Enter the 6-digit OTP
        </p><div className="flex justify-center gap-3">
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
              className="w-12 h-14 rounded-xl border-2 border-gray-300 text-center text-2xl font-bold outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-500"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={loading}
          className={`mt-8 w-full rounded-xl p-4 text-white font-bold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="text-center mt-6">
          {timer > 0 ? (
            <p className="text-gray-600">
              Resend OTP in{" "}
              <span className="font-bold text-green-700">
                {timer}s
              </span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="font-bold text-green-700 hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/login")}
            className="text-gray-600 hover:text-green-700 font-medium"
          >
            ← Back to Login
          </button>
        </div>

        <div className="mt-8 rounded-xl bg-green-50 p-4 border border-green-100">
          <p className="text-sm text-gray-600 text-center">
            <span className="font-semibold">Development Mode</span>
          </p>

          <p className="text-center mt-2 text-green-700 font-bold text-lg">
            Test OTP: 123456
          </p>
        </div>

      </div>
    </div>
  </main>
  );
}

export default function OTPPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50 flex items-center justify-center font-bold text-slate-700">Loading...</div>}>
      <OTPContent />
    </Suspense>
  );
}