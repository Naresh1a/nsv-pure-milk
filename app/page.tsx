import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Products from "../components/Products";
import TrustBar from "../components/TrustBar";
import Process from "../components/Process";
import Subscription from "../components/Subscription";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";
import PromoSection from "../components/PromoSection";

export default function Home() {
  return (
    <>
      <Header />

      <Hero />

      <TrustBar />

      <Features />

      <Products />

      <PromoSection />

      <Process />

      <Subscription />

      <Reviews />

      <Footer />
    </>
  );
}