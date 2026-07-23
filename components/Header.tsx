"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import NSVLogo from "./NSVLogo";
import { useLanguage } from "@/lib/LanguageContext";
import { useWallet } from "@/lib/WalletContext";

interface LoggedInUser {
  name: string;
  mobile: string;
  registered: boolean;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const { language, t } = useLanguage();
  const { balance } = useWallet();

  const syncUserSession = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("nsv_logged_in_user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    }
  };

  useEffect(() => {
    syncUserSession();
    if (typeof window !== "undefined") {
      const handleStorage = () => syncUserSession();
      window.addEventListener("storage", handleStorage);
      window.addEventListener("nsv_user_change", handleStorage);
      return () => {
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener("nsv_user_change", handleStorage);
      };
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("nsv_logged_in_user");
      window.dispatchEvent(new Event("nsv_user_change"));
      setUser(null);
    }
  };

  const getLangBadgeText = () => {
    if (language === "hi") return "🌐 हिंदी";
    if (language === "te") return "🌐 తెలుగు";
    return "🌐 English";
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-amber-200/80 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-3">
        
        {/* LOGO */}
        <Link href="/">
          <NSVLogo size="md" />
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-extrabold text-slate-800">
          <Link href="/" className="text-emerald-800 font-black hover:text-emerald-950 transition-colors">
            {t("home")}
          </Link>
          <a href="#process" className="hover:text-emerald-800 transition-colors">
            {t("ourProcess")}
          </a>
          <a href="#products" className="hover:text-emerald-800 transition-colors">
            {t("products")}
          </a>
          <a href="#subscription" className="hover:text-emerald-800 transition-colors">
            {t("plans")}
          </a>
          <a href="#reviews" className="hover:text-emerald-800 transition-colors">
            {t("reviews")}
          </a>
        </nav>

        {/* RIGHT ACTION BUTTONS + NSV WALLET BADGE + ACTIVE LANGUAGE INDICATOR */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* NSV DAIRY WALLET BALANCE BADGE */}
          <Link
            href="/profile"
            title="Recharge NSV Dairy Wallet"
            className="flex items-center gap-1.5 text-xs font-black text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-3 py-1.5 rounded-xl transition-all shadow-xs"
          >
            <span>👛 Wallet:</span>
            <span className="text-emerald-800 font-black">₹{balance.toLocaleString()}</span>
          </Link>

          {/* ACTIVE LANGUAGE BADGE */}
          <Link
            href="/profile"
            title="Change language in Profile"
            className="flex items-center gap-1.5 text-xs font-black text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 px-3 py-1.5 rounded-xl transition-all shadow-xs"
          >
            <span>{getLangBadgeText()}</span>
          </Link>

          <a
            href="tel:+919876543210"
            className="flex items-center gap-1.5 text-xs font-black text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-all border border-slate-300 shadow-xs"
          >
            <span>📞</span>
            <span>+91 98765 43210</span>
          </a>

          {user ? (
            /* LOGGED IN USER BADGE LINKING TO PROFILE WITH LOGOUT BUTTON */
            <div className="flex items-center gap-2">
              <Link
                href="/profile"
                className="bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-xs font-black transition-all shadow-xs"
              >
                <span className="text-base">👤</span>
                <span>{user.name}</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="text-xs font-extrabold text-red-700 hover:text-red-800 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 shadow-xs"
              >
                <span>🚪</span>
                <span>{t("logout")}</span>
              </button>
            </div>
          ) : (
            /* LOGGED OUT BUTTONS (PROMINENT LOGIN & REGISTER) */
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-xs font-black text-slate-800 hover:text-emerald-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-4 py-2 rounded-xl transition-all"
              >
                {t("login")}
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 hover:from-emerald-900 hover:to-teal-900 text-white font-black text-xs px-4 py-2 rounded-xl shadow-md shadow-emerald-800/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {t("register")}
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-800 hover:text-emerald-800 rounded-lg focus:outline-hidden"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-amber-200 px-6 py-4 space-y-3.5 font-extrabold text-slate-800 text-sm animate-fadeIn">
          <div className="flex items-center justify-between bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-xs">
            <span className="text-amber-950 font-black">👛 NSV Wallet Balance:</span>
            <span className="bg-emerald-800 text-white px-2.5 py-1 rounded-lg font-black">₹{balance.toLocaleString()}</span>
          </div>

          <Link href="/" className="block text-emerald-800 font-black" onClick={() => setMobileMenuOpen(false)}>
            {t("home")}
          </Link>
          <a href="#process" className="block hover:text-emerald-800" onClick={() => setMobileMenuOpen(false)}>
            {t("ourProcess")}
          </a>
          <a href="#products" className="block hover:text-emerald-800" onClick={() => setMobileMenuOpen(false)}>
            {t("products")}
          </a>
          <a href="#subscription" className="block hover:text-emerald-800" onClick={() => setMobileMenuOpen(false)}>
            {t("plans")}
          </a>
          <a href="#reviews" className="block hover:text-emerald-800" onClick={() => setMobileMenuOpen(false)}>
            {t("reviews")}
          </a>

          {user ? (
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <Link href="/profile" className="font-black text-slate-900 text-xs flex items-center gap-1.5">
                <span>👤</span>
                <span>{user.name}</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs font-black text-red-600 border border-red-200 px-3 py-1 rounded-xl bg-red-50"
              >
                🚪 {t("logout")}
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-slate-200 flex gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center bg-slate-100 border border-slate-300 py-2.5 rounded-xl font-black text-xs text-slate-900"
              >
                {t("login")}
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center bg-emerald-800 text-white py-2.5 rounded-xl font-black text-xs shadow-md"
              >
                {t("register")}
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}