import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Products from "@/components/Products";
import Subscription from "@/components/Subscription";
import Process from "@/components/Process";
import PromoSection from "@/components/PromoSection";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollToTopOnRefresh from "@/components/ScrollToTopOnRefresh";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900 selection:bg-emerald-500 selection:text-white relative">
      {/* ALWAYS RESET SCROLL TO TOP ON REFRESH */}
      <ScrollToTopOnRefresh />

      <Header />
      <Hero />
      <TrustBar />
      
      {/* 1. INDIVIDUAL DAIRY PRODUCTS CATALOG (MOVED UP) */}
      <Products />

      {/* 2. MONTHLY SUBSCRIPTION & 1-MONTH PREMIUM PLANS (SUBSCRIBE DAILY) */}
      <Subscription />

      {/* 3. FARM TO DOORSTEP PROCESS FLOW (MOVED DOWN) */}
      <Process />

      <PromoSection />
      <Reviews />
      <Footer />

      {/* FLOATING WHATSAPP BUTTON */}
      <FloatingWhatsApp />
    </main>
  );
}