"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: string;
  numericPrice: number;
  quantity: number;
  image?: string;
  type: "onetime" | "subscription";
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  cartTotalAmount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "nsv_shopping_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        if (saved) setCart(JSON.parse(saved));
      } catch (e) {
        console.warn("Could not parse saved cart", e);
      }
    }
  }, []);

  const saveCartToStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
    }
  };

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    const existingIndex = cart.findIndex((c) => c.id === item.id);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      saveCartToStorage(updated);
    } else {
      saveCartToStorage([...cart, { ...item, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    const updated = cart.filter((c) => c.id !== id);
    saveCartToStorage(updated);
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = cart
      .map((c) => {
        if (c.id === id) {
          const newQ = c.quantity + delta;
          return newQ > 0 ? { ...c, quantity: newQ } : null;
        }
        return c;
      })
      .filter(Boolean) as CartItem[];
    saveCartToStorage(updated);
  };

  const clearCart = () => {
    saveCartToStorage([]);
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalAmount = cart.reduce((sum, item) => sum + item.numericPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        cartTotalAmount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
