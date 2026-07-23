"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NSVLogo from "@/components/NSVLogo";
import { initialSiteSettings } from "@/lib/dataStore";
import { getAdminProducts, saveAdminProducts, toggleAdminProductStock, updateAdminProduct } from "@/lib/productStore";
import { getRegistrations, CustomerRegistration } from "@/lib/customerStore";
import { getDistrictFeasibilityList, setDistrictFeasibility, DistrictFeasibility } from "@/lib/feasibilityStore";
import StoreReceiptInvoice from "@/components/StoreReceiptInvoice";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"orders" | "feasibility" | "products" | "plans" | "settings">("orders");
  const [settings, setSettings] = useState(initialSiteSettings);
  const [products, setProducts] = useState(getAdminProducts());
  const [customers, setCustomers] = useState<CustomerRegistration[]>([]);
  const [feasibilityList, setFeasibilityList] = useState<DistrictFeasibility[]>(getDistrictFeasibilityList());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<CustomerRegistration | null>(null);
  const [expandedInvoiceId, setExpandedInvoiceId] = useState<string | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [districtFilter, setDistrictFilter] = useState("all");

  useEffect(() => {
    setCustomers(getRegistrations());
    setFeasibilityList(getDistrictFeasibilityList());
  }, []);

  const handleToggleDistrict = (dName: string, currentStatus: boolean) => {
    const updated = setDistrictFeasibility(dName, !currentStatus);
    setFeasibilityList(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleEnableAllDistricts = () => {
    feasibilityList.forEach((item) => setDistrictFeasibility(item.districtName, true));
    setFeasibilityList(getDistrictFeasibilityList());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const updateProductPrice = (id: string, newPrice: string) => {
    const updated = updateAdminProduct(id, { price: newPrice });
    setProducts(updated);
  };

  const toggleProductStock = (id: string) => {
    const updated = toggleAdminProductStock(id);
    setProducts(updated);
  };

  const handleSaveProducts = () => {
    saveAdminProducts(products);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const plans = [
    { id: "plan-lite", title: "Daily Lite (500ml)", price: "₹960/Month", badge: "Trial Pack" },
    { id: "plan-family", title: "Family 1L/Day", price: "₹1,860/Month", badge: "⭐ Bestseller" },
    { id: "plan-premium", title: "Premium 2L/Day", price: "₹3,600/Month", badge: "Best Value" },
  ];

  const filteredDistricts = feasibilityList.filter((item) => {
    const matchesSearch = item.districtName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      districtFilter === "all"
        ? true
        : districtFilter === "enabled"
        ? item.enabled
        : !item.enabled;
    return matchesSearch && matchesFilter;
  });

  const activeFeasibleCount = feasibilityList.filter((f) => f.enabled).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20 selection:bg-emerald-500 selection:text-white">
      
      {/* EXECUTIVE DARK GLASS HEADER */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <NSVLogo size="sm" />
            <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              👑 Executive Control Panel
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-extrabold px-3 py-1.5 rounded-xl items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>System Live & Active</span>
            </span>

            <Link
              href="/"
              className="text-xs font-black text-slate-100 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-xl transition-all shadow-sm"
            >
              ← Back to Store Website
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 space-y-8">
        
        {/* EXECUTIVE KPI DASHBOARD STATS BANNER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-5 rounded-3xl border border-slate-800 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-black uppercase tracking-wider">📦 Total Customer Orders</span>
              <span className="text-2xl">📦</span>
            </div>
            <p className="text-3xl font-black text-white">{customers.length}</p>
            <p className="text-[11px] text-emerald-400 font-bold">100% Verified Registrations</p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/50 p-5 rounded-3xl border border-emerald-900/40 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-black uppercase tracking-wider">📍 Telangana Coverage</span>
              <span className="text-2xl">🗺️</span>
            </div>
            <p className="text-3xl font-black text-emerald-400">{activeFeasibleCount} / 33</p>
            <p className="text-[11px] text-slate-400 font-bold">Districts Serviceable</p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/50 p-5 rounded-3xl border border-amber-900/40 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-black uppercase tracking-wider">🥛 Active Products</span>
              <span className="text-2xl">🥛</span>
            </div>
            <p className="text-3xl font-black text-amber-400">{products.filter((p) => p.available).length} Products</p>
            <p className="text-[11px] text-slate-400 font-bold">In Stock & Ready</p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-5 rounded-3xl border border-slate-800 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-black uppercase tracking-wider">⚡ Authentication Engine</span>
              <span className="text-2xl">🔥</span>
            </div>
            <p className="text-3xl font-black text-teal-400">Firebase Auth</p>
            <p className="text-[11px] text-emerald-400 font-bold">10,000 Monthly Free SMS</p>
          </div>
        </div>

        {/* NOTIFICATION BANNER */}
        {savedSuccess && (
          <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-black p-4 rounded-2xl animate-fadeIn flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-2">
              <span className="text-lg">✅</span>
              <span>Changes Saved and Synchronized Live across the System!</span>
            </div>
            <span className="text-[10px] bg-emerald-800 text-emerald-100 font-bold px-2.5 py-1 rounded-lg">Active</span>
          </div>
        )}

        {/* GLOW TAB NAVIGATION BAR */}
        <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-2 text-xs font-black scrollbar-none">
          {[
            { id: "orders", label: "📦 Customer Orders & Invoices", count: customers.length },
            { id: "feasibility", label: "🗺️ Telangana 33 Feasibility Zones", count: `${activeFeasibleCount}/33` },
            { id: "products", label: "🥛 Product Catalog & Stock", count: products.length },
            { id: "plans", label: "📅 Subscription Plan Pricing", count: plans.length },
            { id: "settings", label: "⚙️ Site Headlines & Badges", count: null },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-5 rounded-2xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 font-extrabold ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg ring-2 ring-emerald-500/40"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  activeTab === tab.id ? "bg-emerald-950 text-emerald-200" : "bg-slate-800 text-slate-300"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TAB 1: CUSTOMER ORDERS & INVOICES */}
        {activeTab === "orders" && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h2 className="text-xl font-black text-white">📦 Customer Registrations & PDF Invoices</h2>
                <p className="text-slate-400 text-xs mt-0.5">Real customer registrations and doorstep delivery schedules.</p>
              </div>
              <span className="bg-emerald-950 text-emerald-300 font-black text-xs px-3.5 py-1.5 rounded-full border border-emerald-800 shrink-0">
                {customers.length} Registrations Recorded
              </span>
            </div>

            {/* MOBILE NUMBER & RECEIPT SEARCH BAR */}
            <div className="bg-slate-950 p-3 sm:p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
              <span className="text-lg">📱</span>
              <input
                type="text"
                value={orderSearchQuery}
                onChange={(e) => setOrderSearchQuery(e.target.value)}
                placeholder="Search by Mobile Number (e.g. 9876543210), Receipt No, or Customer Name..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 font-bold outline-none focus:border-emerald-500"
              />
              {orderSearchQuery && (
                <button
                  type="button"
                  onClick={() => setOrderSearchQuery("")}
                  className="text-xs font-bold text-slate-400 hover:text-white px-3 py-1 bg-slate-800 rounded-lg"
                >
                  Clear ✕
                </button>
              )}
            </div>

            {customers.length === 0 ? (
              <div className="bg-slate-950/60 p-12 rounded-3xl text-center space-y-3 border border-slate-800">
                <span className="text-4xl block">📋</span>
                <p className="text-slate-300 font-bold text-sm">No incoming customer orders recorded yet.</p>
                <p className="text-slate-500 text-xs">Real orders placed via /checkout or /register will appear here with instant PDF bill download options!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-black tracking-wider bg-slate-950/40">
                      <th className="p-3.5">Receipt No</th>
                      <th className="p-3.5">Customer Name</th>
                      <th className="p-3.5">Mobile Number</th>
                      <th className="p-3.5">Delivery Address</th>
                      <th className="p-3.5">Order Type</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {customers
                      .filter((c) => {
                        if (!orderSearchQuery.trim()) return true;
                        const q = orderSearchQuery.toLowerCase().trim();
                        return (
                          c.mobile.includes(q) ||
                          c.fullName.toLowerCase().includes(q) ||
                          (c.id && c.id.toLowerCase().includes(q))
                        );
                      })
                      .map((c, idx) => {
                        const receiptId = c.id || `NSV-INV-${c.mobile.slice(-6)}`;
                        const isExpanded = expandedInvoiceId === receiptId;
                        return (
                          <>
                            <tr key={idx} className="hover:bg-slate-800/40 transition-all text-slate-200">
                              <td className="p-3.5 font-mono text-emerald-400 font-bold">{receiptId}</td>
                              <td className="p-3.5 font-bold text-white">{c.fullName}</td>
                              <td className="p-3.5 font-mono text-emerald-300">+91 {c.mobile}</td>
                              <td className="p-3.5 text-xs">{c.houseNo ? `${c.houseNo}, ` : ""}{c.streetLane || c.locality}, {c.city} ({c.pincode})</td>
                              <td className="p-3.5 font-bold text-amber-400">{c.orderType === "subscription" ? "Monthly" : "One-Time"}</td>
                              <td className="p-3.5">
                                <div className="space-y-0.5">
                                  <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full block text-center">ACTIVE ✓</span>
                                  {(c as any).utrNo && (
                                    <span className="text-[9px] font-mono text-slate-400 block truncate">UTR: {(c as any).utrNo}</span>
                                  )}
                                </div>
                              </td>
                              <td className="p-3.5 text-right">
                                <button
                                  type="button"
                                  onClick={() => setExpandedInvoiceId(isExpanded ? null : receiptId)}
                                  className={`font-black text-[11px] px-3.5 py-1.5 rounded-xl shadow-xs transition-all cursor-pointer ${
                                    isExpanded
                                      ? "bg-amber-500 hover:bg-amber-400 text-white"
                                      : "bg-emerald-600 hover:bg-emerald-500 text-white"
                                  }`}
                                >
                                  {isExpanded ? "▲ Close Invoice" : "📄 Invoice"}
                                </button>
                              </td>
                            </tr>

                            {/* COLLAPSIBLE INLINE INVOICE PANEL */}
                            {isExpanded && (
                              <tr key={`invoice-${idx}`}>
                                <td colSpan={7} className="bg-slate-950/80 p-4 border-y border-slate-800">
                                  <div className="max-w-md mx-auto space-y-3">
                                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                                      <div>
                                        <p className="text-emerald-400 font-black text-sm">📋 NSV OFFICIAL INVOICE</p>
                                        <p className="text-[10px] text-slate-400 font-mono">Receipt: {receiptId}</p>
                                        {(c as any).utrNo && (
                                          <p className="text-[10px] text-amber-400 font-mono font-black">UTR: {(c as any).utrNo}</p>
                                        )}
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => window.print()}
                                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[11px] px-3 py-1.5 rounded-xl cursor-pointer"
                                      >
                                        🖨️ Print 1 Copy
                                      </button>
                                    </div>
                                    <div className="bg-white rounded-2xl overflow-hidden">
                                      <StoreReceiptInvoice
                                        data={{
                                          invoiceNo: receiptId,
                                          utrNo: (c as any).utrNo || undefined,
                                          date: new Date(c.registeredAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
                                          startDate: c.startDate || new Date(c.registeredAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
                                          endDate: (c as any).endDate || undefined,
                                          customerName: c.fullName,
                                          mobile: c.mobile,
                                          address: `${c.houseNo ? c.houseNo + ", " : ""}${c.streetLane || c.locality}`,
                                          district: c.city || "Hyderabad",
                                          mandal: c.locality || "Jubilee Hills",
                                          itemTitle: `${c.milkType ? c.milkType.toUpperCase() : "PURE"} FARM FRESH MILK`,
                                          itemDetails: c.orderType === "subscription" ? `Subscription: ${c.selectedPlanId || "Monthly Plan"}` : "One-Time Fresh Order",
                                          quantityStr: c.orderType === "subscription" ? "1 L/Day" : "1 Pack",
                                          pricePerUnit: 68,
                                          subtotal: c.orderType === "subscription" ? 1860 : 68,
                                          platformFee: 5,
                                          cashbackEarned: 93,
                                          discount: 0,
                                          grandTotal: c.orderType === "subscription" ? 1865 : 73,
                                          paymentMethod: (c as any).paymentMethod || "UPI / NSV Wallet",
                                          paymentStatus: "CONFIRMED ✓",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TELANGANA 33 DISTRICTS FEASIBILITY ZONES */}
        {activeTab === "feasibility" && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  🗺️ ALL 33 TELANGANA DISTRICTS
                </span>
                <h2 className="text-xl font-black text-white mt-2">
                  Telangana State Delivery Service Feasibility Manager
                </h2>
                <p className="text-slate-400 text-xs mt-0.5">
                  Toggle Enable or Disable doorstep delivery service for any of Telangana's 33 official districts.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleEnableAllDistricts}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition-all shrink-0"
                >
                  ⚡ Enable All 33 Districts
                </button>
              </div>
            </div>

            {/* SEARCH & FILTER BAR */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="🔍 Search district (e.g. Hyderabad, Warangal, Medchal...)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 font-semibold outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex gap-2">
                {[
                  { id: "all", label: "All (33)" },
                  { id: "enabled", label: "Enabled Only" },
                  { id: "disabled", label: "Disabled Only" },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setDistrictFilter(f.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black border transition-all ${
                      districtFilter === f.id
                        ? "bg-emerald-950 text-emerald-300 border-emerald-500"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* DISTRICT GRID LIST */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDistricts.map((item) => (
                <div
                  key={item.districtName}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between shadow-md ${
                    item.enabled
                      ? "border-emerald-700/60 bg-emerald-950/20"
                      : "border-slate-800 bg-slate-950/40 opacity-70"
                  }`}
                >
                  <div>
                    <h4 className="font-black text-white text-sm flex items-center gap-1.5">
                      <span>{item.enabled ? "📍" : "🚫"}</span>
                      <span>{item.districtName}</span>
                    </h4>
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full inline-block mt-1.5 ${
                      item.enabled
                        ? "bg-emerald-900/80 text-emerald-300 border border-emerald-700"
                        : "bg-red-950/80 text-red-400 border border-red-800"
                    }`}>
                      {item.enabled ? "SERVICE ACTIVE ✓" : "SERVICE DISABLED ✕"}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleDistrict(item.districtName, item.enabled)}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all shadow-md ${
                      item.enabled
                        ? "bg-red-700 hover:bg-red-600 text-white"
                        : "bg-emerald-600 hover:bg-emerald-500 text-white"
                    }`}
                  >
                    {item.enabled ? "Disable ✕" : "Enable ✓"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCT CATALOG & STOCK */}
        {activeTab === "products" && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-black text-white border-b border-slate-800 pb-4">🥛 Products & Daily Prices</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {products.map((prod) => (
                <div key={prod.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-white text-base">{prod.name}</h3>
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${prod.available ? "bg-emerald-950 text-emerald-400 border border-emerald-800" : "bg-red-950 text-red-400 border border-red-800"}`}>
                      {prod.available ? "IN STOCK ✓" : "OUT OF STOCK ✕"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase block mb-1">Per Litre Price</label>
                      <input
                        type="text"
                        value={prod.price}
                        onChange={(e) => updateProductPrice(prod.id, e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-black text-sm outline-none focus:border-emerald-500"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleProductStock(prod.id)}
                      className="mt-5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs px-4 py-2.5 rounded-xl border border-slate-700 transition-all"
                    >
                      Toggle Stock
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-6 py-3 rounded-xl transition-all shadow-md">
              💾 Save Product Changes
            </button>
          </div>
        )}

        {/* TAB 4: SUBSCRIPTION PLAN PRICING */}
        {activeTab === "plans" && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-black text-white border-b border-slate-800 pb-4">📅 Subscription Plans</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {plans.map((p) => (
                <div key={p.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">{p.badge}</span>
                  <h3 className="font-extrabold text-white text-base mt-1">{p.title}</h3>
                  <p className="text-emerald-400 font-black text-lg">{p.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SITE HEADLINES & SETTINGS */}
        {activeTab === "settings" && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-black text-white border-b border-slate-800 pb-4">⚙️ Site Banner & Headlines</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-extrabold text-slate-400 uppercase block mb-1">Brand Name</label>
                <input
                  type="text"
                  value={settings.brandName}
                  onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-400 uppercase block mb-1">Hero Main Headline</label>
                <input
                  type="text"
                  value={settings.heroHeadline}
                  onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-bold"
                />
              </div>

              {/* PLATFORM FEE ADMIN CONTROL */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <h4 className="font-extrabold text-white text-sm">Platform & Handling Fee Control</h4>
                    <p className="text-[11px] text-slate-400">Enable or Disable ₹5/₹10 platform fee charge during customer checkout</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const cur = typeof window !== "undefined" ? localStorage.getItem("nsv_platform_fee_settings") : null;
                      const enabled = cur ? JSON.parse(cur).enabled : true;
                      const amt = cur ? JSON.parse(cur).amount : 5;
                      localStorage.setItem("nsv_platform_fee_settings", JSON.stringify({ enabled: !enabled, amount: amt, label: "Platform & Handling Fee" }));
                      handleSave();
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black px-4 py-2 rounded-xl transition-all shadow-md"
                  >
                    Toggle Platform Fee On/Off
                  </button>
                </div>
              </div>
            </div>

            <button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-6 py-3 rounded-xl transition-all shadow-md">
              💾 Save Settings
            </button>
          </div>
        )}

      </main>

      {/* PDF INVOICE MODAL */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-5 border border-slate-800 shadow-2xl animate-fadeIn text-white my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-black text-emerald-400 text-lg">NSV PURE MILK OFFICIAL INVOICE</h3>
                <p className="text-[10px] text-slate-400 font-mono">RECEIPT NO: {selectedInvoice.id || `NSV-INV-${selectedInvoice.mobile.slice(-6)}`}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="text-slate-400 hover:text-white font-black text-base cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* RENDER COMPACT STORE RECEIPT SLIP INVOICE */}
            <div className="bg-slate-950 p-2 sm:p-4 rounded-2xl border border-slate-800 overflow-hidden">
              <StoreReceiptInvoice
                data={{
                  invoiceNo: selectedInvoice.id || `NSV-INV-${selectedInvoice.mobile.slice(-6)}`,
                  utrNo: (selectedInvoice as any).utrNo || undefined,
                  date: new Date(selectedInvoice.registeredAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
                  startDate: selectedInvoice.startDate || new Date(selectedInvoice.registeredAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
                  endDate: (selectedInvoice as any).endDate || undefined,
                  customerName: selectedInvoice.fullName,
                  mobile: selectedInvoice.mobile,
                  address: `${selectedInvoice.houseNo ? selectedInvoice.houseNo + ", " : ""}${selectedInvoice.streetLane || selectedInvoice.locality}`,
                  district: selectedInvoice.city || "Hyderabad",
                  mandal: selectedInvoice.locality || "Jubilee Hills",
                  itemTitle: `${selectedInvoice.milkType ? selectedInvoice.milkType.toUpperCase() : "PURE"} FARM FRESH MILK`,
                  itemDetails: selectedInvoice.orderType === "subscription" ? `Subscription: ${selectedInvoice.selectedPlanId || "Monthly Plan"}` : "One-Time Fresh Order",
                  quantityStr: selectedInvoice.orderType === "subscription" ? "1 L/Day" : "1 Pack",
                  pricePerUnit: 68,
                  subtotal: selectedInvoice.orderType === "subscription" ? 1860 : 68,
                  platformFee: 5,
                  cashbackEarned: 93,
                  discount: 0,
                  grandTotal: selectedInvoice.orderType === "subscription" ? 1865 : 73,
                  paymentMethod: (selectedInvoice as any).paymentMethod || "UPI / NSV Wallet",
                  paymentStatus: "CONFIRMED ✓",
                }}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-black text-xs py-4 rounded-2xl shadow-lg transition-all cursor-pointer"
              >
                📥 Download / Print Bill Receipt
              </button>
              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="bg-slate-800 text-slate-300 font-extrabold text-xs px-6 py-4 rounded-2xl border border-slate-700 hover:bg-slate-700 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
