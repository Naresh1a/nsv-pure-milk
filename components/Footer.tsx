"use client";

import Link from "next/link";
import NSVLogo from "./NSVLogo";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* BRAND COLUMN */}
          <div className="space-y-4">
            <NSVLogo size="md" />
            <p className="text-slate-400 text-xs leading-relaxed font-medium">
              {t("footerTagline")}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                🌱 100% Organic & Chemical Free
              </span>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">{t("quickLinks")}</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">{t("home")}</Link></li>
              <li><a href="#process" className="hover:text-emerald-400 transition-colors">{t("ourProcess")}</a></li>
              <li><a href="#products" className="hover:text-emerald-400 transition-colors">{t("products")}</a></li>
              <li><a href="#subscription" className="hover:text-emerald-400 transition-colors">{t("plans")}</a></li>
              <li><a href="#reviews" className="hover:text-emerald-400 transition-colors">{t("reviews")}</a></li>
            </ul>
          </div>

          {/* CONTACT & SUPPORT */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">{t("contactSupport")}</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+919876543210" className="hover:text-emerald-400 transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2">
                <span>📧</span>
                <a href="mailto:info@nsvpuremilk.com" className="hover:text-emerald-400 transition-colors">info@nsvpuremilk.com</a>
              </li>
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>Hyderabad, Secunderabad, Warangal, Karimnagar & Nizamabad, Telangana</span>
              </li>
            </ul>
          </div>

          {/* DELIVERY HOURS */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">{t("deliveryHours")}</h4>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
              <p className="text-xs font-extrabold text-amber-400">{t("deliverySlotText")}</p>
              <p className="text-[11px] text-slate-400 font-medium">{t("guaranteed365")}</p>
            </div>
          </div>

        </div>

        {/* COPYRIGHT BOTTOM BAR */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium gap-4">
          <p>{t("rightsReserved")}</p>
          <p className="text-slate-600">Delivered with ❤️ in Telangana</p>
        </div>

      </div>
    </footer>
  );
}