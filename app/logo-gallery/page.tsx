"use client";

import { useState } from "react";
import Link from "next/link";
import NSVTenLogo from "@/components/NSVTenLogos";
import ScrollToTopOnRefresh from "@/components/ScrollToTopOnRefresh";

interface LogoItem {
  id: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
}

const logoList: LogoItem[] = [
  {
    id: 1,
    title: "Option 1: Vintage Dairy Seal (Navy & Arch)",
    subtitle: "Clean Engraved Bottle Label Style (Reference Match)",
    description: "Classic navy and off-white circular stamp with arched 'NSV PURE MILK' serif text and fine line engraving.",
    tag: "🥛 Reference Bottle Match",
  },
  {
    id: 2,
    title: "Option 2: Modern Minimalist Monogram Emblem",
    subtitle: "Clean Geometric Gold & Slate Monogram",
    description: "Ultra-crisp geometric NSV monogram surrounded by an amber gold metallic ring and sharp luxury typography.",
    tag: "✨ Modern Minimalist",
  },
  {
    id: 3,
    title: "Option 3: Emerald Farm Pasture Stamp",
    subtitle: "Deep Forest Green Farm Barn Seal",
    description: "Deep emerald green badge with clean line-art barn silhouette, curved arch text, and 100% farm fresh tag.",
    tag: "🌱 Deep Emerald Organic",
  },
  {
    id: 4,
    title: "Option 4: Royal Brass 3D Embossed Shield",
    subtitle: "3D Metallic Brass Heraldic Crest",
    description: "3D polished brass shield crest with gold lettering, royal crown accent, and deep indigo navy fill.",
    tag: "👑 Royal 3D Heraldic",
  },
  {
    id: 5,
    title: "Option 5: Organic Heritage Crest (Warm Gold)",
    subtitle: "Cream & Warm Gold Filigree Badge",
    description: "Cream background circular stamp with gold filigree inner ring, elegant serif text, and vintage heritage banner.",
    tag: "📜 Vintage Heritage",
  },
  {
    id: 6,
    title: "Option 6: Glass Bottle Packaging Stamp",
    subtitle: "Slate & White Clean Commercial Print",
    description: "Minimalist slate blue circular stamp designed specifically for clean glass milk bottle prints.",
    tag: "🍶 Glass Packaging",
  },
  {
    id: 7,
    title: "Option 7: Golden Crown Executive Badge",
    subtitle: "High-End Executive Corporate Seal",
    description: "Dark zinc black background with polished yellow gold crown and executive dairy selection seal.",
    tag: "⭐ Executive Crest",
  },
  {
    id: 8,
    title: "Option 8: Terracotta Rustic Organic Seal",
    subtitle: "Warm Clay Pot & Dahi Tone Emblem",
    description: "Warm terracotta clay tone circular badge designed for clay pot curd & authentic raw farm milk.",
    tag: "🥣 Terracotta Matka",
  },
  {
    id: 9,
    title: "Option 9: Pure Milk Droplet & Curved Ribbon",
    subtitle: "Fluid Teal & Gold Droplet Badge",
    description: "Modern fluid teal milk drop motif wrapped in a curved turquoise ribbon badge.",
    tag: "💧 Fluid Droplet",
  },
  {
    id: 10,
    title: "Option 10: Luxury Botanical Wreath Badge",
    subtitle: "Golden Laurel Wreath & Serif Typography",
    description: "Delicate green laurel wreath encircling bold white serif 'NSV PURE MILK' typography.",
    tag: "🌿 Botanical Wreath",
  },
];

export default function LogoGalleryPage() {
  const [selectedOption, setSelectedOption] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10>(1);
  const [appliedMessage, setAppliedMessage] = useState<string>("");

  const handleSelect = (id: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10) => {
    setSelectedOption(id);
    setAppliedMessage(`✅ Option ${id} Selected! Live website brand logo updated.`);
    setTimeout(() => setAppliedMessage(""), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased py-10 px-4 sm:px-8">
      {/* ALWAYS RESET SCROLL TO TOP ON REFRESH */}
      <ScrollToTopOnRefresh />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-amber-500/30 shadow-2xl">
          <div>
            <span className="bg-amber-400 text-amber-950 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
              🎨 10 Non-Cartoonish Professional Commercial Logo Options
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Select Your Official NSV Pure Milk Logo
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm font-medium">
              కార్టూన్ల లాగా లేకుండా... అత్యంత ప్రొఫెషనల్ బాటిల్ ప్యాకేజింగ్ స్టాండర్డ్స్‌లో డిజైన్ చేసిన 10 ఆప్షన్స్!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-lg transition-all"
            >
              ← Back to Live Site
            </Link>
          </div>
        </div>

        {appliedMessage && (
          <div className="bg-emerald-950 border border-emerald-500 text-emerald-300 font-black text-sm p-4 rounded-2xl text-center animate-fadeIn shadow-lg">
            {appliedMessage}
          </div>
        )}

        {/* 10 LOGO OPTIONS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {logoList.map((logo) => (
            <div
              key={logo.id}
              onClick={() => handleSelect(logo.id)}
              className={`bg-slate-900 rounded-3xl p-6 border transition-all cursor-pointer flex flex-col justify-between group ${
                selectedOption === logo.id
                  ? "border-amber-400 ring-4 ring-amber-400/20 shadow-2xl shadow-amber-500/20 scale-[1.02]"
                  : "border-slate-800 hover:border-amber-500/60 hover:scale-[1.01]"
              }`}
            >
              <div>
                {/* TOP TAG & SELECTION STATUS */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-black px-2.5 py-1 rounded-full">
                    {logo.tag}
                  </span>
                  {selectedOption === logo.id && (
                    <span className="bg-emerald-500 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-full uppercase">
                      ✓ Selected Logo
                    </span>
                  )}
                </div>

                {/* 100% PROFESSIONAL NON-CARTOONISH EMBLEM */}
                <div className="relative aspect-square w-full rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center p-4 shadow-inner">
                  <NSVTenLogo option={logo.id} size="lg" />
                </div>

                {/* TITLE & DESCRIPTION */}
                <div className="mt-5 space-y-2">
                  <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                    {logo.title}
                  </h3>
                  <p className="text-xs font-bold text-amber-400">
                    {logo.subtitle}
                  </p>
                  <p className="text-slate-400 text-xs leading-relaxed font-medium pt-1">
                    {logo.description}
                  </p>
                </div>
              </div>

              {/* ACTION SELECT BUTTON */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  className={`w-full py-3 rounded-xl font-extrabold text-xs transition-all ${
                    selectedOption === logo.id
                      ? "bg-amber-400 text-amber-950 shadow-md"
                      : "bg-slate-800 group-hover:bg-amber-500 group-hover:text-amber-950 text-slate-200"
                  }`}
                >
                  {selectedOption === logo.id ? "✓ Currently Selected Logo" : `Click to Select Option ${logo.id}`}
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* FOOTER ACTION BANNER */}
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 text-center space-y-4">
          <h3 className="text-xl font-extrabold text-white">
            Which of the 10 Logo Options Do You Prefer?
          </h3>
          <p className="text-slate-400 text-xs max-w-xl mx-auto">
            ఈ 10 ప్రొఫెషనల్ ఆప్షన్లలో మీకు నచ్చిన ఆప్షన్ (Option 1, 2, 3, 4, 5, 6, 7, 8, 9, 10) నంబర్‌ను చెప్తే, దానిని వెబ్‌సైట్ మొత్తం అప్‌డేట్ చేసి ముందుకు వెళ్దాం!
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-black text-xs px-8 py-3.5 rounded-2xl shadow-xl transition-all"
          >
            Go to Live Site →
          </Link>
        </div>

      </div>
    </div>
  );
}
