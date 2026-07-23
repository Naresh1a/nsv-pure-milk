"use client";

export interface InvoiceData {
  invoiceNo: string;
  utrNo?: string;
  date: string;
  startDate?: string;
  endDate?: string;
  customerName: string;
  mobile: string;
  address: string;
  district: string;
  mandal: string;
  itemTitle: string;
  itemDetails: string;
  quantityStr: string;
  pricePerUnit: number;
  subtotal: number;
  platformFee?: number;
  deliveryFeeStr?: string;
  cashbackEarned?: number;
  discount: number;
  couponCode?: string;
  grandTotal: number;
  paymentMethod: string;
  paymentStatus: string;
}

export default function A4PrintInvoice({ data }: { data: InvoiceData }) {
  return (
    <div id="printable-invoice" className="bg-white text-slate-900 font-sans p-8 max-w-[210mm] mx-auto shadow-2xl border border-slate-200 rounded-2xl print:shadow-none print:border-none print:p-0 print:m-0 print:w-full">
      
      {/* PRINT CSS OVERRIDE TO FIT EXACTLY 1 A4 PAGE */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 12mm;
          }
          body * {
            visibility: hidden;
          }
          #printable-invoice, #printable-invoice * {
            visibility: visible;
          }
          #printable-invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
            color: black !important;
          }
        }
      `}</style>

      {/* INVOICE HEADER BRANDING */}
      <div className="flex items-center justify-between border-b-2 border-emerald-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-800 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-sm">
            🥛
          </div>
          <div>
            <h1 className="text-xl font-black text-emerald-950 tracking-tight">NSV PURE MILK DAIRY</h1>
            <p className="text-[11px] font-bold text-slate-600">100% Pure Farm Fresh Milk & Dairy Products</p>
            <p className="text-[10px] text-slate-500 font-medium">Telangana State Doorstep Express Delivery</p>
          </div>
        </div>

        <div className="text-right">
          <span className="bg-emerald-100 text-emerald-950 text-[10px] font-black px-3 py-1 rounded-full uppercase border border-emerald-300">
            TAX INVOICE
          </span>
          <p className="text-xs font-mono font-bold text-slate-900 mt-2">INVOICE NO: {data.invoiceNo}</p>
          <p className="text-[11px] font-medium text-slate-600">Date: {data.date}</p>
        </div>
      </div>

      {/* CUSTOMER & BILLING DETAILS */}
      <div className="grid grid-cols-2 gap-6 my-6 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div>
          <h3 className="font-black text-slate-900 uppercase text-[10px] tracking-wider text-emerald-900">Billed To (Customer Details):</h3>
          <p className="font-bold text-slate-900 text-sm mt-1">{data.customerName}</p>
          <p className="font-mono text-slate-700 font-semibold">+91 {data.mobile}</p>
          <p className="text-slate-600 mt-1">{data.address}</p>
          <p className="text-slate-600 font-medium">{data.mandal}, {data.district} (Telangana)</p>
        </div>

        <div className="text-right">
          <h3 className="font-black text-slate-900 uppercase text-[10px] tracking-wider text-emerald-900">Payment & Delivery Info:</h3>
          <p className="mt-1 font-bold text-slate-900">Method: <span className="text-emerald-900 uppercase">{data.paymentMethod}</span></p>
          <p className="font-bold text-slate-900">Status: <span className="bg-emerald-100 text-emerald-900 font-black px-2 py-0.5 rounded text-[10px] border border-emerald-300">{data.paymentStatus}</span></p>
          <p className="text-slate-600 mt-2">Delivery Slot: <span className="font-bold">5:30 AM - 7:00 AM Guaranteed</span></p>
        </div>
      </div>

      {/* ITEMIZED TABLE */}
      <div className="my-6">
        <table className="w-full text-left text-xs border-collapse border border-slate-300">
          <thead>
            <tr className="bg-emerald-950 text-white font-black text-[10px] uppercase">
              <th className="p-3 border border-slate-400">#</th>
              <th className="p-3 border border-slate-400">Item Description</th>
              <th className="p-3 border border-slate-400 text-center">Quantity / Plan</th>
              <th className="p-3 border border-slate-400 text-right">Rate</th>
              <th className="p-3 border border-slate-400 text-right">Total Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300 text-slate-800">
            <tr className="font-medium">
              <td className="p-3 border border-slate-300">1</td>
              <td className="p-3 border border-slate-300">
                <span className="font-bold text-slate-900 block">{data.itemTitle}</span>
                <span className="text-[10px] text-slate-500 block">{data.itemDetails}</span>
              </td>
              <td className="p-3 border border-slate-300 text-center font-bold">{data.quantityStr}</td>
              <td className="p-3 border border-slate-300 text-right font-mono">₹{data.pricePerUnit}</td>
              <td className="p-3 border border-slate-300 text-right font-mono font-bold">₹{data.subtotal}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* SUMMARY TOTALS */}
      <div className="flex justify-between items-start my-6 text-xs">
        <div className="w-1/2 bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-emerald-950 space-y-1">
          <p className="font-black text-[11px]">🌿 NSV Pure Quality Guarantee</p>
          <p className="text-[10px] leading-relaxed">
            100% Pure, Untouched Milk Delivered Fresh Every Morning by 7 AM. Tested daily for fat percentage, purity & quality.
          </p>
          {data.couponCode && (
            <p className="text-[10px] font-bold text-emerald-800 pt-1">
              🏷️ Coupon Applied: <span className="font-mono font-black">{data.couponCode}</span>
            </p>
          )}
        </div>

        <div className="w-2/5 space-y-2 text-right">
          <div className="flex justify-between text-slate-600 font-medium">
            <span>Subtotal:</span>
            <span className="font-mono">₹{data.subtotal}</span>
          </div>

          {data.discount > 0 && (
            <div className="flex justify-between text-emerald-700 font-bold">
              <span>Discount Coupon:</span>
              <span className="font-mono">- ₹{data.discount}</span>
            </div>
          )}

          <div className="flex justify-between text-slate-600 font-medium">
            <span>Delivery Fee:</span>
            <span className="text-emerald-700 font-bold">FREE (₹0)</span>
          </div>

          <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t-2 border-slate-900">
            <span>Grand Total:</span>
            <span className="font-mono text-emerald-900 text-base">₹{data.grandTotal}</span>
          </div>
        </div>
      </div>

      {/* FOOTER SIGNATURE & STAMP */}
      <div className="pt-8 border-t border-slate-300 flex items-center justify-between text-[10px] text-slate-500">
        <div>
          <p className="font-bold text-slate-700">NSV Pure Milk Dairy Private Limited</p>
          <p>Customer Support: +91 98765 43210 | Support@nsvpuremilk.com</p>
          <p>Hyderabad, Telangana, India</p>
        </div>

        <div className="text-center space-y-1">
          <div className="w-24 h-10 border border-slate-300 rounded flex items-center justify-center text-[9px] font-mono text-slate-400 mx-auto">
            [ Official Stamp ]
          </div>
          <p className="font-bold text-slate-700">Authorized Signatory</p>
        </div>
      </div>

    </div>
  );
}
