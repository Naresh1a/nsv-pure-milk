import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import { WalletProvider } from "@/lib/WalletContext";
import { CartProvider } from "@/lib/CartContext";
import CartDrawer from "@/components/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NSV Pure Milk Telangana | 100% Farm Fresh Milk Delivered Daily",
  description:
    "Order 100% pure, unadulterated farm fresh Cow Milk, Buffalo Milk, A2 Native Milk & Clay Pot Curd in Telangana. Delivered to your doorstep before 7:00 AM every morning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider>
          <WalletProvider>
            <CartProvider>
              {children}
              <CartDrawer />
            </CartProvider>
          </WalletProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
