"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface WalletTransaction {
  id: string;
  type: "recharge" | "cashback" | "purchase" | "failed_recharge";
  title: string;
  amount: number;
  date: string;
  status: "success" | "failed";
}

interface WalletContextType {
  balance: number;
  transactions: WalletTransaction[];
  rechargeWalletSuccess: (amount: number, paymentMode: string) => { totalCredited: number; cashback: number };
  rechargeWalletFail: (amount: number) => void;
  deductWallet: (amount: number, description?: string) => boolean;
}

const initialTxHistory: WalletTransaction[] = [
  {
    id: "tx-1001",
    type: "cashback",
    title: "🎁 Welcome NSV Bonus Cashback",
    amount: 500,
    date: new Date().toLocaleDateString(),
    status: "success",
  },
  {
    id: "tx-1000",
    type: "recharge",
    title: "➕ Initial Wallet Deposit",
    amount: 2000,
    date: new Date().toLocaleDateString(),
    status: "success",
  },
];

const WalletContext = createContext<WalletContextType>({
  balance: 2500,
  transactions: initialTxHistory,
  rechargeWalletSuccess: () => ({ totalCredited: 0, cashback: 0 }),
  rechargeWalletFail: () => {},
  deductWallet: () => true,
});

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(2500);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(initialTxHistory);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedBal = localStorage.getItem("nsv_wallet_balance");
      if (storedBal) setBalance(parseFloat(storedBal));

      const storedTx = localStorage.getItem("nsv_wallet_tx");
      if (storedTx) {
        try {
          setTransactions(JSON.parse(storedTx));
        } catch {
          // ignore
        }
      }
    }
  }, []);

  const saveToStorage = (newBal: number, newTx: WalletTransaction[]) => {
    setBalance(newBal);
    setTransactions(newTx);
    if (typeof window !== "undefined") {
      localStorage.setItem("nsv_wallet_balance", newBal.toString());
      localStorage.setItem("nsv_wallet_tx", JSON.stringify(newTx));
    }
  };

  const rechargeWalletSuccess = (amount: number, paymentMode: string) => {
    // Calculate 10% Cashback Bonus
    const cashback = Math.round(amount * 0.1);
    const totalCredited = amount + cashback;
    const nextBal = balance + totalCredited;

    const newTx: WalletTransaction[] = [
      {
        id: `tx-${Date.now()}-cb`,
        type: "cashback",
        title: `🎁 ${cashback > 0 ? `NSV 10% Cashback Bonus (+₹${cashback})` : "Cashback Offer"}`,
        amount: cashback,
        date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "success",
      },
      {
        id: `tx-${Date.now()}`,
        type: "recharge",
        title: `➕ Wallet Recharge via ${paymentMode.toUpperCase()}`,
        amount,
        date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "success",
      },
      ...transactions,
    ];

    saveToStorage(nextBal, newTx);
    return { totalCredited, cashback };
  };

  const rechargeWalletFail = (amount: number) => {
    const newTx: WalletTransaction[] = [
      {
        id: `tx-${Date.now()}-fail`,
        type: "failed_recharge",
        title: `❌ Failed Wallet Recharge Attempt (₹${amount})`,
        amount: 0,
        date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "failed",
      },
      ...transactions,
    ];
    saveToStorage(balance, newTx);
  };

  const deductWallet = (amount: number, description?: string): boolean => {
    if (balance < amount) return false;
    const nextBal = balance - amount;

    const newTx: WalletTransaction[] = [
      {
        id: `tx-${Date.now()}-purch`,
        type: "purchase",
        title: description || "🥛 Milk Order Payment",
        amount: -amount,
        date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "success",
      },
      ...transactions,
    ];

    saveToStorage(nextBal, newTx);
    return true;
  };

  return (
    <WalletContext.Provider
      value={{ balance, transactions, rechargeWalletSuccess, rechargeWalletFail, deductWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
