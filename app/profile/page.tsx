"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NSVLogo from "@/components/NSVLogo";
import ScrollToTopOnRefresh from "@/components/ScrollToTopOnRefresh";
import { useLanguage, Language } from "@/lib/LanguageContext";
import { useWallet } from "@/lib/WalletContext";

export default function ProfilePage() {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const { balance, transactions, rechargeWalletSuccess, rechargeWalletFail } = useWallet();

  const [fullName, setFullName] = useState("Customer Order");
  const [mobile, setMobile] = useState("9876543210");
  const [email, setEmail] = useState("customer@nsvpuremilk.com");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // RECHARGE MODAL STATE
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [rechargeAmt, setRechargeAmt] = useState(1000);
  const [customInput, setCustomInput] = useState("");
  const [paymentGatewayState, setPaymentGatewayState] = useState<"select" | "success" | "failed">("select");
  const [lastCreditedInfo, setLastCreditedInfo] = useState<{ totalCredited: number; cashback: number } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("nsv_logged_in_user");
      if (stored) {
        try {
          const u = JSON.parse(stored);
          if (u.name) setFullName(u.name);
          if (u.mobile) setMobile(u.mobile);
        } catch {
          // ignore
        }
      }
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);

    setTimeout(() => {
      const userObj = { name: fullName, mobile, registered: true };
      localStorage.setItem("nsv_logged_in_user", JSON.stringify(userObj));
      window.dispatchEvent(new Event("nsv_user_change"));
      setSavedSuccess(true);
      setIsSaving(false);
      setTimeout(() => setSavedSuccess(false), 4000);
    }, 400);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("nsv_logged_in_user");
      window.dispatchEvent(new Event("nsv_user_change"));
      router.push("/");
    }
  };

  const currentTargetAmt = customInput ? parseInt(customInput.replace(/\D/g, ""), 10) || 0 : rechargeAmt;
  const cashbackBonus = Math.round(currentTargetAmt * 0.1);

  const triggerSuccessPayment = () => {
    if (currentTargetAmt <= 0) return;
    const res = rechargeWalletSuccess(currentTargetAmt, "UPI");
    setLastCreditedInfo(res);
    setPaymentGatewayState("success");
  };

  const triggerFailedPayment = () => {
    if (currentTargetAmt <= 0) return;
    rechargeWalletFail(currentTargetAmt);
    setPaymentGatewayState("failed");
  };

  const closeModal = () => {
    setShowRechargeModal(false);
    setPaymentGatewayState("select");
    setLastCreditedInfo(null);
    setCustomInput("");
  };

  return (
    <div className="min-h-screen bg-stone-50/80 text-slate-900 font-sans py-10 px-4 sm:px-8">
      <ScrollToTopOnRefresh />
      <div className="max-w-2xl mx-auto space-y-6">

        {/* HEADER BAR */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-md">
          <Link href="/">
            <NSVLogo size="sm" />
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs font-black text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1 shadow-xs"
            >
              <span>🚪</span>
              <span>{t("logout")}</span>
            </button>

            <Link href="/" className="text-xs font-black text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 px-4 py-2 rounded-xl transition-all">
              {t("backToWebsite")}
            </Link>
          </div>
        </div>

        {/* MAIN PROFILE CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="bg-emerald-100 text-emerald-950 text-[10px] font-black px-3 py-1 rounded-full uppercase border border-emerald-300">
                USER PROFILE 👤
              </span>
              <h1 className="text-2xl font-black text-slate-900 mt-2">{t("profileTitle")}</h1>
            </div>
            <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center justify-center text-2xl font-black shadow-xs">
              👤
            </div>
          </div>

          {/* 👛 NSV DAIRY WALLET & CASHBACK CARD */}
          <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-emerald-800 text-white rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-amber-950/40 text-amber-200 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  PREPAID DAIRY WALLET
                </span>
                <p className="text-xs font-bold text-amber-100 mt-1">Current NSV Wallet Balance</p>
                <h2 className="text-3xl font-black text-white">₹{balance.toLocaleString()}</h2>
              </div>
              <div className="text-right">
                <span className="bg-amber-400 text-amber-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase shadow-xs">
                  🎁 10% CASHBACK ACTIVE
                </span>
                <p className="text-[11px] text-amber-100 font-bold mt-1">Instant bonus on every recharge!</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowRechargeModal(true)}
              className="w-full bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>➕ Recharge Wallet & Get Cashback Bonus</span>
            </button>
          </div>

          {/* 📜 WALLET TRANSACTION HISTORY LEDGER */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>📜 Wallet Transaction Ledger & Cashback History</span>
              </h3>
              <span className="text-[10px] text-slate-500 font-bold">{transactions.length} Entries</span>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {transactions.map((tx) => (
                <div key={tx.id} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-extrabold text-slate-900">{tx.title}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{tx.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-black text-sm ${tx.status === "failed" ? "text-slate-400 line-through" : tx.amount > 0 ? "text-emerald-700" : "text-slate-900"}`}>
                      {tx.amount > 0 ? `+₹${tx.amount}` : tx.amount < 0 ? `-₹${Math.abs(tx.amount)}` : "₹0"}
                    </p>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${tx.status === "success" ? "bg-emerald-100 text-emerald-900" : "bg-red-100 text-red-800"}`}>
                      {tx.status === "success" ? "SUCCESS ✓" : "FAILED ✕"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🌐 PREFERRED LANGUAGE SELECTOR */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <div>
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                {t("preferredLanguageTitle")}
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">{t("languageNotice")}</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "en", label: "English 🌐", sub: "English" },
                { id: "te", label: "తెలుగు 🌐", sub: "Telugu" },
                { id: "hi", label: "हिंदी 🌐", sub: "Hindi" },
              ].map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => setLanguage(lang.id as Language)}
                  className={`p-3 rounded-xl border-2 font-black text-xs transition-all flex flex-col items-center gap-1 ${
                    language === lang.id
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm ring-2 ring-emerald-500/20"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <span>{lang.label}</span>
                  <span className="text-[10px] text-slate-500 font-normal">{lang.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* PERSONAL DETAILS FORM */}
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-700 uppercase flex items-center">
                {t("fullNameLabel")} <span className="text-red-600 font-black ml-1">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm font-bold outline-none focus:border-emerald-600"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-700 uppercase flex items-center">
                {t("registeredMobileLabel")} <span className="text-red-600 font-black ml-1">*</span>
              </label>
              <div className="flex gap-2">
                <span className="bg-slate-100 border border-slate-300 rounded-xl px-3.5 py-3 text-slate-700 text-xs font-bold flex items-center shrink-0">
                  🇮🇳 +91
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="98765 43210"
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm font-bold outline-none focus:border-emerald-600"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-500 uppercase block">Email Address (Optional)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm font-bold outline-none focus:border-emerald-600"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 hover:from-emerald-900 text-white font-black text-sm py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                {isSaving ? "Saving Settings..." : t("saveSettingsBtn")}
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="bg-red-100 hover:bg-red-200 border border-red-300 text-red-900 font-black text-xs px-5 py-4 rounded-2xl transition-all"
              >
                🚪 {t("logout")}
              </button>
            </div>
          </form>

          {savedSuccess && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-950 font-black text-xs p-4 rounded-2xl animate-fadeIn text-center">
              {t("settingsSavedSuccess")}
            </div>
          )}
        </div>
      </div>

      {/* WALLET RECHARGE GATEWAY MODAL */}
      {showRechargeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-5 animate-fadeIn">
            
            {paymentGatewayState === "select" && (
              <>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">➕ Recharge NSV Dairy Wallet</h3>
                    <p className="text-xs text-slate-500 font-bold">Select or enter recharge amount</p>
                  </div>
                  <button onClick={closeModal} className="text-slate-400 hover:text-slate-700 font-black text-lg">
                    ✕
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider block">Quick Amount Options:</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[500, 1000, 2000, 5000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setRechargeAmt(amt);
                          setCustomInput("");
                        }}
                        className={`py-2.5 rounded-xl border-2 font-black text-xs transition-all ${
                          !customInput && rechargeAmt === amt
                            ? "border-amber-500 bg-amber-50 text-amber-950 shadow-xs"
                            : "border-slate-200 bg-slate-50 text-slate-700"
                        }`}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider block">Or Enter Custom Amount:</label>
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="e.g. 3000"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 text-xs font-bold outline-none focus:border-amber-500"
                  />
                </div>

                {/* CASHBACK BONUS PREVIEW */}
                <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3.5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-black text-amber-950">🎁 10% Cashback Bonus Included!</p>
                    <p className="text-[11px] text-amber-900 font-medium">Deposit ₹{currentTargetAmt} → Get Bonus +₹{cashbackBonus}</p>
                  </div>
                  <span className="font-black text-emerald-800 text-sm bg-white border border-emerald-300 px-3 py-1 rounded-xl">
                    Total: ₹{currentTargetAmt + cashbackBonus}
                  </span>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider text-center">🧪 Test Gateway Outcome:</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={triggerSuccessPayment}
                      className="flex-1 bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-900 text-white font-black text-xs py-3.5 rounded-2xl shadow-md transition-all"
                    >
                      🟢 Payment SUCCESS
                    </button>

                    <button
                      type="button"
                      onClick={triggerFailedPayment}
                      className="flex-1 bg-red-100 hover:bg-red-200 border border-red-300 text-red-900 font-black text-xs py-3.5 rounded-2xl shadow-xs transition-all"
                    >
                      🔴 Payment FAILURE
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* GATEWAY SUCCESS STATE */}
            {paymentGatewayState === "success" && (
              <div className="text-center space-y-4 py-2">
                <div className="w-16 h-16 bg-emerald-100 border border-emerald-300 text-emerald-700 rounded-full flex items-center justify-center text-3xl mx-auto shadow-md">
                  ✓
                </div>
                <div className="space-y-1">
                  <span className="bg-emerald-100 text-emerald-950 text-[10px] font-black px-3 py-1 rounded-full uppercase border border-emerald-300">
                    RECHARGE SUCCESSFUL
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">₹{currentTargetAmt} Added to Wallet!</h3>
                  {lastCreditedInfo && lastCreditedInfo.cashback > 0 && (
                    <p className="text-emerald-800 font-black text-xs bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
                      🎁 Extra 10% Cashback Bonus (+₹{lastCreditedInfo.cashback}) Credited! Total Added: ₹{lastCreditedInfo.totalCredited}
                    </p>
                  )}
                </div>

                <p className="text-xs text-slate-600 font-bold">New Wallet Balance: ₹{balance.toLocaleString()}</p>

                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full bg-slate-900 hover:bg-black text-white font-black text-xs py-3.5 rounded-2xl shadow-md transition-all"
                >
                  Done →
                </button>
              </div>
            )}

            {/* GATEWAY FAILURE STATE */}
            {paymentGatewayState === "failed" && (
              <div className="text-center space-y-4 py-2">
                <div className="w-16 h-16 bg-red-100 border border-red-300 text-red-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-md">
                  ❌
                </div>
                <div className="space-y-1">
                  <span className="bg-red-100 text-red-950 text-[10px] font-black px-3 py-1 rounded-full uppercase border border-red-300">
                    RECHARGE FAILED
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">చెల్లింపు విఫలమైంది (Payment Failed)</h3>
                  <p className="text-xs text-slate-600 font-medium">
                    మీ బ్యాంక్ నుండి పేమెంట్ పూర్తి కాలేదు. వాలెట్‌లో డబ్బులు జత కాలేదు.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentGatewayState("select")}
                    className="flex-1 bg-emerald-800 text-white font-black text-xs py-3 rounded-xl"
                  >
                    🔄 Try Again
                  </button>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-slate-200 text-slate-800 font-black text-xs py-3 rounded-xl"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
