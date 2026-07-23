"use client";

import React from "react";

interface GraphicProps {
  type: "hero" | "cow" | "buffalo" | "a2" | "curd";
}

export default function NSVBrandGraphic({ type }: GraphicProps) {
  if (type === "hero") {
    return (
      <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 p-6 flex flex-col justify-between shadow-2xl border-4 border-white/90 ring-4 ring-emerald-500/20 group">
        
        {/* BACKGROUND GLOWS */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl" />

        {/* TOP BRAND HEADER SEAL */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-xs">
            <span className="text-lg">🥛</span>
            <span className="text-xs font-black text-white uppercase tracking-widest">NSV PURE MILK • ESTD 2026</span>
          </div>

          <div className="bg-amber-400/90 text-amber-950 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
            100% Organic Farm
          </div>
        </div>

        {/* CENTER 3D VISUAL EMBLEM */}
        <div className="relative z-10 my-auto text-center space-y-3 py-4">
          <div className="relative inline-block">
            <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-400 p-1 shadow-2xl group-hover:scale-105 transition-transform duration-500">
              <div className="w-full h-full rounded-[22px] bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-3 text-white border border-white/20">
                <span className="text-4xl sm:text-5xl animate-bounce">🥛</span>
                <span className="text-xs sm:text-sm font-black text-amber-400 uppercase tracking-tight mt-1">NSV PURE</span>
                <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-widest">FARM FRESH</span>
              </div>
            </div>

            {/* GOLD SEAL BADGE */}
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 font-black text-[9px] px-2.5 py-1 rounded-full border border-white shadow-lg uppercase tracking-wider">
              ★ Genuine Seal
            </div>
          </div>

          <div>
            <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              NSV Farm Fresh Dairy
            </h4>
            <p className="text-emerald-200/80 text-xs font-medium mt-0.5">
              Chilled at 4°C • Untouched & Raw • Delivered Daily 6:30 AM
            </p>
          </div>
        </div>

        {/* BOTTOM METRICS STRIP */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 flex items-center justify-around text-center text-white text-xs font-extrabold">
          <div>
            <p className="text-amber-400 font-black">4°C</p>
            <p className="text-[9px] text-slate-300 uppercase font-semibold">Cold Storage</p>
          </div>
          <div className="h-6 w-px bg-white/20" />
          <div>
            <p className="text-amber-400 font-black">0% Water</p>
            <p className="text-[9px] text-slate-300 uppercase font-semibold">100% Raw Milk</p>
          </div>
          <div className="h-6 w-px bg-white/20" />
          <div>
            <p className="text-amber-400 font-black">Before 7 AM</p>
            <p className="text-[9px] text-slate-300 uppercase font-semibold">Guaranteed</p>
          </div>
        </div>

      </div>
    );
  }

  // PRODUCT SPECIFIC ILLUSTRATION CARDS
  const configs = {
    cow: {
      title: "NSV Pure Cow Milk",
      subtitle: "100% Natural & Nutrient Rich",
      bg: "from-emerald-900 via-emerald-800 to-teal-900",
      accent: "text-amber-300",
      icon: "🥛",
      badge: "NSV Certified Cow Milk",
      tag: "Rich in Calcium & Vit D",
    },
    buffalo: {
      title: "NSV Rich Buffalo Milk",
      subtitle: "Extra Creamy & Thick Malai",
      bg: "from-slate-900 via-emerald-950 to-teal-950",
      accent: "text-emerald-300",
      icon: "🐃",
      badge: "NSV High Fat Buffalo",
      tag: "Ideal for Curd & Sweets",
    },
    a2: {
      title: "NSV Native A2 Desi Milk",
      subtitle: "Indigenous Gir/Sahiwal Breed",
      bg: "from-amber-950 via-emerald-950 to-slate-900",
      accent: "text-amber-400",
      icon: "🌿",
      badge: "NSV Organic A2 Pure",
      tag: "Easy Digestion Protein",
    },
    curd: {
      title: "NSV Farm Fresh Curd",
      subtitle: "Set in Earthen Clay Pots",
      bg: "from-teal-950 via-emerald-900 to-slate-950",
      accent: "text-teal-300",
      icon: "🥣",
      badge: "NSV Terracotta Matka",
      tag: "100% Probiotic Cultured",
    },
  };

  const item = configs[type];

  return (
    <div className={`relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-br ${item.bg} p-4 flex flex-col justify-between border border-white/20 shadow-md group-hover:scale-105 transition-transform duration-500`}>
      
      {/* TOP BRAND SEAL */}
      <div className="flex items-center justify-between z-10">
        <span className="bg-white/15 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-lg border border-white/20 shadow-xs uppercase tracking-wider flex items-center gap-1">
          <span>🥛</span>
          <span>{item.badge}</span>
        </span>
        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-400 text-amber-950 uppercase tracking-widest shadow-xs">
          NSV Pure
        </span>
      </div>

      {/* CENTER ICON EMBLEM */}
      <div className="my-auto text-center z-10 py-2">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-4xl shadow-inner group-hover:rotate-3 transition-transform">
          {item.icon}
        </div>
        <p className={`text-xs font-black mt-3 ${item.accent} uppercase tracking-wider`}>
          {item.tag}
        </p>
      </div>

      {/* BOTTOM BRAND WATERMARK */}
      <div className="bg-black/40 backdrop-blur-md -mx-4 -mb-4 p-2.5 border-t border-white/10 z-10 text-center">
        <p className="text-[10px] font-black text-white tracking-widest uppercase flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>NSV DAIRY FARM • GUARANTEED PURE</span>
        </p>
      </div>

    </div>
  );
}
