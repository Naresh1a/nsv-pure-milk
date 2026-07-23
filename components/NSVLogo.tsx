"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  lightMode?: boolean;
}

export default function NSVLogo({ size = "md", lightMode = false }: LogoProps) {
  const sizeClasses = {
    sm: { icon: "w-9 h-9", text: "text-lg", sub: "text-[9px]" },
    md: { icon: "w-12 h-12", text: "text-2xl", sub: "text-[10px]" },
    lg: { icon: "w-16 h-16", text: "text-3xl", sub: "text-xs" },
    xl: { icon: "w-24 h-24", text: "text-5xl", sub: "text-sm" },
  }[size];

  return (
    <div className="flex items-center gap-3.5 group">
      
      {/* REAL HIGH-RESOLUTION GENERATED LOGO EMBLEM */}
      <div className={`relative ${sizeClasses.icon} rounded-2xl overflow-hidden shadow-xl shadow-emerald-950/20 border-2 border-amber-400/80 group-hover:scale-105 transition-transform duration-500 ring-2 ring-emerald-500/20`}>
        <Image
          src="/images/nsv_logo.png"
          alt="NSV Pure Milk Dairy Farm Logo"
          fill
          sizes="100px"
          className="object-cover object-center w-full h-full"
          priority
        />
      </div>

      {/* TYPOGRAPHY BRAND NAME */}
      <div>
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black tracking-tight ${sizeClasses.text} ${lightMode ? "text-white" : "text-slate-950"}`}>
            NSV
          </span>
          <span className={`font-black tracking-widest ${sizeClasses.text} bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 bg-clip-text text-transparent`}>
            PURE MILK
          </span>
        </div>
        
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <p className={`font-black tracking-widest uppercase ${sizeClasses.sub} ${lightMode ? "text-emerald-300" : "text-emerald-800"}`}>
            DAIRY FARM • ESTD 2026
          </p>
        </div>
      </div>

    </div>
  );
}
