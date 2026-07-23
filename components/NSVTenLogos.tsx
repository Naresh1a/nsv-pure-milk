"use client";

import React from "react";

interface LogoProps {
  option: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function NSVTenLogo({ option = 1, size = "md" }: LogoProps) {
  const dim = {
    sm: "w-28 h-28 text-[9px]",
    md: "w-40 h-40 text-[11px]",
    lg: "w-52 h-52 text-xs",
    xl: "w-64 h-64 text-sm",
  }[size];

  // OPTION 1: Vintage Dairy Seal (Navy & Off-White Arch - Clean Engraved Style)
  if (option === 1) {
    return (
      <div className={`relative ${dim} rounded-full p-2 bg-slate-900 border-4 border-slate-700 shadow-xl flex items-center justify-center`}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="92" fill="#0f172a" stroke="#3b82f6" strokeWidth="4" />
          <circle cx="100" cy="100" r="84" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />
          <path id="archPath1" d="M 30 100 A 70 70 0 0 1 170 100" fill="none" />
          <text fill="#ffffff" fontSize="22" fontWeight="900" letterSpacing="3">
            <textPath href="#archPath1" startOffset="50%" textAnchor="middle">NSV PURE MILK</textPath>
          </text>
          {/* Detailed Cow Line Art */}
          <path d="M 65 115 Q 85 95 100 100 Q 115 95 135 115 Q 120 125 100 125 Q 80 125 65 115 Z" fill="none" stroke="#60a5fa" strokeWidth="3" />
          <circle cx="100" cy="110" r="12" fill="#1e3a8a" />
          <text x="100" y="155" fill="#93c5fd" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="2">PREMIUM QUALITY</text>
          <text x="100" y="172" fill="#cbd5e1" fontSize="9" fontWeight="700" textAnchor="middle">SINCE 2026</text>
        </svg>
      </div>
    );
  }

  // OPTION 2: Modern Minimalist Monogram Emblem
  if (option === 2) {
    return (
      <div className={`relative ${dim} rounded-full p-2 bg-slate-950 border-4 border-amber-400 shadow-xl flex items-center justify-center`}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="92" fill="#020617" stroke="#fbbf24" strokeWidth="3" />
          <circle cx="100" cy="100" r="82" fill="none" stroke="#d97706" strokeWidth="1" />
          <text x="100" y="85" fill="#f59e0b" fontSize="42" fontWeight="900" textAnchor="middle" letterSpacing="4">NSV</text>
          <line x1="40" y1="102" x2="160" y2="102" stroke="#fbbf24" strokeWidth="2" />
          <text x="100" y="128" fill="#ffffff" fontSize="16" fontWeight="800" textAnchor="middle" letterSpacing="5">PURE MILK</text>
          <text x="100" y="155" fill="#94a3b8" fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="2">ORGANIC DAIRY FARM</text>
        </svg>
      </div>
    );
  }

  // OPTION 3: Emerald Farm Pasture Stamp
  if (option === 3) {
    return (
      <div className={`relative ${dim} rounded-full p-2 bg-emerald-950 border-4 border-emerald-500 shadow-xl flex items-center justify-center`}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="92" fill="#022c22" stroke="#10b981" strokeWidth="4" />
          <path id="archPath3" d="M 30 100 A 70 70 0 0 1 170 100" fill="none" />
          <text fill="#6ee7b7" fontSize="20" fontWeight="900" letterSpacing="3">
            <textPath href="#archPath3" startOffset="50%" textAnchor="middle">NSV PURE MILK</textPath>
          </text>
          {/* Barn Silhouette */}
          <polygon points="100,75 125,95 75,95" fill="#047857" stroke="#a7f3d0" strokeWidth="1.5" />
          <rect x="85" y="95" width="30" height="25" fill="#047857" stroke="#a7f3d0" strokeWidth="1.5" />
          <text x="100" y="150" fill="#ffffff" fontSize="12" fontWeight="800" textAnchor="middle" letterSpacing="2">100% FARM FRESH</text>
          <text x="100" y="168" fill="#6ee7b7" fontSize="9" fontWeight="700" textAnchor="middle">TELANGANA</text>
        </svg>
      </div>
    );
  }

  // OPTION 4: Royal Brass 3D Embossed Shield
  if (option === 4) {
    return (
      <div className={`relative ${dim} rounded-full p-2 bg-gradient-to-tr from-amber-950 via-slate-900 to-amber-900 border-4 border-amber-500 shadow-2xl flex items-center justify-center`}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path d="M 100 20 L 165 50 L 165 120 Q 100 180 100 185 Q 100 180 35 120 L 35 50 Z" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="4" />
          <text x="100" y="70" fill="#fbbf24" fontSize="26" fontWeight="900" textAnchor="middle" letterSpacing="2">NSV</text>
          <text x="100" y="95" fill="#ffffff" fontSize="14" fontWeight="800" textAnchor="middle" letterSpacing="3">PURE MILK</text>
          <circle cx="100" cy="120" r="14" fill="#d97706" />
          <text x="100" y="125" fill="#ffffff" fontSize="14" textAnchor="middle">👑</text>
          <text x="100" y="155" fill="#cbd5e1" fontSize="9" fontWeight="700" textAnchor="middle">ROYAL QUALITY</text>
        </svg>
      </div>
    );
  }

  // OPTION 5: Organic Heritage Crest (Warm Gold & Cream)
  if (option === 5) {
    return (
      <div className={`relative ${dim} rounded-full p-2 bg-amber-950 border-4 border-amber-400 shadow-xl flex items-center justify-center`}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="92" fill="#fffbeb" stroke="#d97706" strokeWidth="4" />
          <circle cx="100" cy="100" r="84" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="100" y="65" fill="#78350f" fontSize="22" fontWeight="900" textAnchor="middle" letterSpacing="3">NSV</text>
          <text x="100" y="88" fill="#92400e" fontSize="14" fontWeight="800" textAnchor="middle" letterSpacing="4">PURE MILK</text>
          <path d="M 50 115 Q 100 95 150 115" fill="none" stroke="#d97706" strokeWidth="2" />
          <text x="100" y="145" fill="#78350f" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="2">HERITAGE DAIRY</text>
          <text x="100" y="165" fill="#b45309" fontSize="9" fontWeight="700" textAnchor="middle">ESTD 2026</text>
        </svg>
      </div>
    );
  }

  // OPTION 6: Sleek Glass Bottle Packaging Stamp (Slate & White)
  if (option === 6) {
    return (
      <div className={`relative ${dim} rounded-full p-2 bg-slate-900 border-4 border-slate-500 shadow-xl flex items-center justify-center`}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="92" fill="#1e293b" stroke="#94a3b8" strokeWidth="3" />
          <text x="100" y="75" fill="#ffffff" fontSize="28" fontWeight="900" textAnchor="middle" letterSpacing="3">NSV</text>
          <rect x="40" y="88" width="120" height="2" fill="#38bdf8" />
          <text x="100" y="115" fill="#38bdf8" fontSize="14" fontWeight="800" textAnchor="middle" letterSpacing="4">PURE MILK</text>
          <text x="100" y="150" fill="#94a3b8" fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="2">BOTTLE PACKAGED</text>
        </svg>
      </div>
    );
  }

  // OPTION 7: Golden Crown Executive Badge
  if (option === 7) {
    return (
      <div className={`relative ${dim} rounded-full p-2 bg-slate-950 border-4 border-yellow-500 shadow-xl flex items-center justify-center`}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="92" fill="#09090b" stroke="#eab308" strokeWidth="4" />
          <text x="100" y="55" fill="#eab308" fontSize="16" textAnchor="middle">👑</text>
          <text x="100" y="85" fill="#ffffff" fontSize="24" fontWeight="900" textAnchor="middle" letterSpacing="3">NSV</text>
          <text x="100" y="110" fill="#eab308" fontSize="13" fontWeight="800" textAnchor="middle" letterSpacing="3">PURE MILK</text>
          <text x="100" y="148" fill="#a1a1aa" fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="2">EXECUTIVE SELECTION</text>
        </svg>
      </div>
    );
  }

  // OPTION 8: Terracotta Rustic Organic Seal
  if (option === 8) {
    return (
      <div className={`relative ${dim} rounded-full p-2 bg-amber-950 border-4 border-amber-600 shadow-xl flex items-center justify-center`}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="92" fill="#7c2d12" stroke="#fdba74" strokeWidth="4" />
          <text x="100" y="70" fill="#ffedd5" fontSize="24" fontWeight="900" textAnchor="middle" letterSpacing="3">NSV</text>
          <text x="100" y="95" fill="#fed7aa" fontSize="14" fontWeight="800" textAnchor="middle" letterSpacing="4">PURE MILK</text>
          <circle cx="100" cy="122" r="14" fill="#9a3412" stroke="#fdba74" strokeWidth="1.5" />
          <text x="100" y="127" fill="#ffedd5" fontSize="12" textAnchor="middle">🥣</text>
          <text x="100" y="158" fill="#fed7aa" fontSize="9" fontWeight="700" textAnchor="middle">CLAY POT & FRESH MILK</text>
        </svg>
      </div>
    );
  }

  // OPTION 9: Pure Milk Droplet & Curved Ribbon
  if (option === 9) {
    return (
      <div className={`relative ${dim} rounded-full p-2 bg-teal-950 border-4 border-teal-400 shadow-xl flex items-center justify-center`}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="92" fill="#042f2e" stroke="#2dd4bf" strokeWidth="3" />
          <path d="M 100 45 Q 125 90 100 110 Q 75 90 100 45 Z" fill="#5eead4" />
          <text x="100" y="138" fill="#ffffff" fontSize="20" fontWeight="900" textAnchor="middle" letterSpacing="3">NSV PURE</text>
          <text x="100" y="160" fill="#2dd4bf" fontSize="10" fontWeight="800" textAnchor="middle" letterSpacing="2">RAW DAIRY MILK</text>
        </svg>
      </div>
    );
  }

  // OPTION 10: Luxury Botanical Wreath Badge
  return (
    <div className={`relative ${dim} rounded-full p-2 bg-slate-950 border-4 border-emerald-400 shadow-xl flex items-center justify-center`}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <circle cx="100" cy="100" r="92" fill="#022c22" stroke="#34d399" strokeWidth="3" />
        {/* Wreath circle */}
        <circle cx="100" cy="100" r="78" fill="none" stroke="#059669" strokeWidth="2" strokeDasharray="6 4" />
        <text x="100" y="75" fill="#a7f3d0" fontSize="24" fontWeight="900" textAnchor="middle" letterSpacing="3">NSV</text>
        <text x="100" y="102" fill="#ffffff" fontSize="16" fontWeight="800" textAnchor="middle" letterSpacing="4">PURE MILK</text>
        <text x="100" y="145" fill="#34d399" fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="2">BOTANICAL CERTIFIED</text>
      </svg>
    </div>
  );
}
