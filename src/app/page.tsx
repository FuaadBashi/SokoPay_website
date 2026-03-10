import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import HowItWorks from "@/components/HowItWorks";
import Products from "@/components/Products";
import Industries from "@/components/Industries";
import Corridors from "@/components/Corridors";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import { CTASection } from "@/components/FooterCTA";
import Footer from "@/components/FooterCTA";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <Products />
      <Industries />
      <Corridors />
      <Pricing />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
