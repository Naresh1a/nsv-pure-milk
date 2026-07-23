
"use client";

export default function DairyBackgroundAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* GLOWING AMBIENT GRADIENT SPHERES */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>

      {/* FLOATING ORGANIC MILK BUBBLES */}
      <div className="absolute top-20 left-[10%] w-3 h-3 bg-white/20 rounded-full blur-[1px] animate-bounce duration-3000"></div>
      <div className="absolute top-40 right-[15%] w-4 h-4 bg-emerald-400/20 rounded-full blur-[1px] animate-bounce duration-4000 delay-500"></div>
      <div className="absolute top-2/3 left-[20%] w-2 h-2 bg-white/30 rounded-full blur-[1px] animate-bounce duration-2500 delay-1500"></div>
      <div className="absolute bottom-20 right-[25%] w-5 h-5 bg-teal-300/15 rounded-full blur-[1px] animate-bounce duration-5000 delay-2000"></div>
      <div className="absolute top-1/2 left-[80%] w-3 h-3 bg-amber-300/20 rounded-full blur-[1px] animate-bounce duration-3500 delay-1000"></div>
    </div>
  );
}
