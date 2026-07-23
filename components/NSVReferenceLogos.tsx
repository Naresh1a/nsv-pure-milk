"use client";

import React from "react";

interface LogoProps {
  option: 1 | 2 | 3 | 4 | 5;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function NSVReferenceLogo({ option = 1, size = "md" }: LogoProps) {
  const dim = {
    sm: "w-24 h-24",
    md: "w-36 h-36",
    lg: "w-48 h-48",
    xl: "w-64 h-64",
  }[size];

  // OPTION 1: 3D METALLIC GOLD & CARVED WOODEN CREST (Exact 3D Match to reference image bottom-right!)
  if (option === 1) {
    return (
      <div className={`relative ${dim} rounded-full p-2 bg-gradient-to-tr from-amber-900 via-yellow-700 to-amber-500 shadow-2xl shadow-amber-950/40 border-4 border-amber-300 ring-4 ring-amber-500/20 group hover:scale-105 transition-transform duration-500`}>
        <div className="w-full h-full rounded-full bg-gradient-to-b from-amber-950 via-slate-950 to-emerald-950 flex flex-col items-center justify-between p-3 border-2 border-amber-300/60 relative overflow-hidden text-center">
          
          {/* TOP CURVED ARCH TEXT */}
          <div className="pt-1">
            <span className="text-[10px] sm:text-xs font-black tracking-widest text-amber-300 uppercase block font-serif drop-shadow-md">
              ★ NSV ★
            </span>
            <span className="text-[11px] sm:text-sm font-black tracking-wider text-white uppercase block drop-shadow-md">
              PURE MILK
            </span>
          </div>

          {/* CENTER COW & FARM LANDSCAPE SILHOUETTE */}
          <div className="my-auto relative">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 border-2 border-amber-500 flex flex-col items-center justify-center text-amber-950 shadow-inner">
              <span className="text-xl sm:text-3xl leading-none">🐄</span>
              <span className="text-[7px] font-black tracking-tighter uppercase text-amber-950 mt-0.5">FARM PASTURE</span>
            </div>
          </div>

          {/* BOTTOM RIBBON BANNER */}
          <div className="pb-1 w-full">
            <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-amber-950 py-0.5 px-2 rounded-full border border-white shadow-md text-[8px] sm:text-[10px] font-black uppercase tracking-wider">
              PREMIUM QUALITY • 100% PURE
            </div>
            <span className="text-[7px] text-amber-200 font-bold tracking-widest block mt-0.5">
              ESTD 2026 • TELANGANA
            </span>
          </div>

        </div>
      </div>
    );
  }

  // OPTION 2: CLASSIC ROYAL BLUE BOTTLE LABEL STAMP (Exact match to reference top-right & bottle label!)
  if (option === 2) {
    return (
      <div className={`relative ${dim} rounded-full p-2 bg-gradient-to-tr from-blue-950 via-slate-900 to-blue-800 shadow-2xl border-4 border-blue-400 ring-4 ring-blue-500/20 group hover:scale-105 transition-transform duration-500`}>
        <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-between p-3 border-2 border-blue-300/50 relative overflow-hidden text-center">
          
          <div className="pt-1">
            <span className="text-xs sm:text-base font-black tracking-widest text-blue-400 uppercase block font-serif">
              NSV
            </span>
            <span className="text-[10px] sm:text-xs font-black tracking-wider text-white uppercase block">
              PURE MILK
            </span>
          </div>

          <div className="my-auto">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-900/60 border-2 border-blue-400 flex flex-col items-center justify-center text-white">
              <span className="text-xl sm:text-3xl">🥛</span>
              <span className="text-[7px] font-bold text-blue-200">100% RAW</span>
            </div>
          </div>

          <div className="pb-1 w-full">
            <div className="bg-blue-600 text-white py-0.5 px-2 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-wider shadow-sm">
              PREMIUM QUALITY
            </div>
            <span className="text-[7px] text-blue-300 font-semibold tracking-widest block mt-0.5">
              SINCE 2026
            </span>
          </div>

        </div>
      </div>
    );
  }

  // OPTION 3: DEEP EMERALD FARM BADGE LABEL (Exact match to reference center-bottom green bottle label!)
  if (option === 3) {
    return (
      <div className={`relative ${dim} rounded-full p-2 bg-gradient-to-tr from-emerald-950 via-emerald-900 to-teal-800 shadow-2xl border-4 border-emerald-400 ring-4 ring-emerald-500/20 group hover:scale-105 transition-transform duration-500`}>
        <div className="w-full h-full rounded-full bg-emerald-950 flex flex-col items-center justify-between p-3 border-2 border-emerald-300/60 relative overflow-hidden text-center">
          
          <div className="pt-1">
            <span className="text-xs sm:text-base font-black tracking-widest text-emerald-300 uppercase block">
              NSV
            </span>
            <span className="text-[10px] sm:text-xs font-black tracking-wider text-white uppercase block">
              PURE MILK
            </span>
          </div>

          <div className="my-auto">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-900 border-2 border-emerald-400 flex flex-col items-center justify-center text-white">
              <span className="text-xl sm:text-3xl">🌱</span>
              <span className="text-[7px] font-black text-emerald-300 uppercase">FARM FRESH</span>
            </div>
          </div>

          <div className="pb-1 w-full">
            <div className="bg-emerald-500 text-emerald-950 py-0.5 px-2 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-wider shadow-sm">
              PREMIUM QUALITY
            </div>
            <span className="text-[7px] text-emerald-300 font-bold tracking-widest block mt-0.5">
              ORGANIC DAIRY
            </span>
          </div>

        </div>
      </div>
    );
  }

  // OPTION 4: ROYAL LUXURY CROWN GOLD FOIL EMBLEM
  if (option === 4) {
    return (
      <div className={`relative ${dim} rounded-full p-2 bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 shadow-2xl border-4 border-amber-200 ring-4 ring-amber-400/30 group hover:scale-105 transition-transform duration-500`}>
        <div className="w-full h-full rounded-full bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950 flex flex-col items-center justify-between p-3 border-2 border-amber-400/80 relative overflow-hidden text-center">
          
          <div className="pt-1">
            <span className="text-[10px] sm:text-xs font-black text-amber-400 uppercase tracking-widest block">👑 ROYAL CREST</span>
            <span className="text-xs sm:text-base font-black text-white uppercase tracking-wider block">NSV PURE MILK</span>
          </div>

          <div className="my-auto">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-amber-400 text-amber-950 font-black flex flex-col items-center justify-center shadow-lg border border-white">
              <span className="text-xl sm:text-3xl">👑</span>
              <span className="text-[7px] font-black uppercase">NSV GOLD</span>
            </div>
          </div>

          <div className="pb-1 w-full">
            <div className="bg-amber-400 text-amber-950 py-0.5 px-2 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-wider">
              100% PURE GUARANTEE
            </div>
          </div>

        </div>
      </div>
    );
  }

  // OPTION 5: VINTAGE SUNRISE PASTURE BADGE
  return (
    <div className={`relative ${dim} rounded-full p-2 bg-gradient-to-tr from-stone-900 via-amber-950 to-emerald-950 shadow-2xl border-4 border-amber-500 ring-4 ring-amber-500/20 group hover:scale-105 transition-transform duration-500`}>
      <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-between p-3 border-2 border-amber-400/60 relative overflow-hidden text-center">
        
        <div className="pt-1">
          <span className="text-xs sm:text-base font-black tracking-widest text-amber-400 uppercase block font-serif">
            NSV
          </span>
          <span className="text-[10px] sm:text-xs font-black tracking-wider text-white uppercase block">
            PURE MILK
          </span>
        </div>

        <div className="my-auto">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-t from-emerald-900 to-amber-500 border-2 border-amber-300 flex flex-col items-center justify-center text-white">
            <span className="text-xl sm:text-3xl">🌅</span>
            <span className="text-[7px] font-black text-amber-200 uppercase">SUNRISE MILK</span>
          </div>
        </div>

        <div className="pb-1 w-full">
          <div className="bg-amber-500 text-amber-950 py-0.5 px-2 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-wider shadow-sm">
            HERITAGE QUALITY
          </div>
        </div>

      </div>
    </div>
  );
}
