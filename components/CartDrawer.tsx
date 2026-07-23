"use client";

import { useCart } from "@/lib/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotalAmount, totalItemsCount } = useCart();
  const router = useRouter();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 text-white shadow-2xl border-l border-slate-800 flex flex-col">
          
          {/* CART DRAWER HEADER */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛒</span>
              <div>
                <h2 className="font-black text-lg text-white">Your Shopping Cart</h2>
                <p className="text-[11px] text-slate-400 font-medium">{totalItemsCount} Fresh Dairy Items</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="text-slate-400 hover:text-white font-black text-lg p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-all cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* CART ITEMS LIST */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <span className="text-4xl block">🥛</span>
                <p className="font-bold text-slate-300 text-sm">Your cart is currently empty!</p>
                <p className="text-xs text-slate-500">Explore our farm fresh milk and pure dairy products catalog.</p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-5 py-2.5 rounded-xl transition-all"
                >
                  Browse Products →
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between shadow-md">
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-white text-sm">{item.name}</h4>
                    <p className="text-emerald-400 font-black text-xs">₹{item.numericPrice} / Pack</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 bg-slate-800 text-white font-black rounded-lg flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-bold text-white text-xs px-1">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 bg-emerald-600 text-white font-black rounded-lg flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-300 font-black text-xs p-1"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* CART FOOTER & CHECKOUT BUTTON */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-950 space-y-4">
              <div className="flex justify-between items-baseline text-sm">
                <span className="font-black text-slate-400 uppercase text-xs">Subtotal Amount:</span>
                <span className="font-black text-emerald-400 text-2xl">₹{cartTotalAmount}</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  router.push("/checkout");
                }}
                className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 text-white font-black text-sm py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout (₹{cartTotalAmount})</span>
                <span>→</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
