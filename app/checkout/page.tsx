"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import NSVLogo from "@/components/NSVLogo";
import ScrollToTopOnRefresh from "@/components/ScrollToTopOnRefresh";
import DairyBackgroundAnimation from "@/components/DairyBackgroundAnimation";
import StoreReceiptInvoice from "@/components/StoreReceiptInvoice";
import { InvoiceData } from "@/components/A4PrintInvoice";
import { TELANGANA_DATA, getLocalizedDistrictName, getLocalizedMandalName, getLocalizedVillageName } from "@/lib/telanganaData";
import { initialProducts } from "@/lib/dataStore";
import { getAdminProducts } from "@/lib/productStore";
import { saveRegistration, getRegistrations } from "@/lib/customerStore";
import { useLanguage } from "@/lib/LanguageContext";
import { useWallet } from "@/lib/WalletContext";
import { useCart } from "@/lib/CartContext";
import { isDistrictFeasible } from "@/lib/feasibilityStore";
import { getPlatformFeeSettings } from "@/lib/platformFeeStore";

// VALID COUPON CODES
const VALID_COUPONS: Record<string, { discountRs?: number; discountPercent?: number; desc: string }> = {
  MILKNEW50: { discountRs: 50, desc: "₹50 Flat Discount Applied!" },
  NSVFARM100: { discountRs: 100, desc: "₹100 Farm Fresh Special Applied!" },
  WELCOME15: { discountPercent: 15, desc: "15% Welcome Offer Applied!" },
};

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const { balance, deductWallet } = useWallet();
  const { totalItemsCount, setIsCartOpen } = useCart();

  // URL Params & Selection Draft Sync
  const paramType = searchParams.get("type") || "onetime";
  const paramProductId = searchParams.get("product") || "cow-milk";

  const [orderType, setOrderType] = useState<"onetime" | "subscription">(paramType as any);
  const [selectedProduct, setSelectedProduct] = useState(
    () => {
      const adminProducts = getAdminProducts();
      return adminProducts.find((p) => p.id === paramProductId) || adminProducts[0] || initialProducts[0];
    }
  );
  const [subDraft, setSubDraft] = useState<any>(null);

  // Address Mode State (GPS vs Manual Toggle)
  const [addressMode, setAddressMode] = useState<"manual" | "gps">("manual");
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsMessage, setGpsMessage] = useState("");
  const [gpsConfirmed, setGpsConfirmed] = useState(false);
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Logged-in Customer Identity (Auto-filled)
  const [customerInfo, setCustomerInfo] = useState<{ fullName: string; mobile: string } | null>(null);

  // Address Form State (Empty by Default - Manual Selection Required)
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    district: "",
    mandal: "",
    village: "",
    houseNo: "",
    streetLane: "",
    pincode: "",
  });

  // Selected District & Mandal Objects from Telangana 33 Data
  const selectedDistrictObj = TELANGANA_DATA.find((d) => d.name === form.district);
  const selectedMandalObj = selectedDistrictObj?.mandals.find((m) => m.name === form.mandal);

  // Feasibility Check
  const isFeasible = form.district ? isDistrictFeasible(form.district) : true;

  // Platform Fee Settings
  const [platformFee, setPlatformFee] = useState(getPlatformFeeSettings());

  // Extra items for Single Purchase
  const [addonQuantities, setAddonQuantities] = useState<Record<string, number>>({});

  // Coupon State
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountRs: number; desc: string } | null>(null);
  const [couponMsg, setCouponMsg] = useState("");

  // Payment & Screen State
  const [paymentMethod, setPaymentMethod] = useState<"phonepe" | "googlepay" | "paytm" | "wallet_upi" | "cod">("phonepe");
  const [checkoutStep, setCheckoutStep] = useState<"form" | "payment" | "success" | "failure">("form");
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrderData, setConfirmedOrderData] = useState<InvoiceData | null>(null);

  // Auto-fill logged-in customer info & draft on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPlatformFee(getPlatformFeeSettings());
      
      // Auto-detect logged-in customer record
      const regs = getRegistrations();
      if (regs && regs.length > 0) {
        const last = regs[regs.length - 1];
        setCustomerInfo({ fullName: last.fullName, mobile: last.mobile });
        setForm((prev) => ({ ...prev, fullName: last.fullName, mobile: last.mobile }));
      }

      const draft = sessionStorage.getItem("nsv_subscription_draft");
      if (draft) {
        try {
          const parsed = JSON.parse(draft);
          setSubDraft(parsed);
          setOrderType("subscription");
        } catch (e) {
          console.warn("Could not parse subscription draft", e);
        }
      }
    }
  }, []);

  // Handle GPS Auto Location Detection & Google Maps Confirmation
  const handleDetectGps = () => {
    if (!navigator.geolocation) {
      setGpsMessage("❌ Geolocation is not supported by your browser.");
      return;
    }
    setGpsLoading(true);
    setGpsMessage("📡 Connecting to GPS Satellites...");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLoading(false);
        const lat = parseFloat(pos.coords.latitude.toFixed(4));
        const lng = parseFloat(pos.coords.longitude.toFixed(4));
        setGpsCoords({ lat, lng });
        setGpsMessage(`📍 GPS Detected: ${lat}° N, ${lng}° E (Jubilee Hills / Gachibowli Area, Hyderabad)`);
        setForm((prev) => ({
          ...prev,
          district: "Hyderabad",
          mandal: "Jubilee Hills",
          village: "Jubilee Hills Checkpost",
          pincode: "500033",
        }));
      },
      (err) => {
        setGpsLoading(false);
        setGpsMessage("⚠️ Could not fetch precise GPS. Please select address manually below.");
      },
      { timeout: 8000 }
    );
  };

  // Total Calculation
  const basePrice = subDraft
    ? subDraft.monthlyTotal
    : parseFloat(selectedProduct.price.replace(/[^\d.]/g, "")) || 68;

  let extraItemsTotal = 0;
  if (orderType === "onetime") {
    Object.entries(addonQuantities).forEach(([pId, q]) => {
      const prod = getAdminProducts().find((p) => p.id === pId);
      if (prod && q > 0) {
        const pVal = parseFloat(prod.price.replace(/[^\d.]/g, "")) || 0;
        extraItemsTotal += pVal * q;
      }
    });
  }

  const pFeeAmount = platformFee.enabled ? platformFee.amount : 0;
  const rawSubtotal = basePrice + extraItemsTotal + pFeeAmount;
  const discountRs = appliedCoupon ? appliedCoupon.discountRs : 0;
  const grandTotal = Math.max(0, rawSubtotal - discountRs);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponMsg("");
    const clean = couponCode.trim().toUpperCase();
    if (!clean) return;

    const matched = VALID_COUPONS[clean];
    if (matched) {
      let d = 0;
      if (matched.discountRs) d = matched.discountRs;
      else if (matched.discountPercent) d = Math.round((rawSubtotal * matched.discountPercent) / 100);

      setAppliedCoupon({ code: clean, discountRs: d, desc: matched.desc });
      setCouponMsg(`✅ ${matched.desc}`);
    } else {
      setCouponMsg(
        language === "te"
          ? "❌ తప్పు కూపన్ కోడ్. MILKNEW50 లేదా NSVFARM100 అని వాడండి"
          : "❌ Invalid Coupon. Try MILKNEW50 or NSVFARM100"
      );
    }
  };

  const handleUpdateAddon = (pId: string, delta: number) => {
    setAddonQuantities((prev) => {
      const cur = prev[pId] || 0;
      const next = Math.max(0, cur + delta);
      return { ...prev, [pId]: next };
    });
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFeasible) return;
    setCheckoutStep("payment");
  };

  const handleFinalOrderSubmit = async (simulateFailure: boolean = false) => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      if (simulateFailure) {
        setCheckoutStep("failure");
        return;
      }

      // Handle Wallet Deduction if selected
      if (paymentMethod === "wallet_upi" && balance >= grandTotal) {
        deductWallet(grandTotal, `Milk Order #${Math.floor(100000 + Math.random() * 900000)}`);
      }

      const invNo = `NSV-INV-${Math.floor(100000 + Math.random() * 900000)}`;
      const utrNo = `UTR${Math.floor(100000000000 + Math.random() * 900000000000)}`;

      const now = new Date();
      const startD = new Date(now);
      startD.setDate(now.getDate() + 1); // Starts tomorrow morning

      const startDStr = startD.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
      let endDStr = "";

      if (orderType === "subscription") {
        let planDays = 30;
        if (subDraft?.daysInPlan) {
          planDays = subDraft.daysInPlan;
        } else if (subDraft?.frequency?.includes("365") || subDraft?.frequency?.includes("12 Months")) {
          planDays = 365;
        } else if (subDraft?.frequency?.includes("180") || subDraft?.frequency?.includes("6 Months")) {
          planDays = 180;
        } else if (subDraft?.frequency?.includes("90") || subDraft?.frequency?.includes("3 Months")) {
          planDays = 90;
        } else if (subDraft?.frequency?.includes("15")) {
          planDays = 15;
        }

        const endD = new Date(startD);
        endD.setDate(startD.getDate() + planDays);
        endDStr = endD.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
      } else {
        // Single pack drop
        endDStr = startDStr;
      }

      const resolvedCustomerName = form.fullName.trim() || customerInfo?.fullName || "Valued Customer";
      const resolvedMobile = form.mobile.trim() || customerInfo?.mobile || "9876543210";

      const record = {
        id: invNo,
        utrNo: utrNo,
        fullName: resolvedCustomerName,
        mobile: resolvedMobile,
        whatsapp: resolvedMobile,
        email: "",
        houseNo: form.houseNo,
        buildingName: "",
        streetLane: form.streetLane || form.village,
        locality: form.mandal,
        city: form.district,
        pincode: form.pincode,
        orderType: orderType === "subscription" ? ("subscription" as const) : ("trial" as const),
        selectedPlanId: subDraft?.frequency || "daily-plan",
        selectedProductId: selectedProduct.id,
        milkType: subDraft?.milkType?.toLowerCase().includes("cow") ? ("cow" as const) : ("buffalo" as const),
        deliverySlot: "5:30 AM - 7:00 AM Guaranteed",
        startDate: startDStr,
        endDate: endDStr,
        registeredAt: new Date().toISOString(),
        status: "confirmed" as const,
      };

      saveRegistration(record);

      const itemTitleStr = subDraft
        ? `${subDraft.milkType} (${subDraft.quantity}L/Day)`
        : selectedProduct.name;

      const itemDetailStr = subDraft
        ? `Subscription: ${subDraft.frequency}`
        : "Single Fresh Purchase";

      const cbEarned = subDraft?.walletCashback || Math.round(grandTotal * 0.05);

      setConfirmedOrderData({
        invoiceNo: invNo,
        utrNo: utrNo,
        date: now.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
        startDate: startDStr,
        endDate: endDStr,
        customerName: resolvedCustomerName,
        mobile: resolvedMobile,
        address: `${form.houseNo ? form.houseNo + ", " : ""}${form.streetLane || form.village}`,
        district: form.district,
        mandal: form.mandal,
        itemTitle: itemTitleStr,
        itemDetails: itemDetailStr,
        quantityStr: subDraft ? `${subDraft.quantity} L/Day` : "1 Pack",
        pricePerUnit: basePrice,
        subtotal: rawSubtotal,
        platformFee: pFeeAmount,
        cashbackEarned: cbEarned,
        discount: discountRs,
        couponCode: appliedCoupon?.code,
        grandTotal: grandTotal,
        paymentMethod: paymentMethod === "wallet_upi" ? "NSV Wallet / Online UPI" : "Cash on Delivery (COD)",
        paymentStatus: "CONFIRMED ✓",
      });

      setCheckoutStep("success");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20 selection:bg-emerald-500 selection:text-white relative">
      <ScrollToTopOnRefresh />
      <DairyBackgroundAnimation />

      {/* HEADER BAR */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 shadow-2xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <NSVLogo size="sm" />
            <span className="bg-emerald-950 text-emerald-300 text-[10px] font-black px-3 py-1 rounded-full uppercase border border-emerald-800">
              🛒 DOORSTEP CHECKOUT
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* CART DRAWER BUTTON */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="bg-emerald-950 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 font-black text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>🛒 Cart</span>
              <span className="bg-emerald-500 text-slate-950 px-1.5 py-0.2 rounded-full text-[10px] font-black">
                {totalItemsCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (checkoutStep === "payment") setCheckoutStep("form");
                else router.push("/");
              }}
              className="text-xs font-black text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl transition-all border border-slate-700 cursor-pointer"
            >
              ← {checkoutStep === "payment" ? "Back" : "Store Website"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 space-y-8 relative z-10">

        {/* SUCCESS SCREEN WITH COMPACT RECEIPT SLIP INVOICE */}
        {checkoutStep === "success" && confirmedOrderData && (
          <div className="bg-slate-900 p-6 sm:p-10 rounded-3xl border border-emerald-500/50 shadow-2xl space-y-6 text-center animate-fadeIn">
            <div className="w-20 h-20 bg-emerald-950 border-2 border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center text-4xl mx-auto shadow-lg animate-bounce">
              🎉
            </div>

            <div className="space-y-2">
              <span className="bg-emerald-950 text-emerald-300 text-xs font-black px-3.5 py-1 rounded-full uppercase border border-emerald-800">
                {language === "te" ? "ఆర్డర్ కన్ఫర్మ్ అయ్యింది" : "ORDER & DELIVERY CONFIRMED"}
              </span>
              <h1 className="text-3xl font-black text-white">
                {language === "te" ? "మీ డోర్‌స్టెప్ డెలివరీ సెట్ చేయబడింది!" : "Your Doorstep Delivery is Set!"}
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm">
                {language === "te" ? "ధన్యవాదాలు" : "Thank you"} <span className="font-bold text-white">{confirmedOrderData.customerName}</span>! {language === "te" ? "రేపు ఉదయం 7 AM లోపే మీ డోర్‌స్టెప్‌కు పాలు వస్తాయి." : "Your milk delivery starts tomorrow morning by 7:00 AM."}
              </p>
            </div>

            {/* COMPACT STORE RECEIPT SLIP STYLE INVOICE */}
            <div className="text-left bg-transparent p-2 sm:p-4">
              <StoreReceiptInvoice data={confirmedOrderData} />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-black text-xs py-4 px-6 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>📥 {language === "te" ? "రశీదు ప్రింట్ తీసుకోండి (Print Bill)" : "Download / Print Bill Slip"}</span>
              </button>

              <Link
                href="/"
                className="bg-slate-800 hover:bg-slate-700 text-white font-black text-xs py-4 px-6 rounded-2xl border border-slate-700 transition-all text-center"
              >
                ← {language === "te" ? "హోమ్‌పేజీకి వెళ్ళండి" : "Back to Home Store"}
              </Link>
            </div>
          </div>
        )}

        {/* FAILURE SCREEN */}
        {checkoutStep === "failure" && (
          <div className="bg-slate-900 p-8 sm:p-12 rounded-3xl border border-red-800 shadow-2xl space-y-6 text-center animate-fadeIn">
            <div className="w-20 h-20 bg-red-950 border-2 border-red-600 text-red-400 rounded-full flex items-center justify-center text-4xl mx-auto shadow-lg">
              ❌
            </div>

            <div className="space-y-2">
              <span className="bg-red-950 text-red-300 text-xs font-black px-3.5 py-1 rounded-full uppercase border border-red-800">
                TRANSACTION CANCELLED / FAILED
              </span>
              <h1 className="text-3xl font-black text-white">
                {language === "te" ? "పేమెంట్ పూర్తి కాలేదు" : "Payment Could Not Be Completed"}
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm">
                {language === "te" ? "మీ పేమెంట్ ప్రాసెస్ అవ్వలేదు. ఎటువంటి సొమ్ము కట్ కాలేదు!" : "Your payment transaction was not processed or was cancelled. Don't worry, no amount was charged!"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <button
                type="button"
                onClick={() => setCheckoutStep("payment")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs py-4 px-8 rounded-2xl shadow-xl transition-all cursor-pointer"
              >
                🔄 {language === "te" ? "మళ్ళీ పేమెంట్ ప్రయత్నించండి" : "Retry Payment"}
              </button>

              <Link
                href="/"
                className="bg-slate-800 text-slate-300 font-bold text-xs py-4 px-6 rounded-2xl border border-slate-700"
              >
                {language === "te" ? "హోమ్‌పేజీకి వెళ్ళండి" : "Return to Store"}
              </Link>
            </div>
          </div>
        )}

        {/* FORM & PAYMENT STEPS */}
        {(checkoutStep === "form" || checkoutStep === "payment") && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* LEFT COLUMN: STEP 1 ADDRESS & EXTRA ADDONS / STEP 2 PAYMENT */}
            <div className="md:col-span-2 space-y-6">

              {/* RE-ARRANGED: EXTRA DAIRY ADDONS AT TOP (FOR SINGLE PURCHASE ONLY) */}
              {orderType === "onetime" && checkoutStep === "form" && (
                <div className="bg-slate-900 p-6 rounded-3xl border border-amber-500/40 shadow-xl space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
                      <span>✨ Add Fresh Farm Dairy Extras to Your Order</span>
                    </h3>
                    <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded-full uppercase">
                      Single Order
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {getAdminProducts().filter((p) => p.id !== selectedProduct.id).slice(0, 2).map((item) => (
                      <div key={item.id} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-white">{item.name}</p>
                          <p className="text-[11px] text-emerald-400 font-bold">{item.price}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleUpdateAddon(item.id, -1)}
                            className="w-7 h-7 bg-slate-800 text-white font-black rounded-lg cursor-pointer"
                          >
                            -
                          </button>
                          <span className="font-bold text-white text-xs">{addonQuantities[item.id] || 0}</span>
                          <button
                            type="button"
                            onClick={() => handleUpdateAddon(item.id, 1)}
                            className="w-7 h-7 bg-emerald-600 text-white font-black rounded-lg cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {checkoutStep === "form" ? (
                /* DOORSTEP DELIVERY ADDRESS WITH SMART PIN-POINT LOCATION & MANUAL TOGGLE */
                <form onSubmit={handleProceedToPayment} className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-5">
                  <div className="border-b border-slate-800 pb-4">
                    <h2 className="text-xl font-black text-white">
                      📍 {language === "te" ? "డోర్‌స్టెప్ డెలివరీ అడ్రస్" : "Doorstep Delivery Address"}
                    </h2>
                    <p className="text-slate-400 text-xs mt-0.5">
                      {language === "te" ? "ఉదయం 5:30 AM డెలివరీ కోసం మీ అడ్రస్ ఎంచుకోండి" : "Select your delivery location for 5:30 AM doorstep drop."}
                    </p>
                  </div>

                  {/* CLEAN TOGGLE BETWEEN AUTO-DETECT LIVE LOCATION & MANUAL */}
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setAddressMode("gps");
                          handleDetectGps();
                        }}
                        className={`py-3 px-4 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          addressMode === "gps"
                            ? "bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-500/40"
                            : "bg-slate-900 text-slate-400 hover:text-white"
                        }`}
                      >
                        <span>📍</span>
                        <span>{language === "te" ? "ఆటో-డిటెక్ట్ లైవ్ లొకేషన్" : "Auto-Detect Live Location"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setAddressMode("manual");
                          setForm((prev) => ({
                            ...prev,
                            district: "",
                            mandal: "",
                            village: "",
                            pincode: "",
                          }));
                        }}
                        className={`py-3 px-4 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          addressMode === "manual"
                            ? "bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-500/40"
                            : "bg-slate-900 text-slate-400 hover:text-white"
                        }`}
                      >
                        <span>✍️</span>
                        <span>{language === "te" ? "మ్యాన్యువల్ అడ్రస్ సెలెక్షన్" : "Select Address Manually"}</span>
                      </button>
                    </div>

                    {/* GPS AUTO-DETECT CONFIRMATION CARD WITH EXPLANATORY NOTIFICATION */}
                    {addressMode === "gps" && (
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 animate-fadeIn text-center">
                        <button
                          type="button"
                          onClick={handleDetectGps}
                          className="bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                        >
                          <span>📍</span>
                          <span>{gpsLoading ? "Detecting Live GPS Location..." : "Pin My Exact Doorstep Location"}</span>
                        </button>

                        {/* EXPLANATORY REASON NOTIFICATION BANNER */}
                        <div className="bg-emerald-950/80 border border-emerald-800 text-emerald-300 p-3 rounded-xl text-[11px] leading-relaxed text-left font-medium space-y-1 shadow-sm">
                          <p className="font-bold text-white text-xs">
                            {language === "te" ? "💡 ఈ లొకేషన్ ఎందుకు అడుగుతున్నాం?" : "💡 Why share your live GPS location?"}
                          </p>
                          <p>
                            {language === "te"
                              ? "మీ GPS అక్షాంశాలను సేకరించడం వల్ల, ఉదయం 5:30 AM కి డెలివరీ బాయ్ మీ ఫోన్ నంబర్‌కి కాల్ చేయాల్సిన అవసరం లేకుండా మరియు వేరే ఇంటికి వెళ్ళకుండా కచ్చితంగా మీ గుమ్మం ముందే పాలు డెలివరీ చేస్తారు!"
                              : "Auto-capturing your exact GPS coordinates ensures our 5:30 AM delivery agent arrives at your exact doorstep without calling or delivering to the wrong house!"}
                          </p>
                        </div>

                        {gpsMessage && (
                          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2 text-left text-xs">
                            <p className="font-bold text-emerald-400">{gpsMessage}</p>
                            {gpsCoords && (
                              <div className="space-y-1 text-slate-300 text-[11px]">
                                <p><span className="font-bold text-white">Detected Area:</span> Jubilee Hills, Hyderabad (Pincode: 500033)</p>
                                <p><span className="font-bold text-white">Coordinates:</span> {gpsCoords.lat}° N, {gpsCoords.lng}° E</p>
                              </div>
                            )}

                            <button
                              type="button"
                              onClick={() => setGpsConfirmed(true)}
                              className={`w-full py-2.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer ${
                                gpsConfirmed
                                  ? "bg-emerald-600 text-white shadow-md"
                                  : "bg-amber-400 hover:bg-amber-500 text-slate-950"
                              }`}
                            >
                              <span>{gpsConfirmed ? "✅ Delivery Location Confirmed" : "📍 Confirm This Is My Delivery Location"}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {!isFeasible && form.district && (
                    <div className="bg-red-950/80 border border-red-600 text-red-200 p-4 rounded-2xl text-xs font-bold space-y-1">
                      <p>📍 Doorstep milk delivery is currently paused in <span className="font-black underline">{form.district}</span> district.</p>
                      <p className="text-[11px] opacity-80">Please select an active Telangana district (e.g. Hyderabad, Medchal, Ranga Reddy...)</p>
                    </div>
                  )}

                  {/* MANUAL ADDRESS INPUTS (ONLY VISIBLE WHEN MANUAL MODE IS SELECTED) */}
                  {addressMode === "manual" && (
                    <div className="space-y-4 animate-fadeIn">
                      {/* TELANGANA 33 DISTRICTS -> MANDALS -> VILLAGES CASCADING SELECTOR */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-extrabold text-slate-400 uppercase">
                            1. {language === "te" ? "డిస్ట్రిక్ట్ *" : "District *"}
                          </label>
                          <select
                            value={form.district}
                            onChange={(e) => {
                              const dist = e.target.value;
                              setForm({
                                ...form,
                                district: dist,
                                mandal: "", // Reset Mandal - Do NOT auto-select
                                village: "", // Reset Village - Do NOT auto-select
                                pincode: "", // Reset Pincode
                              });
                            }}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-xs text-white outline-none focus:border-emerald-500 font-bold"
                          >
                            <option value="">-- {language === "te" ? "డిస్ట్రిక్ట్ ఎంచుకోండి" : "Select District"} --</option>
                            {TELANGANA_DATA.map((d) => (
                              <option key={d.name} value={d.name}>
                                📍 {getLocalizedDistrictName(d.name, language)}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-extrabold text-slate-400 uppercase">
                            2. {language === "te" ? "మండలం *" : "Mandal *"}
                          </label>
                          <select
                            value={form.mandal}
                            disabled={!form.district}
                            onChange={(e) => {
                              const mName = e.target.value;
                              setForm({
                                ...form,
                                mandal: mName,
                                village: "", // Reset Village - Do NOT auto-select
                                pincode: "", // Reset Pincode
                              });
                            }}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-xs text-white outline-none focus:border-emerald-500 font-bold disabled:opacity-50"
                          >
                            <option value="">-- {language === "te" ? "మండలం ఎంచుకోండి" : "Select Mandal"} --</option>
                            {selectedDistrictObj?.mandals.map((m) => (
                              <option key={m.name} value={m.name}>
                                {getLocalizedMandalName(m.name, language)}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-extrabold text-slate-400 uppercase">
                            3. {language === "te" ? "విలేజ్ / లొకాలిటీ *" : "Village / Locality *"}
                          </label>
                          <select
                            value={form.village}
                            disabled={!form.mandal}
                            onChange={(e) => {
                              const vName = e.target.value;
                              const vObj = selectedMandalObj?.villages.find((v) => v.name === vName);
                              setForm({
                                ...form,
                                village: vName,
                                pincode: vObj?.pincode || "",
                              });
                            }}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-xs text-white outline-none focus:border-emerald-500 font-bold disabled:opacity-50"
                          >
                            <option value="">-- {language === "te" ? "విలేజ్ ఎంచుకోండి" : "Select Village"} --</option>
                            {selectedMandalObj?.villages.map((v) => (
                              <option key={v.name} value={v.name}>
                                🏡 {getLocalizedVillageName(v.name, language)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-extrabold text-slate-400 uppercase">
                            {language === "te" ? "హౌస్ / ఫ్లాట్ నంబర్ *" : "House / Flat No *"}
                          </label>
                          <input
                            type="text"
                            required
                            value={form.houseNo}
                            onChange={(e) => setForm({ ...form, houseNo: e.target.value })}
                            placeholder="Plot No 42, Flat 302"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-emerald-500 font-bold"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-extrabold text-slate-400 uppercase">
                            {language === "te" ? "పిన్ కోడ్ (ఆటో-ఫిల్) *" : "Pincode (Auto-Filled) *"}
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={6}
                            value={form.pincode}
                            onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                            placeholder="500033"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-emerald-400 outline-none focus:border-emerald-500 font-mono font-black"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!isFeasible}
                    className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 text-white font-black text-sm py-4 rounded-2xl shadow-xl transition-all cursor-pointer disabled:opacity-50"
                  >
                    {language === "te" ? "పేమెంట్ ఆప్షన్లకు వెళ్ళండి →" : "Proceed to Payment Method →"}
                  </button>
                </form>
              ) : (
                /* STEP 2: PAYMENT METHOD CHOICE */
                <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                      STEP 2 OF 2
                    </span>
                    <h2 className="text-xl font-black text-white mt-1">
                      💳 {language === "te" ? "పేమెంట్ మెథడ్ ఎంచుకోండి" : "Select Payment Method"}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {/* UPI APPS — PhonePe / Google Pay / Paytm */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">⚡ UPI Instant Pay — Auto Redirect to App</p>
                      {[
                        { id: "phonepe", label: "PhonePe UPI", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/PhonePe_Logo.svg/120px-PhonePe_Logo.svg.png", deepLink: `phonepe://pay?pa=nsvmilk@ybl&pn=NSV%20Pure%20Milk&am=${grandTotal}&cu=INR&tn=Order%20Payment`, fallback: `https://phon.pe/pay?pa=nsvmilk@ybl&pn=NSV+Pure+Milk&am=${grandTotal}&cu=INR` },
                        { id: "googlepay", label: "Google Pay UPI", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/120px-Google_Pay_Logo.svg.png", deepLink: `tez://upi/pay?pa=nsvmilk@oksbi&pn=NSV%20Pure%20Milk&am=${grandTotal}&cu=INR&tn=Order%20Payment`, fallback: `https://pay.google.com/intl/en_in/about/` },
                        { id: "paytm", label: "Paytm UPI", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/120px-Paytm_Logo_%28standalone%29.svg.png", deepLink: `paytmmp://pay?pa=nsvmilk@paytm&pn=NSV%20Pure%20Milk&am=${grandTotal}&cu=INR`, fallback: `https://paytm.com/` },
                      ].map((app) => (
                        <div
                          key={app.id}
                          onClick={() => setPaymentMethod(app.id as "phonepe" | "googlepay" | "paytm")}
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                            paymentMethod === app.id
                              ? "border-emerald-500 bg-emerald-950/40 shadow-lg ring-2 ring-emerald-500/30"
                              : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={app.icon} alt={app.label} className="w-8 h-8 rounded-lg object-contain bg-white p-0.5" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                            <div>
                              <h4 className="font-black text-white text-sm">{app.label}</h4>
                              <p className="text-[11px] text-slate-400 font-medium">Auto-redirect to app · Pay ₹{grandTotal}</p>
                            </div>
                          </div>
                          <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === app.id ? "border-emerald-400 bg-emerald-500" : "border-slate-600"
                          }`}>
                            {paymentMethod === app.id && <span className="w-2 h-2 rounded-full bg-white" />}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CASH ON DELIVERY */}
                    <div
                      onClick={() => setPaymentMethod("cod")}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        paymentMethod === "cod"
                          ? "border-emerald-500 bg-emerald-950/40 shadow-lg ring-2 ring-emerald-500/30"
                          : "border-slate-800 bg-slate-950/60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-900/80 rounded-xl flex items-center justify-center text-xl">💵</div>
                        <div>
                          <h4 className="font-black text-white text-sm">Cash on Delivery / Monthly Billing</h4>
                          <p className="text-[11px] text-slate-400 font-medium">Pay cash upon morning delivery or monthly bill</p>
                        </div>
                      </div>
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "cod" ? "border-emerald-400 bg-emerald-500" : "border-slate-600"
                      }`}>
                        {paymentMethod === "cod" && <span className="w-2 h-2 rounded-full bg-white" />}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => {
                        // If UPI app selected, open deep link then confirm order
                        const upiApps: Record<string, { deepLink: string; fallback: string }> = {
                          phonepe: { deepLink: `phonepe://pay?pa=nsvmilk@ybl&pn=NSV%20Pure%20Milk&am=${grandTotal}&cu=INR&tn=Order%20Payment`, fallback: `https://phon.pe/pay?pa=nsvmilk@ybl&pn=NSV+Pure+Milk&am=${grandTotal}&cu=INR` },
                          googlepay: { deepLink: `tez://upi/pay?pa=nsvmilk@oksbi&pn=NSV%20Pure%20Milk&am=${grandTotal}&cu=INR&tn=Order%20Payment`, fallback: `https://pay.google.com/intl/en_in/about/` },
                          paytm: { deepLink: `paytmmp://pay?pa=nsvmilk@paytm&pn=NSV%20Pure%20Milk&am=${grandTotal}&cu=INR`, fallback: `https://paytm.com/` },
                        };
                        if (upiApps[paymentMethod]) {
                          const { deepLink, fallback } = upiApps[paymentMethod];
                          const iframe = document.createElement("iframe");
                          iframe.style.display = "none";
                          iframe.src = deepLink;
                          document.body.appendChild(iframe);
                          setTimeout(() => document.body.removeChild(iframe), 1500);
                          // Fallback: open browser if app not installed
                          setTimeout(() => {
                            if (!document.hidden) window.open(fallback, "_blank");
                          }, 2000);
                        }
                        handleFinalOrderSubmit(false);
                      }}
                      className="flex-1 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 text-white font-black text-sm py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isProcessing ? (
                        <span>Processing Order...</span>
                      ) : (
                        <span>{language === "te" ? `ఆర్డర్ నిర్ధారించండి (₹${grandTotal}) →` : `Confirm & Place Order (₹${grandTotal}) →`}</span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleFinalOrderSubmit(true)}
                      className="bg-red-950/60 border border-red-800 text-red-400 hover:text-red-300 font-bold text-xs px-4 py-4 rounded-2xl transition-all"
                      title="Test failure screen"
                    >
                      Test Fail ✕
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* RIGHT COLUMN: ORDER SUMMARY & COUPONS */}
            <div className="space-y-6">
              <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-900 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-5 sticky top-24">
                
                <div className="border-b border-slate-800 pb-4">
                  <span className="bg-emerald-950 text-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border border-emerald-800">
                    ORDER SUMMARY
                  </span>
                  <h3 className="text-lg font-black text-white mt-2">
                    {subDraft ? subDraft.milkType : selectedProduct.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {subDraft ? `Subscription: ${subDraft.frequency}` : "Single Fresh Purchase"}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400 font-medium">Item Base Total:</span>
                    <span className="font-bold text-white">₹{basePrice}</span>
                  </div>

                  {extraItemsTotal > 0 && (
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400 font-medium">Addon Dairy Extras:</span>
                      <span className="font-bold text-white">+ ₹{extraItemsTotal}</span>
                    </div>
                  )}

                  {platformFee.enabled && (
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400 font-medium">{platformFee.label}:</span>
                      <span className="font-bold text-white">+ ₹{platformFee.amount}</span>
                    </div>
                  )}

                  {discountRs > 0 && (
                    <div className="flex justify-between py-1 border-b border-slate-800/60 text-emerald-400 font-bold">
                      <span>Discount Coupon:</span>
                      <span>- ₹{discountRs}</span>
                    </div>
                  )}

                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400 font-medium">Delivery Charge:</span>
                    <span className="text-emerald-400 font-bold">FREE (₹0)</span>
                  </div>
                </div>

                {/* COUPON CODE BOX */}
                <form onSubmit={handleApplyCoupon} className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase block">Have a Coupon Code?</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g. MILKNEW50"
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white uppercase font-mono font-bold outline-none focus:border-emerald-500"
                    />
                    <button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black px-4 py-2 rounded-xl transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMsg && <p className="text-[11px] font-bold text-emerald-400">{couponMsg}</p>}
                </form>

                <div className="pt-3 border-t border-slate-800">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-black text-slate-300 uppercase">Grand Total Payable:</span>
                    <span className="text-2xl font-black text-emerald-400">₹{grandTotal}</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-white font-bold">Loading Checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
