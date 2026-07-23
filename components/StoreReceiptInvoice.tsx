"use client";

import { InvoiceData } from "./A4PrintInvoice";
import NSVLogo from "./NSVLogo";

export default function StoreReceiptInvoice({ data }: { data: InvoiceData }) {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    `NSV-INVOICE:${data.invoiceNo}|CUSTOMER:${data.customerName}|TOTAL:Rs.${data.grandTotal}`
  )}`;

  return (
    <div
      id="printable-receipt"
      className="bg-gradient-to-b from-amber-50 via-white to-amber-50/90 text-slate-900 font-mono text-xs sm:text-sm p-6 sm:p-8 max-w-md mx-auto shadow-2xl rounded-3xl border-2 border-dashed border-emerald-500/60 relative print:shadow-none print:border-none print:p-0 print:m-0 print:w-full space-y-5"
    >
      {/* PRINT STYLING FOR RECEIPT — 1 COPY ONLY */}
      <style jsx global>{`
        @media print {
          @page {
            size: 100mm auto;
            margin: 4mm;
          }
          @page :first {
            size: 100mm auto;
          }
          body {
            margin: 0 !important;
            padding: 0 !important;
          }
          body * {
            visibility: hidden;
          }
          #printable-receipt, #printable-receipt * {
            visibility: visible;
          }
          #printable-receipt {
            position: absolute;
            left: 0;
            top: 0;
            width: 100mm !important;
            max-width: 100mm !important;
            padding: 4mm !important;
            margin: 0 auto !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
            color: black !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
            break-after: avoid !important;
          }
        }
      `}</style>

      {/* HEADER LOGO & STORE NAME */}
      <div className="text-center border-b-2 border-dashed border-slate-400 pb-5 space-y-2">
        <div className="flex justify-center">
          <NSVLogo size="md" />
        </div>

        <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider inline-block">
          OFFICIAL TAX INVOICE RECEIPT
        </span>

        <p className="text-xs text-emerald-950 font-sans font-black">100% Pure Farm Fresh Milk Delivery</p>
        <p className="text-[10px] text-slate-600 font-sans">Telangana Doorstep Service</p>

        <div className="pt-1 space-y-1">
          <span className="bg-emerald-950 text-emerald-300 text-xs font-bold font-mono px-3.5 py-1 rounded-full border border-emerald-700 inline-block">
            RECEIPT NO: {data.invoiceNo}
          </span>
          {data.utrNo && (
            <p className="text-[10px] text-emerald-900 font-mono font-black">
              UPI UTR NO: {data.utrNo}
            </p>
          )}
        </div>
      </div>

      {/* CUSTOMER & DATE DETAILS */}
      <div className="py-3 border-b-2 border-dashed border-slate-300 space-y-2 text-xs font-sans">
        <div className="flex justify-between">
          <span className="text-slate-500 font-bold">Booking Date:</span>
          <span className="font-black text-slate-900">{data.date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 font-bold">Customer Name:</span>
          <span className="font-black text-slate-900">{data.customerName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 font-bold">Mobile Number:</span>
          <span className="font-mono font-bold text-slate-900">+91 {data.mobile}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 font-bold">Delivery Address:</span>
          <span className="font-bold text-slate-900 text-right max-w-[200px] truncate">{data.address}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 font-bold">Delivery Slot:</span>
          <span className="font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
            ⚡ 5:30 AM - 7:00 AM Guaranteed
          </span>
        </div>
      </div>

      {/* DELIVERY SCHEDULE BOX (RIGHT ABOVE ITEM SUMMARY) */}
      {data.startDate && (
        <div className="bg-amber-100/90 p-3 rounded-2xl border-2 border-amber-400 font-sans shadow-sm space-y-0.5">
          <p className="text-[10px] font-black text-amber-950 uppercase tracking-wider">📅 Guaranteed Delivery Schedule</p>
          <p className="font-black text-emerald-950 text-sm">
            {data.endDate && data.endDate !== data.startDate
              ? `${data.startDate} to ${data.endDate}`
              : `${data.startDate} (Tomorrow Morning Drop)`}
          </p>
        </div>
      )}

      {/* ITEM SUMMARY */}
      <div className="py-4 border-b-2 border-dashed border-slate-400 space-y-3">
        <div className="flex justify-between font-black text-xs text-slate-500 uppercase border-b border-slate-300 pb-1">
          <span>ITEM DESCRIPTION</span>
          <span>QTY</span>
          <span>AMOUNT</span>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between font-black text-slate-900 text-sm">
            <span className="truncate max-w-[180px]">{data.itemTitle}</span>
            <span>{data.quantityStr}</span>
            <span className="font-mono">₹{data.subtotal}</span>
          </div>
          <p className="text-xs text-slate-600 font-sans font-medium">{data.itemDetails}</p>
        </div>
      </div>

      {/* BILLING BREAKDOWN & CASHBACK */}
      <div className="py-3 border-b-2 border-dashed border-slate-400 space-y-2 text-xs font-sans">
        <div className="flex justify-between text-slate-600 font-medium">
          <span>Subtotal Amount:</span>
          <span className="font-mono font-bold">₹{data.subtotal}</span>
        </div>

        {data.platformFee !== undefined && data.platformFee > 0 && (
          <div className="flex justify-between text-slate-600 font-medium">
            <span>Platform & Handling Fee:</span>
            <span className="font-mono font-bold">₹{data.platformFee}</span>
          </div>
        )}

        {data.discount > 0 && (
          <div className="flex justify-between text-emerald-800 font-bold">
            <span>Discount Coupon ({data.couponCode}):</span>
            <span className="font-mono">- ₹{data.discount}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-600 font-medium">
          <span>Doorstep Delivery Charge:</span>
          <span className="text-emerald-800 font-bold">FREE (₹0)</span>
        </div>

        {data.cashbackEarned !== undefined && data.cashbackEarned > 0 && (
          <div className="flex justify-between bg-emerald-950 text-emerald-300 p-2.5 rounded-xl border border-emerald-700 font-black">
            <span>👛 NSV Wallet Cashback Earned:</span>
            <span>+ ₹{data.cashbackEarned}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-900 font-black text-base pt-2 border-t-2 border-slate-900">
          <span>GRAND TOTAL:</span>
          <span className="text-emerald-900 text-lg font-mono">₹{data.grandTotal}</span>
        </div>

        <div className="flex justify-between text-xs text-slate-600 pt-1">
          <span className="font-bold">Payment Status:</span>
          <span className="font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded uppercase border border-emerald-300">
            {data.paymentStatus}
          </span>
        </div>
      </div>

      {/* QR CODE GENERATION & VERIFICATION */}
      <div className="py-4 text-center space-y-2 border-b-2 border-dashed border-slate-400">
        <div className="w-24 h-24 bg-white border-2 border-emerald-500 rounded-2xl mx-auto p-1.5 shadow-md flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrCodeUrl}
            alt="Scan Invoice QR Code"
            className="w-full h-full object-contain"
          />
        </div>
        <p className="font-bold text-xs text-slate-800">Scan QR Code for Instant Verification</p>
        <p className="text-[10px] text-slate-500 font-sans">Verified Digital Receipt by NSV Pure Milk Dairy</p>
      </div>

      {/* STORE ADDRESS & CONTACT DETAILS FOOTER */}
      <div className="pt-2 text-center space-y-1.5 text-[11px] text-slate-700 font-sans">
        <p className="font-black text-slate-900 text-xs">🏢 NSV PURE MILK DAIRY PRIVATE LIMITED</p>
        <p className="leading-snug text-slate-600">
          Plot No. 108, Phase 2, Jubilee Hills, Hyderabad, Telangana - 500033
        </p>
        <div className="flex justify-center gap-3 font-bold text-emerald-900 pt-1">
          <span>📞 +91 98765 43210</span>
          <span>•</span>
          <span>✉️ support@nsvpuremilk.com</span>
        </div>
        <p className="text-[10px] text-slate-500 pt-1 font-mono">FSSAI Lic No: 13624999000123</p>
      </div>

    </div>
  );
}
