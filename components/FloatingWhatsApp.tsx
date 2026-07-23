"use client";

import React from "react";

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
      
      {/* TOOLTIP POPUP */}
      <div className="hidden group-hover:flex items-center gap-2 bg-slate-900 text-white text-xs font-extrabold px-4 py-2 rounded-2xl shadow-2xl border border-emerald-500/40 animate-fadeIn">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Order Pure Milk on WhatsApp (+91 98765 43210)</span>
      </div>

      {/* FLOATING ACTION BUTTON */}
      <a
        href="https://wa.me/919876543210?text=Hi%20NSV%20Pure%20Milk,%20I%20want%20to%20subscribe%20to%20farm%20fresh%20milk%20in%20Telangana!"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-2 border-white ring-4 ring-emerald-500/20"
        aria-label="Order on WhatsApp"
      >
        <span className="text-2xl sm:text-3xl">💬</span>
      </a>
    </div>
  );
}
