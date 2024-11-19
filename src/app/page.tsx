import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials";
import { FEATURES, TESTIMONIALS } from "@/lib/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features features={FEATURES} />
      <Testimonials testimonials={TESTIMONIALS} />
      <CTA />
      <Footer />
    </>
  );
}
